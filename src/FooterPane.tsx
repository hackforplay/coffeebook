import classNames from 'classnames';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from './Button';
import flex from './styles/flex.scss';
import footer from './styles/footer.scss';
import { Asset } from './dummy-assets';
import { Scroller } from './Scroller';
import { actions, EditorMode } from './store';

export interface FooterPaneProps {
  assets: Asset[];
  onRequestClose: () => void;
  search: string;
}

export function FooterPane({
  assets,
  onRequestClose,
  search
}: FooterPaneProps) {
  if (search) {
    assets = assets.filter(asset => asset.name.includes(search));
  }

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
        <div className={flex.blank} onClick={onRequestClose}></div>
        <div className={classNames(footer.wrapper, flex.horizontal)}>
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
          <div className={flex.blank} onClick={onRequestClose}></div>
        </div>
        <div className={flex.blank} onClick={onRequestClose}></div>
      </div>
      <div className={footer.pane}>
        <IconButton
          name="close"
          className={footer.close}
          onClick={onRequestClose}
        />
        <Scroller
          ms={50}
          className={classNames(footer.asset)}
          onScroll={handleScroll}
        >
          {[0, 1, 2].map(cat => (
            <div key={cat} className={footer.group} ref={refs[cat]}>
              <h3 className={footer.label}>Category {cat}</h3>
              {assets
                .filter(asset => asset.category === cat)
                .map(asset => (
                  <AssetButton
                    key={asset.id}
                    asset={asset}
                    onRequestClose={onRequestClose}
                  />
                ))}
            </div>
          ))}
        </Scroller>
      </div>
    </>
  );
}

export interface AssetButtonProps {
  asset: Asset;
  onRequestClose: () => void;
}

export function AssetButton({ asset, onRequestClose }: AssetButtonProps) {
  const dispatch = useDispatch();
  const click = React.useCallback(() => {
    dispatch(actions.setEditorMode(EditorMode.Store));
    onRequestClose();
  }, []);

  return (
    <button
      className={classNames(footer.button, flex.vertical)}
      onClick={click}
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
  );
}
