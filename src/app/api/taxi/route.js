import { NextResponse } from "next/server"

const API = "https://data.cityofnewyork.us/resource/t29m-gskq.json"

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const conditions = []
  const limit = searchParams.get("limit") || "100"
  const minFare = searchParams.get("minFare")
  const pickupDate = searchParams.get("pickupDate")
  const minDistance = searchParams.get("minDistance")
  const passengers = searchParams.get("passengers")
  const url = new URL(API)
  url.searchParams.set("$limit", limit)
  url.searchParams.set("$order", "tpep_pickup_datetime DESC")

  if (minFare) {
    conditions.push(`fare_amount >= ${minFare}`)
  }

  if (minDistance) {
    conditions.push(`trip_distance >= ${minDistance}`)
  }

  if (passengers) {
    conditions.push(`passenger_count = ${passengers}`)
  }

  if (pickupDate) {
    conditions.push(`tpep_pickup_datetime >= '${pickupDate}T00:00:00'`)
  }

  if (conditions.length) {
    url.searchParams.set("$where", conditions.join(" AND "))
  }

  const response = await fetch(url)
  const data = await response.json()

  return NextResponse.json({
    data,
  })
}
