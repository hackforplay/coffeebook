import * as monaco from 'monaco-editor';
import { indent } from './append-empty-line';
import styles from './css/monaco-line-alter.scss';

export function showLineAlter(editor: monaco.editor.IStandaloneCodeEditor) {
  const model = editor.getModel();
  if (!model) {
    throw new Error('Cannot get model');
  }

  editor.updateOptions({
    selectOnLineNumbers: false
  });

  // TODO: dispose
  editor.deltaDecorations(
    [],
    [
      {
        range: new monaco.Range(1, 1, 100000, 1), // whole code
        options: {
          isWholeLine: true,
          marginClassName: styles.widget
        }
      }
    ]
  );

  let previous: string[] = [];
  const move = (lineNumber: number) => {
    const len = model.getLineLength(lineNumber);
    previous = editor.deltaDecorations(previous, [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1 + len), // whole code
        options: {
          isWholeLine: true,
          className: styles.line
        }
      }
    ]);
  };
  const hide = () => {
    editor.deltaDecorations(previous, []);
    previous = [];
  };

  let hold: monaco.Range | null = null;

  editor.onMouseDown(e => {
    const { element, range } = e.target;
    if (!element || !element.classList.contains(styles.widget)) return;
    if (!range) return;
    hold = range;
    move(hold.startLineNumber);
  });
  editor.onMouseUp(() => {
    hold = null;
    hide();
  });

  let taskId = 0;
  editor.onMouseMove(e => {
    if (!hold) return;
    const { element, range } = e.target;
    if (!element || !element.classList.contains(styles.widget)) return;
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
        move(range.startLineNumber);
      },
      { timeout: 1000 }
    );
  });
}
