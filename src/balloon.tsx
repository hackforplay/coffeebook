import classNames from 'classnames';
import * as React from 'react';
import { Icon } from './button';
import balloon from './css/balloon.scss';

export interface BalloonProps {
  children?: string;
  className?: string;
  delay?: number;
  icon?: string;
}

export function Balloon({ children, className, delay, icon }: BalloonProps) {
  const [hidden, setHidden] = React.useState(delay ? true : false);
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    if (delay) {
      window.setTimeout(() => {
        setHidden(false);
      }, delay);
    }
  }, []);

  if (clicked) return null;

  return (
    <div
      className={classNames(className, balloon.root, hidden && balloon.hidden)}
      onClick={() => setClicked(true)}
    >
      {icon ? <Icon name={icon} /> : null}
      {children ? <div>{children}</div> : null}
    </div>
  );
}
