"use client"
import styles from "./styles.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wave_container}>
        <div className={styles.air1}></div>
        <div className={styles.air2}></div>
        <div className={styles.air3}></div>
        <div className={styles.air4}></div>
        <div className={styles.air5}></div>
      </div>
      <div className={styles.text_container}>
        <h6 className={styles.footer_text}>© Copyright 2026 - Ben Roberts</h6>
      </div>
    </footer>
  )
}
