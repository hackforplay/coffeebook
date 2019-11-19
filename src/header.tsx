import classNames from 'classnames';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from './Button';
import { actions } from './store';
import element from './styles/element.scss';
import flex from './styles/flex.scss';

export function Header() {
  const dispatch = useDispatch();
  const debug = React.useCallback(() => {
    dispatch(actions.incrementVersion());
  }, []);

  return (
    <header className={classNames(flex.horizontal, element.header)}>
      <IconButton name="menu" vertical>
        Menu
      </IconButton>
      <span>TITLE</span>
      <div className={flex.blank}></div>
      <IconButton name="cloud" onClick={debug}>
        Debug
      </IconButton>
      <IconButton name="publish" primary>
        Publish
      </IconButton>
      <IconButton name="close" primary>
        Save and Exit
      </IconButton>
      <IconButton name="settings_applications" vertical>
        Settings
      </IconButton>
    </header>
  );
}
