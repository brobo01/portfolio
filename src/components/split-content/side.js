import styles from "./styles.module.css"
import Gallery from "../gallery/gallery"
import PostsGrid from "../posts-grid/posts-grid"

export default function Side(props) {
  return (
    <div
      className={props.styling}
      style={{
        [`--mobile-columns-${props.side}`]: props.mobileColumns,
        [`--desktop-columns-${props.side}`]: props.desktopColumns,
      }}
    >
      {props.heading ? <h3>{props.heading}</h3> : null}
      {props.subheading ? <h6>{props.subheading}</h6> : null}
      {props.paragraphs ? (
        <div className={styles.paragraphs}>
          {props.paragraphs.map((element, index) => (
            <p key={index}>{element}</p>
          ))}
        </div>
      ) : null}
      {props.gallery ? <Gallery images={props.gallery} /> : null}
      {props.posts ? <PostsGrid {...props} /> : null}
    </div>
  )
}
