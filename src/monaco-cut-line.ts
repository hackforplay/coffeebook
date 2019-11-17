import * as monaco from 'monaco-editor';
import styles from './styles/monaco-cut-line.scss';

export function showCutLine(editor: monaco.editor.IStandaloneCodeEditor) {
  const model = editor.getModel();
  if (!model) {
    throw new Error('Cannot get model');
  }

  editor.updateOptions({
    glyphMargin: true
  });

  let decorations: string[] = [];
  const moveButton = (lineNumber?: number) => {
    if (!lineNumber) {
      if (decorations.length) {
        decorations = editor.deltaDecorations(decorations, []);
      }
      return;
    }
    decorations = editor.deltaDecorations(decorations, [
      {
        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          glyphMarginHoverMessage: {
            value: 'Cut this line'
          },
          glyphMarginClassName: styles.widget
        }
      }
    ]);
  };
  editor.onDidChangeCursorPosition(e => {
    moveButton(e.position.lineNumber);
  });
  editor.onDidBlurEditorText(() => {
    moveButton(0);
  });

  editor.onMouseDown(e => {
    const { element, position, type } = e.target;
    if (!position || !element) return;
    const isButtonClicked =
      type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN &&
      element.classList.contains(styles.widget);
    if (!isButtonClicked) return;
    editor.trigger('monaco-cut-line', 'editor.action.clipboardCutAction', {});
  });

  return () => {};
}
