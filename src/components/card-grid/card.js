import styles from "./styles.module.css"

export default function Card(props) {
  const { card, full, setActive } = props
  return (
    <div key={props.index} className={styles.inner_card}>
      {card.heading ? <h4 className={styles.heading}>{card.heading}</h4> : null}
      {card.sub_heading ? (
        <h5 className={styles.sub_heading}>{card.sub_heading}</h5>
      ) : null}
      {card.eyebrow ? <h6 className={styles.eyebrow}>{card.eyebrow}</h6> : null}
      {full ? (
        <div className={styles.extra_content}>
          {card.paragraphs ? (
            <div className={styles.paragraphs}>
              {card.paragraphs.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
          {card.bottom_paragraph ? (
            <h6 className={styles.bottom_paragraph}>{card.bottom_paragraph}</h6>
          ) : null}
          <button
            className={styles.close_button}
            onClick={() => setActive(null)}
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  )
}
