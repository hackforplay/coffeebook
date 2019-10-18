import * as monaco from 'monaco-editor';

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
    if (!range || range.startLineNumber === hold.startLineNumber) return;

    window.cancelIdleCallback(taskId);
    taskId = window.requestIdleCallback(
      () => {
        if (!hold) return;
        // swap line
        model.pushEditOperations(
          [],
          [
            {
              forceMoveMarkers: false,
              range,
              text: model.getValueInRange(hold)
            },
            {
              forceMoveMarkers: false,
              range: hold,
              text: model.getValueInRange(range)
            }
          ],
          () => null
        );
        hold = new monaco.Range(
          range.startLineNumber,
          1,
          range.startLineNumber,
          hold.endColumn
        );
      },
      { timeout: 1000 }
    );
  });
}
