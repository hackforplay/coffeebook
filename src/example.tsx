import { uniqueId } from 'lodash-es';
import * as React from 'react';
import { render } from 'react-dom';
import 'requestidlecallback';
import { Gamebook } from './index';
import { actions, createGamebookStore, GameMap, User } from './store';

let code = `
\`\`\`coffeescript キャラクターをステージに出す
window.__sandbox_context_name = 'プレイヤー' # おまじない
rule.ゲームがはじまったとき ->
  await Hack.changeMap 'map1'
  rule.つくる 'プレイヤー', 3, 5, 'map1', Dir.した
\`\`\`

---

# プレイヤーの中身

ここからは、プレイヤーの強さや動きについて書かれています

---

\`\`\`coffeescript つくられたとき
rule.つくられたとき ->
  Player.set @
  await @costume 'ゆうしゃ男' # 見た目をきめる
  @family = Family.プレイヤー # なかまをきめる
  @hp = 3 # 体力をきめる
  @atk = 1 # こうげき力をきめる
  # つくられたとき
  if @hp < 1
    if @atk < 1
      @hp
    else
      @atk
  else
    @family
\`\`\`
\`\`\`coffeescript たおされたとき
rule.たおされたとき ->
  # たおされたとき
\`\`\`
\`\`\`coffeescript こうげきするとき
rule.こうげきするとき ->
  # こうげきするとき
\`\`\`
\`\`\`coffeescript じかんがすすんだとき
rule.じかんがすすんだとき ->
  # じかんがすすんだとき
\`\`\`
\`\`\`coffeescript こうげきされたとき
rule.item = Rule.Anyone
rule.こうげきされたとき (item) ->
  # こうげきされたとき
\`\`\`
\`\`\`coffeescript ぶつかったとき
rule.item = Rule.Anyone
rule.ぶつかったとき (item) ->
  # ぶつかったとき
\`\`\`
\`\`\`coffeescript メッセージされたとき
rule.item = Rule.Anyone
rule.メッセージされたとき (item) ->
  # メッセージされたとき
\`\`\`
\`\`\`coffeescript すすめなかったとき
rule.すすめなかったとき ->
  # すすめなかったとき
\`\`\`
\`\`\`coffeescript みつけたとき
rule.item = Rule.Anyone
rule.みつけたとき (item) ->
  # みつけたとき
\`\`\`
\`\`\`coffeescript しょうかんされたとき
rule.item = Rule.Anyone
rule.しょうかんされたとき (item) ->
  # しょうかんされたとき
\`\`\`
\`\`\`coffeescript つねに
rule.つねに ->
  # つねに
\`\`\`
\`\`\`coffeescript タップされたとき
rule.タップされたとき ->
  # タップされたとき
\`\`\`

\`\`\`coffeescript おまじない
require '../game'
\`\`\`
`;

const store = createGamebookStore();
store.dispatch(actions.setCollaborators(users(4)));
store.dispatch(actions.setStages(gameMaps(4)));
store.dispatch(actions.setMaps(gameMaps(50)));

let container = document.querySelector('#container');
render(<Gamebook code={code} store={store}></Gamebook>, container);

function users(length: number) {
  return Array.from({ length }).map<User>(() => ({
    id: uniqueId(),
    name: random('Kou', 'Tsune', 'Gino', 'Maki'),
    color: random('#E74C3C', '#3498DB', '#F1C40F', '#1ABC9C'),
    iconUrl: `https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.0.4/2/svg/${random(
      '2764',
      '270f',
      '1f529',
      '1f64a',
      '1f64a',
      '1f574'
    )}.svg`,
    asset: random(
      {
        name: {
          ja: 'プレイヤー'
        },
        iconUrl:
          'https://assets.hackforplay.xyz/img/6d152a956071fc7b2e7ec0c8590146e4.png'
      },
      {
        name: {
          ja: '青色のスライム'
        },
        iconUrl:
          'https://assets.hackforplay.xyz/img/93a1462a4800cccde0887f580ef46298.png'
      },
      undefined
    )
  }));
}

function gameMaps(length: number) {
  return Array.from({ length }).map<GameMap>(() => ({
    id: uniqueId(),
    name: random('Forest', 'Town', 'Dangeon', 'Field'),
    authorName: random('Kou', 'Tsune', 'Gino', 'Maki'),
    color: random('red', 'green', 'blue', 'yellow')
  }));
}

function random<T>(...args: T[]): T {
  return args[(args.length * Math.random()) >> 0];
}
