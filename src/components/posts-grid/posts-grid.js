import styles from "./styles.module.css"
import ctas from "@/app/theme/ctas.module.css"

export default function PostsGrid(props) {
  return (
    <div className={styles.container}>
      {props.posts?.map((post, index) => (
        <div key={index} className={styles.post}>
          {post.title ? <h4 className={styles.heading}>{post.title}</h4> : null}
          <div className={styles.subheading}>
            {post.time_to_read ? (
              <h6 className={styles.time}>{post.time_to_read},</h6>
            ) : null}
            {post.published ? (
              <h6 className={styles.published}>{post.published}</h6>
            ) : null}
          </div>
          {post.overview ? (
            <p className={styles.overview}>{post.overview}</p>
          ) : null}
          <a href={`/blog${post.url}`} className={ctas.submitBtn}>
            Read <span className={ctas.arrow}>→</span>
          </a>
        </div>
      ))}
    </div>
  )
}
