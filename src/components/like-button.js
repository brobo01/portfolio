"use client"

import { useState } from "react"

export default function LikeButton({ likes }) {
  const handleClick = () => {
    console.log("clicked")
  }
  return (
    <div>
      <button onClick={handleClick}>button here</button>
    </div>
  )
}
