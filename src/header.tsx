import classNames from 'classnames';
import * as React from 'react';
import { IconButton } from './Button';
import element from './styles/element.scss';
import flex from './styles/flex.scss';

export function Header() {
  return (
    <header className={classNames(flex.horizontal, element.header)}>
      <IconButton name="menu" vertical>
        Menu
      </IconButton>
      <span>TITLE</span>
      <div className={flex.blank}></div>
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
