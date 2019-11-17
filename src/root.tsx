import classNames from 'classnames';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { CodeView } from './CodeView';
import flex from './css/flex.scss';
import font from './css/font.scss';
import region from './css/region.scss';
import { FloorView } from './FloorView';
import { Footer } from './Footer';
import { Header } from './Header';
import { MapView } from './MapView';
import { EditorMode, SS } from './store';
import { StoreView } from './StoreView';
import { Transition } from './Transition';

export interface RootProps {
  code: string;
}

export function Root({ code }: RootProps) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [bringFront, setBringFront] = React.useState(false);
  const focusGame = React.useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
    setBringFront(true);
  }, []);
  const unfocusGame = React.useCallback(() => {
    setBringFront(false);
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
            className={region.editorView}
            exiting={region.exiting}
          >
            <CodeView code={code} />
            <div className={region.outputCover} onClick={focusGame}></div>
          </Transition>
        </div>
        <div
          className={classNames(region.output, bringFront && region.bringFront)}
        >
          <iframe
            src='https://hackforplay-sandbox.firebaseapp.com/compatible.html'
            frameBorder='0'
            ref={iframeRef}
            onBlur={unfocusGame}
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}
