import classNames from 'classnames';
import { CoffeeScript } from 'coffeescript';
import * as React from 'react';
import { appendEmptyLine } from './append-empty-line';
import { build } from './build';
import { blockify, cellify, ICodeCell } from './cellify';
import { CodeCell } from './CodeCell';
import './completion';
import { Sandbox } from './sandbox';
import style from './styles/code-view.scss';
import { TextCell } from './TextCell';
import flex from './styles/flex.scss';

export interface CodeViewProps {
  code: string;
}

export type OnUpdate = (payload: { id: string; value: string }) => void;

let sandbox = new Sandbox();
export function CodeView({ code }: CodeViewProps) {
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

  const fileInfo = {
    iconUrl:
      'https://assets.hackforplay.xyz/img/6d152a956071fc7b2e7ec0c8590146e4.png',
    name: {
      ja: 'プレイヤー'
    }
  };

  return (
    <>
      <div className={classNames(style.header, flex.horizontal)}>
        <img src={fileInfo.iconUrl} alt="" className={style.icon} />
        <div className={style.name}>{fileInfo.name.ja}</div>
      </div>
      {cellsRef.current.map(cell =>
        cell.type === 'code' ? (
          <CodeCell
            key={cell.id}
            id={cell.id}
            value={cell.value}
            title={cell.meta}
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
    </>
  );
}

function formatCodeCell(codeCell: ICodeCell) {
  codeCell.value = appendEmptyLine(codeCell.value);
}
