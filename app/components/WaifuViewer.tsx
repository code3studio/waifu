'use client'

import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'

export default function WaifuViewer({ onFileUpload }: { onFileUpload: (fileName: string) => void }) {
  const [model, setModel] = useState<string | null>(null)

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setModel(url)
      onFileUpload(file.name)
    }
  }, [onFileUpload])

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">3D Waifu Viewer 👀</h2>
      <div className="aspect-square w-full">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          {model && <Model url={model} />}
          <OrbitControls />
        </Canvas>
      </div>
      <div className="mt-4">
        <input
          type="file"
          accept=".glb,.gltf"
          onChange={handleFileUpload}
          className="hidden"
          id="model-upload"
        />
        <Button asChild>
          <label htmlFor="model-upload" className="cursor-pointer">
            Upload Your Waifu 📁
          </label>
        </Button>
      </div>
    </div>
  )
}

function Model({ url }: { url: string }) {
  const { scene } = useLoader(GLTFLoader, url)
  return <primitive object={scene} />
}

