"use client"

import { useState, useEffect } from "react"
import styles from "./styles.module.css"

const DIFFICULTY_LEVELS = {
  easy: ["🐶", "🐱", "🦊", "🐻"],
  medium: ["🐶", "🐱", "🦊", "🐻", "🐼", "🐸"],
  hard: ["🐶", "🐱", "🦊", "🐻", "🐼", "🐸", "🦁", "🐵"],
}

function shuffleArray(array) {
  return [...array, ...array]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}

export default function EmojiMatchGame() {
  const [difficulty, setDifficulty] = useState("medium")
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  function loadHighScore(level) {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`highscore_${level}`)
      setHighScore(saved ? parseInt(saved) : 0)
    }
  }

  function saveHighScore(level, newScore) {
    if (typeof window !== "undefined") {
      const currentHigh = localStorage.getItem(`highscore_${level}`)
      if (!currentHigh || newScore > parseInt(currentHigh)) {
        localStorage.setItem(`highscore_${level}`, newScore)
        setHighScore(newScore)
      }
    }
  }

  function resetGame(level) {
    const newCards = shuffleArray(DIFFICULTY_LEVELS[level])
    setCards(newCards)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setScore(0)
  }
  useEffect(() => {
    loadHighScore(difficulty)
    resetGame(difficulty)
  }, [difficulty])

  function handleFlip(index) {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    ) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1)

      const [first, second] = newFlipped

      if (cards[first] === cards[second]) {
        const newScore = score + 10
        setMatched((prev) => [...prev, first, second])
        setScore(newScore)
        setFlipped([])

        if (matched.length + 2 === cards.length) {
          saveHighScore(difficulty, newScore)
        }
      } else {
        setScore((s) => Math.max(0, s - 2))
        setTimeout(() => setFlipped([]), 800)
      }
    }
  }

  const gridSize = Math.sqrt(cards.length)

  return (
    <div className={styles.container}>
      <h2>Emoji Match Game</h2>

      {/* Controls */}
      <div className={styles.controls}>
        <label>Difficulty: </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={() => resetGame(difficulty)}
          style={{ marginLeft: 10 }}
        >
          Restart
        </button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <strong>Moves:</strong> {moves} | <strong>Score:</strong> {score} |{" "}
        <strong>High Score:</strong> {highScore}
      </div>

      {/* Board */}
      <div
        className={styles.board}
        style={{ gridTemplateColumns: `repeat(${gridSize}, 70px)` }}
      >
        {cards.map((emoji, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index)

          return (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleFlip(index)}
            >
              <div
                className={`${styles.innerCard} ${
                  isFlipped ? styles.flipped : ""
                }`}
              >
                <div className={styles.face}>❓</div>
                <div className={`${styles.face} ${styles.back}`}>{emoji}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Win */}
      {matched.length === cards.length && (
        <h3 className={styles.win}>🎉 You win!</h3>
      )}
    </div>
  )
}
