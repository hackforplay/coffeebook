import classNames from 'classnames';
import * as React from 'react';
import { Balloon } from './balloon';
import { IconButton } from './button';
import flex from './css/flex.scss';
import footer from './css/footer.scss';

export interface FooterProps {
  onItemClick: () => void;
}

export function Footer({ onItemClick }: FooterProps) {
  return (
    <div className={classNames(footer.container, flex.horizontal)}>
      <IconButton name="search" className={footer.search}>
        <Balloon icon="info" delay={5000}>
          Add charactor to the game
        </Balloon>
      </IconButton>
      <FooterItem onClick={onItemClick} />
      <FooterItem onClick={onItemClick} />
      <div className={footer.divider}></div>
      <FooterItem onClick={onItemClick} />
      <FooterItem onClick={onItemClick} />
      <FooterItem onClick={onItemClick} />
      <FooterItem onClick={onItemClick} />
      <FooterItem onClick={onItemClick} />
      <FooterItem onClick={onItemClick} />
    </div>
  );
}

export interface FooterItemProps {
  onClick: () => void;
}

export function FooterItem({ onClick }: FooterItemProps) {
  return (
    <button className={footer.item} onClick={onClick}>
      <div style={{ backgroundColor: 'blue' }}></div>
    </button>
  );
}
