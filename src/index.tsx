import * as React from 'react';
import { render } from 'react-dom';
import { Page } from './page';

let code = `
# This is Markdown

text text text

---

---

\`\`\`coffeescript
require '../game'
window.__sandbox_context_name = 'プレイヤー' # おまじない

rule.つくられたとき ->
	Player.set @
	await @costume 'ゆうしゃ男' # 見た目をきめる
	@family = Family.プレイヤー # なかまをきめる
	@n 'たいりょく', 'イコール', 3 # 体力をきめる
	@n 'こうげきりょく', 'イコール', 1 # こうげき力をきめる
	# つくられたとき

rule.たおされたとき ->
	# たおされたとき


rule.こうげきするとき ->
	# こうげきするとき


rule.じかんがすすんだとき ->
	# じかんがすすんだとき


# ここから こうげきされたとき
rule.item = Rule.Anyone
rule.こうげきされたとき (item) ->
	# こうげきされたとき

# ここまで こうげきされたとき

# ここから ぶつかったとき
rule.item = Rule.Anyone
rule.ぶつかったとき (item) ->
	# ぶつかったとき

# ここまで ぶつかったとき

# ここから メッセージされたとき
rule.item = Rule.Anyone
rule.メッセージされたとき (item) ->
	# メッセージされたとき

# ここまで メッセージされたとき

# ここから すすめなかったとき
rule.すすめなかったとき ->
	# すすめなかったとき

# ここまで すすめなかったとき

# ここから みつけたとき
rule.item = Rule.Anyone
rule.みつけたとき (item) ->
	# みつけたとき

# ここまで みつけたとき

# ここから しょうかんされたとき
rule.item = Rule.Anyone
rule.しょうかんされたとき (item) ->
	# しょうかんされたとき

# ここまで しょうかんされたとき

# ここから つねに
rule.つねに ->
	# つねに

# ここまで つねに

# ここから タップされたとき
rule.タップされたとき ->
	# タップされたとき

# ここまで タップされたとき

\`\`\`

---

This is also markdown.

text text text \`code\`

`;

let container = document.querySelector('#code');
render(<Page code={code}></Page>, container);
