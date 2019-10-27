import classNames from 'classnames';
import * as React from 'react';
import flex from './css/flex.scss';
import region from './css/region.scss';
import { Editor } from './editor';
import { Header } from './header';

export interface RootProps {
  code: string;
}

export function Root({ code }: RootProps) {
  return (
    <div className={classNames(region.root, flex.vertical)}>
      <Header />
      <Editor code={code} />
    </div>
  );
}
