import * as monaco from 'monaco-editor';
import { indent } from './append-empty-line';

const className = 'monaco_line_alter';

export function showLineAlter(editor: monaco.editor.IStandaloneCodeEditor) {
  const model = editor.getModel();
  if (!model) {
    throw new Error('Cannot get model');
  }

  editor.updateOptions({
    selectOnLineNumbers: false
  });

  const decorations = editor.deltaDecorations(
    [],
    [
      {
        range: new monaco.Range(1, 1, 100000, 1), // whole code
        options: {
          isWholeLine: true,
          marginClassName: className
        }
      }
    ]
  );

  let hold: monaco.Range | null = null;

  editor.onMouseDown(e => {
    const { element, range } = e.target;
    if (!element || !element.classList.contains(className)) return;
    if (!range) return;
    hold = range;
  });
  editor.onMouseUp(() => {
    hold = null;
  });

  let taskId = 0;
  editor.onMouseMove(e => {
    if (!hold) return;
    const { element, range } = e.target;
    if (!element || !element.classList.contains(className)) return;
    if (!range) return;
    const direction = range.startLineNumber - hold.startLineNumber;
    if (Math.abs(direction) !== 1) return;

    window.cancelIdleCallback(taskId);
    taskId = window.requestIdleCallback(
      () => {
        if (!hold) return;
        const holdText = model.getValueInRange(hold);
        const replaceText = model.getValueInRange(range);
        const acrossLine = range.startLineNumber + direction;
        // 入れ替える行とその向こうの行のインデントのうち、大きい方に合わせる
        const spaces = model
          .getFullModelRange()
          .containsPosition(new monaco.Position(acrossLine, 1))
          ? Math.max(
              indent(replaceText),
              indent(model.getLineContent(acrossLine))
            )
          : indent(replaceText);
        const indentText = ' '.repeat(spaces) + holdText.trimLeft();
        // swap line
        model.pushEditOperations(
          [],
          [
            {
              forceMoveMarkers: false,
              range,
              text: indentText
            },
            {
              forceMoveMarkers: false,
              range: hold,
              text: replaceText
            }
          ],
          () => null
        );
        hold = new monaco.Range(
          range.startLineNumber,
          1,
          range.startLineNumber,
          1 + indentText.length
        );
      },
      { timeout: 1000 }
    );
  });
}
