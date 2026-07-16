"use client"

import * as React from "react"
import Link from "next/link"
import * as styles from "./styles.module.css"
import { useTransitionRouter } from "next-view-transitions"

function Navigation(props) {
  const router = useTransitionRouter()

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      },
    )
    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    )
  }

  const pageUrls = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/big-data", label: "Big Data" },
    { href: "/contact", label: "Contact" },
    // { href: "/case-studies", label: "Case Studies" },
    // { href: "/games", label: "Games" },
    // { href: "/apis", label: "APIs" },
  ]
  return (
    <nav className={props.open ? styles.nav_open : styles.nav}>
      {pageUrls.map((link, index) => (
        <a
          onClick={(e) => {
            e.preventDefault()
            router.push(link.href, { onTransitionReady: slideInOut })
          }}
          key={index}
          href={link.href}
          className={styles.link}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}

export default Navigation
