"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useRouter } from "next/navigation"
import styles from "./styles.module.css"
import TypeWriter from "../type-writer/type-writer"

export default function ParticleText() {
  const mountRef = useRef(null)
  const modeRef = useRef("random")
  const [buttonVisible, setButtonVisible] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!mountRef.current) return

    const hour = new Date().getHours()

    const width = mountRef.current.clientWidth || window.innerWidth
    const height = mountRef.current.clientHeight || window.innerHeight

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 120

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    const domElement = renderer.domElement
    mountRef.current.appendChild(domElement)

    const PARTICLE_COUNT = 50000

    function getTextPoints(text) {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = 1200
      canvas.height = 800

      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const containerWidth = window.innerWidth
      const isMobile = containerWidth < 768

      // const fontSize = Math.min(90, Math.min(160, containerWidth * 0.12))
      const fontSize = isMobile ? 140 : 130
      const fontAlign = isMobile ? "center" : "right"
      console.log(fontSize)

      ctx.fillStyle = "white"
      // ctx.textAlign = fontAlign
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.font = `bold ${fontSize}px Arial`
      // const canvasHeight = isMobile ? 3 : 2
      const canvasHeight = 2

      // if (isMobile) {
      //   ctx.fillText(
      //     "Let's",
      //     canvas.width / 2,
      //     canvas.height / canvasHeight - fontSize * 0.6,
      //   )
      //   ctx.fillText(
      //     "Go",
      //     canvas.width / 2,
      //     canvas.height / canvasHeight + fontSize * 0.6,
      //   )
      // } else {
      //   ctx.fillText("Let's Go", canvas.width / 2, canvas.height / canvasHeight)
      // }
      ctx.fillText(text, canvas.width / 2, canvas.height / canvasHeight)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const points = []

      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          const index = (y * canvas.width + x) * 4
          const r = imageData.data[index]
          const g = imageData.data[index + 1]
          const b = imageData.data[index + 2]
          const brightness = (r + g + b) / 3

          if (brightness > 200) {
            const px = (x - canvas.width / 2) * 0.2
            const py = (canvas.height / 2 - y) * 0.2
            points.push(new THREE.Vector3(px, py, 0))
          }
        }
      }

      return points
    }

    const textPoints = getTextPoints("Let's go")

    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = []
    const targets = []

    const tempColor = new THREE.Color()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300

      tempColor.setHSL(Math.random(), 0.8, 0.6)
      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
        ),
      )

      const tp =
        textPoints[i % Math.max(textPoints.length, 1)] || new THREE.Vector3()
      targets.push(tp.clone())
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const alphas = new Float32Array(PARTICLE_COUNT).fill(1.0)
    const disappearOffsets = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      disappearOffsets[i] = Math.random()
    }

    const material = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const SETTLE_THRESHOLD_SQ = 0.5
    const DISPERSE_DELAY = 1000
    const FADE_DELAY = 500
    const FADE_DURATION = 3000

    const fadeRef = {
      pendingFade: false,
      disperseStartTime: null,
      fadeStartTime: null,
      redirectScheduled: false,
    }

    // Expose routerRef so the animate loop can trigger navigation
    const routerRef = { current: router }

    mountRef.current._triggerFade = () => {
      fadeRef.pendingFade = true
      fadeRef.disperseStartTime = null
      fadeRef.fadeStartTime = null
      fadeRef.redirectScheduled = false
      alphas.fill(1.0)

      const colorAttr = geometry.attributes.color
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        colorAttr.array[i * 3] = colors[i * 3]
        colorAttr.array[i * 3 + 1] = colors[i * 3 + 1]
        colorAttr.array[i * 3 + 2] = colors[i * 3 + 2]
      }
      colorAttr.needsUpdate = true
    }

    let shockwaveActive = false
    let shockCenter = new THREE.Vector3()
    let shockRadius = 0

    function animate() {
      requestAnimationFrame(animate)

      const posAttr = geometry.attributes.position
      const colorAttr = geometry.attributes.color
      const arr = posAttr.array
      const colorArr = colorAttr.array
      const mode = modeRef.current

      // Step 1: wait for particles to settle
      if (fadeRef.pendingFade && mode === "formed") {
        let totalDistSq = 0
        const sampleStep = 100
        let sampleCount = 0
        for (let i = 0; i < PARTICLE_COUNT; i += sampleStep) {
          const dx = arr[i * 3] - targets[i].x
          const dy = arr[i * 3 + 1] - targets[i].y
          const dz = arr[i * 3 + 2] - targets[i].z
          totalDistSq += dx * dx + dy * dy + dz * dz
          sampleCount++
        }
        if (totalDistSq / sampleCount < SETTLE_THRESHOLD_SQ) {
          fadeRef.pendingFade = false
          setTimeout(() => {
            fadeRef.disperseStartTime = performance.now()
            modeRef.current = "random"
          }, DISPERSE_DELAY)
        }
      }

      // Step 2: once dispersing, wait FADE_DELAY then start fading
      if (
        fadeRef.disperseStartTime !== null &&
        fadeRef.fadeStartTime === null
      ) {
        const disperseElapsed = performance.now() - fadeRef.disperseStartTime
        if (disperseElapsed >= FADE_DELAY) {
          fadeRef.fadeStartTime = performance.now()
        }
      }

      // Step 3: fade out over FADE_DURATION, then redirect
      if (fadeRef.fadeStartTime !== null) {
        const progress = Math.min(
          (performance.now() - fadeRef.fadeStartTime) / FADE_DURATION,
          1,
        )
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const particleProgress = Math.max(
            0,
            (progress - disappearOffsets[i] * 0.5) / 0.5,
          )
          alphas[i] = Math.max(0, 1 - particleProgress)
          const a = alphas[i]
          colorArr[i * 3] = colors[i * 3] * a
          colorArr[i * 3 + 1] = colors[i * 3 + 1] * a
          colorArr[i * 3 + 2] = colors[i * 3 + 2] * a
        }
        colorAttr.needsUpdate = true

        // Once fully faded, schedule redirect
        if (progress >= 0.5 && !fadeRef.redirectScheduled) {
          fadeRef.redirectScheduled = true
          routerRef.current.push("/about")
        }
      }

      if (shockwaveActive) {
        shockRadius += 3
        if (shockRadius > 400) shockwaveActive = false
      }

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x = arr[i * 3]
        let y = arr[i * 3 + 1]
        let z = arr[i * 3 + 2]

        const vel = velocities[i]

        vel.x += (Math.random() - 0.5) * 0.07
        vel.y += (Math.random() - 0.5) * 0.07
        vel.z += (Math.random() - 0.5) * 0.07

        if (shockwaveActive) {
          const dx = x - shockCenter.x
          const dy = y - shockCenter.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const band = Math.abs(dist - shockRadius)
          if (band < 10) {
            const force = (10 - band) * 0.15
            const len = dist || 1
            vel.x += (dx / len) * force
            vel.y += (dy / len) * force
          }
        }

        vel.multiplyScalar(0.95)

        if (mode === "random") {
          x += vel.x
          y += vel.y
          z += vel.z
        }

        if (mode === "forming" || mode === "formed") {
          const target = targets[i]
          x += (target.x - x) * 0.05 + vel.x * 0.4
          y += (target.y - y) * 0.05 + vel.y * 0.4
          z += (target.z - z) * 0.05 + vel.z * 0.4

          if (mode === "forming" && i === PARTICLE_COUNT - 1) {
            modeRef.current = "formed"
          }
        }

        arr[i * 3] = x
        arr[i * 3 + 1] = y
        arr[i * 3 + 2] = z
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    function onResize() {
      if (!mountRef.current) return
      const w = mountRef.current.clientWidth || window.innerWidth
      const h = mountRef.current.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      if (domElement.parentNode) domElement.parentNode.removeChild(domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  function handleClick() {
    modeRef.current = "forming"
    if (mountRef.current?._triggerFade) mountRef.current._triggerFade()

    // Hide button after 0.5s
    setTimeout(() => setButtonVisible(false), 500)
  }

  return (
    <div className={styles.container}>
      <div ref={mountRef} className={styles.canvas} />
      <div
        className={styles.content_container}
        style={{
          opacity: buttonVisible ? 1 : 0,
          pointerEvents: buttonVisible ? "auto" : "none",
        }}
      >
        <TypeWriter />
        <button onClick={handleClick} className={styles.button}>
          Enter
        </button>
      </div>
    </div>
  )
}
