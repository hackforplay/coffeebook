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
  lg?: boolean;
  onClick?: () => void;
  primary?: boolean;
}

export function Button({
  children,
  className,
  disabled,
  lg,
  onClick,
  primary
}: ButtonProps) {
  return (
    <button
      className={classNames(
        className,
        button.label,
        disabled && button.disabled,
        lg && button.large,
        primary && button.primary
      )}
      onClick={onClick}
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
  lg,
  name,
  onClick,
  primary,
  vertical
}: IconButtonProps) {
  return (
    <button
      className={classNames(
        className,
        children ? button.label : button.icon,
        disabled && button.disabled,
        lg && button.large,
        primary && button.primary,
        vertical && button.vertical
      )}
      onClick={onClick}
    >
      <Icon name={name} />
      {children ? <span>{children}</span> : null}
    </button>
  );
}
