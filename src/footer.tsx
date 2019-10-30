import classNames from 'classnames';
import * as React from 'react';
import { Balloon } from './balloon';
import { IconButton } from './button';
import flex from './css/flex.scss';
import footer from './css/footer.scss';
import { Transition } from './transition';

export interface FooterProps {
  onItemClick: () => void;
}

export function Footer({ onItemClick }: FooterProps) {
  const [opened, setOpened] = React.useState(false);
  const close = React.useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <div className={classNames(footer.container)}>
      {opened ? <div className={footer.backdrop} onClick={close}></div> : null}
      <Transition in={opened} className={footer.pane} exiting={footer.hidden}>
        <IconButton name="close" className={footer.close} onClick={close} />
        <FooterPane />
      </Transition>
      <div className={classNames(footer.bar, flex.horizontal)}>
        <IconButton
          name="search"
          className={footer.search}
          onClick={() => setOpened(!opened)}
        >
          <Balloon icon="info" delay={5000}>
            Add charactor to the game
          </Balloon>
        </IconButton>
        {opened ? (
          <input
            type="text"
            autoFocus
            placeholder="Search monsters, people and items"
          />
        ) : (
          <>
            <FooterItem onClick={onItemClick} />
            <FooterItem onClick={onItemClick} />
            <div className={footer.divider}></div>
            <FooterItem onClick={onItemClick} />
            <FooterItem onClick={onItemClick} />
            <FooterItem onClick={onItemClick} />
            <FooterItem onClick={onItemClick} />
            <FooterItem onClick={onItemClick} />
            <FooterItem onClick={onItemClick} />
          </>
        )}
      </div>
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

export interface FooterPaneProps {}

export function FooterPane({  }: FooterPaneProps) {
  return <></>;
}
