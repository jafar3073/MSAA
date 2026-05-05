import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <div className="main">
            <nav className="navbar">
                <div className="icon">
                    <Image 
                        src="/MSAALogo.png" 
                        alt="MSAA Logo" 
                        className="Mlogo" 
                        width={50} 
                        height={50} 
                    />
                    <h2 className="logo">MSAA</h2>
                </div>
                
                <div className="menu">
                    {/* Page routes. */}
                    <ul>
                        <li><Link href="/">HOME</Link></li>
                        <li><Link href="/about">ABOUT US</Link></li>
                        <li><Link href="/news">NEWS</Link></li>
                        <li><Link href="/forum">FORUM</Link></li>
                        <li><Link href="/contact">CONTACT</Link></li>
                    </ul>
                </div>
                
                <div className="search">
                    {/* Search input UI - functionality pending backend integration. */}
                    <input 
                        type="search" 
                        className="srch" 
                        placeholder="Type to text" 
                    />
                    <button className="btn">Search</button>
                </div>
            </nav>
        </div>
    );
}