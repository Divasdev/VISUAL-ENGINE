"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface InfoTooltipProps {
   content: React.ReactNode | string;
}

export const InfoTooltip = ({ content }: InfoTooltipProps) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div
         className="relative inline-block ml-2 align-middle group"
         onMouseEnter={() => setIsOpen(true)}
         onMouseLeave={() => setIsOpen(false)}
         onClick={() => setIsOpen(!isOpen)} // Mobile support
      >
         <Info
            size={16}
            className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
         />

         {/* Tooltip */}
         <div
            className={`
          absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3
          bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl
          text-xs text-neutral-300 pointer-events-none
          transition-all duration-300 ease-out origin-bottom
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}
        `}
         >
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/90" />

            {typeof content === 'string' ? (
               // Basic heuristic: if it contains $, try to render with latex, else string
               content.includes('$') ? (
                  <InlineMath math={content.replace(/\$/g, '')} />
               ) : (
                  content
               )
            ) : (
               content
            )}
         </div>
      </div>
   );
};
