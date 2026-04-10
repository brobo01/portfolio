"use client"

import styles from "./styles.module.css"

export default function Modal(props) {
  return (
    <div
      className={styles.modal_background}
      style={{ display: props.showModal }}
      onClick={props.hideModal}
    >
      {props.image ? (
        <div className={styles.modal_container}>
          <picture>
            <img
              src={props.image.src}
              alt={props.image.alt}
              className={styles.modal_image}
            />
          </picture>
          <button onClick={props.hideModal} className={styles.close_modal}>
            <span className={styles.close_modal_1} />
            <span className={styles.close_modal_2} />
          </button>
        </div>
      ) : null}
    </div>
  )
}
