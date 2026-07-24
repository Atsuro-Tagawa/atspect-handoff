# システム開発ターミナル

## 2026-07-24 8ペイン配置の恒久変更（完了）

`C:\Users\ataga\ARTS-RESPECT-tools\launch_ARTS8_command_center.ps1` のペイン配置を指示どおりに恒久変更した。

- 変更前バックアップ：`launch_ARTS8_command_center_ps1.bak_20260724_1027`（既存の `.bak_pre-panetitle_20260719` は保持）
- 新配置（上段左→右 / 下段左→右）：
  - 列1: 上=あつぺくと制作 / 下=あつぺくとシステム開発
  - 列2: 上=あつぺくとリサーチ / 下=あつぺくと営業戦略
  - 列3: 上=コーポサイト制作 / 下=SNS運用
  - 列4: 上=紙紋UI / 下=紙紋特許（変更なし）
- 既存のスクリプト構造（GUID指定・--title/--suppressApplicationTitle・Step関数・ログ出力）は変更なし。ペイン割り当て順のみ差し替え、冒頭コメントのLayout記述も一致させた。
- ショートカット「ARTS RESPECT 司令室（8分割）.lnk」経由で実起動し、スクリーンショットで8ペインの位置・タイトルが指定どおりであることを目視確認済み。`%TEMP%\ARTS8_launcher_last.log` も全ステップ ok・`launch finished OK` を確認。
- 確認後、テスト起動したウィンドウは閉じた。

（他は作業終了・特記なし。機密値はVaultとチャットで扱う。）
