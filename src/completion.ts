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
    }
  ];
}

monaco.languages.registerCompletionItemProvider('coffeescript', {
  triggerCharacters: ['@'],
  provideCompletionItems(model, position, context) {
    // find out if we are completing a property in the 'dependencies' object.
    // var textUntilPosition = model.getValueInRange({
    //   startLineNumber: 1,
    //   startColumn: 1,
    //   endLineNumber: position.lineNumber,
    //   endColumn: position.column
    // });
    // console.log(textUntilPosition);
    // TODO: @ で補完できるのは関数の中だけなので、インデントのない文では @ のサジェストを出さない
    const wordUntilPosition = model.getWordUntilPosition(position);
    const wordRange = new monaco.Range(
      position.lineNumber,
      wordUntilPosition.startColumn - 1, // "@".length
      position.lineNumber,
      wordUntilPosition.endColumn
    );
    return {
      suggestions: createRPGObjectMembers(wordRange)
    };
  }
});
