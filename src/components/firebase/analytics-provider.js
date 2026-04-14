"use client"

// components/AnalyticsProvider.js
import { useAnalytics } from "./use-analytics"

/**
 * Wrap this around any Server Component subtree to fire analytics
 * without forcing the whole page to be a Client Component.
 *
 * Usage in a Server Component page:
 *   <AnalyticsProvider pageName="home">
 *     <YourServerContent />
 *   </AnalyticsProvider>
 */
export default function AnalyticsProvider({ pageName, children }) {
  useAnalytics(pageName)
  return children
}
