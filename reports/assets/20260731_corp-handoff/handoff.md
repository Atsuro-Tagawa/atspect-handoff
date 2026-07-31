# コーポレートサイト制作T 引き継ぎメモ（2026-07-31終了時点）

次のセッションはこのファイルとVault正本2つ（下記）を読めば再開できるはず。

## 1｜プライバシーポリシー（privacy.html）の現在地

- .com側（atspect.com/pages/privacy）と**日本語本文は機械diff差分0**（完全一致）。
- 制定日・最終改定日＝ともに**2026年8月1日**（8言語）。
- 「本ポリシーは日本語を正文とします。外国語版は参考訳であり…」の**正文条項**を、お問い合わせ窓口の直後・制定日の直前に8言語で実装済み。
- 「等」（非限定表現）の全数点検で見つかった16箇所（§11見出し/本文・§6委託等・§2(3)呼称等・§9通知等。en/fr/es/deのみ）を是正・本番反映済み。
- **本番SHA256＝1b4d48178e8625b99d6caf00b1dfbd18ae32b69d643a495f1949995ae086656d**（要再確認＝時間が経つと他ターミナルが.com側を更新する可能性あり）。
- ★.com側は上記16箇所の反映が済んでいない可能性がある。写し取り用一覧＝`reports/assets/20260731_privacy_etc_fix/変更一覧_com側反映用.md`。**再開時は必ず.com側を再取得して機械diffを取り直し、まだ16箇所分の差分が残っているか確認すること**（SNS運用Tが対応済みなら差分0に戻っているはず）。
- 判断保留（司令塔裁定待ち）＝cn/tw「や」→「及/或」の閉じ列挙化・§11見出し第3項目のずれ（ja/en=利用停止、fr/es/de=削除）。
- 正本＝Vault`_privacy_com同期_20260731_ATSPECT.md`・`_privacy_等全数点検_20260731_ATSPECT.md`。

## 2｜コーポレートサイト本体（index.html／404.html／contact.php）の現在地

- 繰り越しマスターC3の残存59件（B45+C14）を再判定し、**14件是正・本番反映済み**（5件は既存B項目の再判定によるFIX昇格、9件は実物再確認による新規発見）。
- **残り54件（+C評価約18〜20件）は据え置き**＝いずれも様式差のみ（語調・直訳感の差）で、読者が言語によって異なる情報を受け取る「言っていることが違う」型ではないことを確認済み。内容は変わっていない。
- **再開するならここから見る**＝Vault`_BC件片付け_第2便_20260731_ATSPECT.md`の「据え置いた54件」節（7/29版一覧`_BC件片付け_20260729_ATSPECT.md`・`_7言語通読点検_コーポレートサイト本体_20260729_ATSPECT.md`を参照する形）。
- 「等」（非限定表現）の全数点検＝index.html2箇所・404.html0箇所・contact.php実質0箇所、いずれも7言語で保持済み＝**是正不要（privacy.htmlのような型はここには存在しない）**。
- **本番SHA256（index.html）＝13cb6f0edf01a7844122bb9d40c05e5d6383be9fcdc7de2dccf3b1600be04c17**（要再確認）。
- 正本＝Vault`_BC件片付け_第2便_20260731_ATSPECT.md`。繰り越しマスターC3行を更新済み。

## 3｜据え置いた54件が何であるか（再掲・様式差のみ）

- en/fr/es/de：PHILOSOPHY・MESSAGE自由文の直訳調・情緒的ニュアンス差（複数件）
- cn/tw：「有缘人／有緣人」ニュアンス・強調重複・「旧物/舊物営業法」（既存の格下げ判断を維持）
- ko：語順・助詞の不自然さ（4件）
- contact.php／index.html問い合わせ文言：「担当者より」を明示するか「we」の一般表現にとどめるかの違い（en/fr/es/de）＝内容確認自体（review/prüfen/examiner/revisar）は7言語とも保持されているためDEFERを維持
- C評価（約18〜20件）＝一覧の更新のみ、内容変更なし

## 4｜使ったスクリプトの名前と置き場所

- **`deploy_sftp.sh`**＝`02_サイトデータ/`直下。マスター→SFTP本番反映。ホワイトリスト方式・実行毎に本番index.htmlを自動退避。
- **`vault-file-update.mjs`**＝`C:\Users\ataga\atspect-system\scripts\`。ローカルファイル（Vault正本Markdown・privacy.html・index.html・contact.php等）の「バックアップ＋書き込み＋SHA256読み戻し検証」を1回で行う。使い方＝`node vault-file-update.mjs <対象絶対パス> <新内容ファイル絶対パス> [ラベル]`。
- **`theme161-update.mjs`**＝同ディレクトリ（今回は未使用・Shopifyテーマファイル用）。
- **比較スクリプト（.com/.co.jp突き合わせ用）**＝`reports/assets/20260729_privacy/`または`20260731_privacy_comsync/`内の`extract_com.mjs`＋`compare.mjs`（.comのpv-lスパンと.co.jpのlang-blockをユニット抽出しLCS整列で突き合わせ）。
- **抽出スクリプト（index.html用）**＝`reports/assets/20260731_index_bc_round2/`内の考え方を参照（本体は今回scratchpadに作成・保存はしていない＝`extract_index.mjs`は次回また同じロジックで作り直しが必要）。
- **文字種検査（i18n-audit.mjs）**＝Vault`_backups\_auto\i18n-audit.mjs\`にバックアップあり。SNS運用T作成、末尾にコーポ制作Tが文字種検査ロジックを追加。実データはatspect-handoff `reports/assets/20260729_i18n/`。

## 5｜バックアップの置き場所と世代

- **Vault自動バックアップ＝`C:\Vault\ARTS-RESPECT\_backups\_auto\<ファイル名>\<YYYYMMDD-HHMMSS>_<ラベル>.<拡張子>`**（vault-file-update.mjs実行のたびに自動生成・無期限保持）。
  - privacy.html＝`_backups\_auto\privacy\`に本日6世代（170927/171737/174832/175317/175525/現在の反映まで）
  - index.html＝`_backups\_auto\index\`に`20260731-185221_bc-round2-fix.html`
  - contact.php＝`_backups\_auto\contact\`に`20260731-185221_bc-round2-fix.php`
  - 繰り越しマスター＝`_backups\_auto\_繰り越しマスター_ATSPECT\20260731-195811_c3-update.md`
- **リモート（Xserver）バックアップ＝`deploy_sftp.sh`が実行毎にindex.htmlを`index.html.bak_<日時>`へ自動退避**（本番サーバー上）。privacy.htmlの個別リモートバックアップは今回の是正では作成していない（index.html自動退避のみ・privacy.htmlはローカルVaultバックアップで代替）。

## 6｜★未解決の申し送り事項（判断待ち・据え置き）

- **cn/tw「や」→「及/或」の閉じ列挙化**（privacy.html§6移転先国の制度**や**措置・§10利便性の向上**や**サービス改善ほか・§12法令の改正**や**当社の判断）。Codex指摘済み。「や」の非網羅性は文脈依存で、同型はen等他言語にも及ぶ可能性があるため方針裁定が必要。
- **§11見出し第3項目のずれ**（privacy.html：ja/en=利用停止、fr/es/de=削除/suppression/supresión/Löschung）。項目語自体の変更は翻訳判断を要するため未着手。
- **文体改善候補**（法的文書の実害はないが、より自然な表現の余地）：es§6「en particular」の位置、fr§9「appropriée」の重複、de既存「Meldungen vornehmen」→「erstatten」提案（Codex指摘）。
- **「担当者より」vs「we」の差**（index.html/contact.php、en/fr/es/de）：内容確認自体は7言語とも保持されているためDEFERとしているが、具体性の差として残っている。次回、業務上の実害があるかを再検討する余地あり。
- **.com側16箇所の反映状況**（上記1参照）＝再開時に必ず再確認。
- 弁護士による最終法的確認（プライバシーポリシー／特商法）＝継続して未了。
- サーバー上`_backup_before_wp_delete_20260720`（96MB）の削除＝2026-08-20ごろ予定・急ぎではない。

## 実施していないこと（本日終了時点）

- 据え置いた54件（コーポ本体）・privacy.html判断保留分（cn/tw「や」・§11見出し項目ずれ・文体改善候補）は一切是正していない。
- .com側（Shopify）・印刷物には一切触れていない。
- atspect-handoffリポジトリの他ターミナル作業（`20260731_details/`・`20260731_terms-sync/`・`20260731_research-priority2/`等の未追跡ファイル、および3件の既存i18n-audit-report*.mdのタイムスタンプのみの差分＝内容的な意味はない）には一切触れていない。stashに残っている同種の差分も削除せずそのまま残した。

<!-- created: 2026-07-31 by model=Sonnet 5 terminal=コーポサイト制作 work=本日終了時の引き継ぎメモ作成 -->
