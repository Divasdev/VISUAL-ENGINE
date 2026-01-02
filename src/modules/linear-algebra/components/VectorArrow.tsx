"use client";
import * as THREE from 'three';
import { useMemo } from 'react';

interface VectorArrowProps {
  vector: number[]; // [x, y, z]
  color?: string;
}

export const VectorArrow = ({ vector, color = "#10b981" }: VectorArrowProps) => {
  const { dir, length, rotation } = useMemo(() => {
    const v = new THREE.Vector3(vector[0], vector[1], vector[2]);
    const len = v.length();
    const direction = v.clone().normalize();

    // Create a quaternion to rotate from default up (0, 1, 0) to direction
    const quaternion = new THREE.Quaternion();

    // Default cylinder points UP in Three.js (0, 1, 0), so we find rotation from UP to our direction
    // If direction is exact opposite of up, we need a special case, but simple setFromUnitVectors handles most
    if (direction.y > 0.99999) {
      quaternion.set(0, 0, 0, 1);
    } else if (direction.y < -0.99999) {
      quaternion.set(1, 0, 0, 0);
    } else {
      const axis = new THREE.Vector3(0, 1, 0).cross(direction).normalize();
      const angle = Math.acos(direction.y);
      quaternion.setFromAxisAngle(axis, angle);
    }

    return { dir: direction, length: len, rotation: quaternion };
  }, [vector]);

  // Safety check for zero length
  if (length < 0.001) return null;

  const headLength = Math.min(length * 0.2, 0.5); // Cap head size
  const shaftLength = length - headLength;

  return (
    <group quaternion={rotation}>
      {/* Shaft: shifted up by half its length so base is at 0,0,0 */}
      <mesh position={[0, shaftLength / 2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, shaftLength, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Head: cone at the end of shaft */}
      <mesh position={[0, shaftLength + headLength / 2, 0]}>
        <coneGeometry args={[0.2, headLength, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};