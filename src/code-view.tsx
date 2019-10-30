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
  isInstalled: boolean;
  setIsInstalled: React.Dispatch<React.SetStateAction<boolean>>;
}

export type OnUpdate = (payload: { id: string; value: string }) => void;

let sandbox = new Sandbox();
export function CodeView({ code, isInstalled, setIsInstalled }: CodeViewProps) {
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

  if (!isInstalled) {
    return <Installer needPayment={false} setIsInstalled={setIsInstalled} />;
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
  needPayment: boolean;
  setIsInstalled: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Installer({ needPayment, setIsInstalled }: Installer) {
  const onClick = React.useCallback(() => {
    setIsInstalled(true);
  }, []);

  return (
    <div className={view.installer}>
      <div className={classNames(view.header, flex.horizontal)}>
        <img
          src="https://assets.hackforplay.xyz/img/93a1462a4800cccde0887f580ef46298.png"
          alt=""
        />
        <h2 className={view.name}>ASSET NAME</h2>
        <span className={view.paid}>PAID ITEM</span>
        <img
          src="https://i.gyazo.com/476dade56d5b2c344a83de22d66a7d17.gif"
          alt=""
          className={view.gif}
        />
      </div>
      <div className={view.description}>
        ASSET DESCRIPTION ASSET DESCRIPTION ASSET DESCRIPTION ASSET DESCRIPTION
      </div>
      <IconButton
        name="add"
        disabled={needPayment}
        lg
        primary
        onClick={onClick}
      >
        Install to the game
      </IconButton>
      {needPayment ? (
        <>
          <h2>How can I use this item?</h2>
          <div className={view.description}>
            Join paid plan to get all items now
          </div>
          <IconButton name="open_in_new" lg accent>
            Get this item
          </IconButton>
        </>
      ) : null}
    </div>
  );
}

function formatCodeCell(codeCell: ICodeCell) {
  codeCell.value = appendEmptyLine(codeCell.value);
}
