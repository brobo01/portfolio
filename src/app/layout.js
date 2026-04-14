import "../app/theme/globals.css"
import "../app/theme/typography.css"
import "../app/theme/variables.css"
import { ViewTransitions } from "next-view-transitions"
import LayoutProvider from "@/components/layout-wrapper/layout-wrapper"

export const metadata = {
  title: "Ben Roberts - Software Engineer",
  description: "Ben Roberts' personal portfolio website built with Next.js",
}

export default function RootLayout({ pageName, children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <LayoutProvider>{children}</LayoutProvider>
      </html>
    </ViewTransitions>
  )
}
