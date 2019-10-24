import * as React from 'react';
import cards from './css/cards.css';

export interface PaperProps {
  floating: boolean;
  children: React.ReactNode;
}

export function Paper({ floating, children }: PaperProps) {
  return (
    <div className={floating ? cards.card1 : cards.card0} style={{ margin: 8 }}>
      {children}
    </div>
  );
}
