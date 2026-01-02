"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export const ModuleInfoOverlay = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         {/* Trigger Button */}
         <button
            onClick={() => setIsOpen(true)}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-neutral-900/80 backdrop-blur text-white px-3 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 shadow-xl group transition-all"
         >
            <Info size={18} className="text-emerald-400 group-hover:text-emerald-300" />
            <span className="text-xs font-bold uppercase tracking-wider">Module Info</span>
         </button>

         {/* Modal Overlay */}
         {isOpen && (
            <div className="absolute inset-0 z-[200] flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm">
               <div className="bg-neutral-900 border border-emerald-500/30 w-full max-w-2xl max-h-full overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col">

                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/50 sticky top-0 z-10 backdrop-blur">
                     <div>
                        <h2 className="text-xl font-bold text-white mb-1">Linear Algebra: 3D Transformations</h2>
                        <p className="text-sm text-neutral-400">Interactive Visualization Primer</p>
                     </div>
                     <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 hover:text-white"
                     >
                        <X size={24} />
                     </button>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-8 text-neutral-300 leading-relaxed">

                     {/* Section 1 */}
                     <section>
                        <h3 className="text-emerald-400 font-mono font-bold uppercase tracking-wider text-sm mb-3">
                           What is this?
                        </h3>
                        <p>
                           This module visualizes how matrices act as "functions" that transform space.
                        </p>
                     </section>

                     {/* Section 2 */}
                     <section>
                        <h3 className="text-emerald-400 font-mono font-bold uppercase tracking-wider text-sm mb-4">
                           Core Concepts
                        </h3>
                        <ul className="space-y-4">
                           <li className="flex gap-4">
                              <div className="w-1 h-full min-h-[1.5em] bg-blue-500 rounded-full mt-1" />
                              <div>
                                 <strong className="text-white block mb-1">Vector (<InlineMath math="\vec{v}" />)</strong>
                                 An object with magnitude and direction, represented here by the green arrow originating from <InlineMath math="(0,0,0)" />.
                              </div>
                           </li>
                           <li className="flex gap-4">
                              <div className="w-1 h-full min-h-[1.5em] bg-purple-500 rounded-full mt-1" />
                              <div>
                                 <strong className="text-white block mb-1">Matrix (<InlineMath math="A" />)</strong>
                                 A <InlineMath math="3 \times 3" /> grid of numbers acting as the transformation recipe.
                              </div>
                           </li>
                           <li className="flex gap-4">
                              <div className="w-1 h-full min-h-[1.5em] bg-emerald-500 rounded-full mt-1" />
                              <div>
                                 <strong className="text-white block mb-1">Linear Transformation (<InlineMath math="A\vec{v}" />)</strong>
                                 The process of mapping the input vector to a new position. Geometrically, it stretches, rotates, or shears space while keeping grid lines parallel and the origin fixed.
                              </div>
                           </li>
                        </ul>
                     </section>

                     {/* Section 3 */}
                     <section>
                        <h3 className="text-emerald-400 font-mono font-bold uppercase tracking-wider text-sm mb-3">
                           How to use
                        </h3>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-400">
                           <li>Define your input vector on the right panel.</li>
                           <li>Define a transformation matrix.</li>
                           <li>Click "Transform" to see the resulting vector (<InlineMath math="\vec{v}'" />) and the step-by-step calculations.</li>
                        </ol>
                     </section>

                  </div>
               </div>
            </div>
         )}
      </>
   );
};
