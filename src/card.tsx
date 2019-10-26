import * as React from 'react';
import cards from './css/cards.scss';

export interface PaperProps {
  elevated: boolean;
  children: React.ReactNode;
}

export function Card({ elevated, children }: PaperProps) {
  return (
    <div
      className={elevated ? cards.elevated : cards.outlined}
      style={{ margin: 8 }}
    >
      {children}
    </div>
  );
}

export function Divider() {
  return <div className={cards.divider}></div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className={cards.footer}>{children}</div>;
}
