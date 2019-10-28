import classNames from 'classnames';
import * as React from 'react';
import flex from './css/flex.scss';
import floors from './css/floors.scss';
import { Icon } from './icon';

export interface FloorItemProps {
  appendable?: boolean;
  color: string;
  index: number;
  selected?: boolean;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

export function Floors() {
  const [selected, setSelected] = React.useState(1);

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
        floors.item,
        selected && floors.selected,
        flex.vertical
      )}
      onClick={onClick}
    >
      <span className={floors.number}>{index}</span>
      <div className={floors.image} style={{ backgroundColor: color }}></div>
      {appendable ? <Icon name="add" className={floors.append} /> : null}
    </button>
  );
}
