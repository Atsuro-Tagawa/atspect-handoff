# 20260819 CLAUDE.md・引き継ぎ書の棚卸し（制作T）— 退避（棚卸し前の全文）

代表指示による文書の大掃除を行う前の、**棚卸し前の全文をそのまま保全**したもの。
是正・ライブ反映・コード変更は一切していない（文書の整理のみ）。

| ファイル | 元の場所 | 行数 | SHA-256 |
|---|---|---|---|
| `BEFORE_CLAUDE.md` | `C:\Users\ataga\atspect-theme\CLAUDE.md` | 931（最終行に改行なし・`wc -l`=930） | `6deb2034c7a36c298e4b98448bbe7b6d41c04653cee060806168dc009edda3f7` |
| `BEFORE_引き継ぎ_制作_20260815_ATSPECT.md` | `C:\Vault\ARTS-RESPECT\_引き継ぎ_制作_20260815_ATSPECT.md` | 213 | `ca9e531aad15abbdb1471ea0ff4e36ea25d05f0a471431f48a8641a8717c8408` |

- 機密値の混入検査＝トークン実値（`shpat_`／`atkn_`／`AIza`）・パスワードの直書きを機械検索し**0件**を確認してから push した（CLAUDE.md にあるのはキー名のみ）。
- Vault の引き継ぎ書は**上書きしない**（プロジェクト原則＝Vault既存文書は追記と新規作成のみ）。棚卸し後の現行版は
  `_引き継ぎ_制作_20260819_ATSPECT.md` を**新規作成**し、20260815 はこのとおり履歴として残す。
- 棚卸しの結果（前後の行数・消したルールの一覧・要確認の一覧）＝`reports/seisaku.md`。

## 伏せ字にした箇所（2件・公開リポジトリのため）

`BEFORE_CLAUDE.md` の 274・275 行目にある Shopify の内部識別子（gid）2件を **`«識別子»` に置き換えた**。
このリポジトリは Public であり、commit フックがこの値の公開を拒否したため（＝退避の全文性はこの2件だけ例外）。
値の正本＝`C:\Users\ataga\atspect-theme\CLAUDE.md` と、ローカル自動バックアップ
`C:\Vault\ARTS-RESPECT\_backups\_auto\CLAUDE.md_seisaku\20260819-md棚卸し前.md`（伏せ字なしの完全な写し）。
