"use client";

import { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

const MODEL_PATH = "/logos/monogram-3d.glb";

const ROSE_GOLD_COLOR = new THREE.Color("#DFA293");
const ROSE_GOLD_DARK = new THREE.Color("#B76E79");

const FRICTION = 0.965;
const IDLE_SPEED = 0.15;
const IDLE_BLEND_RATE = 0.008;
const DRAG_SENSITIVITY = 0.006;
const VELOCITY_SAMPLES = 5;
const MIN_VELOCITY_THRESHOLD = 0.0008;

type PhysicsState = {
  velocity: number;
  dragging: boolean;
  lastPointerX: number;
  velocitySamples: number[];
  idleBlend: number;
  pendingDelta: number;
};

type MonogramModelProps = {
  autoRotate?: boolean;
  rotationSpeed?: number;
  rotationY?: number;
  scale?: number;
  physicsRef?: React.RefObject<PhysicsState | null>;
};

function MonogramModel({
  autoRotate = true,
  rotationSpeed = 0.3,
  rotationY,
  scale = 1,
  physicsRef,
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

    if (physicsRef?.current) {
      const p = physicsRef.current;
      if (p.dragging) {
        groupRef.current.rotation.y += p.pendingDelta;
        p.pendingDelta = 0;
      } else {
        if (Math.abs(p.velocity) > MIN_VELOCITY_THRESHOLD) {
          groupRef.current.rotation.y += p.velocity;
          p.velocity *= FRICTION;
        } else {
          p.velocity = 0;
          p.idleBlend = Math.min(1, p.idleBlend + IDLE_BLEND_RATE);
          groupRef.current.rotation.y += delta * IDLE_SPEED * p.idleBlend;
        }
      }
      return;
    }

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
  interactive?: boolean;
};

export function MonogramScene({
  className,
  autoRotate = true,
  rotationSpeed = 0.3,
  rotationY,
  scale = 2,
  opacity = 1,
  interactive = false,
}: MonogramSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<PhysicsState>({
    velocity: 0,
    dragging: false,
    lastPointerX: 0,
    velocitySamples: [],
    idleBlend: 0,
    pendingDelta: 0,
  });

  useEffect(() => {
    if (!interactive) return;
    const el = containerRef.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      const p = physicsRef.current;
      p.dragging = true;
      p.lastPointerX = e.clientX;
      p.velocitySamples = [];
      p.velocity = 0;
      p.idleBlend = 0;
      el.style.cursor = "grabbing";
      el.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      const p = physicsRef.current;
      if (!p.dragging) return;
      const dx = e.clientX - p.lastPointerX;
      p.lastPointerX = e.clientX;
      const sample = dx * DRAG_SENSITIVITY;
      p.pendingDelta += sample;
      p.velocitySamples.push(sample);
      if (p.velocitySamples.length > VELOCITY_SAMPLES) {
        p.velocitySamples.shift();
      }
    };

    const onUp = () => {
      const p = physicsRef.current;
      if (!p.dragging) return;
      p.dragging = false;
      el.style.cursor = "grab";
      if (p.velocitySamples.length > 0) {
        const sum = p.velocitySamples.reduce((a, b) => a + b, 0);
        p.velocity = sum / p.velocitySamples.length;
      }
    };

    el.style.cursor = "grab";
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [interactive]);

  useEffect(() => {
    if (!interactive) return;
    const el = containerRef.current;
    if (!el) return;

    const onTouch = (e: TouchEvent) => {
      const p = physicsRef.current;
      if (p.dragging && e.cancelable) {
        e.preventDefault();
      }
    };

    el.addEventListener("touchmove", onTouch, { passive: false });
    return () => el.removeEventListener("touchmove", onTouch);
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ opacity, touchAction: interactive ? "none" : "auto" }}
    >
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
            autoRotate={interactive ? false : autoRotate}
            rotationSpeed={rotationSpeed}
            rotationY={interactive ? undefined : rotationY}
            scale={scale}
            physicsRef={interactive ? physicsRef : undefined}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
