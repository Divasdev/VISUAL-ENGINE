"use client";
import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import SceneWrapper from "@/components/visualizers/SceneWrapper";
import WorldFrame from "@/components/visualizers/WorldFrame";
import VectorControls from "@/modules/linear-algebra/components/VectorControls";
import { VectorArrow } from '@/modules/linear-algebra/components/VectorArrow';

export default function Home() {
  const [currentVector, setCurrentVector] = useState([1, 1, 1]);

  return (
    <SplitLayout
      leftPanel={
        <SceneWrapper>
          <WorldFrame />
          <VectorArrow vector={currentVector} />
        </SceneWrapper>
      }
      rightPanel={
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-black text-white italic tracking-tighter">FLUXGRID</h1>
            <p className="text-neutral-500 font-medium">v1.0 • Linear Algebra Module</p>
          </div>

          <VectorControls onCalculate={(vec: [number, number, number]) => setCurrentVector(vec)} />

          <div className="bg-black/40 p-4 rounded-lg border border-neutral-800">
            <h4 className="text-xs font-bold text-neutral-500 uppercase mb-2">Live Coordinates</h4>
            <p className="font-mono text-emerald-400">
              {`$\\vec{v} = [${currentVector[0]}, ${currentVector[1]}, ${currentVector[2]}]$`}
            </p>
          </div>
        </div>
      }
    />
  );
}
