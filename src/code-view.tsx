import classNames from 'classnames';
import { CoffeeScript } from 'coffeescript';
import * as React from 'react';
import { appendEmptyLine } from './append-empty-line';
import { build } from './build';
import { IconButton } from './button';
import { blockify, cellify, ICodeCell } from './cellify';
import { CodeCell } from './code-cell';
import './completion';
import view from './css/code-view.scss';
import flex from './css/flex.scss';
import { Sandbox } from './sandbox';
import { TextCell } from './text-cell';

export interface CodeViewProps {
  code: string;
}

export type OnUpdate = (payload: { id: string; value: string }) => void;

let sandbox = new Sandbox();
export function CodeView({ code }: CodeViewProps) {
  const cellsRef = React.useRef(cellify(code)); // Notice: mutable
  const [showing, setShowing] = React.useState(false);

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

  if (!showing) {
    return <Installer setShowing={setShowing} />;
  }

  return (
    <>
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

export interface Installer {
  setShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Installer({ setShowing }: Installer) {
  const onClick = React.useCallback(() => {
    setShowing(true);
  }, []);

  return (
    <div className={view.installer}>
      <div className={classNames(view.header, flex.horizontal)}>
        <img
          src="https://assets.hackforplay.xyz/img/93a1462a4800cccde0887f580ef46298.png"
          alt=""
        />
        <h2>ASSET NAME</h2>
        <img
          src="https://i.gyazo.com/476dade56d5b2c344a83de22d66a7d17.gif"
          alt=""
          className={view.gif}
        />
      </div>
      <div className={view.description}>
        ASSET DESCRIPTION ASSET DESCRIPTION ASSET DESCRIPTION ASSET DESCRIPTION
      </div>
      <IconButton name="add" primary onClick={onClick}>
        Install to the game
      </IconButton>
    </div>
  );
}

function formatCodeCell(codeCell: ICodeCell) {
  codeCell.value = appendEmptyLine(codeCell.value);
}
