import * as monaco from 'monaco-editor';
import { isEmptyLine, indent } from './append-empty-line';

const className = 'monaco_suggest_button';
let isFirstButton = true;

export function showSuggestButtons(
  editor: monaco.editor.IStandaloneCodeEditor
) {
  const model = editor.getModel();
  if (!model) {
    throw new Error('Cannot get model');
  }

  let previousLine = 0;
  let decorations: string[] = [];
  let handler = 0;
  const moveButton = (lineNumber?: number) => {
    if (lineNumber === previousLine) return;
    if (!lineNumber) {
      if (decorations.length) {
        decorations = editor.deltaDecorations(decorations, []);
      }
      return;
    }
    window.cancelIdleCallback(handler);
    handler = window.requestIdleCallback(
      () => {
        decorations = editor.deltaDecorations(decorations, [
          {
            range: new monaco.Range(lineNumber, 1, lineNumber, 1),
            options: {
              isWholeLine: true,
              afterContentClassName:
                className + (isFirstButton ? '_emphasize' : '')
            }
          }
        ]);
        previousLine = lineNumber;
        isFirstButton = false;
      },
      { timeout: 1000 }
    );
  };
  moveButton(model.getLineCount());

  editor.onMouseMove(e => {
    const { type, position } = e.target;
    if (!position || type !== monaco.editor.MouseTargetType.CONTENT_EMPTY)
      return;
    moveButton(position.lineNumber);
  });

  editor.onMouseDown(e => {
    const { element, position, type } = e.target;
    if (!position || !element) return;
    const isButtonClicked =
      type === monaco.editor.MouseTargetType.CONTENT_EMPTY &&
      element.classList.contains(className);
    if (!isButtonClicked) return;
    // Show suggestion
    let cursor = new monaco.Position(
      position.lineNumber,
      1 + model.getLineLength(position.lineNumber)
    );
    const content = model.getLineContent(cursor.lineNumber);
    if (!isEmptyLine(content)) {
      const spaces = model
        .getFullModelRange()
        .containsPosition(new monaco.Position(cursor.lineNumber + 1, 1))
        ? Math.max(
            indent(content),
            indent(model.getLineContent(cursor.lineNumber + 1))
          )
        : indent(content);
      // Add empty line
      const text = '\n' + ' '.repeat(spaces);
      model.pushEditOperations(
        [],
        [
          {
            range: monaco.Range.fromPositions(cursor),
            text
          }
        ],
        () => null
      );
      cursor = new monaco.Position(cursor.lineNumber + 1, text.length);
    }

    moveButton();

    // Edit Operation が busy な時に setPosition すると
    // Operation が apply された後にカーソルが動いてしまうので
    // 少しディレイを置いてから setPosition/Show Suggestion する
    window.requestIdleCallback(
      () => {
        editor.setPosition(cursor);
        const suggest = editor.getAction('editor.action.triggerSuggest');
        suggest.run();
      },
      { timeout: 1000 }
    );
  });
}
