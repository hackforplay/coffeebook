import * as React from 'react';

export interface PaperProps {
  floating: boolean;
  children: React.ReactNode;
}

export function Paper({ floating, children }: PaperProps) {
  return (
    <div
      style={{
        boxShadow: floating
          ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px '
          : undefined,
        padding: 8,
        margin: 8,
        borderRadius: 2
      }}
    >
      {children}
    </div>
  );
}
