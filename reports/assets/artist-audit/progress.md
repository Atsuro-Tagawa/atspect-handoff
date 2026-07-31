# 掲載作家の事実確認と是正 進捗 ★このファイルを読めば再開できる

**最終更新：2026-07-31 22:05**

## 現在地

- **次に着手する作家＝土門拳**（fixready-09_domon.md・反映用完成版あり）
- そのあと＝田口善国（fixready-10_taguchi.md）→ フェーズ1の残り（46名のうち誤り確定分）→ フェーズ2（`priority-list.md` の重み付き順）

## 累積

| | 数 |
|---|---|
| 是正を実反映した作家 | **1名** |
| 本便で確認した作家 | 1名 |
| うち誤りあり | 1名（100%） |
| Codexレビュー未実施のまま反映した作家 | 0名 |

## 使う道具（再開時に読む）

- 手順書＝`reports/assets/20260731_作家8言語更新経路/手順_作家ページ8言語の更新.md`
- 実装＝`atspect-system/scripts/artist-i18n-update.mjs`（show / verify / plan / apply / restore）
- 指示書の置き場＝`atspect-system/scratch/artist-i18n/20260731_NN_<作家>.json`
- CSV正本の書き換え＝scratchpadの `csv_set.mjs`（作家名＋列名を指定して1列ずつ差し替え。BOM/CRLF保持）＋ `vault-file-update.mjs`（バックアップ＋読み戻し検証）
- **全フィールドの現物を読む方法**＝`plan` を1回流すと `C:\Vault\ARTS-RESPECT\_backups\_auto\artist-i18n\<日時>_<ラベル>\backup.json` に全40フィールドが落ちる。`show` は46文字で切られるため、長文（bio・viewpoint）を直すときはこの backup.json を読む。

## 着手前の確認（2026-07-31 実施済み）

- `verify`（全625名）＝**2箇所の不一致206件**。システム開発Tの実測と一致。★是正でこれを増やさないこと（各 `plan` が「反映前N件→反映後M件」を表示する。増えていないことを毎回見る）。
- **往復テスト実施済み**＝松田権六で `plan → apply → verify → restore` を通し、**restoreで全40フィールドがバックアップと完全一致することを実測**。そのうえで再applyした。
- **Codexは使える状態**（疎通確認済み・利用上限に当たっていない）。

## ★運用上の注記

- `SHOPIFY_ALLOW_WRITE=1` は手順書上「代表の明示承認が必要な一線」とされている。本便が `plan → apply → verify → restore` の実行そのものを指示しているため、**本便を根拠に使用している**。
- PowerShellでは `set VAR=1 && node …`（cmd構文）は動かない。`$env:SHOPIFY_ALLOW_WRITE="1"; node …` を使う。

---

## 完了した作家

### 01. 松田権六（工芸）2026-07-31 22:02 ★誤りあり・是正済み

- **誤り**：代表作《蒔絵螺鈿八橋硯箱》は松田作として一次資料で確認できず、**尾形光琳の国宝《八橋蒔絵螺鈿硯箱》との混同**が濃厚。さらに **viewpoint がその実在未確認の作品の鑑賞記述**になっていた（漆の黒い地に金粉で描かれた文様と螺鈿の輝き…）。
- **是正**：masterworks（配列）＋ bio（8言語）＋ viewpoint（8言語）＋ masterworks_text ＝ **25箇所**を更新。
  - 代表作 → 《蓬萊之棚》（石川県立美術館蔵・所蔵品No.02011200）／《有職文蒔絵螺鈿飾箱》（日本工芸会・第33回日本伝統工芸展）
  - viewpoint ja → 「…漆の地に蒔絵や卵殻、平文で表された意匠に注目すると、古典を深く研究し、正倉院宝物の調査や中尊寺金色堂の修復にも携わった経験のうえに、伝統の蒔絵の技を現代の造形へつなごうとした美意識が感じられる。」
  - **en/zh_cn/zh_tw/ko/fr/es/de の viewpoint 7言語は、fixready に「翻訳工程で作成」とあり未作成だったため、今回リサーチTが作成した**（★翻訳担当の確認は受けていない）。
- **検証**：読み戻し一致／2箇所の不一致 0件→0件／残留点検「八橋」「Yatsuhashi」「八桥」「야쓰하시」＝**全言語0件**。
- **CSV正本も同期済み**（代表作・masterworks_text・bio_ja・viewpoint_ja の4列）。
- バックアップ＝`_backups\_auto\artist-i18n\20260731-220034_01-matsuda\backup.json`／`_backups\_auto\artists_master_cleaned\20260731-220336_01-matsuda.csv`
- Codexレビュー＝fixready作成時に実施済み（`codex-final-04_matsuda.md`）。**ただし今回作成した7言語訳はCodex未レビュー。**
- 未実施＝page-audit.mjs での実画面差分確認／《有職文蒔絵螺鈿飾箱》のromaji・英訳の公的表記の確認（案のまま）。
