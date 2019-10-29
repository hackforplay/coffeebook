import classNames from 'classnames';
import * as React from 'react';
import flex from './css/flex.scss';
import map from './css/map-view.scss';
import selector from './css/selector.scss';
import { Button } from './icon';
import { EditorMode } from './root';
import { Scroller } from './scroller';

export type Tab = 'mine' | 'official' | 'others';
type Refs = {
  [tab in Tab]: React.RefObject<HTMLDivElement>;
};
export const tabs: Tab[] = ['mine', 'official', 'others'];

export interface MapViewProps {
  selected: number;
  setEditorMode: React.Dispatch<React.SetStateAction<EditorMode>>;
}

export function MapView({ selected, setEditorMode }: MapViewProps) {
  const [tab, setTab] = React.useState<Tab>('mine');
  const refs: Refs = {
    mine: React.useRef(null),
    official: React.useRef(null),
    others: React.useRef(null)
  };

  const set = React.useCallback(() => {
    setEditorMode(EditorMode.Code);
  }, []);

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const margin = 20; // safety margin for smooth scroll [px]
    const viewTop =
      e.currentTarget.offsetTop + e.currentTarget.scrollTop + margin;
    for (const tab of tabs) {
      const element = refs[tab].current;
      if (!element) return;
      const groupBottom = element.offsetTop + element.offsetHeight;
      if (viewTop < groupBottom) {
        setTab(tab);
        return;
      }
    }
  }, []);

  const scrollTo = React.useCallback((tab: Tab) => {
    const element = refs[tab].current;
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className={map.container}>
      <h2>Choose background of map{selected}</h2>
      <div className={selector.container}>
        <button
          className={classNames(
            selector.item,
            tab === 'mine' && selector.selected
          )}
          onClick={() => scrollTo('mine')}
        >
          Mine
        </button>
        <button
          className={classNames(
            selector.item,
            tab === 'official' && selector.selected
          )}
          onClick={() => scrollTo('official')}
        >
          Official
        </button>
        <button
          className={classNames(
            selector.item,
            tab === 'others' && selector.selected
          )}
          onClick={() => scrollTo('others')}
        >
          Others
        </button>
      </div>
      <Scroller ms={50} className={map.scroller} onScroll={handleScroll}>
        {tabs.map(id => (
          <div key={id} id={id} className={map.group} ref={refs[id]}>
            {Array.from({ length: 15 }).map((_, i) => (
              <MapViewItem key={i} onClick={set} />
            ))}
          </div>
        ))}
      </Scroller>
    </div>
  );
}

export interface MapViewItemProps {
  onClick: () => void;
}

export function MapViewItem({ onClick }: MapViewItemProps) {
  return (
    <div className={map.responsive}>
      <div className={map.responsiveContent}>
        <div className={map.item} style={{ backgroundColor: 'green' }}>
          <div className={classNames(map.footer, flex.horizontal)}>
            <div className={flex.vertical}>
              <span>TITLE</span>
              <span>by Author</span>
            </div>
            <Button primary onClick={onClick}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
