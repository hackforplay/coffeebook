import classNames from 'classnames';
import * as React from 'react';
import { CodeView } from './code-view';
import flex from './css/flex.scss';
import font from './css/font.scss';
import region from './css/region.scss';
import { FloorView } from './floor-view';
import { Footer } from './footer';
import { Header } from './header';
import { MapView } from './map-view';
import { Transition } from './transition';

export enum EditorMode {
  Map,
  Code
}

export interface RootProps {
  code: string;
}

export function Root({ code }: RootProps) {
  const [editorMode, setEditorMode] = React.useState<EditorMode>(
    EditorMode.Map
  );
  const [floor, setFloor] = React.useState(1);
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

  const [isInstalled, setIsInstalled] = React.useState(true)
  const openNewAsset = React.useCallback(() => {
    setIsInstalled(false)
    setEditorMode(EditorMode.Code)
  }, [])

  return (
    <div className={classNames(region.root, flex.vertical, font.main)}>
      <Header />
      <div className={classNames(region.outer, flex.horizontal, flex.stretch)}>
        <div className={region.floor}>
          <FloorView
            selected={floor}
            setEditorMode={setEditorMode}
            setSelected={setFloor}
          />
        </div>
        <div className={classNames(region.inner)}>
          <Transition
            in={editorMode === EditorMode.Map}
            className={region.mapView}
            exiting={region.exiting}
          >
            <MapView selected={floor} setEditorMode={setEditorMode} />
          </Transition>
          <Transition
            in={editorMode === EditorMode.Code}
            className={region.editorView}
            exiting={region.exiting}
          >
            <CodeView code={code} isInstalled={isInstalled} setIsInstalled={setIsInstalled} />
            <div className={region.outputCover} onClick={focusGame}></div>
          </Transition>
        </div>
        <div
          className={classNames(region.output, bringFront && region.bringFront)}
        >
          <iframe
            src="https://hackforplay-sandbox.firebaseapp.com/compatible.html"
            frameBorder="0"
            ref={iframeRef}
            onBlur={unfocusGame}
          ></iframe>
        </div>
      </div>
      <Footer onItemClick={openNewAsset} />
    </div>
  );
}
