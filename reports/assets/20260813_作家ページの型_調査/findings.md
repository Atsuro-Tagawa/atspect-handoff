# 作家ページの型——調査の段（リサーチT・2026-08-13）

担当＝あつぺくとリサーチ（ATSPECT_ROLE=リサーチ・実測）／モデル＝Opus 5
**本便は調査のみ。提案・標準案は書きません（設計は後日のFable便）。データも1文字も直していません。**

測定＝ヘッドレスChromeで実際にページを開き、DOMから見出し・欄・分量を取得（下までスクロールして遅延読み込みを起こしてから読む）。
**実測時刻（JST）＝海外第1便 18:20:56／海外第2便 18:25:33／あつぺくと8言語 18:30:08。**
生データ＝同フォルダの `raw_海外_第1便.json` `raw_海外_第2便.json` `raw_あつぺくと_8言語.json`、取得スクリプト＝`_readonly_skeleton.mjs` `_readonly_atspect.mjs`（読み取り専用・書き込みゼロ）。

---

## 0. 開けなかった頁（正直に記録）

| サイト | 結果 |
|---|---|
| MoMA（`moma.org/artists/4675`・`/3315`） | **取得できず**。2回試行（待機7秒・25秒）とも `Just a moment...`（Cloudflareのbot判定）で本文に到達せず。 |
| David Zwirner（`davidzwirner.com/artists/...`） | **取得できず**。`ERROR: The request could not be satisfied`（CDN側で遮断）。 |
| Hauser & Wirth（`hauserwirth.com/artists/...`） | **取得できず**。`Vercel Security Checkpoint`。 |

★**この3サイトについては「調べていない」と扱ってください。** 代わりに SFMOMA・Pace Gallery を入れて、美術館2＋画廊2の対で比較できるようにしました。

---

## 1. ① 頁ごとの欄・並び・分量（実測）

**「分量」＝その見出しから次の見出しまでの文字数（本文の実測値）。** ナビゲーション等の共通部分は除いて主要部のみ挙げます。

### 1-1. 美術館

| サイト／作家 | URL | 欄の並び（上から・実際に出た順） | 分量（本文） |
|---|---|---|---|
| **Tate** / Dame Barbara Hepworth（物故） | `https://www.tate.org.uk/art/artists/dame-barbara-hepworth-1274` | 氏名(H1) → **生没年 `1903–1975`**(H2) → 所属コレクション名 → **Biography**(H3) → Artworks（作品一覧） → Artist as subject → Stories（読み物） → Sketches, letters, etc. → Related art terms → In the shop | 頁全体9,669字／**Biography 約6,930字** |
| **Tate** / Rachel Whiteread（現存） | `https://www.tate.org.uk/art/artists/rachel-whiteread-2319` | 氏名(H1) → **`born 1963`**(H2) → Artworks → Stories → Join in | 頁全体1,825字／**Biography欄が無い** |
| **Guggenheim** / Vasily Kandinsky（物故） | `https://www.guggenheim.org/artwork/artist/vasily-kandinsky` | 氏名(H1) → **`b. 1866, Moscow; d. 1944, Neuilly-sur-Seine, France`** → 伝記本文 → Now on View → Artwork by 〜（作品一覧） | 伝記本文 約2,500字 |
| **Guggenheim** / Jenny Holzer（現存） | `https://www.guggenheim.org/artwork/artist/jenny-holzer` | 氏名(H1) → **`b. 1950, Gallipolis, Ohio`** → 伝記本文 → Artwork by 〜 | 伝記本文 約4,059字 |
| **SFMOMA** / Jackson Pollock（物故） | `https://www.sfmoma.org/artist/Jackson_Pollock/` | 氏名(H1) → **国籍 `American`** → **`1912, Cody, Wyoming`** → **`1956, East Hampton, New York`** → **Biography** → Works in the Collection | 伝記 約1,489字 |
| **SFMOMA** / Yayoi Kusama（現存） | `https://www.sfmoma.org/artist/Yayoi_Kusama/` | 氏名(H1) → **国籍 `Japanese`** → **`1929, Matsumoto, Japan`** → 肖像写真クレジット → **Biography** → Works in the Collection | 伝記 約2,401字 |
| **東京国立近代美術館（英語）** / YAMAGUCHI, Takeo（物故） | `https://www.momat.go.jp/en/artists/aya026` | 氏名(H1) → `1902- 1983` → **Information**（`Names` / `Date of birth` / `Date of death`） → **Identifiers**（`ID`＝`AYA026`） → **MOMAT Collection**（所蔵作品6点・英題＋制作年） | 頁全体1,075字／**散文の略歴は無い** |
| **Art Platform Japan／日本アーティスト事典（英語・国立アートリサーチセンター）** / YAMAGUCHI Takeo（物故） | `https://artplatform.go.jp/en/artists/A2020` | 氏名(H1) → `1902-11-23 \| 1983-04-27` → **Names**（index name／display name／Japanese display name／transliterated hiragana） → **Date of birth** → **Birth place** → **Date of death** → **Death place** → **Gender** → **Fields of activity** → **Selected Bibliography** → **External Sources** → **Authority Files**（VIAF／ULAN／AOW／Benezit／Grove Art Online／NDL／Wikidata） → Continue searching（SHŪZŌ 222件・展覧会 157件） | 頁全体1,869字／**散文の略歴は無い・評価的な文章はゼロ** |

### 1-2. 画廊

| サイト／作家 | URL | 欄の並び | 分量 |
|---|---|---|---|
| **Gagosian** / Jeff Koons（現存） | `https://gagosian.com/artists/jeff-koons/` | 氏名(H1)＋作品スライド → **Works Exhibited** → **About**（伝記） → **Exhibitions** → **From the Quarterly**（自社誌の記事一覧） → **Fairs & Collecting** → **Events & Announcements** → **Museum Exhibitions** → **Press** → **Gagosian Shop** | 頁全体20,396字／**About 2,338字** |
| **Gagosian** / Helen Frankenthaler（物故） | `https://gagosian.com/artists/helen-frankenthaler/` | **上と完全に同じ並び** | 頁全体29,522字／**About 3,415字** |
| **Pace** / Agnes Martin（物故） | `https://www.pacegallery.com/artists/agnes-martin/` | 氏名(H1) → Exhibitions → Journal（自社読み物） → **One-Artist Exhibitions** → **Group Exhibitions** → **Public Collections** → **Periodicals** → **Books and Catalogues** | 頁全体8,234字 |
| **Pace** / Yoshitomo Nara（現存） | `https://www.pacegallery.com/artists/yoshitomo-nara/` | 氏名(H1) → Exhibitions → Journal → **One-Artist Exhibitions** → **Group Exhibitions** → **Periodicals** → **Public Collections** → **Books and Catalogues** | 頁全体7,077字 |

### 1-3. 作家公式

| サイト／作家 | URL | 欄の並び | 分量 |
|---|---|---|---|
| **Studio Olafur Eliasson**（現存） | `https://olafureliasson.net/biography` | **Biography 一本のみ**（見出しはこれだけ） | 5,830字 |

---

## 2. ② 現存作家と物故作家で、同一サイト内の構成がどう変わるか

**同一サイトで両方を測った4組の実測。**

| サイト | 物故 | 現存 | **構成の差** |
|---|---|---|---|
| **Tate** | `1903–1975` ＋ **Biography（6,930字）** ＋ Artist as subject ＋ Sketches, letters, etc. | `born 1963` ／ **Biographyが無い** | **★物故のほうが欄が多い。** 現存は生年1行と作品一覧だけ（頁全体1,825字 vs 9,669字＝約5倍差） |
| **Guggenheim** | `b. 1866, Moscow; d. 1944, …` | `b. 1950, Gallipolis, Ohio` | **欄立ては同一。** 変わるのは1行目に `d.（没年・没地）` が足されるかどうかだけ。伝記は現存のほうが長い場合もある（4,059字 vs 2,500字） |
| **SFMOMA** | 国籍 → `1912, Cody, Wyoming` → `1956, East Hampton, New York` | 国籍 → `1929, Matsumoto, Japan` | **欄立ては同一。** 没年は**生年と同じ書式の行をもう1本足すだけ**。`died` 等の語も、物故・現存を示すラベルも**無い** |
| **Gagosian** | Works／About／Exhibitions／Quarterly／Fairs／Events／Museum Exhibitions／Press／Shop | **同一** | **欄立てが完全に同じ。** 違いは作品クレジットに財団名が入ること（実測＝`© 2018 Helen Frankenthaler Foundation, Inc./Artists Rights Society (ARS), New York`） |
| **Pace** | One-Artist／Group／**Public Collections**／Periodicals／Books | 同じ5点（並び順のみ Public Collections と Periodicals が入れ替わる） | **欄立ては同一** |

**本人の言葉（現存にしか無い情報）の扱い（実測）**
- 美術館（Tate・Guggenheim・SFMOMA・MOMAT・APJ）＝**本人の言葉の欄は無い**（測った範囲で）。
- 画廊＝**独立した欄ではなく、自社の読み物として持つ**。Gagosian＝`From the Quarterly` にインタビュー記事（例＝`In Conversation Jeff Koons Glenn Fuhrman`）。Pace＝`Journal`。**物故作家にも同じ枠があり、そこでは他者による論考が入る**（例＝Frankenthaler の `In Conversation Carol Armstrong and John Elderfield`）。
- 作家公式（Eliasson）＝サイト全体が本人の言葉。

**活動中の情報（現在進行の展覧会・催し）の扱い（実測）**
- 画廊は**現存・物故を問わず**同じ欄を持つ（`Exhibitions` `Museum Exhibitions` `Events & Announcements`）。物故作家でも展覧会情報が並ぶ。
- 美術館は `Now on View`（Guggenheim・Kandinsky＝物故でも表示）のように**自館での展示中かどうか**で出す。

★**注意（同じ語が出る＝同じ意味ではない）**：機械の語カウントでは Tate/Whiteread の頁に `Estate` が6回出ますが、**中身は作品名 `Clapton Park Estate, Mandeville Street, London E5`** であって遺産管理団体ではありません。件数をそのまま「遺産管理の記載あり」と読むと誤ります。

---

## 3. ③ あつぺくとの現行の作家ページ——全欄のライブ実測

**測ったURL＝`https://atspect.com/pages/artist/<handle>?lang=<8言語>`（2026-08-13 18:30:08 JST）**
検体＝`yamaguchi-takeo`（物故・標準）／`suzuki-chikako`（現存・唯一の登録作家）／`fukayama-ryudo`／`nishikawa-yasushi`。

### 3-1. 欄の一覧（上から出る順・出る条件・空のときの見え方）

| # | 欄（日本語ラベル） | 内部キー | 出る条件（**ライブ実測**） | 空のときの見え方 |
|---|---|---|---|---|
| 1 | 分類（アイコン） | `category` | 値があるとき | 要素ごと消える |
| 2 | 作家名（H1） | `name_ja` | 値があるとき | H1ごと消える |
| 3 | 英字名 | `name_en` | 値があるとき | 消える |
| 4 | 呼称（例＝`洋画家`） | `genre` | 値があるとき | 消える |
| 5 | 近影 | `portrait` | 値があるとき | 消える |
| 6 | **`生没年` または `生年`** | `birth_year` / `death_year` | **没年があれば `生没年`、無ければ `生年` に切り替わる**（実測＝山口＝`生没年`／鈴木＝`生年`） | 生没年・出身とも空なら事実欄ごと消える |
| 7 | `出身` | `location` | 値があるとき | ラベルごと消える |
| 8 | ステートメント（1行の要約） | `statement` | 値があるとき | 消える |
| 9 | `作家ページのリンク`／`リンクをコピー`／`QRコード` | （フィールド無し） | **無条件で必ず出る** | — |
| 10 | 代表作画像1・2＋キャプション | `masterpiece_1_image` / `_2_` | **画像があり、かつ画像権利の確認済みフラグが真のときだけ** | ブロックごと消える |
| 11 | `略歴` | `bio_ja`ほか8言語 | 8言語のどれかに値があるとき | 全言語空ならセクションごと消える |
| 12 | `功績` | `artist_i18n.viewpoint` | 値があるとき（**実測＝深山龍洞・鈴木千賀子では非表示**） | セクションごと消える |
| 13 | **`代表作`** | `masterworks_text` | 値があるとき | **dt・ddとも消える（見出しだけ残らない）** |
| 14 | **`収蔵先・記念館`** | `collection_places` | 値があるとき | 同上 |
| 15 | **`所属していた美術団体`** | `groups` | 値があるとき | 同上。**13〜15が3つとも空なら、枠ごと丸ごと消える**（実測＝鈴木千賀子＝この3欄が1つも出ない） |
| 16 | `作家メッセージ` | `message_ja`ほか8言語 | 値があるとき（実測＝鈴木千賀子のみ表示） | セクションごと消える |
| 17 | `著書` | `publications` / `book_history` | 値があるとき（実測＝鈴木千賀子・西川寧で表示） | セクションごと消える |
| 18 | `あつぺくとチャンネル` | `atspect_features.youtube` | 動画IDがあるとき（実測＝鈴木千賀子のみ） | セクションごと消える |
| 19 | `販売作品`（＋`作品画像をクリックすると拡大してご覧いただけます。` `価格・詳細は作品ページでご覧いただけます。` `＋ 拡大して見る` `作品ページへ（価格・詳細）→`） | 作家handleのコレクション | 商品が1点以上あるとき（実測＝鈴木千賀子のみ） | セクションごと消える |
| 20 | `▲ ページトップへ戻る`／`掲載作品の画像・文章の無断転載および複製を禁じます。` | （フィールド無し） | **無条件で必ず出る** | — |

★**Codexに同じファイル（`sections/atspect-artist-detail.liquid`）を独立に読ませ、欄・条件・空のときの挙動を出させました。上の表はライブDOM実測と突き合わせ済みで、食い違いはありませんでした**（Codexが挙げた条件式の例＝`{%- if masterworks_text != blank or collection_places != blank or groups != blank -%}`）。

### 3-2. 8言語での挙動（実測・全8言語）

- **仕組み**＝Shopifyの翻訳機能ではなく、`data-lang` を持つ要素をJavaScriptで出し分け、固定ラベルは `data-aad-i18n` の辞書で差し替える方式。対応＝`ja / en / zh-cn / zh-tw / ko / fr / es / de`。
- **ラベルは8言語すべて切り替わる（実測）**：

| 日本語 | en | zh-cn | zh-tw | ko | fr | es | de |
|---|---|---|---|---|---|---|---|
| 生没年 | Life | 生卒年 | 生卒年 | 생몰년 | Dates | Fechas | Lebensdaten |
| 生年（現存） | Born | 出生 | 出生 | 출생 | Naissance | Nacimiento | Geboren |
| 出身 | From | 出身 | 出身 | 출신 | Origine | Origen | Herkunft |
| 略歴 | Biography | 简历 | 簡歷 | 약력 | Biographie | Biografía | Biografie |
| 功績 | Legacy | 成就 | 成就 | 업적 | Postérité | Legado | Würdigung |
| 代表作 | Selected Works | 代表作 | 代表作 | 대표작 | Œuvres choisies | Obras destacadas | Ausgewählte Werke |
| 収蔵先・記念館 | Collections | 收藏机构 | 收藏機構 | 소장처 | Collections | Colecciones | Sammlungen |
| 所属していた美術団体 | Art Groups | 所属团体 | 所屬團體 | 소속 단체 | Groupes artistiques | Grupos artísticos | Künstlergruppen |
| 作家メッセージ | Artist Statement | 艺术家寄语 | 藝術家寄語 | 작가의 말 | Mot de l’artiste | Mensaje del artista | Künstlerstatement |
| 著書 | Publications | 著作 | 著作 | 저서 | Publications | Publicaciones | Publikationen |
| あつぺくとチャンネル | ATSPECT Channel | ATSPECT频道 | ATSPECT頻道 | ATSPECT 채널 | Chaîne ATSPECT | Canal ATSPECT | ATSPECT-Kanal |
| 販売作品 | Works for Sale | 在售作品 | 在售作品 | 판매 작품 | Œuvres à vendre | Obras en venta | Werke zum Verkauf |

- **★作家名（H1）は8言語すべてで日本語表記のまま**（実測＝`山口 長男`／`鈴木 千賀子`）。英字名は別行に置かれる。
- **代表作・収蔵先・所属団体の「値」は、言語を変えても日本語のまま出る**（実測＝ja以外でも `東京国立近代美術館` `二科会`）。**ラベルだけが翻訳され、中身は翻訳されていない。**

### 3-3. ★実測中に見つかった事実（記録）

**同じ日のうちに、`yamaguchi-takeo` の代表作欄の値が変わりました。**

| 実測時刻（JST） | 代表作欄の値 |
|---|---|
| 2026-08-13 **17:39** | `架、黒い広場` |
| 2026-08-13 **18:30** | **`転、象、竝`** |

本便の51分前に測った値と違います。**当ターミナルは書き込みをしていません**（別のターミナルが是正を当てたと見られます・当Tでは未確認）。
★**「計画を作った時点のライブ」と「当てる時点のライブ」は違う**という恒久ルールの実例として記録します。

---

## 4. ③の差分——3つに仕分け

### 4-1. 「あつぺくとに無い欄」（海外にあって、あつぺくとに無い）

| 欄 | どこにあったか | 中身 |
|---|---|---|
| **個展・グループ展の一覧（Exhibitions / One-Artist / Group）** | Gagosian・Pace | 年次のCV。Paceは物故・現存とも持つ |
| **Press（報道・書評）** | Gagosian・Pace | 記事一覧 |
| **Periodicals / Books and Catalogues（文献）** | Pace | 文献一覧 |
| **Selected Bibliography（参考文献）** | APJ（国立アートリサーチセンター） | 書誌 |
| **Authority Files（典拠ID）** | APJ | VIAF／ULAN／AOW／Benezit／Grove Art Online／NDL／Wikidata |
| **国籍（Nationality）** | SFMOMA | `American` `Japanese` |
| **出生地・没地（Birth place / Death place）** | SFMOMA・Guggenheim・APJ | 都市名まで |
| **性別（Gender）／活動分野（Fields of activity）** | APJ | 典拠項目として |
| **自館の所蔵作品の一覧（画像＋制作年）** | Tate・Guggenheim・SFMOMA・MOMAT | 作品そのものへのリンク |
| **読み物（Stories / Journal / Quarterly）** | Tate・Pace・Gagosian | 記事一覧 |
| **展示中の表示（Now on View）** | Guggenheim | 自館で展示中かどうか |
| **ショップ（In the shop / Gagosian Shop）** | Tate・Gagosian | 関連商品 |

### 4-2. 「あつぺくとにしか無い欄」（測った9サイトのどれにも無かった）

| 欄 | 備考 |
|---|---|
| **`功績`**（英 `Legacy`／独 `Würdigung`） | **見どころ・評価を短く書く欄。海外のどの頁にも該当欄は無い**（伝記本文の中に溶けている） |
| **`所属していた美術団体`** | 海外は「取扱画廊」の概念はあるが、**団体の所属を欄として立てる例は無かった** |
| **`作家メッセージ`（本人の言葉の独立欄）** | 画廊は記事として持つが、**欄としては持たない** |
| **`あつぺくとチャンネル`（YouTube）** | 自社の動画欄 |
| **`作家ページのリンク`／`リンクをコピー`／`QRコード`** | **無条件で全作家に出る。紙からページへ導く前提の欄**。海外には無い |
| **`掲載作品の画像・文章の無断転載および複製を禁じます。`** | 頁末に無条件表示 |
| **8言語の切り替えそのもの** | 測った海外9サイトはいずれも**単一言語**（MOMAT・APJは日英の別URL） |

### 4-3. 「名前は同じだが中身が違う欄」

| 欄 | あつぺくと | 海外 |
|---|---|---|
| **代表作 / Selected Works** | **文字だけの列挙**（例＝`転、象、竝`）。制作年も所蔵先も画像も付かない | **作品そのものの一覧**（画像＋制作年＋寸法＋所蔵/クレジット）。Tate・SFMOMA・MOMATは自館所蔵作品、画廊は取扱作品 |
| **収蔵先・記念館 / Public Collections** | **館名の羅列**（例＝`東京国立近代美術館`）。どの作品がどこか、は書かない | Pace＝CVの一項目として館名を列挙／美術館＝**自館の所蔵作品そのものを見せる**（館名は自明） |
| **略歴 / Biography** | **約110〜200字**（実測＝山口 約113字／深山 約143字／西川 約195字／鈴木 約176字） | **1,489〜6,930字**（Tate 6,930／Eliasson 5,830／Holzer 4,059／Gagosian About 2,338〜3,415／Kusama 2,401／Kandinsky 2,500／Pollock 1,489）。**★1桁〜2桁ちがう** |
| **生没年 / Dates** | `1902–1983` の年だけ。**ラベルが `生没年`／`生年` と変わる**＝没年の有無がラベルに出る | 年に加えて**都市名**まで（`b. 1866, Moscow; d. 1944, Neuilly-sur-Seine, France`）。**ラベル自体は変えず、行を1本足すだけ** |
| **頁全体の分量** | **770〜1,329字** | **1,075〜29,522字**（最小はMOMATの典拠型1,075字、最大はGagosian 29,522字） |

---

## 5. ④ 序列・格付けに繋がる欄が、海外でどう扱われているか（実測）

### 5-1. 受賞歴

**測った9サイト14頁のうち、`Awards` / `Prizes` / `Honors` という独立した欄を持つ頁は、ひとつもありませんでした。**

| 語 | 出現した頁 |
|---|---|
| `Award` | **Studio Olafur Eliasson（作家公式）の伝記本文中に1回だけ**。見出しではない |
| `Prize` / `Honors` / `Honours` | **全14頁で0回** |

- Tate・Guggenheim・SFMOMA・MOMAT・APJ・Gagosian・Pace＝**受賞を欄として立てていない**。
- **Paceは詳細なCV（One-Artist Exhibitions／Group Exhibitions／Public Collections／Periodicals／Books and Catalogues）を持つが、そこにも Awards の項目は無い。**
- ★限定＝**測ったのは作家の頁そのもの**です。別頁のPDF履歴書等までは追っていません（未確認）。

### 5-2. 所属の書き方

| サイト | 実測 |
|---|---|
| Tate・Guggenheim・SFMOMA・MOMAT・APJ | **所属を書く欄が無い**（APJは `Fields of activity`＝`Painting` という分野のみ） |
| Gagosian・Pace | **サイトに載っていること自体が「所属（取扱）」を意味する**構造。頁の中に「所属」という欄は無い |
| **あつぺくと** | **`所属していた美術団体`（例＝`二科会` `日展、謙慎書道会`）を独立の欄として持つ** |

### 5-3. 価格の扱い

| サイト | 実測 |
|---|---|
| Gagosian | **価格の表示は無い。** `Inquire`（問い合わせ）が Frankenthaler頁に1回出るのみ |
| Pace | **価格の表示は無い**（`Price` の語は0回） |
| 美術館5サイト | **価格の概念そのものが無い** |
| **あつぺくと** | 作家ページには**価格を出さず**、`価格・詳細は作品ページでご覧いただけます。` `作品ページへ（価格・詳細）→` と**別ページへ送る**（実測＝鈴木千賀子の頁） |

### 5-4. 序列に読めうる書き方（実測した具体例・語そのもの）

**海外の頁は、評価の言葉を「欄」ではなく「伝記本文の中の1文」として書いています。**
- SFMOMA / Pollock＝`Jackson Pollock was one of the first American artists to achieve a worldwide reputation, and he became an icon of the abstract expressionist movement.`
- SFMOMA / Kusama＝`Yayoi Kusama is one of the world's most iconic and celebrated artists working today.`

★**つまり「受賞歴の欄が無い」ことは「評価を書かない」ことを意味しません。** 欄にしない代わりに、伝記本文の中で評価的な形容（`one of the most celebrated`）を使っています。**あつぺくとは逆に、評価を `功績` という独立の欄に出しています。** どちらを採るかは本便では判断しません（事実のみ）。

---

## 6. Codex二刀流の記録

| 担当 | 内容 | 結果 |
|---|---|---|
| Claude Code（当T） | ライブDOMの実測（海外14頁・あつぺくと18計測） | 本書のとおり |
| **Codex（独立・別系統）** | **ローカルの `sections/atspect-artist-detail.liquid` を読んで、欄・出る条件・空のときの挙動・8言語の仕組みを抽出**（Web検索なし） | **当方のDOM実測と食い違いなし。** 条件式・キー名（`masterworks_text` `collection_places` `groups`）・8言語の方式（`data-lang` + `data-aad-i18n` の辞書差し替え・`AAD_LANGS` に8言語）まで一致 |

★**二刀流の効かせ方**＝同じ対象を「画面から」と「テンプレートから」の別ルートで測り、突き合わせました。

---

## 7. この調査の限界（正直に）

1. **MoMA・David Zwirner・Hauser & Wirth は開けませんでした**（bot対策）。**「調べていない」であって「無い」ではありません。**
2. 各サイトの**下位ページ（CV別頁・PDF履歴書・Biography別頁）は追っていません**。受賞歴が別頁にある可能性は残ります。
3. 分量の数値は**描画された本文の文字数**であり、原稿の文字数とは一致しません。
4. あつぺくとの検体は**4名**（物故3・現存1）。**2026-07-25のエクスポート（597件）を機械で数えた時点では、没年が入っていない作家は鈴木千賀子さま1名だけ**でした。**これはその時点のスナップショットであり、ライブの現況は数え直していません。** 現存側の型は1例だけである点に注意してください。
5. §3-1の表のうち **`分類（アイコン）`と`近影`は、liquidの記述（Codexの読解）に基づくもので、当方はDOM上で個別に確認していません**（画面の見出し・dtとしては現れないため）。`作家名`『英字名』`呼称`『ステートメント』はページ本文で目視確認済みです。
