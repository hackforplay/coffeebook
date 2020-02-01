import classNames from 'classnames';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from './Button';
import './completion';
import { actions, EditorMode } from './store';
import flex from './styles/flex.scss';
import style from './styles/store-view.scss';

export interface StoreViewProps {}

export function StoreView({  }: StoreViewProps) {
  return (
    <>
      <h1>STORE VIEW</h1>
      <Installer needPayment={false} />
    </>
  );
}

export interface Installer {
  needPayment: boolean;
}

export function Installer({ needPayment }: Installer) {
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch(actions.setEditorMode(EditorMode.Code));
  }, []);

  return (
    <div className={style.installer}>
      <div className={classNames(style.header, flex.horizontal)}>
        <img
          src="https://assets.hackforplay.xyz/img/93a1462a4800cccde0887f580ef46298.png"
          alt=""
        />
        <h2 className={style.name}>ASSET NAME</h2>
        <span className={style.paid}>PAID ITEM</span>
        <img
          src="https://i.gyazo.com/476dade56d5b2c344a83de22d66a7d17.gif"
          alt=""
          className={style.gif}
        />
      </div>
      <div className={style.description}>
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
          <div className={style.description}>
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
