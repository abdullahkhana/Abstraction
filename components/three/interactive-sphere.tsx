"use client"

import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

export function InteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { mouse, viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      // Follow mouse movement
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.y * viewport.height * 0.1,
        0.1,
      )
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * viewport.width * 0.1, 0.1)

      // Continuous rotation
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Sphere
      ref={meshRef}
      args={[1, 64, 64]}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color={hovered ? "#FFFFFF" : "#D84628"}
        attach="material"
        distort={0.6}
        speed={3}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}
