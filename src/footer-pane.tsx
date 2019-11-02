import classNames from 'classnames';
import Popper from 'popper.js';
import * as React from 'react';
import { IconButton } from './button';
import flex from './css/flex.scss';
import footer from './css/footer.scss';
import { Asset } from './dummy-assets';
import { Scroller } from './scroller';

export interface FooterPaneProps {
  assets: Asset[];
  search: string;
}

export function FooterPane({ assets, search }: FooterPaneProps) {
  const [category, setCategory] = React.useState(0);
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

  const [tab, setTab] = React.useState(0);
  const refs = [0, 1, 2].map(() => React.useRef<HTMLDivElement>(null));

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const margin = 20; // safety margin for smooth scroll [px]
    const viewTop =
      e.currentTarget.offsetTop + e.currentTarget.scrollTop + margin;
    for (const tab of [0, 1, 2]) {
      const element = refs[tab].current;
      if (!element) return;
      const groupBottom = element.offsetTop + element.offsetHeight;
      if (viewTop < groupBottom) {
        setTab(tab);
        return;
      }
    }
  }, []);

  const scrollTo = React.useCallback((tab: number) => {
    const element = refs[tab].current;
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className={classNames(footer.category, flex.horizontal)}>
        {[0, 1, 2].map(cat => (
          <button
            key={cat}
            className={classNames(
              footer.item,
              tab === cat && footer.selected,
              flex.vertical
            )}
            onClick={() => scrollTo(cat)}
          >
            Category {cat}
          </button>
        ))}
      </div>
      <Scroller
        ms={50}
        className={classNames(footer.asset)}
        onScroll={handleScroll}
      >
        {[0, 1, 2].map(cat => (
          <div className={footer.group} ref={refs[cat]}>
            <h3 className={footer.label}>Category {cat}</h3>
            {assets
              .filter(asset => asset.category === cat)
              .map(asset => (
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
        ))}
      </Scroller>
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
