"use client"

import layout from "@/app/theme/layout.module.css"

export default function AccordionComponent({
  title,
  items,
  id = "accordion-with-summary-sections",
}) {
  return (
    <div>
      <section className={layout.container}>
        <h1 className="govuk-label govuk-label--l">{title}</h1>
        <div className="govuk-accordion" data-module="govuk-accordion" id={id}>
          {items.map((item, index) => (
            <div className="govuk-accordion__section" key={item.id || index}>
              <div className="govuk-accordion__section-header">
                <h2 className="govuk-accordion__section-heading">
                  <span className="govuk-accordion__section-button">
                    {item.title}
                  </span>
                </h2>
              </div>

              <div className="govuk-accordion__section-content">
                <p className="govuk-body">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
