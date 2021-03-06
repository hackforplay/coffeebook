import * as monaco from 'monaco-editor';
import * as React from 'react';
import { Node } from 'unist';
import { Card } from './Card';
import { htmlify, markdownify, md2html } from './cellify';
import { OnUpdate } from './CodeView';
import element from './styles/element.scss';
import { beFlexible, getInitialHeight } from './monaco-flexible';

export interface TextCellProps {
  id: string;
  nodes: Node[];
  onUpdate: OnUpdate;
}

export function TextCell({ id, nodes, onUpdate }: TextCellProps) {
  const [html, setHtml] = React.useState(() => htmlify(nodes));
  const [md, setMd] = React.useState(() => markdownify(nodes));

  const [editable, setEditable] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!rootRef.current || !editable) return;
    const editor = monaco.editor.create(rootRef.current, {
      language: 'markdown',
      value: md
    });

    beFlexible(editor);

    editor.onDidBlurEditorText(() => {
      const value = editor.getValue();
      setMd(value);
      onUpdate({ id, value }); // TODO: id is changable
      setHtml(md2html(value));
      setEditable(false);
    });

    editor.focus();

    return () => {
      editor.dispose();
    };
  }, [editable]);

  return (
    <Card elevated={editable} className={element.textCell}>
      <div
        dangerouslySetInnerHTML={editable ? undefined : html}
        onClick={() => setEditable(true)}
      ></div>
      <div
        ref={rootRef}
        style={{ height: editable ? getInitialHeight(md) : 0 }}
      ></div>
    </Card>
  );
}
