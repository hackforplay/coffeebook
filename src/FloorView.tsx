import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from './Button';
import flex from './styles/flex.scss';
import floor from './styles/floor-view.scss';
import { actions, EditorMode, SS } from './store';

export interface FloorViewProps {}

export interface FloorItemProps {
  appendable?: boolean;
  color: string;
  index: number;
  selected?: boolean;
}

export function FloorView({  }: FloorViewProps) {
  const selected = useSelector((state: SS) => state.floor.selected);

  return (
    <>
      {['green', 'blue', 'pink', 'green'].map((color, i, array) => (
        <FloorItem
          key={i}
          index={i + 1}
          color={color}
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
  selected
}: FloorItemProps) {
  const dispatch = useDispatch();

  const onClick = React.useCallback(() => {
    dispatch(actions.setFloor(index));
    dispatch(actions.setEditorMode(EditorMode.Map));
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
