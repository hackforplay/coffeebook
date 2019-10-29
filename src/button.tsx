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
  accent?: boolean;
  children?: string;
  className?: string;
  disabled?: boolean;
  lg?: boolean;
  onClick?: () => void;
  primary?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <IconButton name="" {...props}>
      {props.children}
    </IconButton>
  );
}

export interface IconButtonProps extends IconProps, ButtonProps {
  vertical?: boolean;
}

export function IconButton({
  accent,
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
        accent && button.accent,
        vertical && button.vertical
      )}
      onClick={onClick}
    >
      {name ? <Icon name={name} /> : null}
      {children ? <span>{children}</span> : null}
    </button>
  );
}
