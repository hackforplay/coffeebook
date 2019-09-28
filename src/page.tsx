import { CoffeeScript } from 'coffeescript';
import * as monaco from 'monaco-editor';
import * as React from 'react';
import markdown from 'remark-parse';
import 'requestidlecallback';
import unified from 'unified';
import { Node } from 'unist';

export interface PageProps {
  code: string;
}

export function Page({ code }: PageProps) {
  const node = unified()
    .use(markdown)
    .parse(code);

  console.log(node);

  if (node.type !== 'root' || !Array.isArray(node.children)) {
    return <div>Invalid markdown. See console</div>;
  }

  // Chunking each cells separated by the Thematic break. https://spec.commonmark.org/0.29/#thematic-breaks
  const cells = [[]] as Node[][];
  let cursor = 0;
  for (const block of node.children as Node[]) {
    if (block.type === 'thematicBreak') {
      if (cells[cursor].length === 0) continue; // Avoid empty block
      cursor++;
      cells[cursor] = [];
    } else {
      cells[cursor].push(block);
    }
  }

  return (
    <div style={{ width: '50vw' }}>
      {cells.map((blocks, i) => (
        <Cell key={i} blocks={blocks} />
      ))}
    </div>
  );
}

export interface CellProps {
  blocks: Node[];
}

export function Cell({ blocks }: CellProps) {
  const [first] = blocks;

  return (
    <div
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px ',
        padding: 8,
        margin: 8
      }}
    >
      {first && first.type === 'code' ? (
        <MonacoEditor value={first.value as string} />
      ) : (
        <>
          {blocks.map((node, i) => (
            <BlockOrContentNode key={i} node={node} />
          ))}
        </>
      )}
    </div>
  );
}

export interface BlockOrContentNodeProps {
  node: Node;
}

function BlockOrContentNode({ node }: BlockOrContentNodeProps) {
  return Array.isArray(node.children) ? (
    <>
      {node.children.map((child, i) => (
        <BlockOrContentNode key={i} node={child} />
      ))}
    </>
  ) : typeof node.value === 'string' ? (
    <p>{node.value}</p>
  ) : null;
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
    const disposer = editor.onDidChangeModelDecorations(() => {
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
    return () => disposer.dispose();
  }, []);

  const run = React.useCallback(() => {
    const iframe = document.querySelector('iframe');
    if (!iframe) return;
    const editor = editorRef.current;
    if (!editor) return;
    const coffee = editor.getValue();
    const js = CoffeeScript.compile(coffee);
    iframe.contentWindow && iframe.contentWindow.postMessage(js, '*');
  }, []);

  return (
    <>
      <div
        ref={rootRef}
        style={{ height: lineCountRef.current * lineHeight }}
      ></div>
      <button onClick={run}>Run</button>
    </>
  );
}
