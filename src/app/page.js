"use client"

import styles from "./page.module.css"
import ParticleText from "@/components/particles/particle-text"

export default function Home() {
  return (
    <div className={styles.page}>
      <ParticleText />
    </div>
  )
}
