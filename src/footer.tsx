import classNames from 'classnames';
import * as React from 'react';
import { Balloon } from './balloon';
import { IconButton } from './button';
import flex from './css/flex.scss';
import footer from './css/footer.scss';
import { dummyAssets } from './dummy-assets';
import { FooterPane } from './footer-pane';
import { Transition } from './transition';

export interface FooterProps {
  onSelectAsset: () => void;
  onSelectName: () => void;
}

export function Footer({ onSelectAsset, onSelectName }: FooterProps) {
  const [opened, setOpened] = React.useState(false);
  const close = React.useCallback(() => {
    setOpened(false);
  }, []);
  const [assets] = React.useState(dummyAssets);
  const [search, setSearch] = React.useState('');

  return (
    <>
      <Transition
        in={opened}
        className={classNames(footer.container, flex.vertical)}
        exiting={footer.hidden}
      >
        <FooterPane
          assets={assets}
          onRequestClose={close}
          onSelectAsset={onSelectName}
          search={search}
        />
      </Transition>
      <div
        className={classNames(
          footer.bar,
          opened && footer.opened,
          flex.horizontal
        )}
      >
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
            <FooterItem onClick={onSelectAsset} />
            <FooterItem onClick={onSelectAsset} />
            <div className={footer.divider}></div>
            <FooterItem onClick={onSelectAsset} />
            <FooterItem onClick={onSelectAsset} />
            <FooterItem onClick={onSelectAsset} />
            <FooterItem onClick={onSelectAsset} />
            <FooterItem onClick={onSelectAsset} />
            <FooterItem onClick={onSelectAsset} />
          </>
        )}
      </div>
    </>
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
