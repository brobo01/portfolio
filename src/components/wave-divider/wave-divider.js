"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import styles from "./styles.module.css"

export default function WaveDivider() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["45% 65%", "65% 45%"],
  })

  // Morph: flat → medium curve → strong curve
  const path = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      // Flat (both edges straight)
      "M0,160 C480,160 960,160 1440,160 L1440,320 C960,320 480,320 0,320 Z",

      // Medium curve
      "M0,160 C480,220 960,100 1440,160 L1440,320 C960,260 480,380 0,320 Z",

      // Strong curve (bulging outward)
      "M0,160 C480,280 960,40 1440,160 L1440,320 C960,200 480,440 0,320 Z",
    ],
  )

  // Optional subtle lift (adds fluid feel)
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Color shift
  const fill = useTransform(scrollYProgress, [0, 1], ["#0ea5e9", "#8b5cf6"])

  return (
    <div ref={ref} className={styles.wrapper}>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className={styles.svg}
      >
        <motion.path d={path} style={{ y, fill }} />
      </svg>
    </div>
  )
}
