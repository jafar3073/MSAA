import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PrayerGrid from "@/components/PrayerGrid"; 

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
}

async function getPrayerTimes(): Promise<PrayerTimings | null> {
  try {
    // method=0: Shia Ithna-Ashari
    // latitudeAdjustmentMethod=3: Angle-based estimation for high latitudes
    // tune: Adds +15 mins to Fajr
    const res = await fetch(
      "http://api.aladhan.com/v1/timingsByCity?city=Calgary&country=Canada&method=0&latitudeAdjustmentMethod=3&tune=0,15,0,0,0,0,0,0,0",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("Failed to fetch prayer times");
    const data = await res.json();
    return data.data.timings;
  } catch (error) {
    console.error("Prayer API Error:", error);
    return null;
  }
}

async function getDailyReflection() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const reflection = await prisma.reflection.findFirst({
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
    return reflection;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

export default async function Home() {
  const [prayerTimes, reflection] = await Promise.all([
    getPrayerTimes(),
    getDailyReflection(),
  ]);

  const currentDateString = new Date().toLocaleDateString('en-CA', { 
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' 
  });

  return (
    <div className="flex flex-col items-center w-full bg-[#f6fafd] min-h-screen text-[#171c1e] font-sans">
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-4 md:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-2xl">
          <div className="inline-block px-3 py-1 bg-[#e5e9eb] text-[#3e484d] text-sm font-semibold rounded-full mb-6 tracking-wide">
            EST. 1445 AH
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#23395d] leading-tight tracking-tight">
            The Spiritual Pulse of Our Youth.
          </h1>
          <p className="text-lg mb-8 text-[#3e484d] leading-relaxed max-w-lg">
            Mawkib Shabab Al Askaryayn is a sanctuary for spiritual growth, fostering a community rooted in the legacy of the Ahlulbayt (AS) through modern engagement and timeless guidance.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/join" 
              className="px-6 py-3 bg-[#0891B2] text-white font-semibold rounded-md hover:bg-[#067a96] transition-colors"
            >
              Join Community
            </Link>
            <Link 
              href="/about" 
              className="px-6 py-3 bg-white text-[#23395d] font-semibold rounded-md border border-[#bdc8ce] hover:bg-[#f0f4f7] transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
        
        <div className="flex-1 w-full flex justify-end">
          <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-t-[12rem] bg-[#eaeef1] border-[8px] border-white shadow-sm">
             {/* Archway Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-[#6e797e]">
              [Archway Image Placeholder]
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Prayer Timetable Section */}
      <section className="w-full max-w-7xl px-4 md:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-[#23395d] mb-2 tracking-tight">Daily Prayers</h2>
            <p className="text-[#73787A] font-medium">Calgary, Alberta • {currentDateString}</p>
          </div>
          <Link 
            href="/calendar" 
            className="group flex items-center gap-2 px-6 py-3 bg-white border border-[#eaeef1] text-[#23395d] text-sm font-semibold rounded-full hover:border-[#0891B2] hover:text-[#0891B2] transition-all shadow-sm"
          >
            Full Calendar 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* The Client Component handles the active state highlighting */}
        <PrayerGrid prayerTimes={prayerTimes} />

      </section>

      {/* Quote Section (Bilingual) */}
      <section className="w-full max-w-4xl px-4 md:px-8 py-24 text-center">
        <div className="w-12 h-[1px] bg-[#bdc8ce] mx-auto mb-12"></div>
        
        {reflection ? (
          <div className="flex flex-col gap-6 mb-8">
            <p className="font-serif text-3xl md:text-4xl text-[#23395d] leading-loose" dir="rtl">
              "{reflection.contentArabic}"
            </p>
            <p className="font-serif text-xl md:text-2xl text-[#6e797e] leading-relaxed italic">
              "{reflection.contentEnglish}"
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 mb-8">
            <p className="font-serif text-3xl md:text-4xl text-[#23395d] leading-loose" dir="rtl">
              "إِنِّي تَارِكٌ فِيكُمُ الثَّقَلَيْنِ كِتَابَ اللَّهِ وَعِتْرَتِي أَهْلَ بَيْتِي، وَإِنَّهُمَا لَنْ يَفْتَرِقَا حَتَّى يَرِدَا عَلَيَّ الْحَوْضَ"
            </p>
            <p className="font-serif text-xl md:text-2xl text-[#6e797e] leading-relaxed italic">
              "I leave among you two weighty things: the Book of Allah and my progeny, the Ahlulbayt. Verily, these two will never separate until they meet me at the Pond."
            </p>
          </div>
        )}

        <p className="text-sm font-semibold text-[#0891B2] tracking-widest uppercase">
          {reflection?.source || "Prophet Muhammad (PBUH)"}
        </p>
        
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-1 h-1 bg-[#0891B2] rounded-full"></div>
          <div className="w-1 h-1 bg-[#bdc8ce] rounded-full"></div>
          <div className="w-1 h-1 bg-[#bdc8ce] rounded-full"></div>
        </div>
      </section>

      {/* Content Cards Section */}
      <section className="w-full max-w-7xl px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Event Card */}
        <div className="md:col-span-2 relative h-[400px] rounded-2xl overflow-hidden bg-[#2c3133] flex flex-col justify-end p-8">
          <div className="absolute inset-0 bg-gradient-to-t from-[#171c1e] via-transparent to-transparent z-10"></div>
          <div className="relative z-20">
            <span className="inline-block px-3 py-1 bg-[#0891B2] text-white text-xs font-bold rounded-full mb-4">
              MAIN EVENT
            </span>
            <h3 className="text-3xl font-bold text-white mb-2">
              Monthly Youth Majlis: The Path of Knowledge
            </h3>
            <p className="text-gray-300 mb-6 max-w-lg">
              Join us for an evening of reflection, poetry, and scholarly discourse on the life of Imam Al-Askari (AS).
            </p>
            <button className="px-6 py-2 bg-white text-[#23395d] font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Register Now
            </button>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 bg-white border border-[#eaeef1] rounded-2xl p-8 flex flex-col justify-center">
            <h4 className="text-xl font-bold text-[#23395d] mb-3">Weekly Guidance</h4>
            <p className="text-[#6e797e] text-sm mb-6 leading-relaxed">
              Reflections on the Sahifa Sajjadiya and its application in modern student life.
            </p>
            <Link href="#" className="text-[#0891B2] text-sm font-semibold hover:underline mt-auto">
              READ MORE →
            </Link>
          </div>
          
          <div className="flex-1 bg-[#23395d] rounded-2xl p-8 flex flex-col justify-center text-white">
            <h4 className="text-xl font-bold mb-3">Join the Youth Council</h4>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Empower your community. Applications for the 2026 session are now open for all local students.
            </p>
            <Link href="/join" className="text-white text-sm font-semibold hover:underline mt-auto opacity-80 hover:opacity-100">
              APPLY →
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}