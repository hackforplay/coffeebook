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
