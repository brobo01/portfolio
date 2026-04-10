"use client"

import { Geist, Geist_Mono } from "next/font/google"
import "../app/theme/globals.css"
import "../app/theme/typography.css"
import "../app/theme/variables.css"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import { ViewTransitions } from "next-view-transitions"
import { usePathname } from "next/navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// export const metadata = {
//   title: "Ben Roberts - Software Engineer",
//   description: "Ben Roberts' personal portfolio website built with Next.js",
// }

export default function RootLayout({ children }) {
  const showHeaderFooter = usePathname() === "/" ? false : true
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {showHeaderFooter ? <Header /> : null}
          {children}
          {showHeaderFooter ? <Footer /> : null}
        </body>
      </html>
    </ViewTransitions>
  )
}
