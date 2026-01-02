"use client";
import { useState } from 'react';
import { SplitLayout } from '@/components/layout/SplitLayout';
import SceneWrapper from "@/components/visualizers/SceneWrapper";
import WorldFrame from "@/components/visualizers/WorldFrame";
import VectorControls from "@/modules/linear-algebra/components/VectorControls";
import { MatrixInput } from '@/modules/linear-algebra/components/MatrixInput'; // Standardized import
import { VectorArrow } from '@/modules/linear-algebra/components/VectorArrow';
import { VectorLabel } from '@/modules/linear-algebra/components/VectorLabel';
import { MathResults } from '@/modules/linear-algebra/components/MathResults';
import { ModuleInfoOverlay } from '@/components/ui/ModuleInfoOverlay';

export default function Home() {
  const [currentVector, setCurrentVector] = useState([1, 1, 1]);
  const [mathData, setMathData] = useState<{
    steps: string[];
    symbolicForm: string;
    executionTime: number;
  } | null>(null);

  const handleTransform = async (matrix: number[][]) => {
    try {
      const response = await fetch('/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vector: currentVector,
          matrix: matrix
        })
      });

      if (!response.ok) throw new Error("Backend failed");

      const data = await response.json();
      setCurrentVector(data.result); // result is the number[] from backend
      setMathData({
        steps: data.steps,
        symbolicForm: data.symbolic_form,
        executionTime: data.execution_time_ms
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SplitLayout
      leftPanel={
        <>
          <SceneWrapper>
            <WorldFrame />
            <VectorArrow vector={currentVector} />
            <VectorLabel vector={currentVector} />
          </SceneWrapper>
          <ModuleInfoOverlay />
        </>
      }
      rightPanel={
        <div className="space-y-8 pb-20">
          <div>
            <h1 className="text-3xl font-black text-white italic tracking-tighter">FLUXGRID</h1>
            <p className="text-neutral-500 font-medium">v1.1 • Linear Algebra Module</p>
          </div>

          <VectorControls onCalculate={(vec: [number, number, number]) => setCurrentVector(vec)} />

          <MatrixInput onTransform={handleTransform} />

          {mathData && (
            <MathResults
              steps={mathData.steps}
              symbolicForm={mathData.symbolicForm}
              executionTime={mathData.executionTime}
            />
          )}

          <div className="bg-black/40 p-4 rounded-lg border border-neutral-800">
            <h4 className="text-xs font-bold text-neutral-500 uppercase mb-2">Live Coordinates</h4>
            <p className="font-mono text-emerald-400">
              {`$\\vec{v} = [${currentVector[0].toFixed(2)}, ${currentVector[1].toFixed(2)}, ${currentVector[2].toFixed(2)}]$`}
            </p>
          </div>
        </div>
      }
    />
  );
}


