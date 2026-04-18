
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              {/* Scale logo for mobile */}
              <Image
                src="/logo.png"
                alt="Circular. Logo"
                width={180}    // Maximum intended width
                height={40}    // Corresponding height
                className="w-24 md:w-40 lg:w-40 h-auto" // Responsive widths
                priority
              />
            </div>
          </div>
          <Link
            href="/auth/register-campus"
            className="text-xs md:text-sm font-medium px-4 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all active:scale-95"
          >
            Register
          </Link>
        </div>
      </nav>
  )
}

export default Header