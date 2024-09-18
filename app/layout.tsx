import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Base from "@/app/base";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PEPE on SOL',
  description:
    'PEPE on SOL is the king of PEPEs on SOL',
  twitter: {
    title: 'PEPE on SOL',
    description:
      'PEPE on SOL is the king of PEPEs on SOL',
    images: '/five.png',
    card: 'summary_large_image',
    site: '@PEPEONPUMPFUN',
  },
  openGraph: {
    title: 'PEPE on SOL',
    description:
        'PEPE on SOL is the king of PEPEs on SOL',
    images: '/five.png',
    url: 'https://www.pepeonpumpfun.xyz/',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Base>
      {children}
    </Base>
  )
}
