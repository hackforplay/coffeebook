import * as React from 'react';
import 'requestidlecallback';
import editor from './css/editor.css';
import { Page } from './page';

export interface EditorProps {
  code: string;
}

export function Editor({ code }: EditorProps) {
  return (
    <div className={editor.container}>
      <Page className={editor.code} code={code} />
      <div className={editor.game}>
        <iframe
          className={editor.iframe}
          src="https://hackforplay-sandbox.firebaseapp.com/compatible.html"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
