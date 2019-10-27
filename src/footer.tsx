import classNames from 'classnames';
import * as React from 'react';
import flex from './css/flex.scss';
import footer from './css/footer.scss';
import { IconButton } from './icon';

export function Footer() {
  return (
    <div className={classNames(footer.container, flex.horizontal)}>
      <IconButton name="search" className={footer.search} />
      <FooterItem />
      <FooterItem />
      <div className={footer.divider}></div>
      <FooterItem />
      <FooterItem />
      <FooterItem />
      <FooterItem />
      <FooterItem />
      <FooterItem />
    </div>
  );
}

export function FooterItem() {
  return (
    <button className={footer.item}>
      <div style={{ backgroundColor: 'blue' }}></div>
    </button>
  );
}
