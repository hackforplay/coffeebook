import * as React from 'react';
import { render } from 'react-dom';
import { Page } from './page';

let code = `
# This is Markdown

text text text

---

---

\`\`\`coffeescript
app = document.querySelector '#enchant-stage'
app.style.color = 'white'
app.textContent = 'Hello!'
\`\`\`

---

This is also markdown.

text text text \`code\`

`;
console.log(code);

let container = document.querySelector('#code');
render(<Page code={code}></Page>, container);
