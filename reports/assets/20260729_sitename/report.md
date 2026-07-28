# サイト名重複（あつぺくと／ATSPECT）の是正 — 第1便

作成：あつぺくと制作ターミナル（Sonnet 5）／2026-07-29

証拠＝`atspect-handoff/reports/assets/20260729_sitename/`。Vault実装ログ＝`_実装ログ_サイト名重複是正_20260729_ATSPECT.md`。

---

## 背景（代表実機確認済みの不具合）

- モバイルGoogle＝「あつぺくと / ATSPECT - あつぺくと / ATSPECT」
- PCのGoogle/Bing＝「あつぺくと｜日本の美術と世界をつなぐ – あつぺくと／ATSPECT」
- collections/all＝「すべての作品 – あつぺくと／ATSPECT」
- Googleのサイト名表示＝.co.jpは「ARTS RESPECT」だが.comは「atspect.com」とドメインのまま

## 確定方針（司令塔判断）

1. `<title>`＝「ページ名｜あつぺくと」。トップは連結しない。ページ名が既に「あつぺくと」を含む場合も連結しない。
2. `og:site_name`＝あつぺくと（非ja言語＝ATSPECT）。
3. schema.org Organization/WebSiteのname＝あつぺくと、alternateName＝ATSPECT。会社名ARTS RESPECTはpublisher側のみ（.co.jpのOrganization）。
4. 「あつぺくと／ATSPECT」のスラッシュ連結表記をテーマ内から全廃（8言語対象）。

## 根本原因

`layout/theme.liquid`の`<title>`が、ページ名側に既に「あつぺくと」を含む場合でも無条件に`&ndash; {{ shop.name }}`（shop.name=Shopifyショップ名設定＝現在「あつぺくと／ATSPECT」）を末尾連結していた。

## 修正内容（1件ずつ）

| # | ファイル | 内容 |
|---|---|---|
| 1 | `layout/theme.liquid` | `<title>`をcapture化＋`contains 'あつぺくと'`で連結判定。JS `applySiteNameForLang()`新設（クライアント側でサイト名部分を現在言語に同期＝Liquidは任意URLクエリを読めないため） |
| 2 | `snippets/meta-tags.liquid` | `og:site_name`固定文字列化。WebSite JSON-LD追加（name/alternateName/publisher/SearchAction）。`og_title`フォールバックも固定文字列化 |
| 3 | `sections/header.liquid` | **新規発見＝独自のOrganization（全ページ共通）＋WebSite+SearchAction（indexのみ）JSON-LDが別途存在し、shop.name使用＋alternateNameにカタカナ「アツペクト」混入で、meta-tags.liquid側と同一@idで二重・競合していた。両ブロック撤去してmeta-tags.liquid側へ統合** |
| 4 | `sections/atspect-tokushoho.liquid` | zh-cn/zh-tw版のみ「（あつぺくと／ATSPECT）」→「（ATSPECT）」 |
| 5 | `layout/password.liquid` | 残留点検で発見。`<title>{{ shop.name }}</title>`→`<title>あつぺくと</title>` |
| 6 | `templates/gift_card.liquid` | 残留点検で発見。title/logo_alt/h2の計3箇所、shop.name→固定文字列 |

**確認したが変更不要と判断**：`sections/footer.liquid`のshop.name参照＝Dawn既定footerで、`theme.liquid`は`atspect-footer`セクションのみレンダー＝未到達コードと確認。

## 4ページ×8言語 実測（page-audit.mjs + curl）

| ページ | ja | 他7言語 |
|---|---|---|
| トップ | `あつぺくと｜日本の美術と世界をつなぐ` | title不変（連結なし・方針どおり）／og:site_name=ATSPECT |
| collections/all | `すべての作品｜あつぺくと` | `すべての作品｜ATSPECT` |
| 作家詳細（鈴木千賀子） | `鈴木 千賀子（Suzuki Chikako）｜あつぺくと` | `｜ATSPECT` |
| about | `あつぺくとについて` | **title本文は不変**（後述の制約） |

schema.org（Organization/WebSite）はトップページのみ出力。curl実測：Organization name=あつぺくと/alternateName=ATSPECT/legalName=株式会社ARTS RESPECT。WebSite name=あつぺくと/alternateName=ATSPECT/publisher={name:株式会社ARTS RESPECT,url:atspect.co.jp}。非indexページは0件（設計通り）。

**★制約として記録＝aboutページの`<title>`本文が非ja言語でも日本語のまま。** 理由＝`page_title`自体（Shopify Admin側のSEOタイトル設定）が日本語のみで、これは今回のスコープ（サイト名連結部分の重複解消）とは別の既存アーキテクチャ上の制約。悪化はしていない（従来から同じ）。

## 残留点検（3点セット）

1. 全文検索「あつぺくと／ATSPECT」「あつぺくと/ATSPECT」「ATSPECT／あつぺくと」＝`sections/`・`snippets/`・`layout/`・`templates/`・`config/`・`locales/`で**実行コードとして0件**（残るのは今回の修正理由を説明するLiquidコメントのみ）。
2. カタカナ「アツペクト」＝同様に実行コードとして0件。
3. 理由（shop.name依存）に基づく読解確認＝`sections/footer.liquid`（未使用と確認）を除き、`shop.name`の残存は0件。

Apple Pay merchant capabilities・Web Pixels Manager initDataの`shop.name`＝Shopifyネイティブ注入でテーマファイル外＝本ターミナルから変更不可。

## Codex独立レビュー（1ファイル1観点・計7回）

| # | 対象 | 判定 |
|---|---|---|
| 1 | theme.liquid（タイトル連結条件分岐） | GO |
| 2 | meta-tags.liquid（JSON-LD構造） | GO |
| 3 | header.liquid（重複schema撤去の安全性） | GO |
| 4 | atspect-tokushoho.liquid（是正範囲） | GO |
| 5 | password.liquid | 初回NO-GO（説明コメント内の文字列を誤認）→言い回し修正で再レビューGO |
| 6 | gift_card.liquid | 同上→再レビューGO |
| 7 | meta-tags.liquid og_titleフォールバック | NO-GO（「差分1行のみ」という検証条件に説明コメント追加が抵触。機能面はPASS）＝**不採用**（正当な文書化コメントであり、他ファイルの同種コメントは前例でPASS判定済みのため、過度に厳格な基準と判断） |

## Shopifyショップ名設定の変更手順（実行はしていない）

このターミナルからは変更不可。実画面を開いて確認済み：
1. Shopify Admin → 左サイドバー「一般設定」
2. 「ストアの連絡先情報」セクション → 「あつぺくと／ATSPECT」の行をクリック
3. `/admin/settings/general/store-contact-details`の「ストア名」欄が現在「あつぺくと／ATSPECT」（ヘルパー文言＝「オンラインストアに表示されます。」）
4. ここを変更・保存すれば、Apple Pay・Web Pixels Manager等のネイティブ注入部分も含め全面反映される

## 要田川

- 上記「ショップ名設定」の変更（実行が必要ならご本人操作）。
- aboutページの`<title>`本文が非ja言語でも日本語のままである点＝今回のスコープ外の既存仕様。対応要否はご判断。

## 実施していないこと

- Shopifyショップ名設定そのものの変更（実行不可・手順のみ記載）。
- aboutページ含む`page_title`自体の多言語化（既存仕様・スコープ外）。
- Codexレビュー#7の指摘の反映（不採用と判断・理由は上記）。
