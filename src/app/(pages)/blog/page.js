import ColorHero from "@/components/color-hero/color-hero"
import SplitContent from "@/components/split-content/split-content"
import data from "./data.json"

export default async function Page() {
  return (
    <main>
      <ColorHero title="Blog" />
      <SplitContent {...data.blog_posts} />
    </main>
  )
}
