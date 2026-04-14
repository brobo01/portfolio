"use client"

// hooks/useAnalytics.js
import { useEffect } from "react"
import { trackEvent } from "./firebase"

// Module-level Set survives StrictMode remounts — prevents double page_view
const trackedPages = new Set()

/**
 * Drop this into any Client Component to fire a page_view on mount.
 * Returns a stable trackEvent helper for custom events.
 */
export function useAnalytics(pageName) {
  useEffect(() => {
    if (trackedPages.has(pageName)) return
    trackedPages.add(pageName)
    trackEvent("page_view", { page_title: pageName })
  }, [pageName])

  return { trackEvent }
}
