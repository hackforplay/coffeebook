import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './Button';
import { Scroller } from './Scroller';
import { actions, EditorMode, GameMap, SS } from './store';
import flex from './styles/flex.scss';
import style from './styles/map-view.scss';
import selector from './styles/selector.scss';

export type Tab = 'mine' | 'ours';
type Refs = {
  [tab in Tab]: React.RefObject<HTMLDivElement>;
};
export const tabs: Tab[] = ['mine', 'ours'];

export interface MapViewProps {}

export function MapView({}: MapViewProps) {
  const [tab, setTab] = React.useState<Tab>('mine');
  const refs: Refs = {
    mine: React.useRef(null),
    ours: React.useRef(null)
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

  const maps: { [key in Tab]: GameMap[] } = {
    mine: useSelector((state: SS) => state.floor.mine),
    ours: useSelector((state: SS) => state.floor.ours)
  };

  return (
    <div className={style.container}>
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
            tab === 'ours' && selector.selected
          )}
          onClick={() => scrollTo('ours')}
        >
          Ours
        </button>
      </div>
      <Scroller ms={50} className={style.scroller} onScroll={handleScroll}>
        {tabs.map(id => (
          <div key={id} id={id} className={style.group} ref={refs[id]}>
            {maps[id].map(map => (
              <MapViewItem key={map.id} map={map} />
            ))}
          </div>
        ))}
      </Scroller>
    </div>
  );
}

export interface MapViewItemProps {
  map: GameMap;
}

export function MapViewItem({ map }: MapViewItemProps) {
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
    dispatch(actions.setEditorMode(EditorMode.Code));
  }, []);

  return (
    <div className={style.responsive}>
      <div className={style.responsiveContent}>
        <div
          className={style.item}
          style={{ backgroundImage: `url(${map.thumbnailUrl})` }}
        >
          <div className={classNames(style.footer, flex.horizontal)}>
            <div className={flex.vertical}>
              <span>{map.name}</span>
              <span>by {map.authorName}</span>
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
