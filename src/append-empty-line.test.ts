import test from 'ava';
import { appendEmptyLine, isEmptyLine, indent } from './append-empty-line';

test('appendEmptyLine', t => {
  const cases = new Map([
    ['abc\ndef', 'abc\ndef\n'],
    ['  abc\n  def', '  abc\n  def\n  '],
    ['    abc\n    def', '    abc\n    def\n    '],
    ['  abc\n  def\n', '  abc\n  def\n  '],
    ['  abc\n  def\n ', '  abc\n  def\n  '],
    ['  abc\n  def\n  ', '  abc\n  def\n  ']
  ]);
  cases.forEach((expect, source) => {
    t.is(appendEmptyLine(source), expect);
  });
  // 冪等であることを確かめる
  cases.forEach((expect, source) => {
    t.is(appendEmptyLine(appendEmptyLine(source)), expect);
  });
});

test('isEmptyLine', t => {
  t.true(isEmptyLine(''));
  t.true(isEmptyLine(' '));
  t.false(isEmptyLine('a'));
  t.false(isEmptyLine(' a'));
  t.false(isEmptyLine(' a '));
});

test('indent', t => {
  t.is(indent(''), 0);
  t.is(indent('a'), 0);
  t.is(indent(' '), 1);
  t.is(indent(' a'), 1);
  t.is(indent('  '), 2);
  t.is(indent('  a'), 2);
  t.is(indent('  a '), 2);
});
