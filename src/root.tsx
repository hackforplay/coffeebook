import * as React from 'react';
import { Editor } from './editor';
import { Header } from './header';

export interface RootProps {
  code: string;
}

export function Root({ code }: RootProps) {
  return (
    <div>
      <Header />
      <Editor code={code} />
    </div>
  );
}
