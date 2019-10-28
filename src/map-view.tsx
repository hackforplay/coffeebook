import classNames from 'classnames';
import * as React from 'react';
import selector from './css/selector.scss';

export type Tab = 'mine' | 'official' | 'others';

export interface MapViewProps {
  selected: number;
  setEditorMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MapView({ selected, setEditorMode }: MapViewProps) {
  const [tab, setTab] = React.useState<Tab>('mine');

  return (
    <>
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
      <button onClick={() => setEditorMode(true)}>Apply</button>
    </>
  );
}
