"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

export function AbstractGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create custom geometry with more complex shape
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 1)
    return geo
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} geometry={geometry} scale={[2, 2, 2]}>
        <MeshDistortMaterial
          color="#D84628"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}
