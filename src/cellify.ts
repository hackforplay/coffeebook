import markdown from 'remark-parse';
import stringify from 'remark-stringify';
import 'requestidlecallback';
import unified from 'unified';
import { Node } from 'unist';

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
  const children = blockify(text);

  // Chunking each nodes
  return Array.from(chunk(children));
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

/**
 * Parse text written in Markdown and return children of root node as an array.
 * @param text Markdown text
 */
export function blockify(text: string) {
  const root = unified()
    .use(markdown)
    .parse(text);

  if (root.type !== 'root' || !Array.isArray(root.children)) {
    console.error(text);
    throw new Error('Invalid markdown. See console');
  }

  return root.children as Node[];
}

export function htmlify(nodes: Node[]) {
  const html = unified()
    .use(markdown)
    .use(require('remark-rehype'))
    .runSync({
      type: 'root',
      children: nodes
    });
  const __html = unified()
    .use(require('rehype-sanitize'))
    .use(require('rehype-stringify'))
    .stringify(html);
  return { __html };
}
