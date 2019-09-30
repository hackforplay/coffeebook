import { CoffeeScript } from 'coffeescript';
import { ICell, ICodeCell, ITextCell } from './cellify';

export function build(cells: ICell[]) {
  const merged = cells
    .filter(isCodeCell)
    .map(code => code.value)
    .join('\n');

  try {
    const js = CoffeeScript.compile(merged);
    return js;
  } catch (error) {
    console.error(error);
    console.error(merged);
    return '';
  }
}

export function isCodeCell(cell: ICodeCell | ITextCell): cell is ICodeCell {
  return cell.type === 'code';
}
