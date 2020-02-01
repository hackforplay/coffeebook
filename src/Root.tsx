import classNames from 'classnames';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { CodeView } from './CodeView';
import { FloorView } from './FloorView';
import { Footer } from './Footer';
import { GameView } from './GameView';
import { Header } from './Header';
import { MapView } from './MapView';
import { EditorMode, SS } from './store';
import { StoreView } from './StoreView';
import flex from './styles/flex.scss';
import font from './styles/font.scss';
import region from './styles/region.scss';
import { Transition } from './Transition';

export interface RootProps {
  code: string;
}

export function Root({ code }: RootProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const focusGame = React.useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  }, []);

  const editorMode = useSelector((state: SS) => state.mode.editorMode);

  return (
    <div className={classNames(region.root, flex.vertical, font.main)}>
      <Header />
      <div className={classNames(region.outer, flex.horizontal, flex.stretch)}>
        <div className={region.floor}>
          <FloorView />
        </div>
        <div className={classNames(region.inner)}>
          <Transition
            in={editorMode === EditorMode.Map}
            className={region.mapView}
            exiting={region.exiting}
          >
            <MapView />
          </Transition>
          <Transition
            in={editorMode === EditorMode.Store}
            className={region.storeView}
            exiting={
              editorMode === EditorMode.Map
                ? region.exitingRight
                : region.exitingLeft
            }
          >
            <StoreView />
          </Transition>
          <Transition
            in={editorMode === EditorMode.Code}
            className={region.codeView}
            exiting={region.exiting}
          >
            <CodeView code={code} handleRun={focusGame} />
            <div className={region.outputCover} onClick={focusGame}></div>
          </Transition>
        </div>
        <GameView iframeRef={iframeRef} />
      </div>
      <Footer />
    </div>
  );
}
