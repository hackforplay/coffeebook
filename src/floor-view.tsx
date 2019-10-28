import classNames from 'classnames';
import * as React from 'react';
import flex from './css/flex.scss';
import floor from './css/floor-view.scss';
import { Icon } from './icon';

export interface FloorViewProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

export interface FloorItemProps {
  appendable?: boolean;
  color: string;
  index: number;
  selected?: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

export function FloorView({ selected, setSelected }: FloorViewProps) {
  return (
    <>
      {['green', 'blue', 'pink', 'green'].map((color, i, array) => (
        <FloorItem
          key={i}
          index={i + 1}
          color={color}
          setSelected={setSelected}
          selected={i + 1 === selected}
          appendable={i + 1 === array.length}
        />
      ))}
    </>
  );
}

export function FloorItem({
  appendable,
  color,
  index,
  selected,
  setSelected
}: FloorItemProps) {
  const onClick = React.useCallback(() => {
    setSelected(index);
  }, [index]);

  return (
    <button
      className={classNames(
        floor.item,
        selected && floor.selected,
        flex.vertical
      )}
      onClick={onClick}
    >
      <span className={floor.number}>{index}</span>
      <div className={floor.image} style={{ backgroundColor: color }}></div>
      {appendable ? <Icon name="add" className={floor.append} /> : null}
    </button>
  );
}
