import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'African AI Research Hub',
  description: 'Discover AI research from across Africa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-800">
              African AI Research Hub
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link 
                    href="/" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/admin" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-white border-t mt-12 py-6">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} African AI Research Hub. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}