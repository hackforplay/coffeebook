import classNames from 'classnames';
import * as React from 'react';
import element from './css/element.scss';
import flex from './css/flex.scss';
import { IconButton } from './icon';

export function Header() {
  return (
    <header className={classNames(flex.horizontal, element.header)}>
      <IconButton name="menu">Menu</IconButton>
      <span>TITLE</span>
      <div className={flex.blank}></div>
      <IconButton name="publish">Publish</IconButton>
      <IconButton name="close">Save and Exit</IconButton>
      <IconButton name="settings_applications">Settings</IconButton>
      <IconButton name="person" />
    </header>
  );
}