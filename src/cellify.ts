import markdown from 'remark-parse';
import 'requestidlecallback';
import unified from 'unified';
import { Node } from 'unist';
import stringify from 'remark-stringify';

export interface ICodeCell {
  id: string;
  type: 'code';
  /**
   * CoffeScript code
   */
  value: string;
  /**
   * e.g. "coffescript"
   */
  lang: string;
}
export interface ITextCell {
  id: string;
  type: 'text';
  /**
   * Markdown text
   */
  value: string;
  /**
   * Array of MDAST node
   */
  nodes: Node[];
}

export type ICell = ICodeCell | ITextCell;

/**
 * Parse markdown and chunk cells separated by the Thematic break. https://spec.commonmark.org/0.29/#thematic-breaks
 * If code block is top of the cell, it becomes the Code Cell, only 1 block including.
 * Others will merge. It become the Text Cell.
 * @param text Markdown text
 */
export function cellify(text: string) {
  const node = unified()
    .use(markdown)
    .parse(text);

  if (node.type !== 'root' || !Array.isArray(node.children)) {
    console.error(text);
    throw new Error('Invalid markdown. See console');
  }

  // Chunking each nodes
  return Array.from(chunk(node.children));
}

function* chunk(nodes: Node[]): Generator<ICell, number> {
  let chunkNum = 0;
  let textCellBuffer: Node[] = [];
  for (let index = 0; index < nodes.length; index++) {
    const current = nodes[index],
      next = nodes[index + 1];
    if (!current) break;

    if (current.type === 'code' && textCellBuffer.length === 0) {
      yield {
        id: '' + chunkNum++,
        type: 'code',
        value: current.value as string,
        lang: current.lang as string
      };
      continue;
    }

    if (current.type !== 'thematicBreak') {
      textCellBuffer.push(current);
    }

    if ((!next || next.type === 'thematicBreak') && textCellBuffer.length > 0) {
      yield {
        id: '' + chunkNum++,
        type: 'text',
        value: unified()
          .use(stringify)
          .stringify({
            type: 'root',
            children: textCellBuffer
          })
          .trimRight(),
        nodes: textCellBuffer
      };
      textCellBuffer = [];
    }
  }
  return chunkNum;
}
