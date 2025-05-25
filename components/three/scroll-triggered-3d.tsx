"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import { useTransform } from "framer-motion"
import type * as THREE from "three"

interface ScrollTriggered3DProps {
  scrollProgress: any
}

export function ScrollTriggered3D({ scrollProgress }: ScrollTriggered3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Transform scroll progress to rotation values
  const rotationY = useTransform(scrollProgress, [0, 1], [0, Math.PI * 4])
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.5, 0.8])
  const positionY = useTransform(scrollProgress, [0, 1], [0, -5])

  useFrame((state) => {
    if (meshRef.current) {
      // Apply scroll-based transformations
      meshRef.current.rotation.y = rotationY.get()
      meshRef.current.scale.setScalar(scale.get())
      meshRef.current.position.y = positionY.get()

      // Add some organic movement
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <dodecahedronGeometry args={[1.5, 1]} />
        <MeshDistortMaterial
          color="#D84628"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}
