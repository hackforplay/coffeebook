import { CoffeeScript } from 'coffeescript';
import * as React from 'react';
import 'requestidlecallback';
import { build } from './build';
import { blockify, cellify } from './cellify';
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
      {cellsRef.current.map(cell => (
        <div
          key={cell.id}
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px ',
            padding: 8,
            margin: 8,
            borderRadius: 2
          }}
        >
          {cell.type === 'code' ? (
            <CodeCell
              id={cell.id}
              value={cell.value}
              onUpdate={onUpdate}
              onGame={onGame}
            />
          ) : (
            <TextCell id={cell.id} nodes={cell.nodes} onUpdate={onUpdate} />
          )}
        </div>
      ))}
    </div>
  );
}
