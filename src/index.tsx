import * as React from 'react';
import { render } from 'react-dom';
import { Page } from './page';

let code = `
# This is Markdown

text text text

---
\`\`\`coffeescript
document.write('Hello!')
\`\`\`
---

This is also markdown.

text text text \`code\`

`;

let container = document.querySelector('#code');
render(<Page code={code}></Page>, container);
