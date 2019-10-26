import classNames from 'classnames';
import * as React from 'react';
import icons from './css/icons.scss';

export interface IconProps {
  name: string;
}

export interface IconButtonProps extends IconProps {
  disabled?: boolean;
  children?: string;
}

/**
 * Material Icon Component
 */
export function Icon({ name }: IconProps) {
  return <i className="material-icons">{name}</i>;
}

export function IconButton({ name, disabled, children }: IconButtonProps) {
  return (
    <button className={classNames(icons.button, disabled && icons.disabled)}>
      <Icon name={name} />
      {children ? <span>{children}</span> : null}
    </button>
  );
}
