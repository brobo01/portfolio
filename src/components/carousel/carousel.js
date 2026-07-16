"use client"

import styles from "./styles.module.css"

export default function Carousel(props) {
  const { images } = props
  const displayMs = 2000
  const fadeMs = 800
  const cycleDuration = images.length * (displayMs + fadeMs)

  return (
    <div className={styles.container}>
      {images?.map((image, index) => {
        const start = ((index * (displayMs + fadeMs)) / cycleDuration) * 100
        const fadeInEnd = start + (fadeMs / cycleDuration) * 100
        const fadeOutStart = fadeInEnd + (displayMs / cycleDuration) * 100
        const end = fadeOutStart + (fadeMs / cycleDuration) * 100

        const keyframes = `
          @keyframes fadeInOut-${index} {
            0%                    { opacity: 0; }
            ${start.toFixed(2)}%  { opacity: 0; }
            ${fadeInEnd.toFixed(2)}% { opacity: 1; }
            ${fadeOutStart.toFixed(2)}% { opacity: 1; }
            ${end.toFixed(2)}%    { opacity: 0; }
            100%                  { opacity: 0; }
          }
        `

        return (
          <div key={index} className={styles.slide}>
            <style key={`style-${index}`}>{keyframes}</style>
            <picture className={styles.picture}>
              <img
                src={image}
                key={index}
                className={styles.image}
                style={{
                  animationName: `fadeInOut-${index}`,
                  animationDuration: `${cycleDuration}ms`,
                  animationDelay: "0ms",
                }}
                alt={image}
              />
            </picture>
          </div>
        )
      })}
    </div>
  )
}
