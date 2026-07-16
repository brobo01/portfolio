"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import styles from "./styles.module.css"

const COLUMN_SIZING_STORAGE_KEY = "taxi-table:column-sizing"

export default function TaxiTable({ data = [], loading = false }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "tpep_pickup_datetime",
        header: "Pickup",
        size: 220,
        minSize: 180,
        maxSize: 350,
      },
      {
        accessorKey: "tpep_dropoff_datetime",
        header: "Dropoff",
        size: 220,
        minSize: 180,
        maxSize: 350,
      },
      {
        accessorKey: "trip_distance",
        header: "Distance",
        size: 120,
        minSize: 100,
      },
      {
        accessorKey: "passenger_count",
        header: "Passengers",
        size: 120,
        minSize: 100,
      },
      {
        accessorKey: "fare_amount",
        header: "Fare",
        size: 120,
        cell: ({ getValue }) => `$${Number(getValue()).toFixed(2)}`,
      },
      {
        accessorKey: "tip_amount",
        header: "Tip",
        size: 120,
        cell: ({ getValue }) => `$${Number(getValue()).toFixed(2)}`,
      },
    ],
    [],
  )

  const [columnSizing, setColumnSizing] = useState({})
  const [columnSizingInfo, setColumnSizingInfo] = useState(undefined)

  const table = useReactTable({
    data,
    columns,
    state: {
      columnSizing,
      columnSizingInfo,
    },
    onColumnSizingChange: setColumnSizing,
    onColumnSizingInfoChange: setColumnSizingInfo,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(COLUMN_SIZING_STORAGE_KEY)
      if (raw) {
        setColumnSizing(JSON.parse(raw))
      }
    } catch {}
  }, [])

  const wasResizingRef = useRef(false)

  useEffect(() => {
    const isResizing = Boolean(columnSizingInfo?.isResizingColumn)
    if (wasResizingRef.current && !isResizing) {
      try {
        window.localStorage.setItem(
          COLUMN_SIZING_STORAGE_KEY,
          JSON.stringify(columnSizing),
        )
      } catch {
        // ignore — same fallback as above
      }
    }
    wasResizingRef.current = isResizing
  }, [columnSizingInfo, columnSizing])

  const rows = table.getRowModel().rows
  const containerRef = useRef(null)
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 48,
    overscan: 10,
  })

  const gridTemplateColumns = table
    .getVisibleLeafColumns()
    .map((column) => `${column.getSize()}px`)
    .join(" ")

  if (loading) {
    return <div className={styles.state}>Loading trips...</div>
  }

  if (!rows.length) {
    return <div className={styles.state}>No trips found</div>
  }

  return (
    <div ref={containerRef} className={styles.tableContainer}>
      <div
        className={styles.table}
        style={{
          minWidth: "max-content",
        }}
      >
        <div
          className={styles.header}
          style={{
            gridTemplateColumns,
          }}
        >
          {table.getHeaderGroups()[0].headers.map((header) => (
            <div key={header.id} className={styles.headerCell}>
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getCanResize() && (
                <div
                  className={styles.resizeHandle}
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                />
              )}
            </div>
          ))}
        </div>

        <div
          className={styles.body}
          style={{
            height: rowVirtualizer.getTotalSize(),
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <div
                key={row.id}
                className={styles.row}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  gridTemplateColumns,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className={styles.cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
