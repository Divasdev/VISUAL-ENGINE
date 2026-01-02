"use client";

import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

interface VectorLabelProps {
   vector: number[]; // [x, y, z]
}

export const VectorLabel = ({ vector }: VectorLabelProps) => {
   // We position the label slightly above the vector tip
   const position: [number, number, number] = [vector[0], vector[1] + 0.5, vector[2]];

   return (
      <Html position={position} center distanceFactor={10} zIndexRange={[100, 0]}>
         <div className="pointer-events-none select-none flex items-center gap-2">
            {/* Dot connector */}
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />

            {/* Label Pill */}
            <div className="bg-black/80 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full shadow-xl">
               <span className="font-mono text-xs text-emerald-400 font-bold whitespace-nowrap">
                  v: [{vector[0].toFixed(1)}, {vector[1].toFixed(1)}, {vector[2].toFixed(1)}]
               </span>
            </div>
         </div>
      </Html>
   );
};
