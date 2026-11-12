"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { brand } from "@/content/brand";

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

const HUBS: { lat: number; lng: number; hub: boolean }[] = [
  { lat: 24.4539, lng: 54.3773, hub: true },
  { lat: 25.2048, lng: 55.2708, hub: false },
  { lat: 51.5074, lng: -0.1278, hub: false },
  { lat: 48.8566, lng: 2.3522, hub: false },
  { lat: 40.7128, lng: -74.006, hub: false },
  { lat: 35.6762, lng: 139.6503, hub: false },
  { lat: 1.3521, lng: 103.8198, hub: false },
  { lat: -33.8688, lng: 151.2093, hub: false },
];

const GLOBE_RADIUS = 1.35;

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          color={brand.colors.navy}
          metalness={0.35}
          roughness={0.65}
        />
      </mesh>
      {HUBS.map((h, i) => {
        const pos = latLngToVector3(h.lat, h.lng, GLOBE_RADIUS + 0.04);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[h.hub ? 0.055 : 0.035, 16, 16]} />
            <meshStandardMaterial
              color={h.hub ? brand.colors.roseGold : brand.colors.mutedBlue}
              emissive={h.hub ? brand.colors.roseGold : "#000000"}
              emissiveIntensity={h.hub ? 0.45 : 0}
              metalness={0.2}
              roughness={0.4}
            />
          </mesh>
        );
      })}
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 2.5, 3]} intensity={1.35} color="#FAF7F4" />
      <directionalLight position={[-3, -1, -2]} intensity={0.35} color={brand.colors.mutedBlue} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 2.65}
        maxPolarAngle={Math.PI / 2.05}
      />
    </group>
  );
}

/**
 * The WebGL globe on its own, so three.js and drei load only for visitors who
 * will actually see it (see ReachCoverageGlobe.tsx).
 */
export function ReachGlobeCanvas({ onScreen }: { onScreen: boolean }) {
  return (
    <Canvas
      frameloop={onScreen ? "always" : "never"}
      camera={{ position: [0, 0.35, 3.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <GlobeScene />
    </Canvas>
  );
}
