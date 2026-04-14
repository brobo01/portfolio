import "../app/theme/globals.css"
import "../app/theme/typography.css"
import "../app/theme/variables.css"
import { ViewTransitions } from "next-view-transitions"
import LayoutProvider from "@/components/layout-wrapper/layout-wrapper"

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <LayoutProvider>{children}</LayoutProvider>
      </html>
    </ViewTransitions>
  )
}
