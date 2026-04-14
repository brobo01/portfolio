"use client"

// components/EventGrid.js
import { useState } from "react"
import { trackEvent } from "../firebase/firebase"
import styles from "@/app/page.module.css"

const EVENTS = [
  {
    id: "button_click",
    label: "Button Click",
    icon: "◈",
    desc: "Tracks a generic button interaction",
  },
  {
    id: "feature_used",
    label: "Feature Used",
    icon: "◎",
    desc: "Fires when a feature is engaged",
  },
  {
    id: "signup_started",
    label: "Signup Started",
    icon: "◐",
    desc: "User begins the signup flow",
  },
  {
    id: "purchase_intent",
    label: "Purchase Intent",
    icon: "◉",
    desc: "High-value conversion signal",
  },
]

export default function EventGrid() {
  const [log, setLog] = useState([])
  const [firing, setFiring] = useState(null)

  async function fire(event) {
    setFiring(event.id)
    await trackEvent(event.id, { source: "demo_ui", timestamp: Date.now() })
    setLog((prev) => [
      { id: Date.now(), name: event.id, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9),
    ])
    setTimeout(() => setFiring(null), 600)
  }

  return (
    <>
      <section className={styles.grid}>
        {EVENTS.map((ev) => (
          <button
            key={ev.id}
            className={`${styles.card} ${firing === ev.id ? styles.fired : ""}`}
            onClick={() => fire(ev)}
          >
            <span className={styles.icon}>{ev.icon}</span>
            <span className={styles.cardLabel}>{ev.label}</span>
            <span className={styles.cardDesc}>{ev.desc}</span>
            <span className={styles.pill}>{ev.id}</span>
          </button>
        ))}
      </section>

      <section className={styles.logSection}>
        <h2 className={styles.logTitle}>Event Log</h2>
        {log.length === 0 ? (
          <p className={styles.empty}>
            No events fired yet — hit a card above.
          </p>
        ) : (
          <ul className={styles.log}>
            {log.map((entry) => (
              <li key={entry.id} className={styles.logItem}>
                <span className={styles.dot} />
                <code className={styles.logName}>{entry.name}</code>
                <span className={styles.logTime}>{entry.time}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
