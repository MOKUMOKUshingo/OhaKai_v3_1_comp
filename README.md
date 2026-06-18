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


## v3 スマホ改善
- ヘッダーをスマホ用に2段/コンパクト化
- Three.jsヒーローを `svh` 基準に変更し、スマホブラウザのアドレスバー変動に対応
- Three.js上の文字装飾をスマホでは上部コンパクト表示に変更
- 中部・下部の3D空間が見えるように、説明文を短縮表示
- スマホではカメラ位置/FOVを調整し、広島空間が広く見えるように変更


## Instagram投稿画像の差し替え

トップページのInstagram欄は、`data/instagram.json` と `assets/instagram/` で管理しています。

1. Instagramに載せたい画像を `assets/instagram/` に入れる
2. `data/instagram.json` の `posts` に画像パスとキャプションを追加する
3. GitHubにアップロードする

公式Instagramリンク: https://www.instagram.com/yuru_ocha_kai

## ホームページ制作代行の表示

トップページとお問い合わせページに、
「最安値、ホームページ制作代行。LINEもしくはインスタのDMにてお問い合わせください。」
の導線を追加しています。


## 今回の更新

- 参加費表記を「500円＋飲食代」から「1,000円＋飲食代」に変更しました。
- `data/events.json` に「ワールドカップ日本戦 応援お茶会」を追加しました。
- イベント画像 `assets/images/worldcup_japan_event.png` を追加しました。
- イベント一覧は `data/events.json` の日付順に表示されます。


## 今回の更新
- 広島駅ゆるお茶会（6/20 14:00）を削除しました。
- サッカー日本代表 応援お茶会を紙屋町に変更しました。
- 集客用画像 `assets/images/worldcup_japan_kamiyacho.png` を追加しました。


## スマホ版Three.js操作
スマホでは、初期状態でThree.js iframeのタッチ操作を無効化しています。
`3D空間を操作する` ボタンを押した時だけ iframe の `pointer-events` を有効化し、ページスクロールを邪魔しない構造にしています。
編集箇所は `index.html` の `threeHero`、`style.css` の `Mobile Three.js touch gate`、`main.js` の `initThreeTouchGate()` です。


## 大鳥居3Dモデル
`assets/models/torii.glb` を `three_scene/scene.js` から読み込む構成です。位置・大きさ・向きは `realToriiRoot.position`、`realToriiRoot.rotation.y`、`targetHeight` を編集すると調整できます。


## v3.4 変更点

- サイト全体を新緑の明るい配色へ調整しました。
- Three.js空間の空・水面・草木の色も、春〜初夏の明るい雰囲気に寄せています。


## v3.5 updates
- PCヘッダーにホバー式ドロップダウンを追加
- フッターを福岡カフェ会風のカテゴリリンク構成に変更
- 参加者の声・注意事項・キャンセル・匿名報告ページを追加


## v3.6 修正内容

- ヘッダー内のドロップダウンが常時表示され、上部が巨大化する問題を修正しました。
- PCではナビゲーションにカーソルを当てた時だけ下にメニューが開きます。
- スマホでは上部メニューを横スクロールのコンパクト表示にし、本文に進みやすくしました。
- フッターはカテゴリ別リンクを維持しつつ、全体の余白と行間を整理しました。
