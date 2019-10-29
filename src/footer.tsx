import classNames from 'classnames';
import * as React from 'react';
import { IconButton } from './button';
import flex from './css/flex.scss';
import footer from './css/footer.scss';
import { EditorMode } from './root';

export interface FooterProps {
  setEditorMode: React.Dispatch<React.SetStateAction<EditorMode>>;
}

export function Footer({ setEditorMode }: FooterProps) {
  const onClick = React.useCallback(() => {
    setEditorMode(EditorMode.Code);
  }, []);

  return (
    <div className={classNames(footer.container, flex.horizontal)}>
      <IconButton name="search" className={footer.search} />
      <FooterItem onClick={onClick} />
      <FooterItem onClick={onClick} />
      <div className={footer.divider}></div>
      <FooterItem onClick={onClick} />
      <FooterItem onClick={onClick} />
      <FooterItem onClick={onClick} />
      <FooterItem onClick={onClick} />
      <FooterItem onClick={onClick} />
      <FooterItem onClick={onClick} />
    </div>
  );
}

export interface FooterItemProps {
  onClick: () => void;
}

export function FooterItem({ onClick }: FooterItemProps) {
  return (
    <button className={footer.item} onClick={onClick}>
      <div style={{ backgroundColor: 'blue' }}></div>
    </button>
  );
}
