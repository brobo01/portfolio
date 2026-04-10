"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function CinematicEarthControlled() {
  const mountRef = useRef(null)

  // 🎛️ Frontend settings
  const [settings, setSettings] = useState({
    autoRotate: true,
    earthSpeed: 0.0015,
    cloudSpeed: 0.002,
    starSpeed: 0.0002,
    showClouds: true,
    showAtmosphere: true,
    emissiveIntensity: 0.6,
  })

  const objectsRef = useRef({})

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 3.5

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.25))

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2)
    sunLight.position.set(5, 3, 5)
    scene.add(sunLight)

    // Textures
    const loader = new THREE.TextureLoader()

    const dayMap = loader.load(
      "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    )
    const nightMap = loader.load(
      "https://threejs.org/examples/textures/planets/earth_lights_2048.png",
    )
    const cloudMap = loader.load(
      "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
    )
    const starMap = loader.load(
      "https://threejs.org/examples/textures/galaxy_starfield.png",
    )

    // Earth
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        map: dayMap,
        emissiveMap: nightMap,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: settings.emissiveIntensity,
      }),
    )
    scene.add(earth)

    // Clouds
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(1.01, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudMap,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    )
    scene.add(clouds)

    // Atmosphere
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0,0,1.0)), 2.0);
            gl_FragColor = vec4(0.3,0.6,1.0,1.0) * intensity;
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
      }),
    )
    scene.add(atmosphere)

    // Stars
    const starfield = new THREE.Mesh(
      new THREE.SphereGeometry(90, 64, 64),
      new THREE.MeshBasicMaterial({
        map: starMap,
        side: THREE.BackSide,
      }),
    )
    scene.add(starfield)

    // Save refs
    objectsRef.current = {
      earth,
      clouds,
      atmosphere,
      starfield,
      controls,
      renderer,
      camera,
      mount,
    }

    // Resize
    const handleResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    // Animation
    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)

      const { earthSpeed, cloudSpeed, starSpeed, autoRotate } =
        settingsRef.current

      if (autoRotate) {
        earth.rotation.y += earthSpeed
        clouds.rotation.y += cloudSpeed
        starfield.rotation.y += starSpeed
      }

      controls.update()
      renderer.render(scene, camera)
    }

    const settingsRef = { current: settings }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(frameId)
      controls.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  // 🔄 React to setting changes
  useEffect(() => {
    const objs = objectsRef.current
    if (!objs.earth) return

    objs.earth.material.emissiveIntensity = settings.emissiveIntensity
    objs.clouds.visible = settings.showClouds
    objs.atmosphere.visible = settings.showAtmosphere
  }, [settings])

  // 🎛️ UI
  return (
    <div style={{ width: "100%" }}>
      <div ref={mountRef} style={{ width: "100%", height: "500px" }} />

      <div style={{ padding: 12, fontFamily: "sans-serif" }}>
        <label>
          Auto Rotate
          <input
            type="checkbox"
            checked={settings.autoRotate}
            onChange={(e) =>
              setSettings({ ...settings, autoRotate: e.target.checked })
            }
          />
        </label>

        <br />

        <label>
          Earth Speed
          <input
            type="range"
            min="0"
            max="0.01"
            step="0.0005"
            value={settings.earthSpeed}
            onChange={(e) =>
              setSettings({ ...settings, earthSpeed: +e.target.value })
            }
          />
        </label>

        <br />

        <label>
          Night Lights
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.emissiveIntensity}
            onChange={(e) =>
              setSettings({
                ...settings,
                emissiveIntensity: +e.target.value,
              })
            }
          />
        </label>

        <br />

        <label>
          Clouds
          <input
            type="checkbox"
            checked={settings.showClouds}
            onChange={(e) =>
              setSettings({ ...settings, showClouds: e.target.checked })
            }
          />
        </label>

        <br />

        <label>
          Atmosphere
          <input
            type="checkbox"
            checked={settings.showAtmosphere}
            onChange={(e) =>
              setSettings({
                ...settings,
                showAtmosphere: e.target.checked,
              })
            }
          />
        </label>
      </div>
    </div>
  )
}
