import classNames from 'classnames';
import * as React from 'react';
import 'requestidlecallback';
import flex from './css/flex.scss';
import region from './css/region.scss';
import { Floors } from './floors';
import { Pane } from './pane';

export interface EditorProps {
  code: string;
}

export function Editor({ code }: EditorProps) {
  return (
    <div className={classNames(region.outer, flex.horizontal, flex.stretch)}>
      <div className={region.floor}>
        <Floors />
      </div>
      <div className={classNames(region.inner, flex.horizontal, flex.stretch)}>
        <div className={region.editor}>
          <Pane code={code} />
        </div>
        <div className={region.output}>
          <iframe
            src="https://hackforplay-sandbox.firebaseapp.com/compatible.html"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
