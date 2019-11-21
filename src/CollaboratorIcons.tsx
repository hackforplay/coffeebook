import classNames from 'classnames';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Icon } from './Button';
import { SS, User } from './store';
import card from './styles/cards.scss';
import style from './styles/collaborator-icons.scss';
import flex from './styles/flex.scss';
import { Transition } from './Transition';

export function CollaboratorIcons({}) {
  const collaborators = useSelector((state: SS) => state.user.collaborators);
  const [selected, setSelected] = React.useState('1');
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [shrink, setShrink] = React.useState(false);

  const needSpace = (collaborators.length - 1) * (36 - 8) + (160 - 8) + 8;

  React.useEffect(() => {
    const resize = () => {
      if (!wrapperRef.current) return;
      setShrink(needSpace > wrapperRef.current.offsetWidth);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [needSpace]);

  const [open, setOpen] = React.useState(false);

  return (
    <div
      ref={wrapperRef}
      className={classNames(style.wrapper, flex.horizontal)}
    >
      {shrink ? (
        <>
          <div className={style.shrink} onClick={() => setOpen(!open)}>
            {open ? <Icon name="arrow_drop_up" /> : collaborators.length}
          </div>
          <Transition
            in={open}
            className={classNames(style.popout, flex.vertical, card.elevated)}
            exiting={style.exiting}
          >
            {collaborators.map(user => (
              <Item key={user.id} open user={user} />
            ))}
          </Transition>
        </>
      ) : (
        collaborators.map(user => (
          <Item
            key={user.id}
            user={user}
            open={user.id === selected}
            onSelect={setSelected}
          />
        ))
      )}
    </div>
  );
}

interface ItemProps {
  user: User;
  open: boolean;
  onSelect?: (id: string) => void;
}

function Item({ user, open, onSelect }: ItemProps) {
  return (
    <div
      className={classNames(
        style.item,
        open && style.open,
        !user.asset && style.nothing
      )}
      style={{ backgroundColor: user.color }}
      onClick={() => onSelect && onSelect(user.id)}
    >
      {open ? (
        <div className={style.asset}>
          {user.asset ? <img src={user.asset.iconUrl} alt="" /> : null}
        </div>
      ) : null}
      {open ? (
        <div className={style.text}>
          <div className={style.userName}>{user.name}</div>
          <div className={style.assetName}>
            {user.asset ? user.asset.name.ja : 'Nothing'}
          </div>
        </div>
      ) : null}
      <img src={user.iconUrl} alt="" />
    </div>
  );
}
