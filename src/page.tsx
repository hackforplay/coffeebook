import { CoffeeScript } from 'coffeescript';
import * as React from 'react';
import 'requestidlecallback';
import { appendEmptyLine } from './append-empty-line';
import { build } from './build';
import { blockify, cellify, ICodeCell } from './cellify';
import { CodeCell } from './code-cell';
import './completion';
import { Sandbox } from './sandbox';
import { TextCell } from './text-cell';

export interface PageProps {
  code: string;
}

export type OnUpdate = (payload: { id: string; value: string }) => void;

let sandbox = new Sandbox();
export function Page({ code }: PageProps) {
  const cellsRef = React.useRef(cellify(code)); // Notice: mutable

  for (let cell of cellsRef.current) {
    if (cell.type === 'code') {
      formatCodeCell(cell);
    }
  }

  const onUpdate = React.useCallback<OnUpdate>(({ id, value }) => {
    const cells = cellsRef.current;
    const cell = cells.find(cell => cell.id === id);
    if (!cell) throw new Error(`Cell not found. cell=${id}`);

    // Test && Save
    try {
      if (cell.type === 'code') {
        CoffeeScript.compile(value); // syntax check
      }
    } catch (error) {
      return console.warn(error);
    }

    // Update cells
    if (cell.type === 'code') {
      cell.value = value;
    } else if (cell.type === 'text') {
      cell.value = value;
      cell.nodes = blockify(value);
    }
  }, []);

  const onGame = React.useCallback(() => {
    // Build && Run
    sandbox.update([
      {
        name: 'modules/プレイヤー.js',
        type: 'application/javascript',
        code: build(cellsRef.current)
      }
    ]);
    sandbox.run();
  }, []);

  React.useEffect(() => {
    onGame();
  }, []);

  return (
    <div style={{ width: '50vw' }}>
      {cellsRef.current.map(cell =>
        cell.type === 'code' ? (
          <CodeCell
            key={cell.id}
            id={cell.id}
            value={cell.value}
            onUpdate={onUpdate}
            onGame={onGame}
          />
        ) : (
          <TextCell
            key={cell.id}
            id={cell.id}
            nodes={cell.nodes}
            onUpdate={onUpdate}
          />
        )
      )}
    </div>
  );
}

function formatCodeCell(codeCell: ICodeCell) {
  codeCell.value = appendEmptyLine(codeCell.value);
}
