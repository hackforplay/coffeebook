import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './Button';
import flex from './styles/flex.scss';
import map from './styles/map-view.scss';
import selector from './styles/selector.scss';
import { Scroller } from './Scroller';
import { actions, EditorMode, SS } from './store';

export type Tab = 'mine' | 'official' | 'others';
type Refs = {
  [tab in Tab]: React.RefObject<HTMLDivElement>;
};
export const tabs: Tab[] = ['mine', 'official', 'others'];

export interface MapViewProps {}

export function MapView({  }: MapViewProps) {
  const [tab, setTab] = React.useState<Tab>('mine');
  const refs: Refs = {
    mine: React.useRef(null),
    official: React.useRef(null),
    others: React.useRef(null)
  };

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

  const selected = useSelector((state: SS) => state.floor.selected);

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
              <MapViewItem key={i} />
            ))}
          </div>
        ))}
      </Scroller>
    </div>
  );
}

export interface MapViewItemProps {}

export function MapViewItem({  }: MapViewItemProps) {
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch(actions.setEditorMode(EditorMode.Code));
  }, []);

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
