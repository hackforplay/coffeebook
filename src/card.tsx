import classNames from 'classnames';
import * as React from 'react';
import cards from './css/cards.scss';

export interface PaperProps {
  elevated: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Card({ elevated, children, className }: PaperProps) {
  return (
    <div
      className={classNames(
        elevated ? cards.elevated : cards.outlined,
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardDivider() {
  return <div className={cards.divider}></div>;
}
