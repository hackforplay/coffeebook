import * as React from 'react';
import { render } from 'react-dom';
import 'requestidlecallback';
import { Gamebook } from './index';
import { User, createGamebookStore, actions } from './store';

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
store.dispatch(
  actions.setCollaborators([
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
  ])
);

let container = document.querySelector('#container');
render(<Gamebook code={code} store={store}></Gamebook>, container);
