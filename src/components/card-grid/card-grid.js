"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./styles.module.css"
import layout from "@/app/theme/layout.module.css"
import Card from "./card"
const cards = [
  {
    id: 1,
    title: "Card One",
    short: "Short text",
    long: "This is more detailed information about Card One.",
  },
  {
    id: 2,
    title: "Card Two",
    short: "Short text",
    long: "This is more detailed information about Card Two.",
  },
  {
    id: 3,
    title: "Card Three",
    short: "Short text",
    long: "This is more detailed information about Card Three.",
  },
  {
    id: 4,
    title: "Card Four",
    short: "Short text",
    long: "This is more detailed information about Card Four.",
  },
]
export default function CardGrid(props) {
  const [active, setActive] = useState(null)

  return (
    <section className={layout.container}>
      {props.title ? <h3>{props.title}</h3> : null}
      <div className={styles.grid}>
        {props.cards?.map((card) => (
          <motion.div
            key={card.id}
            className={styles.card}
            layout
            onClick={() => setActive(card)}
          >
            <Card card={card} full={false} />
            {/* <h4>{card.heading}</h4>
            <h5>{card.sub_heading}</h5>
            <h5>{card.eyebrow}</h5> */}
          </motion.div>
        ))}

        <AnimatePresence>
          {active && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            >
              <motion.div
                className={styles.expanded}
                layoutId={`card-${active.id}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card card={active} full={true} setActive={setActive} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
