import classNames from 'classnames';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { SS } from './store';
import region from './styles/region.scss';

export interface GameViewProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

export function GameView({ iframeRef }: GameViewProps) {
  const bringGameFront = useSelector((state: SS) => state.mode.bringGameFront);

  return (
    <div
      className={classNames(region.output, bringGameFront && region.bringFront)}
    >
      <iframe
        src="https://hackforplay-sandbox.firebaseapp.com/compatible.html"
        frameBorder="0"
        ref={iframeRef}
      ></iframe>
    </div>
  );
}
