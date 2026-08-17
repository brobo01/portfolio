import Accordion from "@/components/govuk/accordion"
import Header from "@/components/govuk/header"
import ColorHero from "@/components/color-hero/color-hero"
import SplitContent from "@/components/split-content/split-content"
import data from "./data.json"
import TextInput from "@/components/govuk/text-input"
import Tabs from "@/components/govuk/tabs"

export default async function Page() {
  return (
    <main>
      <ColorHero {...data.colorHeroText} />
      <SplitContent {...data.intro} />
      <Header />
      <Tabs tabsColumns={data.tabsColumns} tabsData={data.tabsData} />
      <TextInput />
      <Accordion title={data.accordionTitle} items={data.accordionItems} />
    </main>
  )
}
