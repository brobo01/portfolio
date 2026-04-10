import React from "react"
import styles from "./styles.module.css"

export default function CaseStudy({
  title,
  overview,
  role,
  tech,
  challenge,
  actions,
  outcome,
  takeaway,
}) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.role}>{role}</p>

      <p className={styles.overview}>{overview}</p>

      <div className={styles.section}>
        <h3>Tech Stack</h3>
        <p>{tech}</p>
      </div>

      <div className={styles.section}>
        <h3>The Challenge</h3>
        <ul>
          {challenge.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3>What I Did</h3>
        <ul>
          {actions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3>The Outcome</h3>
        <ul>
          {outcome.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <blockquote className={styles.quote}>{takeaway}</blockquote>
    </div>
  )
}
