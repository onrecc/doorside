"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const clock = document.getElementById("clock");
      if (clock) {
        clock.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
    }, 1000);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe up detected
      setMenuOpen(true);
    }
    if (touchEnd - touchStart > 50 && menuOpen) {
      // Swipe down detected
      setMenuOpen(false);
    }
  };

  // Mouse event handlers for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Only when mouse button is pressed
      setTouchEnd(e.clientY);
    }
  };

  const handleMouseUp = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe up detected
      setMenuOpen(true);
    }
    if (touchEnd - touchStart > 50 && menuOpen) {
      // Swipe down detected
      setMenuOpen(false);
    }
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

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

  return (
    <div 
      className="flex min-h-screen items-center justify-centerfont-sans bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <main className={`flex h-screen w-screen ${checkAvailability() ? 'gradient-available' : 'gradient-in-use'} ${zalando.className}`}>
        <div className="w-2/3 h-full p-8 pt-12 relative">
          <Available checkAvailability={checkAvailability} />

          <div 
            className={`absolute bottom-0 left-2 right-0 bg-white/20 backdrop-blur-lg border-t border-white/30 rounded-t-3xl p-6 transition-transform duration-300 ease-in-out ${
              menuOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex justify-center gap-6">
              <button 
                onClick={() => window.location.reload()}
                className="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-gray-900 font-medium py-3 px-8 rounded-2xl border border-white/50 transition-all flex items-center gap-2"
              >
                <span className="material-icons">refresh</span>
                Refresh
              </button>
              <button
                onClick={() => (window.location.href = "/settings")}
                className="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-gray-900 font-medium py-3 px-8 rounded-2xl border border-white/50 transition-all flex items-center gap-2"
              >
                <span className="material-icons">settings</span>
                Settings
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/3 h-11/12 bg-white/20 rounded-4xl m-8 mr-6 self-center opacity-40 border-2 border-white/30">
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
    <div className="bg-gray-100 rounded-4xl p-2 border-2 border-white/30 m-1 mt-0">
      <span className={`mx-3 mt-2 block text-lg`}>
        {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
      <span className="mx-3 mb-2 block text-xl font-semibold">
        {slot["booking-title"] || slot["booker-name"]}
      </span>
    </div>
  );
}

const Available = ({ checkAvailability }: { checkAvailability: () => boolean }) => {
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

  if (checkAvailability()) {
    return (
      <div>
        <h1 className={`text-7xl font-medium text-gray-900`}>{debugData[0].name}</h1>
        <h2 className="mt-4 text-4xl text-gray-200 font-medium">{getAvailabilityMessage()}</h2>

        <div className="mt-6 inline-block bg-gray-200 p-3 px-9 rounded-3xl hover:opacity-80">
          <p className="text-green-500 font-semibold text-md">Book now</p>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="mt-6 inline-block bg-gray-200 p-3 px-9 rounded-3xl hover:opacity-80">
          <p className="text-red-500 font-semibold text-md">Release room</p>
        </div>
        <div className="mt-6 m-3 inline-block bg-gray-200 opacity-40 p-3 px-9 rounded-3xl hover:opacity-20">
          <p className="text-red-500 font-semibold text-md opacity-100">Extend booking</p>
        </div>
      </div>
    )
  }
}
