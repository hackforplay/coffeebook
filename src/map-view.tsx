import classNames from 'classnames';
import * as React from 'react';
import flex from './css/flex.scss';
import map from './css/map-view.scss';
import selector from './css/selector.scss';
import { Button } from './icon';

export type Tab = 'mine' | 'official' | 'others';

export interface MapViewProps {
  selected: number;
  setEditorMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MapView({ selected, setEditorMode }: MapViewProps) {
  const [tab, setTab] = React.useState<Tab>('mine');

  return (
    <div className={map.container}>
      <h2>Choose background of map{selected}</h2>
      <div className={selector.container}>
        <button
          className={classNames(
            selector.item,
            tab === 'mine' && selector.selected
          )}
          onClick={() => setTab('mine')}
        >
          Mine
        </button>
        <button
          className={classNames(
            selector.item,
            tab === 'official' && selector.selected
          )}
          onClick={() => setTab('official')}
        >
          Official
        </button>
        <button
          className={classNames(
            selector.item,
            tab === 'others' && selector.selected
          )}
          onClick={() => setTab('others')}
        >
          Others
        </button>
      </div>
      <div className={map.scroller}>
        {['mine', 'official', 'others'].map(id => (
          <div key={id} id={id} className={map.group}>
            <MapViewItem />
            <MapViewItem />
            <MapViewItem />
            <MapViewItem />
            <MapViewItem />
            <MapViewItem />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MapViewItem() {
  return (
    <div className={map.responsive}>
      <div className={map.responsiveContent}>
        <div className={map.item} style={{ backgroundColor: 'green' }}>
          <div className={classNames(map.footer, flex.horizontal)}>
            <div className={flex.vertical}>
              <span>TITLE</span>
              <span>by Author</span>
            </div>
            <Button primary>Apply</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
