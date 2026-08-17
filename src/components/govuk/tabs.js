"use client"

import layout from "@/app/theme/layout.module.css"

export default function Tabs({ tabsColumns, tabsData }) {
  return (
    <section className={layout.container}>
      <div className="govuk-tabs" data-module="govuk-tabs">
        <h2 className="govuk-tabs__title">Contents</h2>

        <ul className="govuk-tabs__list">
          {tabsData.map((tab, index) => (
            <li
              key={tab.id}
              className={`govuk-tabs__list-item ${
                index === 0 ? "govuk-tabs__list-item--selected" : ""
              }`}
            >
              <a className="govuk-tabs__tab" href={`#${tab.id}`}>
                {tab.title}
              </a>
            </li>
          ))}
        </ul>

        {tabsData.map((tab, index) => (
          <div
            key={tab.id}
            className={`govuk-tabs__panel ${
              index !== 0 ? "govuk-tabs__panel--hidden" : ""
            }`}
            id={tab.id}
          >
            <h2 className="govuk-heading-l">{tab.title}</h2>
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  {tabsColumns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="govuk-table__header"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="govuk-table__body">
                {tab.rows.map((row) => (
                  <tr key={row.caseManager} className="govuk-table__row">
                    <td className="govuk-table__cell">{row.caseManager}</td>
                    <td className="govuk-table__cell">{row.casesOpened}</td>
                    <td className="govuk-table__cell">{row.casesClosed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  )
}
