"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, ReactNode } from "react";

interface SceneWrapperProps {
   children?: ReactNode;
}

export default function SceneWrapper({ children }: SceneWrapperProps) {
   return (
      <div className="h-full w-full bg-black relative">
         <Canvas
            camera={{ position: [10, 10, 10], fov: 50 }}
            className="h-full w-full"
         >
            {/* Dark background color for the scene */}
            <color attach="background" args={["#111"]} />

            <Suspense fallback={null}>
               {/* Standard Lighting */}
               <ambientLight intensity={0.5} />
               <pointLight position={[10, 10, 10]} intensity={1} />

               {/* Interactive Controls */}
               <OrbitControls makeDefault />

               {/* Render Children (WorldFrame, Modules, etc.) */}
               {children}
            </Suspense>
         </Canvas>

         {/* Optional: Loading Interface overlay can go here if needed outside Canvas */}
      </div>
   );
}
