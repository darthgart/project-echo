import type { Metadata } from 'next'
import { Geist, JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PROJECT ECHO',
  description: 'El experimento que nunca existió',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={cn("h-full", "antialiased", geistSans.variable, jetbrainsMono.variable, "font-sans", inter.variable)}
    >
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  )
}
