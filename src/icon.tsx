import * as React from 'react';
import icons from './css/icons.scss';

export interface IconProps {
  name: string;
}

export interface IconButtonProps extends IconProps {
  children: string;
}

/**
 * Material Icon Component
 */
export function Icon({ name }: IconProps) {
  return <i className="material-icons">{name}</i>;
}

export function IconButton({ name, children }: IconButtonProps) {
  return (
    <button className={icons.button}>
      <Icon name={name} />
      <span>{children}</span>
    </button>
  );
}
