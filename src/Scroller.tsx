import * as React from 'react';

export interface ScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  ms: number;
}

export function Scroller({ ms, onScroll, ...props }: ScrollerProps) {
  const timeStampRef = React.useRef(0);

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!onScroll) return;
      if (e.timeStamp < timeStampRef.current + ms) return;
      timeStampRef.current = e.timeStamp;
      onScroll(e);
    },
    [ms, onScroll]
  );

  return (
    <div {...props} onScroll={handleScroll}>
      {props.children}
    </div>
  );
}
