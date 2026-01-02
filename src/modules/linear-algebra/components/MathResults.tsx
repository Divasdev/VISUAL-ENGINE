"use client";

import { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface MathResultsProps {
   steps: string[];
   symbolicForm: string;
   executionTime: number; // in ms
}

export const MathResults = ({ steps, symbolicForm, executionTime }: MathResultsProps) => {
   const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

   const handleCopy = (text: string, index: number) => {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
   };

   return (
      <div className="relative mt-8 space-y-4">
         {/* Performance Badge - F1 Style */}
         <div className="absolute -top-10 right-0">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-neutral-700 px-3 py-1 rounded-full">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="font-mono text-xs text-green-400 font-bold">
                  {executionTime}ms
               </span>
            </div>
         </div>

         <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-xl space-y-6">
            {/* Symbolic Form Section */}
            <div>
               <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
                  Symbolic Transformation
               </h3>
               <div className="bg-black/40 p-4 rounded-lg border border-neutral-800 font-mono text-sm text-blue-300 overflow-x-auto">
                  <InlineMath math={symbolicForm} />
               </div>
            </div>

            {/* Steps Expansion */}
            <div>
               <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">
                  Step-by-Step Solution
               </h3>
               <div className="space-y-3">
                  {steps.map((step, index) => (
                     <div
                        key={index}
                        className="group relative bg-neutral-900/50 hover:bg-neutral-800/80 transition-colors border border-neutral-800 rounded-lg p-3 flex justify-between items-center"
                     >
                        <div className="text-gray-200 text-sm font-light overflow-x-auto pr-8">
                           {/* Try to parse step content for LaTeX if possible or just render text */}
                           <span className="mr-2 opacity-50 font-mono">{index + 1}.</span>
                           {step}
                        </div>

                        {/* Copy Button */}
                        <button
                           onClick={() => handleCopy(step, index)}
                           className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 text-xs bg-neutral-700 text-white px-2 py-1 rounded hover:bg-neutral-600"
                        >
                           {copiedIndex === index ? "Copied!" : "Copy LaTeX"}
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
