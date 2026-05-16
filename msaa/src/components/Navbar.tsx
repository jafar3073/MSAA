import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';

export default async function Navbar() {
    const session = await auth();

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
                        style={{ width: 'auto', height: 'auto' }} // Add this line
                    />
                    <span className="text-2xl font-bold tracking-tight text-[#23395D]">MSAA</span>
                </Link>
                
                {/* Center Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-[#0891B2] font-semibold">Home</Link>
                    <Link href="/discussion-forum" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">Discussion Forum</Link>
                    <Link href="/events" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">Events</Link>
                    <Link href="/donation" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">Donations</Link>
                    <Link href="/about" className="text-[#73787A] font-medium hover:text-[#23395D] transition-colors">About</Link>
                </nav>
                
                {/* Right Section: Auth & Call to Action */}
                <div className="hidden md:flex items-center gap-4">
                    {session?.user ? (
                        <div className="flex items-center gap-4">
                            {/* Render Dashboard ONLY if user is an ADMIN */}
                            {(session.user as any).role === "ADMIN" && (
                                <Link 
                                    href="/admin" 
                                    className="text-sm font-semibold text-[#23395D] hover:text-[#0891B2] transition-colors"
                                >
                                    Dashboard
                                </Link>
                            )}
                            
                            {/* Sign Out button is visible to ALL logged-in users */}
                            <form action={async () => {
                                "use server";
                                await signOut();
                            }}>
                                <button 
                                    type="submit" 
                                    className="px-5 py-2 bg-white border border-[#eaeef1] text-[#23395D] text-sm font-semibold rounded-md hover:bg-[#f0f4f7] transition-colors"
                                >
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn("google");
                        }}>
                            <button 
                                type="submit" 
                                className="px-5 py-2 border border-[#eaeef1] bg-white text-[#23395D] text-sm font-semibold rounded-md hover:bg-[#f0f4f7] transition-colors flex items-center gap-2"
                            >
                                {/* Google SVG Icon */}
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Sign In
                            </button>
                        </form>
                    )}

                    <Link 
                        href="/join" 
                        className="px-5 py-2 bg-[#0891B2] text-white text-sm font-semibold rounded-md hover:bg-[#007f9d] transition-colors ml-2"
                    >
                        Join Community
                    </Link>
                </div>
            </div>
        </header>
    );
}