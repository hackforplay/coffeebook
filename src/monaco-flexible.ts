import * as monaco from 'monaco-editor';

export const lineHeight = 18;
export const paddingBottom = 2;
export const estimatedTime = 5; // Threshold of execution [ms]

export function getInitialHeight(code: string) {
  const lineCount = code.split('\n').length;
  return lineHeight * lineCount + paddingBottom;
}

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

  const relayout = () => {
    window.cancelIdleCallback(resizeTimerId);
    resizeTimerId = window.requestIdleCallback(
      deadline => {
        if (deadline.timeRemaining() < estimatedTime) {
          // Because we don't have enough time to execute
          return relayout();
        }
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
            : lineCount * lineHeight + paddingBottom; // 行が減ったとき => viewLines の高さは root の高さに依存する => 子要素の数と lineHeight から推測するしかない
        if (height <= 0) {
          // Because parent element maybe "display: none"
          return relayout();
        }
        previousLineCount = lineCount;
        root.style.height = `${height}px`;
        const parent = root.parentElement;
        if (parent) {
          parent.style.height = root.style.height;
        }
        editor.layout();
      },
      { timeout: 2000 }
    );
  };
  relayout(); // onDidChangeModelContent will not fire on mounted
  const disposer = editor.onDidChangeModelContent(relayout);

  let previousWidth = window.innerWidth;
  const windowResized = () => {
    window.cancelIdleCallback(resizeTimerId);
    resizeTimerId = window.requestIdleCallback(
      () => {
        if (window.innerWidth !== previousWidth) {
          previousWidth = window.innerWidth;
          relayout();
        }
      },
      { timeout: 2000 }
    );
  };
  window.addEventListener('resize', windowResized, { passive: true });

  return () => {
    disposer.dispose();
    window.removeEventListener('resize', windowResized);
  };
}
