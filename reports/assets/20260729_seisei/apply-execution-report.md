# apply-fixes.mjs実行結果＋プライバシーポリシー1本化 — 第1便・第2便

作成：あつぺくと制作ターミナル（Sonnet 5）／2026-07-29

証拠＝`atspect-handoff/reports/assets/20260729_seisei/apply-report.md`（実行内訳の生ログ）。Vault実装ログ＝`_実装ログ_apply-fixes実行とプライバシー1本化_20260729_ATSPECT.md`。

---

## 第1便｜apply-fixes.mjsの実行

### 除外の追加（承認済み・A-1aのみ→A-1a・A-1bの2件に拡大）

代表裁定＝SNS運用Tの警告どおりA-1a（`sections/atspect-about.liquid`）を除外。**同じ理由（タグラインは作家さまへの名乗りの一文であり、about・press-pageの説明文に流し込むと埋もれる。タグライン統一は作家さま向けの面に限る）に該当する項目をfixes.json全体から洗い出した結果、A-1b（`sections/atspect-press-page.liquid`）も同型と判断し追加除外。**

除外一覧（今回追加分）：

| ID | ファイル | 除外理由 |
|---|---|---|
| A-1a | sections/atspect-about.liquid | 確定タグラインは作家さまへの名乗りの一文。aboutの紹介ページ説明文に流し込むと名乗りが埋もれるため据え置き |
| A-1b | sections/atspect-press-page.liquid | A-1aと同じ理由。press-pageも据え置く対象 |

**A-1c（`sections/atspect-artist-registration.liquid`）は除外していない**＝実際に`/pages/artist-registration-form`という、代表が明示的に「タグライン統一を残す」と指定した作家さま向けの面に対応するファイルであることを`templates/page.artist-registration-form.json`で確認済みのため。

### dry-run（除外後）

実行対象44件、すべて「OK」（1件一致）。0件・2件以上・エラーは合計0件。

### apply実行結果

**44件すべてAPPLIED。失敗0・ロールバック0。**

| 対象ファイル | 件数 | 結果 |
|---|---|---|
| atspect-artist-registration.liquid | 5 | 全件APPLIED |
| atspect-artist-guide.liquid | 4 | 全件APPLIED |
| atspect-faq.liquid | 1 | APPLIED |
| atspect-terms-artist.liquid | 16 | 全件APPLIED |
| atspect-footer.liquid | 1 | APPLIED |
| atspect-press-page.liquid | 2 | 全件APPLIED |
| atspect-artwork-detail.liquid | 1 | APPLIED |
| atspect-about.liquid | 4 | 全件APPLIED |
| atspect-artist-cancellation.liquid | 2 | 全件APPLIED |
| atspect-tokushoho.liquid | 8 | 全件APPLIED |

全ファイル、theme161-update.mjsによる自動バックアップ（`C:\Vault\ARTS-RESPECT\_backups\_auto\theme161-<ファイル名>\`）・CAS並行編集検知・アップロード後のSHA-256読み戻し検証を実施し、全件BYTE-IDENTICAL確認済み。詳細内訳＝`apply-report.md`参照。

### page-audit.mjs 8言語実測

影響を受けた9ページ（about/press/artist-registration-form/artist-guide/faq/terms-artist/artist-cancellation/tokushoho/商品詳細1点）＋トップページを、8言語×2幅（1280px/390px）＝計160件実測。**全件httpStatus 200・httpErrorCount 0・consoleErrorsUnexplained 0。**

### Codexレビュー

`fixes.json`のA-1a/A-1b除外・A-1c維持・他44件の内容不変を1ファイル1観点でレビュー＝**GO**（全4観点PASS）。

---

## 第2便｜プライバシーポリシーの1本化

### 実施内容

`sections/atspect-privacy.liquid`を、コーポレートサイト正本（`atspect-handoff/reports/assets/20260729_privacy/corp-privacy-final.html`・`privacy-final.md`）に合わせて全面差し替え。

- 旧15節構成（事業者情報〜プライバシーポリシーの変更）→ 正本の13節構成（適用範囲〜お問い合わせ窓口）。
- 旧「11 肖像・作品画像の掲載」節（「作家利用規約第11条の2」という誤記を含んでいた）を丸ごと削除。
- 日本語文字列は正本の`data-lang="ja"`ブロックをそのまま使用＝1文字も加筆していない（プログラムでHTMLをパースして機械的に転記し、手作業の書き写しミスを排除）。
- 7言語版も正本の各言語ブロックをそのまま使用。

### ★残留点検で発見＝正本自体に「(atspect.com)」の取り残し誤記

正本（corp-privacy-final.html）のzh-cn/zh-tw/ko/fr/es/de（6言語・ja/enには無い）の冒頭段落に、「(atspect.com)」という括弧書きが残っていた。**これはコーポレート側で以前、6言語だけに生じていたのと同型の取り残し**（司令塔の事前警告どおり）。.com側（`atspect-privacy.liquid`）は、ja/enに合わせてこの6言語の当該括弧書きのみを除去して反映（本文の他の記述は無加工）。

**★申し送り＝この誤記が正本そのもの（コーポレートサイト本体）に今も残っているかは、本ターミナルの権限外のため未確認。** SNS運用Tまたはコーポレートサイト担当ターミナルにて、`atspect.co.jp/privacy.html`のライブを6言語で実機確認し、同型の取り残しがあれば是正することを推奨（Vault判断待ちマスターA-24として起票済み）。

### reCAPTCHA記述

「当社コーポレートサイト（atspect.co.jp）のお問い合わせフォームでは」という限定を、全8言語でそのまま維持（正本どおり）。

### 検証

- **日本語本文の機械突き合わせ＝完全一致（差分ゼロ）**。ライブページ（.com）から13節本文＋制定日行を抽出し、正本のjaブロックと正規化して比較＝完全一致。.com側にのみ存在する「お問い合わせフォームへの誘導」の1文は、13節の本文外にあるUI導線として区別（法的文書本文とは無関係の既存サイトUI）。
- 「atspect.com」の本文内残存＝0件（ライブHTML内の60件はすべてShopifyネイティブのCDN URL・分析用ドメインフィールド等で、プライバシーポリシー本文とは無関係）。
- page-audit.mjsでプライバシーページを8言語×2幅（計16件）実測＝全件エラー0・可視文字数3000〜10600字（空白ページなし）。ja（PC）・de（モバイル）のスクリーンショットを目視確認＝13節が正しい順序・体裁で表示、横溢れなし。

### ★編集前pullで検知した1箇所の差分

編集開始前のリモートpullで、ローカル編集基準（旧15節版）とライブとの間に1箇所差分を検出（旧「作家利用規約第11条の2」の誤記段落が、ライブ側では既に削除されていた＝他ターミナルまたは代表による個別修正と推定）。この差分は今回の全面差し替え（旧15節構成を丸ごと13節構成へ置換）に完全に包含されるため、情報の欠落なく安全に上書きできると判断し反映した。

### Codexレビュー

1ファイル1観点で実施＝**GO**（対象ファイルvs正本の日本語完全一致・atspect.com除去範囲・reCAPTCHA限定・8言語スパン構造の4観点すべてPASS）。

---

## 要田川

- なし（今回の指示範囲は完遂）。

## 実施していないこと

- fixes.jsonの他18件の除外項目（司令塔判断待ち等）の解消（スコープ外）。
- 7言語版が未収録と注記されている項目（A-1c等）の多言語訳追加（リサーチT確定訳待ち）。
- コーポレートサイト本体（atspect.co.jp/privacy.html）の「(atspect.com)」取り残しの有無確認・是正（本ターミナルの権限外・他ターミナルへ申し送り）。
