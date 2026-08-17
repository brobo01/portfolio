"use client"

import { useEffect } from "react"

export default function GovukFrontend() {
  useEffect(() => {
    document.body.classList.add("js-enabled", "govuk-frontend-supported")

    import("govuk-frontend").then(({ initAll }) => {
      initAll()
    })
  }, [])

  return null
}
