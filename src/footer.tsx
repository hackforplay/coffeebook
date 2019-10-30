import classNames from 'classnames';
import * as React from 'react';
import { Balloon } from './balloon';
import { IconButton } from './button';
import flex from './css/flex.scss';
import footer from './css/footer.scss';
import { Asset, dummyAssets } from './dummy-assets';
import { Transition } from './transition';

export interface FooterProps {
  onItemClick: () => void;
}

export function Footer({ onItemClick }: FooterProps) {
  const [opened, setOpened] = React.useState(false);
  const close = React.useCallback(() => {
    setOpened(false);
  }, []);
  const [assets] = React.useState(dummyAssets);

  return (
    <div className={classNames(footer.container)}>
      {opened ? <div className={footer.backdrop} onClick={close}></div> : null}
      <Transition in={opened} className={footer.pane} exiting={footer.hidden}>
        <IconButton name="close" className={footer.close} onClick={close} />
        <FooterPane assets={assets} search="" />
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

export interface FooterPaneProps {
  assets: Asset[];
  search: string;
}

export function FooterPane({ assets }: FooterPaneProps) {
  const [category, setCategory] = React.useState(0);
  assets = assets.filter(asset => asset.category === category);

  return (
    <>
      <div className={classNames(footer.category, flex.horizontal)}>
        {[0, 1, 2].map(i => (
          <button
            key={i}
            className={classNames(
              footer.item,
              category === i && footer.selected,
              flex.vertical
            )}
            onClick={() => setCategory(i)}
          >
            Category {i}
          </button>
        ))}
      </div>
      <div className={classNames(footer.asset)}>
        {assets.map(asset => (
          <button
            key={asset.id}
            className={classNames(footer.button, flex.vertical)}
          >
            <div className={flex.blank}></div>
            <div
              className={footer.icon}
              style={{ backgroundColor: asset.color }}
            ></div>
            <div className={flex.blank}></div>
            <div className={footer.name}>{asset.name}</div>
            <div className={flex.blank}></div>
          </button>
        ))}
      </div>
    </>
  );
}
