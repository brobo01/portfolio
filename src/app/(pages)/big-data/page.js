import ColorHero from "@/components/color-hero/color-hero"
import SplitContent from "@/components/split-content/split-content"
import data from "./data.json"
import TaxiSearch from "@/components/taxi-table/taxi-search"
import WaveDivider from "@/components/wave-divider/wave-divider"
import CardGrid from "@/components/card-grid/card-grid"

export default async function Page() {
  return (
    <main>
      <ColorHero {...data.colorHeroText} />
      <SplitContent {...data.intro} />
      <TaxiSearch />
    </main>
  )
}
