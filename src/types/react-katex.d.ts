declare module 'react-katex' {
   import * as React from 'react';

   interface MathProps {
      math: string;
      block?: boolean;
      errorColor?: string;
      renderError?: (error: Error) => React.ReactNode;
      settings?: any;
      as?: string | React.ComponentType<any>;
      children?: React.ReactNode;
      className?: string;
   }

   export const InlineMath: React.FC<MathProps>;
   export const BlockMath: React.FC<MathProps>;
}
