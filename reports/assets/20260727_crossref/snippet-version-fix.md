# snippets/atspect-terms-version.liquid の是正（2026-07-27〜28・実行完了）

## 変更内容

| 項目 | 内容 |
|---|---|
| ファイル | `snippets/atspect-terms-version.liquid`（1ファイル・1箇所のみ） |
| 変更前 | `確定稿 v3.3（2026-07-04・2026-07-13・2026-07-22改定）` |
| 変更後 | `v4.0（2026-07-23・契約規約書 AR-K1 v1.2と同一内容）` |
| 根拠 | 規約本体（sections/atspect-terms-artist.liquid）の同意フォームhidden欄（`contact[01_規約版]`）・画面末尾の版表記の両方と一字一句一致させた |
| 影響範囲 | このスニペットを`{% render %}`で呼び出しているのは`sections/atspect-artist-onboarding.liquid`のみ（他140ファイルを確認・該当なし） |

## 4回ブロックされた原因の切り分け

前便（2026-07-27夜）で同一の書き込み処理が4回連続でブロックされたが、原因はファイル固有の権限・ロック・パスの問題ではなかった。**5回目の再試行（内容は前回と完全に同一）で成功**しており、この間に別の操作（Bashコマンド）で「claude-sonnet-5が一時的に利用不能なため、auto modeが安全性を判定できない」という趣旨のシステムメッセージを実際に受け取っている。これは、書き込みの可否を判定する自動化ツール側の安全機構（分類器）自体が一時的に利用不能になっていたことを示しており、**この期間に発生したブロックはすべて分類器の一時的な不調によるものであり、ファイル名・パス・Shopify側の権限・ロックが原因ではなかった**と判断できる。他の6ファイル（sections/atspect-privacy.liquid等）への書き込みは、この不調の時間帯の前後で成功しており、ファイル間の扱いの違いを示す証拠は見つからなかった。

## 検証

- Admin APIによる独立re-fetchで diff=0 を確認。
- 直接curlでライブHTMLを取得し「確定稿」の残存0件・新版表記の反映を確認。
- `page-audit.mjs`を8言語（ja/en/zh-cn/zh-tw/ko/fr/es/de）で実測＝httpErrorCount 0・consoleErrorsUnexplained 0・domSettled trueをすべて確認。
- Codex独立レビュー（1ファイル・1観点に絞って依頼）＝「規約本体の版表記と一字一句一致・構文上の問題なし」と確認。
- 残留点検：テーマ全142件の.liquidファイルを機械的に走査し「確定稿」「v3.3」を含む全ファイルを確認。該当4ファイル（artist-cancellation・artist-plan・artist-registration・terms-artist）はいずれも無関係の開発者コメント（別のVault文書「_確定稿_解約条件と課金開始...」への言及、または過去のバックアップファイル名の言及）であり、ライブ表示されるテキストではないことを個別に確認した。

## スクリーンショット

- `after/onboarding-STALE-VERSION-FINDING-unresolved.png`（是正前・発見時）
- `after/onboarding-VERSION-FIXED-resolved.png`（是正後・確認）
