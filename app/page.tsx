"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Zalando_Sans_SemiExpanded } from "next/font/google";
import { check } from "zod";

const zalando = Zalando_Sans_SemiExpanded({ subsets: ["latin"] });

const debugData = [
  { id: 1, name: "Kilimanjaro", description: "This is item 1",
    schedule: [
      {
        start: new Date("2025-10-27T16:00:00"),
        end:   new Date("2025-10-27T17:00:00"),
        "booking-title": "Team Meeting",
        "booker-name": "Alice Johnson"
      },
      {
        start: new Date("2025-10-27T20:00:00"),
        end:   new Date("2025-10-27T20:45:00"),
        "booking-title": "Project Update",
        "booker-name": "Bob Martinez"
      },
      {
        start: new Date("2025-10-28T22:40:00"),
        end:   new Date("2025-10-29T00:10:00"),
        "booking-title": "Late Night Work",
        "booker-name": "Chen Wei"
      },
      {
        start: new Date("2025-10-31T05:40:00"),
        end:   new Date("2025-10-31T06:40:00"),
        "booking-title": "Morning Briefing",
        "booker-name": "Dana Schultz"
      },
      {
        start: new Date("2025-10-31T15:40:00"),
        end:   new Date("2025-10-31T16:40:00"),
        "booking-title": "Afternoon Workshop",
        "booker-name": "Emilia Rossi"
      }
    ]
  },
]

export default function Home() {
  useEffect(() => {
    const timer = setInterval(() => {
      const clock = document.getElementById("clock");
      if (clock) {
        clock.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
    }, 1000);
  }, []);

  const checkAvailability = () => {
    const now = new Date();
    for (const slot of debugData[0].schedule) {
      const start = new Date(slot.start);
      const end = new Date(slot.end);
      if (now >= start && now <= end) {
        return false; 
      }
    }
    return true; 
  }

  const getAvailabilityMessage = () => {
    const now = new Date();
    
    // Check if currently in a booking
    for (const slot of debugData[0].schedule) {
      const start = new Date(slot.start);
      const end = new Date(slot.end);
      if (now >= start && now <= end) {
        return `In use until ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
      }
    }
    
    // Find the next upcoming booking
    const upcomingSlots = debugData[0].schedule
      .map(slot => ({ ...slot, start: new Date(slot.start), end: new Date(slot.end) }))
      .filter(slot => slot.start > now)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    
    if (upcomingSlots.length > 0) {
      const nextBooking = upcomingSlots[0];
      const twelveHoursLater = new Date(now.getTime() + 12 * 60 * 60 * 1000);
      
      // Only show "Available until" if next booking is within 12 hours
      if (nextBooking.start <= twelveHoursLater) {
        return `Available until ${nextBooking.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
      }
    }
    
    return "Available";
  }

  return (
    <div className="flex min-h-screen items-center justify-centerfont-sans bg-black">
      <main className={`flex h-screen w-screen ${checkAvailability() ? 'gradient-available' : 'gradient-in-use'} ${zalando.className}`}>
        <div className="w-2/3 h-full p-8 pt-12">
          <h1 className={`text-7xl font-medium text-gray-900`}>{debugData[0].name}</h1>
          <h2 className="mt-4 text-4xl text-gray-200 font-medium">{getAvailabilityMessage()}</h2>

          {checkAvailability() && <div className="mt-6 inline-block bg-gray-200 p-3 px-9 rounded-3xl hover:opacity-80">
            <p className="text-green-500 font-semibold text-md">Book now</p>
          </div>}
          {!checkAvailability() && <div>
            <div className="mt-6 inline-block bg-gray-200 p-3 px-9 rounded-3xl hover:opacity-80">
              <p className="text-red-500 font-semibold text-md">Release room</p>
            </div>
            <div className="mt-6 m-3 inline-block bg-gray-200 opacity-40 p-3 px-9 rounded-3xl hover:opacity-20">
              <p className="text-red-500 font-semibold text-md opacity-100">Extend booking</p>
            </div>
          </div>
          }
        </div>
        <div className="w-1/3 h-11/12 bg-gray-100 rounded-4xl m-8 mr-6 self-center opacity-40 border-2 border-white">
          <div className="text-lg text-gray-700">
            <div className="h-full flex items-center justify-between">
              <span className={`text-xl font-semibold p-4 pr-6 justify-self-end text-gray-900`}>
                Schedule
              </span>
              <span id="clock" className={`text-xl font-semibold p-4 pr-6 justify-self-end text-gray-900`}>
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
              {debugData[0].schedule
              .filter((slot) => {
                const now = new Date();
                const start = new Date(slot.start);
                const end = new Date(slot.end);
                const twelveHoursLater = new Date(now.getTime() + 12 * 60 * 60 * 1000);
                // include events that start within the next 12 hours or overlap the next 12 hours
                return end > now && start <= twelveHoursLater;
              })
              .map((slot, index) => {
                return (
                  <ScheduleItem key={index} slot={slot} />
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}

const ScheduleItem = ({ slot }: { slot: { start: Date; end: Date; "booker-name": string; "booking-title"?: string } }) => {
  const start = new Date(slot.start);
  const end = new Date(slot.end);
  
  return (
    <div className="bg-gray-50 rounded-4xl p-2 border-2 border-white m-1 mt-0">
      <span className={`mx-3 mt-2 block text-lg`}>
        {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
      <span className="mx-3 mb-2 block text-xl font-semibold">
        {slot["booking-title"] || slot["booker-name"]}
      </span>
    </div>
  );
}
