import classNames from 'classnames';
import * as React from 'react';
import { IconButton } from './Button';
import './completion';
import view from './css/code-view.scss';
import flex from './css/flex.scss';
import { EditorMode } from './Root';

export interface StoreViewProps {
  setEditorMode: React.Dispatch<React.SetStateAction<EditorMode>>;
}

export function StoreView({ setEditorMode }: StoreViewProps) {
  return (
    <>
      <h1>STORE VIEW</h1>
      <Installer needPayment={false} setEditorMode={setEditorMode} />
    </>
  );
}

export interface Installer {
  needPayment: boolean;
  setEditorMode: React.Dispatch<React.SetStateAction<EditorMode>>;
}

export function Installer({ needPayment, setEditorMode }: Installer) {
  const onClick = React.useCallback(() => {
    setEditorMode(EditorMode.Code);
  }, []);

  return (
    <div className={view.installer}>
      <div className={classNames(view.header, flex.horizontal)}>
        <img
          src='https://assets.hackforplay.xyz/img/93a1462a4800cccde0887f580ef46298.png'
          alt=''
        />
        <h2 className={view.name}>ASSET NAME</h2>
        <span className={view.paid}>PAID ITEM</span>
        <img
          src='https://i.gyazo.com/476dade56d5b2c344a83de22d66a7d17.gif'
          alt=''
          className={view.gif}
        />
      </div>
      <div className={view.description}>
        ASSET DESCRIPTION ASSET DESCRIPTION ASSET DESCRIPTION ASSET DESCRIPTION
      </div>
      <IconButton
        name='add'
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
          <IconButton name='open_in_new' lg accent>
            Get this item
          </IconButton>
        </>
      ) : null}
    </div>
  );
}
