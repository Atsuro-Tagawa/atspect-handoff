# 是正スクリプト実行結果

実行日時：2026-07-28T16:34:48.671Z　モード：dry-run

## 実行対象の内訳
- 収録件数：62件（実行対象 46件／除外 16件）

## dry-run判定
| ID | ファイル | 判定 | 件数 | 備考 |
|---|---|---|---|---|
| A-1a | sections/atspect-about.liquid | OK | 1 |  |
| B-11 | sections/atspect-about.liquid | OK | 1 |  |
| B-12 | sections/atspect-about.liquid | OK | 1 |  |
| B-13 | sections/atspect-about.liquid | OK | 1 |  |
| B-14 | sections/atspect-about.liquid | OK | 1 |  |
| A-1b | sections/atspect-press-page.liquid | OK | 1 |  |
| A-67-cn | sections/atspect-press-page.liquid | OK | 1 |  |
| A-67-tw | sections/atspect-press-page.liquid | OK | 1 |  |
| A-1c | sections/atspect-artist-registration.liquid | OK | 1 |  |
| B-17b | sections/atspect-artist-registration.liquid | OK | 1 |  |
| B-22 | sections/atspect-artist-registration.liquid | OK | 1 |  |
| B-23 | sections/atspect-artist-registration.liquid | OK | 1 |  |
| B-26_27b | sections/atspect-artist-registration.liquid | OK | 1 |  |
| A-2 | sections/atspect-artist-guide.liquid | OK | 1 |  |
| B-16 | sections/atspect-artist-guide.liquid | OK | 1 |  |
| B-17a | sections/atspect-artist-guide.liquid | OK | 1 |  |
| B-19 | sections/atspect-artist-guide.liquid | OK | 1 |  |
| A-3a | sections/atspect-faq.liquid | OK | 1 |  |
| A-10 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| A-46 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-29_30 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-31 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-32_51 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-33 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-56 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-34 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-47_48_49 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-37_58 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-59 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-38_52 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-40 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-41 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-50 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| B-60 | sections/atspect-terms-artist.liquid | OK | 1 |  |
| A-65 | sections/atspect-footer.liquid | OK | 1 |  |
| A-69 | sections/atspect-artwork-detail.liquid | OK | 1 |  |
| B-25 | sections/atspect-artist-cancellation.liquid | OK | 1 |  |
| B-26_27a | sections/atspect-artist-cancellation.liquid | OK | 1 |  |
| B-61 | sections/atspect-tokushoho.liquid | OK | 1 |  |
| B-62_63a | sections/atspect-tokushoho.liquid | OK | 1 |  |
| B-62_63b | sections/atspect-tokushoho.liquid | OK | 1 |  |
| B-62_63c | sections/atspect-tokushoho.liquid | OK | 1 |  |
| B-62_63d | sections/atspect-tokushoho.liquid | OK | 1 |  |
| B-64a | sections/atspect-tokushoho.liquid | OK | 1 |  |
| B-64b | sections/atspect-tokushoho.liquid | OK | 1 |  |
| B-64c | sections/atspect-tokushoho.liquid | OK | 1 |  |

## 除外件（fixes.json内・excluded:true）
| ID | 出典 | 除外理由 |
|---|---|---|
| B-66 | master-findings#66 | 対応不要と訂正済み＝Vault確定事項マスター381行目に代表指定・一字一句固定の確定文言と明記されている。収録しない。 |
| A-3c | master-findings#3 / fix-orders.md #3-c | artwork-detail.liquidの「ご購入の流れ」5項目リスト（8言語）を1文の誘導文へ置き換える構造変更。7言語の確定訳がまだ届いておらず、日本語だけ部分適用すると8言語構造が壊れるため、翻訳到着まで収録しない。 |
| B-15 | master-findings#15 / fix-orders-B.md #15 | ★司令塔判断待ち＝2箇所の重複（常時表示/結果0件時のみ表示）が意図的な補強か単純な重複か未確定のため、確定文が無い。 |
| B-18 | master-findings#18 | A-2の統合で対応済み。追加のスクリプト操作は不要。 |
| B-20 | master-findings#20 | 実測の結果、本番に既に反映済み（対応不要）。 |
| B-24 | master-findings#24 / fix-orders-B.md #24 | 文言の置換ではなくハニーポット欄の視覚的非表示化という技術的対応のため、テキスト置換スクリプトの対象外。制作T・システム開発Tで別途実装。 |
| B-28 | master-findings#28 / fix-orders-B.md #28 | ★司令塔判断待ち＝master-findings自身が「表現を平易にするか、現状維持するかは要判断」としており確定文が無い。 |
| B-36 | master-findings#36 | A-8として本番に既に反映済み（対応不要）。 |
| B-39 | master-findings#39 | A-46の置換で自然に解消されるため追加操作は不要。 |
| B-42 | master-findings#42 | B-41の統合で対応済み。追加操作は不要。 |
| B-43 | master-findings#43 | A（71行目相当）はB-41で対応済み。B（291行目）は現状維持のため変更なし。 |
| B-44 | master-findings#44 | 314行目は同意記録の保管という固有情報を持つため現状維持。214行目側はB-47_48_49で対応済み。 |
| B-45 | master-findings#45 / fix-orders-B.md #45 | ★司令塔判断待ち＝リサーチTとCodexで評価が分かれており、意図的な重複の可能性があるため確定文が無い。 |
| B-68 | master-findings#68 / fix-orders-B.md #68 | 対象がテーマファイルではなくShopify商品（舟奏楽）の説明フィールドのため、本スクリプトの対象外。Shopify管理画面で別途対応。 |
| B-70 | master-findings#70 / fix-orders-B.md #70 | ★司令塔判断待ち＝master-findings自身が「現状維持でよいか検討」としており確定文が無い。 |
| B-72 | master-findings#72 / fix-orders-B.md #72 | プライバシー関連のため本スクリプトには収録しない（法的文書・別経路で反映）。プライバシー1本化の実装が先に行われれば、この段落自体が削除されるため本件は自動的に解消される。 |
