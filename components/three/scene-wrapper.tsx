"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { OrbitControls, Environment } from "@react-three/drei"

interface SceneWrapperProps {
  children: React.ReactNode
  className?: string
  enableControls?: boolean
}

export function SceneWrapper({ children, className = "", enableControls = false }: SceneWrapperProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#D84628" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFFFFF" />
          <Environment preset="night" />
          {children}
          {enableControls && <OrbitControls enableZoom={false} enablePan={false} />}
        </Suspense>
      </Canvas>
    </div>
  )
}
