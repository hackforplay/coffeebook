import classNames from 'classnames';
import * as React from 'react';
import flex from './css/flex.scss';
import region from './css/region.scss';
import { Editor } from './editor';
import { Footer } from './footer';
import { Header } from './header';
import font from './css/font.scss';

export interface RootProps {
  code: string;
}

export function Root({ code }: RootProps) {
  return (
    <div className={classNames(region.root, flex.vertical, font.main)}>
      <Header />
      <Editor code={code} />
      <Footer />
    </div>
  );
}
