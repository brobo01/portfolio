"use client"

import { Geist, Geist_Mono } from "next/font/google"
import { useAnalytics } from "../firebase/use-analytics"
import Header from "../header/header"
import Footer from "../footer/footer"
import { usePathname } from "next/navigation"
import AnalyticsProvider from "../firebase/analytics-provider"
import EventGrid from "../event-grid/event-grid"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
export default function LayoutProvider({ pageName, children }) {
  const page = usePathname()
  let pageTitle = ""
  let showHeaderFooter = false
  showHeaderFooter
  if (page === "/") {
    pageTitle = "home"
  } else {
    pageTitle = page.substring(1)
    showHeaderFooter = true
  }

  // const sausage = useAnalytics(pageTitle)
  // console.log(sausage)

  return (
    <AnalyticsProvider pageName={pageTitle}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {showHeaderFooter ? <Header /> : null}
        {children}
        {showHeaderFooter ? <Footer /> : null}
      </body>
    </AnalyticsProvider>
  )
}
