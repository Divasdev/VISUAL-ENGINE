"use client";
import React, { useState } from 'react';
import { InfoTooltip } from "@/components/ui/InfoTooltip";

export const MatrixInput = ({ onTransform }: { onTransform: (matrix: number[][]) => void }) => {
  // Default to Identity Matrix
  const [matrix, setMatrix] = useState([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]);

  const handleChange = (row: number, col: number, val: string) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(val) || 0;
    setMatrix(newMatrix);
  };

  return (
    <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h3 className="text-purple-400 font-mono uppercase tracking-wider text-xs">
            Transformation Matrix
          </h3>
          <InfoTooltip content="This $3 \times 3$ matrix acts as a Linear Operator. It scales, rotates, or shears the coordinate system." />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 bg-neutral-900 p-3 rounded-lg border border-neutral-800">
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={val}
              onChange={(e) => handleChange(i, j, e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-center text-white focus:border-blue-500 outline-none transition-all"
            />
          ))
        )}
      </div>
      <button
        onClick={() => onTransform(matrix)}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-bold transition-all"
      >
        Apply Transformation
      </button>
    </div>
  );
};