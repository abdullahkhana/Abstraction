"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

interface FloatingElementProps {
  position: [number, number, number]
  scale: number
  color: string
  speed: number
}

function FloatingElement({ position, scale, color, speed }: FloatingElementProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} transparent opacity={0.8} />
      </mesh>
    </Float>
  )
}

export function FloatingElements() {
  const elements = [
    { position: [-4, 2, -2], scale: 0.5, color: "#D84628", speed: 1 },
    { position: [4, -1, -3], scale: 0.3, color: "#FFFFFF", speed: 1.5 },
    { position: [-2, -3, -1], scale: 0.4, color: "#D84628", speed: 0.8 },
    { position: [3, 3, -4], scale: 0.6, color: "#FFFFFF", speed: 1.2 },
    { position: [0, 4, -2], scale: 0.3, color: "#D84628", speed: 2 },
  ] as const

  return (
    <>
      {elements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}
    </>
  )
}
