import * as monaco from 'monaco-editor';

function createRPGObjectMembers(
  range: monaco.Range
): monaco.languages.CompletionItem[] {
  return [
    {
      label: '@hp',
      kind: monaco.languages.CompletionItemKind.Field,
      documentation: "Hit point of this charactor. In other words, it's life.",
      insertText: '@hp = 1\n',
      range
    },
    {
      label: '@walk',
      kind: monaco.languages.CompletionItemKind.Method,
      documentation: 'Move to forward.',
      insertText: 'await @walk 1\n',
      range
    },
    {
      label: 'await walk',
      kind: monaco.languages.CompletionItemKind.Method,
      documentation: 'Move to forward.',
      insertText: 'await @walk 1\n',
      range
    }
  ];
}

function createOthers(range: monaco.Range): monaco.languages.CompletionItem[] {
  return [
    {
      label: 'create',
      kind: monaco.languages.CompletionItemKind.Method,
      documentation: 'Create new object',
      insertText: 'create x: 7, y: 5, m: 1, f: 0\n',
      range
    }
  ];
}

monaco.languages.registerCompletionItemProvider('coffeescript', {
  triggerCharacters: ['@'],
  provideCompletionItems(model, position, context) {
    const wordUntilPosition = model.getWordUntilPosition(position);
    const range = new monaco.Range(
      position.lineNumber,
      wordUntilPosition.startColumn -
        (context.triggerCharacter === '@' ? 1 : 0), // "@".length
      position.lineNumber,
      wordUntilPosition.endColumn
    );
    return {
      suggestions:
        position.column >= 4 // @ で補完できるのは関数の中だけなので、インデントのない文では @ のサジェストを出さない
          ? createRPGObjectMembers(range)
          : createOthers(range)
    };
  }
});
