import * as React from 'react';
import cards from './css/cards.scss';

export interface PaperProps {
  elevated: boolean;
  children: React.ReactNode;
}

export function Paper({ elevated, children }: PaperProps) {
  return (
    <div
      className={elevated ? cards.elevated : cards.outlined}
      style={{ margin: 8 }}
    >
      {children}
    </div>
  );
}
