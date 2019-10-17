/**
 * 最後の行に入力しやすいよう、インデントの揃った空行をいれる
 */
export function appendEmptyLine(code: string) {
  const lines = code.split('\n');
  const [last, second] = lines.reverse();
  if (!last) {
    return code + ' '.repeat(indent(second));
  }
  if (!isEmptyLine(last)) {
    return code + '\n' + ' '.repeat(indent(last));
  }
  const needs = indent(second);
  return last.length === needs
    ? code
    : code.slice(0, code.length - last.length) + ' '.repeat(needs);
}

export function isEmptyLine(line: string) {
  for (let index = 0; index < line.length; index++) {
    if (line[index] !== ' ') return false;
  }
  return true;
}

export function indent(line: string) {
  for (let index = 0; index < line.length; index++) {
    if (line[index] !== ' ') return index;
  }
  return line.length;
}
