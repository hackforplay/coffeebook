import classNames from 'classnames';
import * as React from 'react';
import button from './css/button.scss';

export interface IconProps {
  name: string;
  className?: string;
}

/**
 * Material Icon Component
 */
export function Icon({ className, name }: IconProps) {
  return <i className={classNames(className, 'material-icons')}>{name}</i>;
}

export interface ButtonProps {
  children?: string;
  className?: string;
  disabled?: boolean;
  primary?: boolean;
}

export function Button({
  children,
  className,
  disabled,
  primary
}: ButtonProps) {
  return (
    <button
      className={classNames(
        className,
        button.label,
        disabled && button.disabled,
        primary && button.primary
      )}
    >
      {children ? <span>{children}</span> : null}
    </button>
  );
}

export interface IconButtonProps extends IconProps, ButtonProps {
  vertical?: boolean;
}

export function IconButton({
  children,
  className,
  disabled,
  name,
  primary,
  vertical
}: IconButtonProps) {
  return (
    <button
      className={classNames(
        className,
        children ? button.label : button.icon,
        disabled && button.disabled,
        primary && button.primary,
        vertical && button.vertical
      )}
    >
      <Icon name={name} />
      {children ? <span>{children}</span> : null}
    </button>
  );
}
