import * as React from 'react';
import { Node } from 'unist';
import { htmlify } from './cellify';
import { OnUpdate } from './page';

export interface TextCellProps {
  id: string;
  nodes: Node[];
  onUpdate: OnUpdate;
}

export function TextCell({ nodes, onUpdate }: TextCellProps) {
  const [html, setHtml] = React.useState(() => htmlify(nodes));

  return <div dangerouslySetInnerHTML={html}></div>;
}
