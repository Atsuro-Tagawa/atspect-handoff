# システム開発ターミナル 報告（2026-07-25・追加セッション）

## claude.ai「GitHub連携」点検・修復（本セッション）

- **原因特定**：claude.aiのGitHub連携は「接続済み(✓)」表示だったが、実体であるGitHub公式App「Claude」(developer: anthropics) がGitHubアカウント側に未インストール（Installed GitHub Apps=0件）だった。アカウントレベルの紐付けとリポジトリアクセス権（Appインストール）は別レイヤーで、後者が欠けていたためツールが降りていなかった。
- **実施した修復**：`github.com/apps/claude/installations/new` からインストールを開始し、「Only select repositories」でリポジトリ`atspect-handoff`を選択、「Install & Authorize」まで進めた。
- **残作業（代表操作のみ）**：GitHub側のsudo mode（パスワード再確認画面）で停止中。パスワード入力はAIが行えないため、田川さんがそのままパスワードを入力し「Confirm」を押せば完了する。完了後、新しいclaude.aiチャットでatspect-handoffを直接読ませて検証すること。
- 詳細はVault `_調査_claudeai_GitHub連携点検_20260725_ATSPECT.md`、残操作は`_判断待ち・未決事項マスター_ATSPECT.md` A-14に記録済み。

引き継ぎ・詳細はVault（ローカル）に保存済み。
