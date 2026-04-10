import styles from "./styles.module.css"
import layout from "@/app/theme/layout.module.css"
import ctas from "@/app/theme/ctas.module.css"

export default function CtaBanner(props) {
  return (
    <section className={styles.content}>
      <div className={layout.container}>
        <div className={styles.grid}>
          <div className={styles.left}>
            {props.title ? (
              <h5 className={styles.title}>{props.title}</h5>
            ) : null}
            {props.paragraph ? (
              <p className={styles.paragraph}>{props.paragraph}</p>
            ) : null}
          </div>
          <div className={styles.right}>
            {props.cta ? (
              <a href={props.cta.url} className={ctas.cta_1}>
                {props.cta.text}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
