# あつぺくと制作ターミナル・最新報告

最終更新：2026-07-29

## 直近の完了作業：apply-fixes.mjs実行＋プライバシーポリシー1本化

詳細＝[reports/assets/20260729_seisei/apply-execution-report.md](assets/20260729_seisei/apply-execution-report.md)

- 第1便＝代表承認のうえapply-fixes.mjs実行。A-1a・A-1b（タグライン統一2件）を代表裁定どおり除外し、残り44件を全件apply＝**失敗0・ロールバック0**。影響9ページ+トップを160件page-audit実測・エラー0。
- 第2便＝プライバシーポリシーをコーポレート正本（.co.jp）へ13節構成で全面差し替え。日本語本文は.com/.co.jp間で機械突き合わせ差分ゼロを確認。
- **★正本の6言語（zh-cn/zh-tw/ko/fr/es/de）冒頭に「(atspect.com)」という取り残し誤記を発見・.com側はja/enに合わせて除去。コーポレートサイト本体に同じ誤記が残っているかは権限外のため未確認＝他ターミナルへ申し送り（Vault判断待ちマスターA-24）**。
- Codex2回（1ファイル1観点）ともGO。

## 前便：apply-fixes.mjs dry-run実行（第3便）

詳細＝[reports/assets/20260729_seisei/dryrun-report_seisaku.md](assets/20260729_seisei/dryrun-report_seisaku.md)

- SNS運用T作成の`apply-fixes.mjs`到着を確認しdry-runのみ実行＝実行対象46件すべて「OK」（0件・2件以上は0件）。
- **applyは実行していない**。A-1a（about.liquid）にSNS運用T自身の警告あり＝過去の代表確定「確定タグラインを流用しない」と今回の司令塔確定が食い違うため、司令塔・代表の再確認が必要。

## 直近の完了作業：建築原稿10名の裏取り再検証（第2便）

- 10名×8言語＝80ページをpage-audit.mjsで実測、HTTP200/4xx-5xx0件。
- masterworks/bioの年号をAdmin GraphQLで日本語↔7言語を機械照合＝内容上の不一致0件（槇文彦zh-cn「1960」は中国語の慣用表現「20世纪60年代」による見かけ上の不一致で、内容確認の結果は一致）。
- 槇文彦ヒルサイドテラス1969-1992は全8言語で確認・再発なし。

## 直近の完了作業：サイト名重複（あつぺくと／ATSPECT）の是正

詳細＝[reports/assets/20260729_sitename/report.md](assets/20260729_sitename/report.md)

- title二重連結（`theme.liquid`のshop.name無条件連結）・og:site_name・schema.org Organization/WebSiteを確定方針どおり是正。
- **★残留点検で`sections/header.liquid`に独自の重複・競合JSON-LD（shop.name使用＋カタカナ「アツペクト」混入）を追加発見・撤去**。
- tokushoho/password/gift_cardの3ファイルでも同型不具合を追加是正。テーマ内のスラッシュ連結表記・shop.name依存は実行コードとして0件を確認。
- 4ページ×8言語をpage-audit.mjs／curlで実測。Codex7回（1ファイル1観点）＝5GO・2件初回NO-GO（言い回し修正で1件は再GO・1件は基準厳格すぎるため不採用）。
- Shopifyショップ名設定の変更手順は実画面確認の上まとめのみ・実行はしていない。
- 第2便（建築10名の裏取り）・第3便（apply-fixes.mjsのdry-run）は継続作業中。

前便＝[reports/kenchiku-10mei-hanei_20260729.md](kenchiku-10mei-hanei_20260729.md)（建築原稿10名の本番反映）

## 前々回：建築原稿10名の本番反映（第1便修正5名＋第2便新規5名）

詳細＝[reports/kenchiku-10mei-hanei_20260729.md](kenchiku-10mei-hanei_20260729.md)

- 第1便＝丹下健三・清家清・磯崎新・槇文彦・内田祥三のmasterworks（代表作）8言語訳を追加・是正。英語ページで日本語原文がそのまま表示される不具合を解消。
- **★槇文彦のヒルサイドテラス竣工年「1969-1998年」の事実誤りを、指示のあった箇所だけでなくbio本文・viewpointの期間表現の計3箇所で発見し8言語すべて是正**（正しくは1969-1992年）。
- 第2便＝村野藤吾・前川國男・吉田五十八・谷口吉郎・佐野利器を新規Shopify metaobjectとして作成。Vault CSVにも5行追加。
- **★重大な見落としと即時是正＝新規作成分がDRAFT状態のままで公開ページが404だったのを発見・ACTIVE化で解消**（他ターミナルへの申し送り事項として記録済み）。
- Codexは1観点ずつ分割して4回依頼＝3件PASS・1件は誤指摘と自己確認。
- 田川さん判断待ち＝なし。

証拠＝`reports/assets/20260729_kenchiku_batch1/`・`20260729_kenchiku_batch2/`。Vault実装ログ＝`_実装ログ_建築原稿10名本番反映_20260729_ATSPECT.md`。

前便＝[reports/seisei2-fix_20260728.md](seisei2-fix_20260728.md)（申込フォーム通読チェック最重大2件）・[reports/judge2-resolution_20260728.md](judge2-resolution_20260728.md)（判断待ち2件の解消）・[reports/form-terms-fix_20260727.md](form-terms-fix_20260727.md)（申込フォームと規約の是正4件）。

## 次の予定（申し送り）

- 申込フォーム通読チェックの残り35件（全37件のうち先行2件は実施済み）は、リサーチT・営業戦略T・SNS運用Tの3本の通読チェックが出そろい次第、まとめてこのターミナルに集約される予定（代表指示）。現在は待機中。
- 建築「残り43名」の第2便5名（リサーチTが本日別途起票）は、今回の代表指示の対象外のため未着手。次回以降のご指示待ち。

引き継ぎはVault（ローカル）に保存済み。
