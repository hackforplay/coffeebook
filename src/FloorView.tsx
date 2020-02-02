import classNames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from './Button';
import { actions, EditorMode, GameMap, SS } from './store';
import flex from './styles/flex.scss';
import floor from './styles/floor-view.scss';

export interface FloorViewProps {}

export interface FloorItemProps {
  map: GameMap;
  stage: number;
  selected?: boolean;
}

export function FloorView({}: FloorViewProps) {
  const selected = useSelector((state: SS) => state.floor.selected);
  const stages = useSelector((state: SS) => state.floor.stages);

  return (
    <>
      {stages.map((map, i) => (
        <FloorItem
          key={i}
          stage={i + 1}
          map={map}
          selected={i + 1 === selected}
        />
      ))}
      <AppendButton stage={stages.length + 1} />
    </>
  );
}

export function FloorItem({ map, stage, selected }: FloorItemProps) {
  const dispatch = useDispatch();

  const onClick = React.useCallback(() => {
    dispatch(actions.setFloor(stage));
    dispatch(actions.setEditorMode(EditorMode.Map));
  }, [stage]);

  return (
    <button
      className={classNames(
        floor.item,
        selected && floor.selected,
        flex.vertical
      )}
      onClick={onClick}
    >
      <span className={floor.number}>{stage}</span>
      <div
        className={floor.image}
        style={{ backgroundImage: `url(${map.thumbnailUrl})` }}
      ></div>
    </button>
  );
}

interface AppendButtonProps {
  stage: number;
}

function AppendButton({ stage }: AppendButtonProps) {
  const onClick = React.useCallback(() => {}, []);

  return (
    <button className={classNames(floor.item, flex.vertical)} onClick={onClick}>
      <span className={floor.number}>{stage}</span>
      <div className={floor.image} style={{ backgroundColor: 'green' }}></div>
      <Icon name="add" className={floor.append} />
    </button>
  );
}
