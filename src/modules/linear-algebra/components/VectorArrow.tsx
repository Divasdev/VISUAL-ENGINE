"use client";
import * as THREE from 'three';

interface VectorArrowProps {
  vector: number[]; // [x, y, z]
  color?: string;
}

export const VectorArrow = ({ vector, color = "#10b981" }: VectorArrowProps) => {
  const origin = new THREE.Vector3(0, 0, 0);
  const dir = new THREE.Vector3(vector[0], vector[1], vector[2]);
  const length = dir.length();
  dir.normalize();

  return (
    <group>
      <primitive
        object={new THREE.ArrowHelper(dir, origin, length, color, 0.2, 0.1)}
      />
      {/* Small glow at the tip */}
      <mesh position={[vector[0], vector[1], vector[2]]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};