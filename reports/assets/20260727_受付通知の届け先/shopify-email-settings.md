# Shopify受付通知の届け先＝Admin API実測結果（2026-07-27・読み取り専用）

対象ストア：`arts-respcet.myshopify.com`（表示ドメイン `atspect.com`）／API version：`2026-07`

## GraphQL Admin API（`shop { email contactEmail }`）

| フィールド | 値 | 公式スキーマの説明文 |
|---|---|---|
| `email` | media@atspect.com | The shop owner's email address. Shopify will use this email address to communicate with the shop owner. |
| `contactEmail` | media@atspect.com | The public-facing contact email address for the shop. Customers will use this email to communicate with the shop owner. |

## REST Admin API（`GET /admin/api/2026-07/shop.json`）

| フィールド | 値 |
|---|---|
| `email` | media@atspect.com |
| `customer_email` | media@atspect.com |
| `domain` | atspect.com |
| `myshopify_domain` | dwcsra-fh.myshopify.com |

## GraphQLスキーマ全体を「notif/emailtemplate/contactform/inquiry」でキーワード検索した結果

通知テンプレート（Settings > Notifications 内の個別テンプレートのLiquidソース・HTML）を読み取れるリソースは**1件も見つからなかった**（ギフトカード関連の通知送信ミューテーションのみ存在・今回の用途とは無関係）。→ **通知メールの本文にどのフィールドが含まれるかはAdmin APIでは確認不可**という結論の根拠。

## Shopify公式ドキュメントで確認できたこと（WebFetch）

- help.shopify.com「Setting up your email」：Settings > Notifications の「Sender Email」が「問い合わせフォームの送信の届け先」と説明されている。
- shopify.dev「Add a contact form to your theme」：`name="contact[任意名]"` 形式のカスタムフィールドについて「These titles appear in contact notifications, and must be unique within the form.」＝任意フィールドのタイトルはcontact通知に表示される、と明記。

## 結論（Codex独立レビュー反映後）

- 送信先＝media@atspect.comである可能性が高いが、GraphQL/RESTの各フィールドは同一Shop設定の異なるAPI表現である可能性があり、**独立した確認としては1件相当**。確定にはShopify管理画面「Settings > Notifications > Sender email」の目視が必要（本ファイルにはその画面のスクリーンショットは含まれない＝未確認）。
- 備考欄（`contact[20_ご意見・ご要望]`）が実際に通知メール本文に表示されるかは、上記の公式ドキュメント記述から**掲載される可能性が高いと推定できるが、最終確認は実メール本文の目視が必要**。
