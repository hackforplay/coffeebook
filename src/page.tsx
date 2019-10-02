import { CoffeeScript } from 'coffeescript';
import * as monaco from 'monaco-editor';
import * as React from 'react';
import 'requestidlecallback';
import { build } from './build';
import { blockify, cellify } from './cellify';
import './completion';
import { beFlexible, lineHeight } from './monaco-flexible';
import { Sandbox } from './sandbox';
import { TextCell } from './text-cell';

export interface PageProps {
  code: string;
}

export type OnUpdate = (payload: { id: string; value: string }) => void;

let sandbox = new Sandbox();
export function Page({ code }: PageProps) {
  const cellsRef = React.useRef(cellify(code)); // Notice: mutable

  const onUpdate = React.useCallback<OnUpdate>(({ id, value }) => {
    // Test && Save
    try {
      CoffeeScript.compile(value); // syntax check
    } catch (error) {
      return console.warn(error);
    }

    // Update cells
    const cells = cellsRef.current;
    const cell = cells.find(cell => cell.id === id);
    if (!cell) throw new Error(`Cell not found. cell=${id}`);
    if (cell.type === 'code') {
      cell.value = value;
    } else if (cell.type === 'text') {
      cell.value = value;
      cell.nodes = blockify(value);
    }
  }, []);

  const onGame = React.useCallback(() => {
    // Build && Run
    sandbox.update([
      {
        name: 'modules/プレイヤー.js',
        type: 'application/javascript',
        code: build(cellsRef.current)
      }
    ]);
    sandbox.run();
  }, []);

  React.useEffect(() => {
    onGame();
  }, []);

  return (
    <div style={{ width: '50vw' }}>
      {cellsRef.current.map(cell => (
        <div
          key={cell.id}
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px ',
            padding: 8,
            margin: 8,
            borderRadius: 2
          }}
        >
          {cell.type === 'code' ? (
            <MonacoEditor
              id={cell.id}
              value={cell.value}
              onUpdate={onUpdate}
              onGame={onGame}
            />
          ) : (
            <TextCell id={cell.id} nodes={cell.nodes} onUpdate={onUpdate} />
          )}
        </div>
      ))}
    </div>
  );
}

export interface MonacoEditorProps {
  id: string;
  value: string;
  onUpdate: OnUpdate;
  onGame: () => void;
}

function MonacoEditor({ id, value, onUpdate, onGame }: MonacoEditorProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const lineCount = value.split('\n').length;
  const height = lineHeight * lineCount;
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();

  React.useEffect(() => {
    if (!rootRef.current) return;
    const editor = monaco.editor.create(rootRef.current, {
      value,
      language: 'coffeescript',
      minimap: { enabled: false },
      lineNumbersMinChars: 3,
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

    let previousCode = value;
    let blurTimerHandle = 0;
    const blurTask = editor.onDidBlurEditorText(() => {
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
    });

    let replTimerId = 0;
    const inputTask = editor.onDidChangeModelContent(() => {
      window.clearTimeout(replTimerId);
      replTimerId = window.setTimeout(() => {
        onUpdate({ id, value: editor.getValue() });
      }, 250);
    });

    return () => {
      blurTask.dispose();
      inputTask.dispose();
    };
  }, []);

  return <div ref={rootRef} style={{ height }}></div>;
}
