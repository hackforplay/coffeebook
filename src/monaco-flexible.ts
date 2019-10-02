import * as monaco from 'monaco-editor';

export const lineHeight = 18;

export function beFlexible(editor: monaco.editor.IStandaloneCodeEditor) {
  editor.updateOptions({
    scrollBeyondLastLine: false,
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden'
    },
    lineHeight
  });

  let previousLineCount = 0;
  let resizeTimerId = 0;

  const callback = () => {
    window.cancelIdleCallback(resizeTimerId);
    resizeTimerId = window.requestIdleCallback(
      () => {
        const root = editor.getDomNode();
        if (!root) return;
        const viewLines = root.querySelector('.view-lines');
        if (!viewLines) return;
        const model = editor.getModel();
        if (!model) return;
        const lineCount = model.getLineCount();
        const height =
          previousLineCount <= lineCount
            ? viewLines.getBoundingClientRect().height // 行が同じか増えたとき => view-line 全体の高さの総和が viewLines の高さよりも上回り, viewLines が伸びる => 伸びた後の高さが必要な高さ
            : lineCount * lineHeight; // 行が減ったとき => viewLines の高さは root の高さに依存する => 子要素の数と lineHeight から推測するしかない
        previousLineCount = lineCount;
        root.style.height = `${height}px`;
        editor.layout();
      },
      { timeout: 2000 }
    );
  };

  callback();
  return editor.onDidChangeModelDecorations(callback);
}
