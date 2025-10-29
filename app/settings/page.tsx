"use client";

import { useState } from "react";
import { Zalando_Sans_SemiExpanded } from "next/font/google";
import Link from "next/link";

const zalando = Zalando_Sans_SemiExpanded({ subsets: ["latin"] });

export default function Settings() {
  const [roomName, setRoomName] = useState("Kilimanjaro");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(60);
  const [displayMode, setDisplayMode] = useState("12hour");
  const [theme, setTheme] = useState("auto");

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-black overflow-hidden">
      <main className={`flex h-screen w-screen gradient-available ${zalando.className}`}>
        <div className="w-2/3 h-full p-8 pt-12 relative overflow-y-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <button className="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-gray-900 p-3 rounded-2xl border pb-1 border-white/50 transition-all">
                <span className="material-icons">arrow_back</span>
              </button>
            </Link>
            <h1 className={`text-5xl font-medium text-gray-900`}>Settings</h1>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Room Configuration */}
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Room Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xl text-gray-800 mb-2">Room Name</label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-4 py-3 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Display Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xl text-gray-800 mb-2">Time Format</label>
                  <select
                    value={displayMode}
                    onChange={(e) => setDisplayMode(e.target.value)}
                    className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-4 py-3 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="12hour">12-hour (AM/PM)</option>
                    <option value="24hour">24-hour</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xl text-gray-800 mb-2">Color Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-4 py-3 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="auto">Auto (Based on Availability)</option>
                    <option value="green">Always Green</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sync Settings */}
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Sync Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xl text-gray-800">Auto Refresh</label>
                    <p className="text-gray-700 text-sm">Automatically refresh schedule data</p>
                  </div>
                  <button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      autoRefresh ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        autoRefresh ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                {autoRefresh && (
                  <div>
                    <label className="block text-xl text-gray-800 mb-2">
                      Refresh Interval (seconds)
                    </label>
                    <input
                      type="number"
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      min="10"
                      max="300"
                      className="w-full bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl px-4 py-3 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center gap-4 pb-8">
              <button className="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-gray-900 font-semibold py-4 px-12 rounded-2xl border border-white/50 transition-all flex items-center gap-2">
                <span className="material-icons">save</span>
                Save Settings
              </button>
              <Link href="/">
                <button className="bg-white/30 backdrop-blur-sm hover:bg-white/40 text-gray-900 font-semibold py-4 px-12 rounded-2xl border border-white/50 transition-all flex items-center gap-2">
                  <span className="material-icons">close</span>
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Info Panel */}
        <div className="w-1/3 h-11/12 bg-white/20 rounded-4xl m-8 mr-6 self-center opacity-40 border-2 border-white/30 p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">About</h3>
          <div className="space-y-4 text-gray-800">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
              <p className="text-sm text-gray-700">Version</p>
              <p className="text-xl font-semibold">1.0.0</p>
            </div>
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
              <p className="text-sm text-gray-700">Device ID</p>
              <p className="text-lg font-mono">DOOR-001</p>
            </div>
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
              <p className="text-sm text-gray-700">Last Sync</p>
              <p className="text-lg">{new Date().toLocaleString()}</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-white/30 backdrop-blur-sm hover:bg-white/40 text-gray-900 font-medium py-3 px-6 rounded-2xl border border-white/50 transition-all flex items-center gap-2">
                <span className="material-icons">restart_alt</span>
                Reset to Defaults
              </button>
              <button className="w-full bg-white/30 backdrop-blur-sm hover:bg-white/40 text-gray-900 font-medium py-3 px-6 rounded-2xl border border-white/50 transition-all flex items-center gap-2">
                <span className="material-icons">download</span>
                Export Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
