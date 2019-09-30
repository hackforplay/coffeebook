import * as React from 'react';
import { render } from 'react-dom';
import { Page } from './page';

let code = `
まずは、プレイヤーをどこに出すかを決めましょう！

---

\`\`\`coffeescript
rule.ゲームがはじまったとき ->
	await Hack.changeMap 'map1'
	rule.つくる 'プレイヤー', 3, 5, 'map1', Dir.した
\`\`\`
\`\`\`coffeescript
require '../game'
window.__sandbox_context_name = 'プレイヤー' # おまじない
\`\`\`

---

# プレイヤーの中身

ここからは、プレイヤーの強さや動きについて書かれています

---

\`\`\`coffeescript
rule.つくられたとき ->
	Player.set @
	await @costume 'ゆうしゃ男' # 見た目をきめる
	@family = Family.プレイヤー # なかまをきめる
	@n 'たいりょく', 'イコール', 3 # 体力をきめる
	@n 'こうげきりょく', 'イコール', 1 # こうげき力をきめる
	# つくられたとき
\`\`\`
\`\`\`coffeescript
rule.たおされたとき ->
	# たおされたとき
\`\`\`
\`\`\`coffeescript
rule.こうげきするとき ->
	# こうげきするとき
\`\`\`
\`\`\`coffeescript
rule.じかんがすすんだとき ->
	# じかんがすすんだとき
\`\`\`
\`\`\`coffeescript
rule.item = Rule.Anyone
rule.こうげきされたとき (item) ->
	# こうげきされたとき
\`\`\`
\`\`\`coffeescript
rule.item = Rule.Anyone
rule.ぶつかったとき (item) ->
	# ぶつかったとき
\`\`\`
\`\`\`coffeescript
rule.item = Rule.Anyone
rule.メッセージされたとき (item) ->
	# メッセージされたとき
\`\`\`
\`\`\`coffeescript
rule.すすめなかったとき ->
	# すすめなかったとき
\`\`\`
\`\`\`coffeescript
rule.item = Rule.Anyone
rule.みつけたとき (item) ->
	# みつけたとき
\`\`\`
\`\`\`coffeescript
rule.item = Rule.Anyone
rule.しょうかんされたとき (item) ->
	# しょうかんされたとき
\`\`\`
\`\`\`coffeescript
rule.つねに ->
	# つねに
\`\`\`
\`\`\`coffeescript
rule.タップされたとき ->
	# タップされたとき
\`\`\`
`;

let container = document.querySelector('#code');
render(<Page code={code}></Page>, container);
