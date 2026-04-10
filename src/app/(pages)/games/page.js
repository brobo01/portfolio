import styles from "./styles.module.css"
import EmojiMatchGame from "./emoji-match/emoji-match"
import ColorHero from "@/components/color-hero/color-hero"

export default async function Page() {
  return (
    <main style={{ "--background-colour": "black" }}>
      <ColorHero
        title="Games"
        subheading="A few light-hearted javascript based games"
      />
      <EmojiMatchGame />
    </main>
  )
}
