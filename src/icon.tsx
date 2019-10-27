import classNames from 'classnames';
import * as React from 'react';
import icons from './css/icons.scss';

export interface IconProps {
  name: string;
  className?: string;
}

export interface IconButtonProps extends IconProps {
  children?: string;
  disabled?: boolean;
}

/**
 * Material Icon Component
 */
export function Icon({ className, name }: IconProps) {
  return <i className={classNames(className, 'material-icons')}>{name}</i>;
}

export function IconButton({
  children,
  className,
  disabled,
  name
}: IconButtonProps) {
  return (
    <button
      className={classNames(
        className,
        icons.button,
        disabled && icons.disabled
      )}
    >
      <Icon name={name} />
      {children ? <span>{children}</span> : null}
    </button>
  );
}
