import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="w-full bg-[#f6fafd] border-t border-[#eaeef1] pt-16 pb-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                
                {/* Left Side: Brand & Copyright */}
                <div className="flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-3">
                        <Image 
                            src="/MSAALogo.png" 
                            alt="MSAA Logo" 
                            width={40} 
                            height={40} 
                            style={{ width: 'auto', height: 'auto' }}
                        />
                        <span className="text-xl font-bold tracking-wide text-[#23395d]">MSAA</span>
                    </Link>
                    <p className="text-sm text-[#73787A]">
                        © {new Date().getFullYear()} Mawkib Shabab Al Askaryayn. All rights reserved.
                    </p>
                </div>

                {/* Right Side: Social & Utility Links */}
                <div className="flex flex-col md:items-end gap-6">
                    
                    {/* Primary Social Links */}
                    <ul className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#23395D]">
                        <li><Link href="#" className="hover:text-[#0891B2] transition-colors">Email</Link></li>
                        <li><Link href="#" className="hover:text-[#0891B2] transition-colors">Facebook</Link></li>
                        <li><Link href="#" className="hover:text-[#0891B2] transition-colors">Instagram</Link></li>
                        <li>
                            <Link 
                                href="http://www.tiktok.com/@eotph" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-[#0891B2] transition-colors"
                            >
                                TikTok
                            </Link>
                        </li>
                        <li><Link href="#" className="hover:text-[#0891B2] transition-colors">YouTube</Link></li>
                        <li><Link href="#" className="hover:text-[#0891B2] transition-colors">WhatsApp</Link></li>
                    </ul>

                    {/* Secondary Utility Links */}
                    <ul className="flex flex-wrap items-center gap-6 text-xs font-bold tracking-wider text-[#94A3B8] uppercase">
                        <li><Link href="/privacy" className="hover:text-[#23395D] transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/contact" className="hover:text-[#23395D] transition-colors">Contact Us</Link></li>
                        <li><Link href="/donate" className="text-[#0891B2] hover:text-[#007f9d] transition-colors">Donate</Link></li>
                    </ul>

                </div>
            </div>
        </footer>
    );
}