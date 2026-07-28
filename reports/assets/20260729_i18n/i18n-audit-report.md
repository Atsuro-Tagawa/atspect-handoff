# 8言語突き合わせ検査 結果

実行日時：2026-07-28T16:49:17.490Z　対象：`atspect-theme/sections/*.liquid`（89ファイル）

読み取りのみ。是正はしていません。新規に見つかった件も一覧にするところまでです。

## サマリ

| 種別 | 件数 |
|---|---|
| 1. 日本語にあるが7言語のいずれかに対応なし | 1 |
| 2. 7言語にあるが日本語に対応なし | 0 |
| 3. 非日本語ブロックへのひらがな・カタカナ混入 | 3 |
| 4. 意図的な日本語限定構造（違反ではない・別枠） | 2 |
| 未知の多言語風構造（要確認） | 11 |

## 1. 日本語にあるが7言語のいずれかに対応なし

| file | line | base | present | missingEmpty | missingAbsent | 既知／新規 | 備考 |
|---|---|---|---|---|---|---|---|
| sections/atspect-artwork-detail.liquid | 298 | aw-l | ["ja"] | ["en","zh-cn","zh-tw","ko","fr","es","de"] | [] | 既知 | master-findings#69／fix-orders.md A-69・本日是正指示票に収録済み（決済文言7言語欠落） |

## 2. 7言語にあるが日本語に対応なし

該当なし。

## 3. 非日本語ブロックへのひらがな・カタカナ混入

| file | line | base | lang | snippet | 既知／新規 | 備考 |
|---|---|---|---|---|---|---|
| sections/atspect-footer.liquid | 61 | footer-l | zh-tw | 基於特定商業交易法の標示 | 既知 | master-findings#65／fix-orders.md A-65・本日是正指示票に収録済み（zh-tw「の」誤字） |
| sections/atspect-press-page.liquid | 21 | pl-l | zh-cn | あつぺくとは日本美术家及其作品信息的艺术平台。欢迎媒体朋友就作家介绍、采访协助等相关事宜与我们联系。 | 既知 | master-findings#67／fix-orders.md A-67・本日是正指示票に収録済み（zh-cn「あつぺくとは」未翻訳） |
| sections/atspect-press-page.liquid | 22 | pl-l | zh-tw | あつぺくとは日本藝術家及其作品資訊的藝術平台。歡迎媒體朋友就作家介紹、採訪協助等相關事宜與我們聯繫。 | 既知 | master-findings#67／fix-orders.md A-67・本日是正指示票に収録済み（zh-cn「あつぺくとは」未翻訳） |

## 4. 意図的な日本語限定構造（違反ではない・別枠一覧）

| file | line | class | 既知／新規 | 備考 |
|---|---|---|---|---|
| sections/atspect-privacy.liquid | 81 | pv-jaonly | 既知 | privacy-unified-draft.mdで既に把握・削除対象として扱い済み（pv-jaonly構造） |
| sections/atspect-privacy.liquid | 147 | pv-jaonly | 既知 | privacy-unified-draft.mdで既に把握・削除対象として扱い済み（pv-jaonly構造） |

## 未知の多言語風構造（要確認・是正なし）

| file | line | class | shownFor | 既知／新規 | 備考 |
|---|---|---|---|---|---|
| sections/atspect-artwork-detail.liquid | 98 | awt-l--latin | en,zh-cn,zh-tw,ko,fr,es,de | **新規** |  |
| sections/atspect-collection.liquid | 403 | awt-l--latin | en,zh-cn,zh-tw,ko,fr,es,de | **新規** |  |
| sections/atspect-collection.liquid | 407 | awt-l--latin | en,zh-cn,zh-tw,ko,fr,es,de | **新規** |  |
| sections/atspect-collector-cta.liquid | 62 | cawt--latin | en,zh-cn,zh-tw,ko,fr,es,de | **新規** |  |
| sections/atspect-collector-cta.liquid | 64 | cawt--latin | en,zh-cn,zh-tw,ko,fr,es,de | **新規** |  |
| sections/atspect-search.liquid | 95 | awt-l--latin | en,zh-cn,zh-tw,ko,fr,es,de | **新規** |  |
| sections/atspect-search.liquid | 98 | awt-l--latin | en,zh-cn,zh-tw,ko,fr,es,de | **新規** |  |
| sections/atspect-ticker.liquid | 136 | atspect-qb__original | en,zh-cn,zh-tw,ko,fr,es,de,ja,default | **新規** |  |
| sections/atspect-ticker.liquid | 136 | atspect-qb__original | en,zh-cn,zh-tw,ko,fr,es,de,ja,default | **新規** |  |
| sections/atspect-ticker.liquid | 138 | atspect-qb__original | en,zh-cn,zh-tw,ko,fr,es,de,ja,default | **新規** |  |
| sections/atspect-ticker.liquid | 138 | atspect-qb__original | en,zh-cn,zh-tw,ko,fr,es,de,ja,default | **新規** |  |

**目視で確認した文脈（是正はしていません・参考情報のみ）**：

- `awt-l--latin`／`cawt--latin`＝作品タイトル等の表示。コメントに「2026-07-23代表確定＝全言語で《》統一・非日本語のイタリックは維持」「B案：言語連動・単一表示。日本語UI＝原題／非日本語UI＝en→romaji→原題（product_i18nのみ・捏造翻訳なし）」とあり、8言語それぞれに個別翻訳を与えるpv-l方式とは異なり、非日本語UIの7言語すべてに「英語タイトル→ローマ字→原題」の同一フォールバック値を1つだけ表示する、意図的な別方式と見られます。翻訳漏れではなく方式の違いの可能性が高いですが、本検査ツールの対象外の構造のため未知として報告しています。断定はしていません。
- `atspect-qb__original`＝引用（ticker）ブロック。コメントに「原文以外の表示言語のときだけ、原文を併記（訳であることを明示＝捏造ゼロ）」とあり、`{%- if orig_lang == 'en' -%}`のようなLiquid側の条件分岐で表示を切り替えており、CSSのdisplay:noneによる言語トグルではなく、テンプレート側のif分岐で実現されています。本検査ツールはCSS側のdata-lang条件分岐とクラスの--lang方式のみを対象としているため、この方式は検出対象外の第3の方式として「未知」に分類されました。翻訳漏れではなく検出方式の違いの可能性が高いですが、断定はしていません。

## まとめ

- 検出総数＝17件。
- うち新規（本日これまでの票に未収録）＝約11件（未知の多言語風構造11件を含む）。
- 新規の分は是正していません。一覧化のみです。

### この検査の既知の限界（正直な記載）

- 対象は`sections/*.liquid`のみです。`snippets/`配下は対象外です（今回の走査範囲外）。
- グルーピングは文書内の出現順の連続性に基づく簡易ヒューリスティックです。厳密なDOM解析ではないため、通常とかけ離れた入れ子構造では誤ってグループを分割・統合する可能性があります。
- カナ混入チェックの抜粋範囲（タグ直後から次の閉じタグ/Liquidタグ/次言語タグ/400文字のいずれか手前まで）は簡易ヒューリスティックです。極端に長い一文（改行を挟む長文）では途中で打ち切られる場合があります。
- 固有名詞の除外リストは`あつぺくと`のみを収録しています。他の固有名詞（作家名・作品名等）でカナ混入が検出された場合は、目視で固有名詞かどうかを判断してください。
