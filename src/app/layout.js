import "../app/theme/globals.scss"
import "../app/theme/typography.css"
import "../app/theme/variables.css"
import { ViewTransitions } from "next-view-transitions"
import LayoutProvider from "@/components/layout-wrapper/layout-wrapper"
import GovukFrontend from "@/components/govuk/GovukFrontend"

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <LayoutProvider>
          <GovukFrontend />
          {children}
        </LayoutProvider>
      </html>
    </ViewTransitions>
  )
}
