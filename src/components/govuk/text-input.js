"use client"

import layout from "@/app/theme/layout.module.css"

export default function TextInput() {
  return (
    <section className={layout.container}>
      <div
        className="govuk-form-group govuk-character-count"
        data-module="govuk-character-count"
        data-maxlength="200"
      >
        <h1 className="govuk-label-wrapper">
          <label className="govuk-label govuk-label--l" htmlFor="with-hint">
            Can you provide more detail?
          </label>
        </h1>
        <div id="with-hint-hint" className="govuk-hint">
          Do not include personal or financial information like your National
          Insurance number or credit card details
        </div>
        <textarea
          className="govuk-textarea govuk-js-character-count"
          id="with-hint"
          name="withHint"
          rows="5"
          aria-describedby="with-hint-info with-hint-hint"
        ></textarea>
        <div
          id="with-hint-info"
          className="govuk-hint govuk-character-count__message"
        >
          You can enter up to 200 characters
        </div>
      </div>
    </section>
  )
}
