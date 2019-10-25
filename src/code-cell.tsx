import * as monaco from 'monaco-editor';
import * as React from 'react';
import 'requestidlecallback';
import './completion';
import { beFlexible, getInitialHeight } from './monaco-flexible';
import { showLineAlter } from './monaco-line-alter';
import { showSuggestButtons } from './monaco-suggest-button';
import { OnUpdate } from './page';
import { Divider, Paper } from './paper';

export interface CodeCellProps {
  id: string;
  value: string;
  title?: string;
  onUpdate: OnUpdate;
  onGame: () => void;
}

export function CodeCell({
  id,
  value,
  title,
  onUpdate,
  onGame
}: CodeCellProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const [floating, setFloating] = React.useState(false);

  React.useEffect(() => {
    if (!rootRef.current) return;
    const editor = monaco.editor.create(rootRef.current, {
      value,
      language: 'coffeescript',
      minimap: { enabled: false },
      lineNumbersMinChars: 3,
      folding: false,
      scrollbar: {
        horizontal: 'hidden',
        vertical: 'hidden'
      },
      renderWhitespace: 'all'
    });
    const model = editor.getModel();
    model &&
      model.updateOptions({
        insertSpaces: true,
        tabSize: 2,
        trimAutoWhitespace: false
      });
    editorRef.current = editor;

    beFlexible(editor);
    showLineAlter(editor);
    showSuggestButtons(editor);

    editor.onDidFocusEditorText(() => {
      setFloating(true);
    });

    let previousCode = value;
    let blurTimerHandle = 0;
    editor.onDidBlurEditorText(() => {
      window.cancelIdleCallback(blurTimerHandle);
      blurTimerHandle = window.requestIdleCallback(
        () => {
          const e = document.activeElement;
          if (!e || e.tagName !== 'IFRAME') return;
          const coffee = editor.getValue();
          if (previousCode === coffee) return;
          onGame();
          previousCode = coffee;
        },
        { timeout: 2000 }
      );
      setFloating(false);
    });

    let replTimerId = 0;
    editor.onDidChangeModelContent(() => {
      window.clearTimeout(replTimerId);
      replTimerId = window.setTimeout(() => {
        onUpdate({ id, value: editor.getValue() });
      }, 250);
    });

    return () => {
      editor.dispose();
    };
  }, []);

  return (
    <Paper elevated={floating}>
      <span>{title || 'NO TITLE'}</span>
      <Divider />
      <div ref={rootRef} style={{ height: getInitialHeight(value) }}></div>
      <Divider />
      <span>Undo</span>
    </Paper>
  );
}
