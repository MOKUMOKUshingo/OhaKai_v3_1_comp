# 広島ゆるお茶会 Three.js ヒーロー版

トップ画像を廃止し、ヒーロー部分を丸ごと Three.js 空間に置き換えました。

## 構成
- `index.html`：トップページ
- `event.html`：イベント一覧
- `faq.html`：よくある質問
- `guide.html`：参加方法
- `contact.html`：お問い合わせ
- `data/events.json`：イベント情報。HTMLに直接イベントを書かない構造です。
- `three_scene/`：Three.js専用フォルダ
  - `index.html`：Three.js窓のHTML
  - `scene.css`：Three.js画面上の装飾文字・ガラスUI
  - `scene.js`：3D空間本体

## 編集ポイント
- 画面上の文字装飾：`three_scene/scene.css`
- Three.js空間の建物・水面・操作：`three_scene/scene.js`
- イベント追加：`data/events.json`


## 今回の変更
- Three.js画面上の文字を短文化しました。編集場所：`three_scene/index.html` と `three_scene/scene.css`
- トップページの直近イベントは「画像＋短い1行説明」にしました。編集場所：`data/events.json`
- イベント一覧ページと参加方法ページは以前の構成を残しています。
