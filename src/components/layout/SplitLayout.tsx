import { ReactNode } from "react";

interface SplitLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
}

export const SplitLayout = ({ leftPanel, rightPanel }: SplitLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-row">
      <div className="w-1/2 h-screen border-r border-gray-700 relative">
        {leftPanel}
      </div>
      <div className="w-1/2 h-screen bg-neutral-900 text-white p-6 overflow-y-auto">
        {rightPanel}
      </div>
    </main>
  );
};