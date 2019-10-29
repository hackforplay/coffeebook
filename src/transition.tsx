import classNames from 'classnames';
import * as React from 'react';
import region from './css/region.scss';

export interface TransitionProps {
  children: React.ReactNode;
  className: string;
  exiting: string;
  in: boolean;
  timeout?: number;
}

enum Phase {
  DisplayNone,
  Out,
  In
}

/**
 * Inspired react-transition-group/transition
 * but it apply "display: none;" for performance reason
 * @param param
 */
export function Transition(props: TransitionProps) {
  const [phase, setPhase] = React.useState(props.in ? Phase.In : Phase.Out);
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    if (phase === Phase.DisplayNone && props.in) {
      setPhase(Phase.Out);
      return;
    }
    if (phase === Phase.Out && props.in) {
      window.clearTimeout(timerRef.current);
      // HACK: [ DisplayNone -> Out --(enough delay)--> In ] for waiting calucration
      window.setTimeout(() => {
        setPhase(Phase.In);
      }, 100);
      return;
    }
    if (phase === Phase.In && !props.in) {
      setPhase(Phase.Out);
      timerRef.current = window.setTimeout(() => {
        setPhase(Phase.DisplayNone);
      }, props.timeout || 150);
    }
  }, [phase, props.in]);

  return (
    <div
      className={classNames(
        props.className,
        phase === Phase.Out && props.exiting,
        phase === Phase.DisplayNone && region.displayNone
      )}
    >
      {props.children}
    </div>
  );
}
