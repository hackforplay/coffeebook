import classNames from 'classnames';
import * as React from 'react';
import { CodeView } from './code-view';
import flex from './css/flex.scss';
import font from './css/font.scss';
import region from './css/region.scss';
import { FloorView } from './floor-view';
import { Footer } from './footer';
import { Header } from './header';

export interface RootProps {
  code: string;
}

export function Root({ code }: RootProps) {
  return (
    <div className={classNames(region.root, flex.vertical, font.main)}>
      <Header />
      <div className={classNames(region.outer, flex.horizontal, flex.stretch)}>
        <div className={region.floor}>
          <FloorView />
        </div>
        <div
          className={classNames(region.inner, flex.horizontal, flex.stretch)}
        >
          <div className={region.editor}>
            <CodeView code={code} />
          </div>
          <div className={region.output}>
            <iframe
              src="https://hackforplay-sandbox.firebaseapp.com/compatible.html"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
