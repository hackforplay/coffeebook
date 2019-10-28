import classNames from 'classnames';
import * as React from 'react';
import button from './css/button.scss';

export interface IconProps {
  name: string;
  className?: string;
}

export interface IconButtonProps extends IconProps {
  children?: string;
  disabled?: boolean;
  primary?: boolean;
  primaryOnHover?: boolean;
  vertical?: boolean;
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
  name,
  primary,
  primaryOnHover,
  vertical
}: IconButtonProps) {
  return (
    <button
      className={classNames(
        className,
        button.icon,
        disabled && button.disabled,
        primary && button.primary,
        primaryOnHover && button.primaryOnHover,
        vertical && button.vertical
      )}
    >
      <Icon name={name} />
      {children ? <span>{children}</span> : null}
    </button>
  );
}
