import { CoffeeScript } from 'coffeescript';
import * as monaco from 'monaco-editor';
import * as React from 'react';
import 'requestidlecallback';
import { Node } from 'unist';
import { cellify } from './cellify';
import { Sandbox } from './sandbox';

export interface PageProps {
  code: string;
}

export function Page({ code }: PageProps) {
  const cells = cellify(code);

  return (
    <div style={{ width: '50vw' }}>
      {cells.map(cell => (
        <div
          key={cell.id}
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px ',
            padding: 8,
            margin: 8
          }}
        >
          {cell.type === 'code' ? (
            <MonacoEditor value={cell.value} />
          ) : (
            <BlockOrContentNode nodes={cell.nodes} />
          )}
        </div>
      ))}
    </div>
  );
}

export interface BlockOrContentNodeProps {
  nodes: Node[];
}

function BlockOrContentNode({ nodes }: BlockOrContentNodeProps) {
  return (
    <>
      {nodes.map((node, i) =>
        Array.isArray(node.children) ? (
          <BlockOrContentNode key={i} nodes={node.children} />
        ) : typeof node.value === 'string' ? (
          <p key={i}>{node.value}</p>
        ) : null
      )}
    </>
  );
}

export interface MonacoEditorProps {
  value: string;
}

const lineHeight = 18;

function MonacoEditor({ value }: MonacoEditorProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const lineCountRef = React.useRef(0);
  lineCountRef.current = value.split('\n').length;
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();

  React.useEffect(() => {
    if (!rootRef.current) return;
    const editor = monaco.editor.create(rootRef.current, {
      value,
      language: 'coffeescript',
      scrollBeyondLastLine: false,
      scrollbar: {
        vertical: 'hidden',
        horizontal: 'hidden'
      },
      lineHeight
    });
    editorRef.current = editor;
    let resizeTimerId = 0;
    const resizeTask = editor.onDidChangeModelDecorations(() => {
      window.cancelIdleCallback(resizeTimerId);
      resizeTimerId = window.requestIdleCallback(
        () => {
          const root = rootRef.current;
          if (!root) return;
          const viewLines = root.querySelector('.view-lines');
          if (!viewLines) return;
          let model = editor.getModel();
          if (!model) return;
          let lineCount = model.getLineCount();
          const height =
            lineCountRef.current <= lineCount
              ? viewLines.getBoundingClientRect().height // 行が同じか増えたとき => view-line 全体の高さの総和が viewLines の高さよりも上回り, viewLines が伸びる => 伸びた後の高さが必要な高さ
              : lineCount * lineHeight; // 行が減ったとき => viewLines の高さは root の高さに依存する => 子要素の数と lineHeight から推測するしかない
          lineCountRef.current = lineCount;
          root.style.height = `${height}px`; // -> automaticLayout
          editor.layout();
        },
        { timeout: 2000 }
      );
    });
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
          save(coffee);
          sandbox.run();
          previousCode = coffee;
        },
        { timeout: 2000 }
      );
    });
    save(value);
    sandbox.run();

    let replTimerId = 0;
    const inputTask = editor.onDidChangeModelContent(() => {
      window.clearTimeout(replTimerId);
      replTimerId = window.setTimeout(() => {
        try {
          const coffee = editor.getValue();
          save(coffee);
        } catch (error) {
          console.warn(error);
        }
      }, 250);
    });

    return () => {
      resizeTask.dispose();
      blurTask.dispose();
      inputTask.dispose();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={{ height: lineCountRef.current * lineHeight }}
    ></div>
  );
}

let sandbox = new Sandbox();

function save(coffee: string) {
  try {
    sandbox.update([
      {
        name: 'modules/プレイヤー.js',
        type: 'application/javascript',
        code: CoffeeScript.compile(coffee)
      }
    ]);
  } catch (error) {
    console.error(error);
  }
}
