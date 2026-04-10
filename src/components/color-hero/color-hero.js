"use client"

import { useEffect, useRef } from "react"
import styles from "./styles.module.css"
import layout from "@/app/theme/layout.module.css"

export default function ColorHero(props) {
  return (
    <section className={styles.hero}>
      <div className={layout.container}>
        <div className={styles.content}>
          {props.title ? <h1 className={styles.title}>{props.title}</h1> : null}
          {props.subheading ? (
            <h2 className={styles.title}>{props.subheading}</h2>
          ) : null}
          {props.paragraph ? (
            <p className={styles.title}>{props.paragraph}</p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
