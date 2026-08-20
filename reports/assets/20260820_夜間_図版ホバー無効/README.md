# 証拠：図版ホバー拡大の全体無効＋申し送り3件（2026-08-20 夜間便・あつぺくと制作T／Opus 5）

報告本文＝`reports/seisaku.md` の末尾（2026-08-20 夜間便）。規格＝`reports/assets/20260814_作家ページ表示標準/表示標準書.md` §13。

## 中身

| ファイル | 何の証拠か |
|---|---|
| `atspect.css.diff` | テーマ161 `assets/atspect.css` の差分（37行・末尾に1ブロック追記しただけ） |
| `before-sweep2-1280.json` | **反映前**・幅1280。全ページ種別 × ホバー拡大の全規則を、CDPで `:hover` を強制して実測した生データ |
| `after2-sweep2-1280.json` | **反映後**・幅1280。同上 |
| `after-sweep2-390.json` | **反映後**・幅390。同上 |
| `shots/top-fmedia-*.png` | トップ featured-media の図版（1280/390 × after / before-reproduced） |
| `shots/artwork-others-*.png` | 作品詳細「関連作品」の図版（同上） |
| `shots/dawn-collections-*.png` | `/collections`（Dawnのコレクション一覧）のカード（同上） |
| `shots/lightbox-1280-after-click.png` | **ライトボックスが生きている証拠**（販売作品をクリック→拡大画像966×720で開く） |
| `shots/film-ja-1280-scrolled-frame.png` ほか2枚 | **動画枠が実機では正常に描画される証拠**（ja/de/幅390） |
| `shots/crop-noscroll-ja.png` | **黒く写る側の再現**（スクロールせずに全体スクショを撮ったときの動画枠） |

## 読むときの注意（3つ）

1. **`before-reproduced` は「実際の反映前スクショ」ではありません。**
   今回追記した**1規則だけ**をブラウザ側で外して、反映前の挙動を再現したものです。
   同じ条件（同じ幅・同じ位置・同じ待ち時間）で並べるためにこの方式にしました。外したのはその1規則だけです。
2. **`dawn-collections-390-*` は after / before-reproduced のどちらも `transform: none` です。**
   Dawnのカードの拡大は `@media (min-width: 990px)` の中にあり、**モバイル幅では元から起きない**ためです。
   無効化が効いた証拠ではありません。
3. **測り方**＝マウスを動かすのではなく、**測る要素の直近の祖先に CDP で `:hover` を強制**しています。
   初版はこれを怠り「先頭の候補」を `:hover` にしたため、**画像を持たないカードを測って「拡大なし」と誤判定**しました
   （`/collections` の1件）。数え方が0を返したら数え方を疑う、の実例です。

## 実測の要点

| 場所 | 幅 | 反映後 | 再現した反映前 |
|---|---|---|---|
| トップ featured-media | 1280 | none ／ 720×405 | matrix(1.03) ／ 741.6×417.15 |
| トップ featured-media | 390 | none ／ 350×196.88 | matrix(1.03) ／ 360.5×202.78 |
| 作品詳細 関連作品 | 1280 | none ／ 162×162 | matrix(1.04) ／ 168.48×168.48 |
| 作品詳細 関連作品 | 390 | none ／ 163×163 | matrix(1.04) ／ 169.52×169.52 |
| /collections Dawnカード | 1280 | none ／ 361.28 | matrix(1.03) ／ 372.12 |

テーマ161 `assets/atspect.css`：sha256 `36a6337c…6f9beb` → `0268aec3…34a2bf`（読み戻しバイト一致・20分後も一致）。
バックアップ＝`C:\Vault\ARTS-RESPECT\_backups\_auto\theme161-atspect.css\20260820-212455.bak`（ローカル・公開していません）。
