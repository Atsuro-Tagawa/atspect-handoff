# 作家データ是正の補助スクリプト

すべて Node.js。**読み取り専用または明示した出力先にのみ書く**（Shopifyには一切触れない）。
Shopifyの更新は `C:\Users\ataga\atspect-system\scripts\artist-i18n-update.mjs` が担う。

| スクリプト | 何をするか | 使い方 |
|---|---|---|
| `csv-set.mjs` | 正本CSVの1作家・複数列を安全に差し替える。**BOM・CRLF・他フィールドの引用形式をすべて保持**（物理行＝データ行を利用し、該当フィールドだけを文字列置換） | `node csv-set.mjs <出力先CSV> <ジョブJSON>`<br>ジョブJSON＝`[{"name":"松田権六","set":{"代表作":"…","bio_ja":"…"}}]`<br>★出力後に `vault-file-update.mjs` でバックアップ＋反映すること |
| `csv-diff-verify.mjs` | 旧CSVと新CSVを機械照合し、**意図した列以外が変わっていないか**を確認する | `node csv-diff-verify.mjs <旧CSV> <新CSV>` |
| `rank-words-extract.mjs` | 610名の全欄から**序列を感じさせる語**をA/B/Cに仕分けて抽出し、前後の文脈つきでMarkdownに出す | `node rank-words-extract.mjs <出力.md> <出力.json>` |
| `rank-words-worklist.mjs` | 同じ抽出を、**ライブに出る欄（statement/bio/viewpoint/肩書き）とCSVのみの欄に分けて**作業リスト化する | `node rank-words-worklist.mjs <出力.json>` |
| `backup-dump.mjs` | `plan` が落とした `backup.json` から、複数作家の `collection` / `masterworks` / `masterworks_text` を読める形で取り出す | `node backup-dump.mjs <backup.json> <出力.json>` |

## ★長文（bio・viewpoint）を読む正しい手順

`artist-i18n-update.mjs show` は**46文字で切る**ため、長文の書き換えには使えない。
`plan` を1回流すと `C:\Vault\ARTS-RESPECT\_backups\_auto\artist-i18n\<日時>_<ラベル>\backup.json` に**全40フィールドが落ちる**ので、そこから読む。
（`plan` は書き込みを一切行わない。バックアップ取得だけを目的に流してよい。）

## ★PowerShellでの注意

- 日本語を含むJSONを**引数に直接埋め込むと引用符が落ちる**。**必ずファイルに書いてからパスを渡す**。
- `set VAR=1 && node …`（cmd構文）は動かない。`$env:VAR="1"; node …` を使う。
- UTF-8で書くときは `[IO.File]::WriteAllText($p,$s,(New-Object System.Text.UTF8Encoding($false)))`（BOM無し）。
  `Set-Content -Encoding utf8` はBOM付きになり、`JSON.parse` が落ちる。
