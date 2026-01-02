"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft, GripVertical } from "lucide-react";

interface SplitLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export const SplitLayout = ({ leftPanel, rightPanel }: SplitLayoutProps) => {
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastWidth, setLastWidth] = useState(50); // Store width before collapse

  const containerRef = useRef<HTMLDivElement>(null);

  const startDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

    // Constraints: Min 20%, Max 80%
    if (newLeftWidth > 20 && newLeftWidth < 80) {
      setLeftWidth(newLeftWidth);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", stopDragging);
    } else {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDragging);
    }
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDragging);
    };
  }, [isDragging]);

  const toggleCollapse = () => {
    if (isCollapsed) {
      setLeftWidth(lastWidth);
    } else {
      setLastWidth(leftWidth);
      setLeftWidth(100); // effectively "collapse" right panel by making left 100%
    }
    setIsCollapsed(!isCollapsed);
  };

  return (
    <main
      ref={containerRef}
      className={`flex min-h-screen flex-row overflow-hidden ${isDragging ? 'cursor-col-resize select-none' : ''}`}
    >
      {/* Left Panel */}
      <div
        style={{ width: `${leftWidth}%` }}
        className="h-screen relative"
      >
        {leftPanel}
      </div>

      {/* Drag Handle */}
      {/* Only show handle if not collapsed (or show a small trigger to uncollapse?) 
          Actually, let's keep the handle visible but maybe positioned differently if 100%?
          Better approach: When collapsed (width 100%), show a floating button to restore.
      */}

      {!isCollapsed && (
        <div
          onMouseDown={startDragging}
          className="w-1 bg-neutral-800 hover:bg-blue-500 cursor-col-resize transition-colors z-50 flex flex-col justify-center items-center group shadow-2xl relative"
        >
          {/* Visible Handle Graphic */}
          <div className="h-8 w-1 bg-neutral-600 rounded-full group-hover:bg-white" />

          {/* Collapse Button (Floating on the handle) */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleCollapse(); }}
            className="absolute top-1/2 -traslate-y-1/2 left-0 ml-2 bg-neutral-800 text-white p-1 rounded-full border border-neutral-700 hover:bg-neutral-700 shadow-xl z-50 transform translate-x-[-50%]"
            title="Collapse Panel"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Restore Button (When Collapsed) */}
      {isCollapsed && (
        <button
          onClick={toggleCollapse}
          className="absolute top-4 right-4 z-50 bg-neutral-900/80 backdrop-blur text-white px-3 py-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 shadow-xl flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
        >
          <ChevronLeft size={16} />
          Show Controls
        </button>
      )}

      {/* Right Panel */}
      <div
        style={{ width: `${100 - leftWidth}%` }}
        className={`
            h-screen bg-neutral-900 text-white overflow-y-auto
            ${isCollapsed ? 'hidden' : 'block'}
        `}
      >
        <div className="p-6">
          {rightPanel}
        </div>
      </div>
    </main>
  );
};