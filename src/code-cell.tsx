import classNames from 'classnames';
import * as monaco from 'monaco-editor';
import * as React from 'react';
import 'requestidlecallback';
import { IconButton } from './button';
import { Card, CardDivider } from './card';
import { OnUpdate } from './code-view';
import './completion';
import element from './css/element.scss';
import flex from './css/flex.scss';
import { showCutLine } from './monaco-cut-line';
import { beFlexible, getInitialHeight } from './monaco-flexible';
import { showLineAlter } from './monaco-line-alter';
import { showSuggestButtons } from './monaco-suggest-button';

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
  const [undoable, setUndoable] = React.useState(false);

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
    if (process.env.NODE_ENV !== 'production') {
      editor.updateOptions({
        contextmenu: false
      });
    }
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
    showCutLine(editor);

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

    editor.onDidChangeModelContent(() => {
      if (model) {
        setUndoable(model.getAlternativeVersionId() > 1);
      }
    });

    return () => {
      editor.dispose();
    };
  }, []);

  const undo = React.useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.trigger('', 'undo', {});
  }, []);

  return (
    <Card elevated={floating} className={element.codeCell}>
      <div className={classNames(flex.horizontal, element.codeCellHeader)}>
        <span>{title || 'NO TITLE'}</span>
        <div className={flex.blank}></div>
        <IconButton name="clear" tooltip="Remove this cell" />
      </div>
      <CardDivider />
      <div
        ref={rootRef}
        className={element.codeCellEditor}
        style={{ height: getInitialHeight(value) }}
      ></div>
      <CardDivider />
      <div className={classNames(flex.horizontal, element.codeCellFooter)}>
        <IconButton name="undo" disabled={!undoable} onClick={undo}>
          Undo
        </IconButton>
        <div className={flex.blank}></div>
        <IconButton name="note_add" primary tooltip="Create new cell" />
        <IconButton name="file_copy" primary tooltip="Copy this cell" />
        <IconButton name="arrow_upward" primary tooltip="Move up" />
        <IconButton name="arrow_downward" primary tooltip="Move down" />
      </div>
    </Card>
  );
}
