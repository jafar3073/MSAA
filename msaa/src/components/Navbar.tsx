import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <header className="w-full bg-[#f6fafd] border-b border-[#eaeef1] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
                
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3">
                    <Image 
                        src="/MSAALogo.png" 
                        alt="MSAA Logo" 
                        width={40} 
                        height={40} 
                    />
                    <span className="text-2xl font-bold tracking-tight text-[#23395D]">MSAA</span>
                </Link>
                
                {/* Center Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {/* Active link uses Primary #0891B2 */}
                    <Link href="/" className="text-[#0891B2] font-semibold">
                        Home
                    </Link>
                    {/* Inactive links use Neutral #73787A */}
                    {/* <Link href="/prayer-times" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">
                        Prayer Times
                    </Link> */}
                    {/* <Link href="/guidance" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">
                        Guidance
                    </Link> */}
                    <Link href="/discussion-forms" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">
                        Discussion Forms
                    </Link>
                    <Link href="/events" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">
                        Events
                    </Link>
                    <Link href="/donation" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">
                        Donations
                    </Link>
                    <Link href="/about" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">
                        About
                    </Link>
                </nav>
                
                {/* Right Section: Search & Call to Action */}
                <div className="hidden md:flex items-center gap-4">
                    
                    {/* Search Input matching Style Guide */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            {/* SVG Search Icon*/}
                            <svg className="w-4 h-4 text-[#94A3B8] group-focus-within:text-[#0891B2] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="block w-[200px] pl-10 pr-4 py-2 border border-[#94A3B8]/30 rounded-md bg-white text-[#23395D] placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#0891B2] focus:border-[#0891B2] transition-all text-sm"
                        />
                    </div>

                    {/* Primary Button */}
                    <Link 
                        href="/join" 
                        className="px-5 py-2 bg-[#0891B2] text-white text-sm font-semibold rounded-md hover:bg-[#007f9d] transition-colors"
                    >
                        Join Community
                    </Link>
                </div>
            </div>
        </header>
    );
}