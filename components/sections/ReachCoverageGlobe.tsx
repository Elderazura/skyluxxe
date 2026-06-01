"use client";

import { useEffect, useRef, useState } from "react";
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

function ReducedMotionFallback() {
  return (
    <div
      className="flex h-full min-h-[280px] flex-col justify-center rounded-sm border border-white/[0.08] p-8 md:min-h-[360px] md:p-12"
      style={{
        background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${brand.colors.richNavy} 0%, ${brand.colors.navy} 55%, #0a121c 100%)`,
      }}
    >
      <p
        className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
        style={{ color: brand.colors.mutedBlue }}
      >
        Coverage
      </p>
      <p
        className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-tight md:text-3xl"
        style={{ color: brand.colors.offWhite }}
      >
        Abu Dhabi · Dubai · London · Paris · New York · Tokyo · Singapore · Sydney
      </p>
      <p
        className="mt-4 max-w-md font-[family-name:var(--font-body)] text-sm font-light leading-relaxed md:text-base"
        style={{ color: brand.colors.mutedBlue }}
      >
        A single desk coordinates partners across regions — the map above illustrates key
        touchpoints; your itinerary may extend far beyond.
      </p>
    </div>
  );
}

function StaticGlobeFallback() {
  return (
    <div
      className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-sm border border-white/[0.08] p-6 md:min-h-[360px] md:p-10"
      style={{
        background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${brand.colors.richNavy} 0%, ${brand.colors.navy} 55%, #0a121c 100%)`,
      }}
      role="img"
      aria-label="Illustrative world map with Abu Dhabi as the primary hub and global touchpoints"
    >
      <svg
        viewBox="0 0 400 220"
        className="h-auto w-full max-w-[520px] text-white/25"
        aria-hidden
      >
        <ellipse cx="200" cy="110" rx="185" ry="95" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <ellipse cx="200" cy="110" rx="120" ry="60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
        <circle cx="248" cy="118" r="5" fill="#DFA293" />
        <circle cx="120" cy="92" r="3" fill="#8A9AB5" />
        <circle cx="95" cy="105" r="3" fill="#8A9AB5" />
        <circle cx="210" cy="88" r="3" fill="#8A9AB5" />
        <circle cx="300" cy="100" r="3" fill="#8A9AB5" />
        <circle cx="320" cy="130" r="3" fill="#8A9AB5" />
        <circle cx="175" cy="145" r="3" fill="#8A9AB5" />
      </svg>
      <p className="mt-6 text-center font-[family-name:var(--font-body)] text-[11px] font-light uppercase tracking-[0.14em] text-white/35">
        Abu Dhabi hub · illustrative coverage
      </p>
    </div>
  );
}

function detectWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function ReachCoverageGlobe() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const [preferStatic, setPreferStatic] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setReduceMotion(mq.matches);
      setPreferStatic(mobileMq.matches);
    };
    update();
    mq.addEventListener("change", update);
    mobileMq.addEventListener("change", update);
    setWebglOk(detectWebGL());
    return () => {
      mq.removeEventListener("change", update);
      mobileMq.removeEventListener("change", update);
    };
  }, []);

  if (reduceMotion || preferStatic) {
    return <ReducedMotionFallback />;
  }

  if (!webglOk) {
    return <StaticGlobeFallback />;
  }

  return (
    <div className="relative h-[min(70vh,520px)] w-full md:h-[min(72vh,580px)]">
      <Canvas
        camera={{ position: [0, 0.35, 3.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <GlobeScene />
      </Canvas>
      <p className="pointer-events-none absolute bottom-4 left-1/2 max-w-[90%] -translate-x-1/2 text-center font-[family-name:var(--font-body)] text-[11px] font-light uppercase tracking-[0.14em] text-white/35 md:bottom-6">
        Abu Dhabi hub · global touchpoints · illustrative
      </p>
    </div>
  );
}
