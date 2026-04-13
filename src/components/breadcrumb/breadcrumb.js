import styles from "./styles.module.css"

export default function Breadcrumb(props) {
  return (
    <a href={props.url} className={styles.breadcrumb}>
      {props.text}
    </a>
  )
}
