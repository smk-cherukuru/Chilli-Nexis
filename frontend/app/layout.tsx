import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChilliNexis",
  description: "AI-powered precision agriculture for chilli farmers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Explicit Navbar */}
        <nav className="no-print" style={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)', 
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky', 
          top: 0, 
          zIndex: 9999,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src="/images/Chilli Care Logo.png" alt="ChilliNexis Logo" style={{ height: '45px' }} />
            </Link>
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
              <Link href="/" style={{ fontWeight: '600', color: '#374151', textDecoration: 'none' }}>Home</Link>
              <Link href="/about" style={{ fontWeight: '600', color: '#374151', textDecoration: 'none' }}>About</Link>
              <Link href="/diseases" style={{ fontWeight: '600', color: '#374151', textDecoration: 'none' }}>Diseases</Link>
              <Link href="/marketplace" style={{ fontWeight: '600', color: '#374151', textDecoration: 'none' }}>Marketplace</Link>
              <Link href="/contact" style={{ fontWeight: '600', color: '#374151', textDecoration: 'none' }}>Contact</Link>
              <Link href="/dashboard" style={{ background: '#10b981', color: 'white', padding: '0.6rem 1.5rem', borderRadius: '99px', fontWeight: 'bold', textDecoration: 'none' }}>Dashboard</Link>
            </div>
          </div>
        </nav>
        
        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          {children}
        </div>
        
        {/* Explicit Footer */}
        <footer className="no-print" style={{ 
          background: '#111827', 
          color: '#9ca3af', 
          padding: '3rem 2rem', 
          textAlign: 'center',
          marginTop: 'auto'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>© 2026 ChilliNexis Project. Empowering farmers with Artificial Intelligence.</p>
            <p style={{ fontSize: '0.9rem' }}>Developed for Capstone | Deep Learning & Agriculture</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
