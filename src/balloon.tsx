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
  const ref = React.useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = React.useState(delay ? true : false);
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    if (delay) {
      window.setTimeout(() => {
        setHidden(false);
      }, delay);
    }
    const handler = () => {
      setClicked(true);
    };
    const parent = ref.current && ref.current.parentElement;
    if (parent) {
      parent.addEventListener('click', handler, { passive: true });
    }
    return () => {
      if (parent) {
        parent.removeEventListener('click', handler);
      }
    };
  }, []);

  if (clicked) return null;

  return (
    <div
      ref={ref}
      className={classNames(className, balloon.root, hidden && balloon.hidden)}
      onClick={() => setClicked(true)}
    >
      {icon ? <Icon name={icon} /> : null}
      {children ? <div>{children}</div> : null}
    </div>
  );
}
