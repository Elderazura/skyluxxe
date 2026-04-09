"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

const MODEL_PATH = "/logos/monogram-3d.glb";

const ROSE_GOLD_COLOR = new THREE.Color("#DFA293");
const ROSE_GOLD_DARK = new THREE.Color("#B76E79");

type MonogramModelProps = {
  autoRotate?: boolean;
  rotationSpeed?: number;
  rotationY?: number;
  scale?: number;
};

function MonogramModel({
  autoRotate = true,
  rotationSpeed = 0.3,
  rotationY,
  scale = 1,
}: MonogramModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry && !child.geometry.attributes.normal) {
          child.geometry.computeVertexNormals();
        }

        child.material = new THREE.MeshPhysicalMaterial({
          color: ROSE_GOLD_COLOR,
          metalness: 0.85,
          roughness: 0.18,
          clearcoat: 0.4,
          clearcoatRoughness: 0.08,
          envMapIntensity: 1.5,
          emissive: ROSE_GOLD_DARK,
          emissiveIntensity: 0.08,
          side: THREE.DoubleSide,
        });
      }
    });
    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (rotationY !== undefined) {
      groupRef.current.rotation.y = rotationY;
    } else if (autoRotate) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

type MonogramSceneProps = {
  className?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  rotationY?: number;
  scale?: number;
  opacity?: number;
};

export function MonogramScene({
  className,
  autoRotate = true,
  rotationSpeed = 0.3,
  rotationY,
  scale = 2,
  opacity = 1,
}: MonogramSceneProps) {
  return (
    <div className={className} style={{ opacity }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FFF5F0" />
          <directionalLight position={[-4, -2, 3]} intensity={0.6} color="#DFA293" />
          <spotLight
            position={[0, 5, 5]}
            intensity={1}
            color="#DFA293"
            angle={0.4}
            penumbra={0.5}
          />
          <Environment preset="studio" environmentIntensity={0.5} />
          <MonogramModel
            autoRotate={autoRotate}
            rotationSpeed={rotationSpeed}
            rotationY={rotationY}
            scale={scale}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
