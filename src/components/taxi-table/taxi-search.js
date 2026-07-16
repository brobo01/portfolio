"use client"

import { useRef, useState } from "react"
import TaxiTable from "./taxi-table"
import styles from "./styles.module.css"

export default function TaxiSearch() {
  const [filters, setFilters] = useState({
    limit: 500,
    minFare: "",
    pickupDate: "",
    minDistance: "",
    passengers: "",
  })

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const controllerRef = useRef(null)

  function updateFilter(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function search() {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setLoading(true)
    setError("")

    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value)
        }
      })
      const response = await fetch(`/api/taxi?${params}`, {
        signal: controller.signal,
      })
      if (!response.ok) {
        throw new Error("API request failed")
      }
      const json = await response.json()
      setData(json.data)
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.filters}>
        <label>
          Results
          <input
            type="number"
            value={filters.limit}
            onChange={(e) => updateFilter("limit", e.target.value)}
          />
        </label>

        <label>
          Minimum Fare
          <input
            type="number"
            value={filters.minFare}
            onChange={(e) => updateFilter("minFare", e.target.value)}
          />
        </label>

        <label>
          Pickup Date
          <input
            type="date"
            value={filters.pickupDate}
            onChange={(e) => updateFilter("pickupDate", e.target.value)}
          />
        </label>

        <label>
          Minimum Distance
          <input
            type="number"
            value={filters.minDistance}
            onChange={(e) => updateFilter("minDistance", e.target.value)}
          />
        </label>

        <label>
          Passengers
          <input
            type="number"
            value={filters.passengers}
            onChange={(e) => updateFilter("passengers", e.target.value)}
          />
        </label>
      </div>

      <div className={styles.actions}>
        <button onClick={search} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>

        <button
          onClick={() => controllerRef.current?.abort()}
          disabled={!loading}
        >
          Cancel
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      <TaxiTable data={data} loading={loading} />
    </section>
  )
}
