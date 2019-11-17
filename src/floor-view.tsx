import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from './button';
import flex from './css/flex.scss';
import floor from './css/floor-view.scss';
import { EditorMode } from './root';
import { actions, SS } from './store';

export interface FloorViewProps {
  setEditorMode: React.Dispatch<React.SetStateAction<EditorMode>>;
}

export interface FloorItemProps {
  appendable?: boolean;
  color: string;
  index: number;
  selected?: boolean;
  setEditorMode: React.Dispatch<React.SetStateAction<EditorMode>>;
}

export function FloorView({ setEditorMode }: FloorViewProps) {
  const selected = useSelector((state: SS) => state.floor.selected);

  return (
    <>
      {['green', 'blue', 'pink', 'green'].map((color, i, array) => (
        <FloorItem
          key={i}
          index={i + 1}
          color={color}
          setEditorMode={setEditorMode}
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
  setEditorMode
}: FloorItemProps) {
  const dispatch = useDispatch();

  const onClick = React.useCallback(() => {
    dispatch(actions.setFloor(index));
    setEditorMode(EditorMode.Map);
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
      {appendable ? <Icon name='add' className={floor.append} /> : null}
    </button>
  );
}
