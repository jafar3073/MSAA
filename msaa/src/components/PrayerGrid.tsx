"use client";

import { useEffect, useState } from "react";

interface PrayerGridProps {
  prayerTimes: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
  } | null;
}

export default function PrayerGrid({ prayerTimes }: PrayerGridProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // The base data array
  const prayerDisplayData = [
    { name: "FAJR", time: prayerTimes?.Fajr || "--:--" },
    { name: "SUNRISE", time: prayerTimes?.Sunrise || "--:--" },
    { name: "DHUHR", time: prayerTimes?.Dhuhr || "--:--" },
    { name: "ASR", time: prayerTimes?.Asr || "--:--" },
    { name: "SUNSET", time: prayerTimes?.Sunset || "--:--" },
    { name: "MAGHRIB", time: prayerTimes?.Maghrib || "--:--" },
    { name: "ISHA", time: prayerTimes?.Isha || "--:--" },
  ];

  useEffect(() => {
    const calculateActivePrayer = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Convert all API times to minutes since midnight
      const timesInMinutes = prayerDisplayData.map((p) => {
        if (p.time === "--:--") return 1440; // Fallback to end of day
        const [hours, minutes] = p.time.split(":").map(Number);
        return hours * 60 + minutes;
      });

      // Find the first prayer time that is strictly greater than the current time
      let nextIndex = 0;
      for (let i = 0; i < timesInMinutes.length; i++) {
        if (currentMinutes < timesInMinutes[i]) {
          nextIndex = i;
          break;
        }
      }
      
      setActiveIndex(nextIndex);
    };

    calculateActivePrayer();
    
    // Recalculate every minute
    const interval = setInterval(calculateActivePrayer, 60000);
    return () => clearInterval(interval);
  }, [prayerDisplayData]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
      {prayerDisplayData.map((prayer, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={prayer.name}
            className={`relative flex flex-col items-center justify-center p-6 md:p-8 transition-all duration-500 ease-out ${
              isActive
                ? "bg-[#23395d] text-white rounded-t-[3rem] rounded-b-2xl shadow-xl lg:-translate-y-4 border-b-4 border-[#0891B2]"
                : "bg-white text-[#23395d] rounded-2xl border border-[#eaeef1] hover:border-[#bdc8ce] hover:shadow-md"
            }`}
          >
            {/* Visual Anchor Dot */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-6 transition-colors ${
                isActive ? "bg-white/10" : "bg-[#f6fafd]"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isActive ? "bg-[#0891B2]" : "bg-[#bdc8ce]"
                }`}
              ></div>
            </div>

            <span
              className={`text-xs font-bold tracking-widest uppercase mb-2 ${
                isActive ? "text-[#94A3B8]" : "text-[#73787A]"
              }`}
            >
              {prayer.name}
            </span>

            <span
              className={`text-3xl font-bold tracking-tight ${
                isActive ? "text-white" : "text-[#23395d]"
              }`}
            >
              {prayer.time}
            </span>

            {isActive && (
              <div className="absolute bottom-4">
                <span className="text-[10px] font-bold text-[#0891B2] tracking-widest uppercase bg-white/10 px-2.5 py-1 rounded-full">
                  Next
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}