import classNames from 'classnames';
import { CoffeeScript } from 'coffeescript';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appendEmptyLine } from './append-empty-line';
import { build } from './build';
import { blockify, cellify, ICodeCell } from './cellify';
import { CodeCell } from './CodeCell';
import './completion';
import { actions, SS } from './store';
import style from './styles/code-view.scss';
import flex from './styles/flex.scss';
import { TextCell } from './TextCell';

export interface CodeViewProps {
  code: string;
  handleRun: () => void;
}

export type OnUpdate = (payload: { id: string; value: string }) => void;

export function CodeView({ code, handleRun }: CodeViewProps) {
  const dispatch = useDispatch();
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

    dispatch(
      actions.writeFiles([
        {
          name: 'modules/プレイヤー.js',
          type: 'application/javascript',
          code: build(cells)
        }
      ])
    );
  }, []);

  React.useEffect(() => {
    dispatch(
      actions.writeFiles([
        {
          name: 'modules/プレイヤー.js',
          type: 'application/javascript',
          code: build(cellsRef.current)
        }
      ])
    );
    dispatch(actions.runSanbox());
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
        <PaperPlane handleRun={handleRun} />
      </div>
      {cellsRef.current.map(cell =>
        cell.type === 'code' ? (
          <CodeCell
            key={cell.id}
            id={cell.id}
            value={cell.value}
            title={cell.meta}
            onUpdate={onUpdate}
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

interface PaperPlaneProps {
  handleRun: () => void;
}

function PaperPlane({ handleRun }: PaperPlaneProps) {
  const lv = useSelector((state: SS) => state.sandbox.localVersion);
  const rv = useSelector((state: SS) => state.sandbox.runningVersion);

  return (
    <div className={classNames(style.plane, lv <= rv && style.sent)}>
      <img
        src={require('./resources/paperPlane.svg')}
        alt="✈"
        onClick={handleRun}
      />
    </div>
  );
}
