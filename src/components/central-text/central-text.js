import styles from "./styles.module.css"

export default function CentralText(props) {
  return (
    <section className={styles.container}>
      {props.title ? <h1 className={styles.title}>{props.title}</h1> : null}
      {props.subheading ? (
        <h2 className={styles.subheading}>{props.subheading}</h2>
      ) : null}
      {props.paragraph ? (
        <p className={styles.paragraph}>{props.paragraph}</p>
      ) : null}
    </section>
  )
}
