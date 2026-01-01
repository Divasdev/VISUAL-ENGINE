"use client";

import { useState } from "react";

interface VectorControlsProps {
   onCalculate?: (vector: [number, number, number]) => void;
}

export default function VectorControls({ onCalculate }: VectorControlsProps) {
   const [vector, setVector] = useState<[number, number, number]>([1, 0, 0]);
   const [matrix, setMatrix] = useState<
      [[number, number, number], [number, number, number], [number, number, number]]
   >([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
   ]);
   const [result, setResult] = useState<number[] | null>(null);
   const [steps, setSteps] = useState<string[]>([]);
   const [symbolicForm, setSymbolicForm] = useState<string>("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleVectorChange = (index: number, value: string) => {
      const newVector = [...vector] as [number, number, number];
      newVector[index] = parseFloat(value) || 0;
      setVector(newVector);
      if (onCalculate) onCalculate(newVector);
   };

   const handleMatrixChange = (row: number, col: number, value: string) => {
      const newMatrix = [...matrix] as [
         [number, number, number],
         [number, number, number],
         [number, number, number]
      ];
      newMatrix[row][col] = parseFloat(value) || 0;
      setMatrix(newMatrix);
   };

   const handleTransform = async () => {
      setLoading(true);
      setError(null);
      try {
         const response = await fetch("http://127.0.0.1:8000/api/transform", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ vector, matrix }),
         });

         if (!response.ok) {
            throw new Error("Failed to fetch transformation data");
         }

         const data = await response.json();
         setResult(data.result);
         setSteps(data.steps);
         setSymbolicForm(data.symbolic_form);
      } catch (err) {
         console.error(err);
         setError("Error connecting to backend (ensure API is running).");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex flex-col gap-6 text-sm">
         {/* Vector Input */}
         <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
            <h3 className="text-gray-400 mb-2 font-mono uppercase tracking-wider text-xs">
               Input Vector (v)
            </h3>
            <div className="flex gap-2">
               {vector.map((val, i) => (
                  <input
                     key={`v-${i}`}
                     type="number"
                     value={val}
                     onChange={(e) => handleVectorChange(i, e.target.value)}
                     className="w-full bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                  />
               ))}
            </div>
         </div>

         {/* Matrix Input */}
         <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
            <h3 className="text-gray-400 mb-2 font-mono uppercase tracking-wider text-xs">
               Transformation Matrix (M)
            </h3>
            <div className="grid grid-cols-3 gap-2">
               {matrix.map((row, rIndex) =>
                  row.map((val, cIndex) => (
                     <input
                        key={`m-${rIndex}-${cIndex}`}
                        type="number"
                        value={val}
                        onChange={(e) => handleMatrixChange(rIndex, cIndex, e.target.value)}
                        className="bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500"
                     />
                  ))
               )}
            </div>
         </div>

         {/* Action Button */}
         <button
            onClick={handleTransform}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
         >
            {loading ? "Calculating..." : "Transform Vector"}
         </button>

         {/* Results */}
         {error && <div className="text-red-400 text-sm">{error}</div>}

         {result && (
            <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 space-y-4">
               <div>
                  <h3 className="text-green-400 mb-1 font-mono uppercase tracking-wider text-xs">
                     Result (v&apos;)
                  </h3>
                  <div className="font-mono text-lg text-white">
                     [{result.map((n) => n.toFixed(2)).join(", ")}]
                  </div>
               </div>

               {symbolicForm && (
                  <div>
                     <h3 className="text-purple-400 mb-1 font-mono uppercase tracking-wider text-xs">
                        Symbolic Form
                     </h3>
                     <pre className="font-mono text-xs text-gray-300 whitespace-pre-wrap bg-neutral-900 p-2 rounded">
                        {symbolicForm}
                     </pre>
                  </div>
               )}

               <div>
                  <h3 className="text-yellow-400 mb-1 font-mono uppercase tracking-wider text-xs">
                     Calculation Steps
                  </h3>
                  <div className="space-y-1">
                     {steps.map((step, i) => (
                        <div key={i} className="font-mono text-xs text-gray-300 bg-neutral-900 p-2 rounded">
                           {step}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
