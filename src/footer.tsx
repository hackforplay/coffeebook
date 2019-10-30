import classNames from 'classnames';
import Popper from 'popper.js';
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
  const [search, setSearch] = React.useState('');

  return (
    <div className={classNames(footer.container)}>
      {opened ? <div className={footer.backdrop} onClick={close}></div> : null}
      <Transition in={opened} className={footer.pane} exiting={footer.hidden}>
        <IconButton name="close" className={footer.close} onClick={close} />
        <FooterPane assets={assets} search={search} />
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
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
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

export function FooterPane({ assets, search }: FooterPaneProps) {
  const [category, setCategory] = React.useState(0);
  assets = assets.filter(asset => asset.category === category);
  if (search) {
    assets = assets.filter(asset => asset.name.includes(search));
  }
  const [detail, setDetail] = React.useState<Asset>();

  const detailRef = React.useRef<HTMLDivElement>(null);
  const boundRef = React.useRef<HTMLDivElement>(null);
  const popperRef = React.useRef<Popper>();
  const pop = React.useCallback(
    (asset: Asset) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!detailRef.current || !boundRef.current) return null;
      if (popperRef.current) {
        popperRef.current.destroy();
      }
      popperRef.current = new Popper(e.currentTarget, detailRef.current, {
        placement: 'bottom-start',
        modifiers: {
          flip: {
            behavior: ['bottom', 'top']
          },
          preventOverflow: {
            boundariesElement: boundRef.current
          }
        }
      });
      setDetail(asset);
    },
    []
  );
  React.useEffect(() => {
    setDetail(undefined);
  }, [category]);

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
      <div className={classNames(footer.asset)} ref={boundRef}>
        {assets.map(asset => (
          <button
            key={asset.id}
            className={classNames(footer.button, flex.vertical)}
            onClick={pop(asset)}
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
      <div
        className={classNames(footer.detail, !detail && footer.hidden)}
        ref={detailRef}
      >
        <IconButton
          name="close"
          className={footer.close}
          onClick={() => setDetail(undefined)}
        />
        <div className={classNames(footer.header)}>
          <div>{detail ? detail.name : ''}</div>
        </div>
        <div className={footer.description}>
          {detail ? detail.description : ''}
        </div>
        <div className={classNames(footer.variation, flex.horizontal)}>
          {['red', 'green', 'yellow', 'blue', 'black', 'white'].map(s => (
            <button
              key={s}
              className={footer.button}
              style={{ backgroundColor: s }}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}
