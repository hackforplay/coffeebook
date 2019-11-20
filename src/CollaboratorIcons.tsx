import classNames from 'classnames';
import * as React from 'react';
import style from './styles/collaborator-icons.scss';
import flex from './styles/flex.scss';

export interface User {
  id: string;
  name: string;
  iconUrl: string;
  color: string;
  asset?: {
    name: {
      ja: string;
    };
    iconUrl: string;
  };
}

export function CollaboratorIcons({}) {
  const users: User[] = [
    {
      id: '1',
      name: '名無し',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.0.4/2/svg/1f603.svg',
      color: '#E74C3C',
      asset: {
        name: {
          ja: 'プレイヤー'
        },
        iconUrl:
          'https://assets.hackforplay.xyz/img/6d152a956071fc7b2e7ec0c8590146e4.png'
      }
    },
    {
      id: '2',
      name: 'ボルトナット',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.0.4/2/svg/1f529.svg',
      color: '#3498DB'
    },
    {
      id: '3',
      name: 'プロ司会者',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.0.4/2/svg/1f574-1f3fb.svg',
      color: '#F1C40F'
    },
    {
      id: '4',
      name: 'モンキー',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.0.4/2/svg/1f64a.svg',
      color: '#1ABC9C'
    }
  ];
  const [selected, setSelected] = React.useState('1');
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [shrink, setShrink] = React.useState(false);

  const needSpace = (users.length - 1) * (36 - 8) + (160 - 8) + 8;

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

  return (
    <div
      ref={wrapperRef}
      className={classNames(style.wrapper, flex.horizontal)}
    >
      {shrink ? (
        <div className={style.shrink}>{users.length}</div>
      ) : (
        users.map(user => (
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
  onSelect: (id: string) => void;
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
      onClick={() => onSelect(user.id)}
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
