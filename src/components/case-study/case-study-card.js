import React from "react"
import styles from "./styles.module.css"

export default function CaseStudyCard(props) {
  const { title, overview, role, tech, challenge, actions, outcome, takeaway } =
    props
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      <h6 className={styles.role}>{role}</h6>
      <p className={styles.overview}>{overview}</p>
      <div className={styles.section}>
        <h6>Tech Stack</h6>
        <p>{tech}</p>
      </div>
      <div className={styles.section}>
        <h6>The Challenge</h6>
        <ul>
          {challenge.map((item, i) => (
            <li key={i} className={styles.challenge_list_item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h6>What I Did</h6>
        <ul>
          {actions.map((item, i) => (
            <li key={i} className={styles.actions_list_item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h6>The Outcome</h6>
        <ul>
          {outcome.map((item, i) => (
            <li key={i} className={styles.outcome_list_item}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <blockquote className={styles.quote}>{takeaway}</blockquote>
    </div>
  )
}
