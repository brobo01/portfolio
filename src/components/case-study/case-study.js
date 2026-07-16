import React from "react"
import styles from "./styles.module.css"
import layout from "@/app/theme/layout.module.css"
import Carousel from "@/components/carousel/carousel.js"
import CaseStudyCard from "./case-study-card"

export default function CaseStudy(props) {
  const { index, images } = props
  return (
    <section className={layout.container}>
      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={index % 2 === 0 ? styles.right : styles.left}>
            <CaseStudyCard {...props} />
          </div>
          <div className={index % 2 === 0 ? styles.left : styles.right}>
            <Carousel images={images} />
          </div>
        </div>
      </div>
    </section>
  )
}
