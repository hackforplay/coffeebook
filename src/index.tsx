import * as React from 'react';
import { render } from 'react-dom';
import { Page } from './page';

let code = `
# This is Markdown

text text text

---
\`\`\`coffeescript
console.log 'This is coffeescript'
\`\`\`
---

This is also markdown.

text text text \`code\`

`;

let container = document.body;
render(
  <div>
    <Page code={code}></Page>
  </div>,
  container
);
