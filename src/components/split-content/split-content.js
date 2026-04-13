import styles from "./styles.module.css"
import layout from "@/app/theme/layout.module.css"
import Side from "./side"

export default function SplitContent(props) {
  return (
    <section className={layout.container}>
      <div className={styles.content}>
        {props.title ? <h3>{props.title}</h3> : null}
        <div
          className={styles.grid}
          style={{
            "--mobile-columns": props.mobileColumns,
            "--desktop-columns": props.desktopColumns,
          }}
        >
          <Side
            {...props.left}
            mobileColumns={props.mobileLeft}
            desktopColumns={props.desktopLeft}
            side="left"
            styling={styles.left}
          />
          <Side
            {...props.right}
            mobileColumns={props.mobileRight}
            desktopColumns={props.desktopRight}
            side="right"
            styling={styles.right}
          />
        </div>
      </div>
    </section>
  )
}
