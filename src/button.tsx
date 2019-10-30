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
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  lg?: boolean;
  onClick?: () => void;
  primary?: boolean;
  tooltip?: string;
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
  tooltip,
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
        tooltip && button.tooltipWrapper,
        vertical && button.vertical
      )}
      onClick={onClick}
    >
      {name ? <Icon name={name} /> : null}
      {typeof children === 'object' ? children : <span>{children}</span>}
      {tooltip ? <div className={button.tooltip}>{tooltip}</div> : null}
    </button>
  );
}
