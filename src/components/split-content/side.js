import styles from "./styles.module.css"
import Gallery from "../gallery/gallery"

export default function Side(props) {
  return (
    <div
      className={props.styling}
      style={{
        [`--mobile-columns-${props.side}`]: props.mobileColumns,
        [`--desktop-columns-${props.side}`]: props.desktopColumns,
      }}
    >
      {props.title ? <h1>{props.title}</h1> : null}
      {props.subheading ? <h6>{props.subheading}</h6> : null}
      {props.paragraphs ? (
        <div className={styles.paragraphs}>
          {props.paragraphs.map((element, index) => (
            <p key={index}>{element}</p>
          ))}
        </div>
      ) : null}
      {props.gallery ? <Gallery images={props.gallery} /> : null}
    </div>
  )
}
