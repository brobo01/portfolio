import styles from "./styles.module.css"
import { useEffect, useState } from "react"
export default function TypeWriter({
  content = [
    { type: "h2", text: "Hello, I'm Ben" },
    { type: "p", text: "I'm a software developer" },
  ],
  speed = 100,
}) {
  const [displayed, setDisplayed] = useState(content.map(() => ""))
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (lineIndex >= content.length) return

    const currentLine = content[lineIndex].text

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => {
          const updated = [...prev]
          updated[lineIndex] += currentLine[charIndex]
          return updated
        })
        setCharIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setLineIndex((prev) => prev + 1)
        setCharIndex(0)
      }, 400)

      return () => clearTimeout(timeout)
    }
  }, [charIndex, lineIndex, content, speed])

  const renderTag = (type, text, i) => {
    const Tag = type
    return (
      <Tag key={i} className={styles.line}>
        {text}
        {i === lineIndex && <span className={styles.cursor}>|</span>}
      </Tag>
    )
  }

  return (
    <div className={styles.typewriter}>
      {displayed.map((text, i) => renderTag(content[i].type, text, i))}
    </div>
  )
}
