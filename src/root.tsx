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
            <CodeView code={code} />
          </Transition>
        </div>
        <div className={region.output}>
          <iframe
            src="https://hackforplay-sandbox.firebaseapp.com/compatible.html"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
      <Footer setEditorMode={setEditorMode} />
    </div>
  );
}
