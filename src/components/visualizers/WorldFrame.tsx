"use client";

import { Grid } from "@react-three/drei";
import { FC } from "react";

const WorldFrame: FC = () => {
  return (
    <group>
      {/* Infinite Grid on XZ plane */}
      <Grid
        position={[0, -0.01, 0]}
        args={[100, 100]} // Size of the grid
        sectionSize={2} // Size of the major grid lines
        cellSize={1} // Size of the minor grid lines
        sectionColor="#a0aec0" // Color of major lines
        cellColor="#4a5568" // Color of minor lines
        fadeDistance={50} // Distance at which the grid fades out
        fadeStrength={1.5}
        infiniteGrid
      />

      {/* 3D Axis Helper: X (Red), Y (Green), Z (Blue) */}
      <axesHelper args={[5]} />
    </group>
  );
};

export default WorldFrame;
