import test from 'ava';
import { cellify } from './cellify';

test('Cellify markdown', t => {
  const [text, code] = cellify(`
# This is header

---
\`\`\`coffeescript title
console.log 'Hello World'
\`\`\`
---`);

  t.is(text.id, '0');
  t.is(text.type, 'text');
  t.is(text.value, '# This is header');

  t.is(code.id, '1');
  t.is(code.type, 'code');
  t.is(code.value, `console.log 'Hello World'`);
  t.is('lang' in code && code.lang, 'coffeescript');
  t.is('meta' in code && code.meta, 'title');
});
