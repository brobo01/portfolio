import ColorHero from "@/components/color-hero/color-hero"
import SplitContent from "@/components/split-content/split-content"
import data from "./work-data.json"
import WaveDivider from "@/components/wave-divider/wave-divider"
import CardGrid from "@/components/card-grid/card-grid"
import CaseStudy from "@/components/case-study/case-study"

export default async function Page() {
  return (
    <main>
      <ColorHero {...data.colorHeroText} />

      {data.caseStudies?.map((caseStudy, index) => (
        <CaseStudy {...caseStudy} index={index} key={index} />
      ))}
    </main>
  )
}
