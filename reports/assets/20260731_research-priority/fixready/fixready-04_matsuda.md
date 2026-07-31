# 【反映用・完成版】松田権六 是正指示書 2026-07-31

制作T向け。原文はCSV（artists_master_cleaned.csv）＋i18n_工芸.json（松田権六エントリ）の現物から一字一句転記済み。検証経緯＝`04_matsuda-gonroku.md`・`codex-review-04-matsuda.md`。

**要旨：代表作《蒔絵螺鈿八橋硯箱》は松田作として実在を確認できず（尾形光琳の国宝《八橋蒔絵螺鈿硯箱》との混同疑い濃厚・Codexが混同経路も解明）。masterworks・bio・★viewpoint（架空作品の鑑賞記述になっている）の3欄×8言語を差し替える。**

## 修正1：CSV masterworks_text

- 現在：`蒔絵螺鈿八橋硯箱、蓬莱之棚`
- **是正後：`蓬萊之棚、有職文蒔絵螺鈿飾箱`**
- 根拠：《蓬萊之棚》＝石川県立美術館所蔵（1944・所蔵品No.02011200・「萊」表記が所蔵館正式表記） https://www.ishibi.pref.ishikawa.jp/collection/index.php?app=shiryo&mode=detail&data_id=669 ／《有職文蒔絵螺鈿飾箱》＝日本工芸会・第33回日本伝統工芸展（正式表記を2026-07-31に同会作品一覧で直接確認） https://www.nihonkogeikai.or.jp/works/15366/

## 修正2：i18n masterworks 配列

- 現在：`[0] ja「蒔絵螺鈿八橋硯箱」 romaji「Maki-e Raden Yatsuhashi Suzuribako」 en「Writing Box with Eight Bridges in Maki-e and Mother-of-Pearl Inlay」`／`[1] ja「蓬莱之棚」 romaji「Hōrai no Tana」 en「Hōrai Shelf」`
- **是正後：`[0] ja「蓬萊之棚」 romaji「Hōrai no Tana」 en「Hōrai Shelf」`／`[1] ja「有職文蒔絵螺鈿飾箱」 romaji「Yūsokumon Maki-e Raden Kazaribako」 en「Ornamental Box with Court-Motif Designs in Maki-e and Mother-of-Pearl Inlay」`**
- ※[1]のromaji・enは本指示書の案（未確認＝公的英訳が見つからないため。採用前に翻訳担当の確認を推奨）。[0]のromaji/enは既存値を流用（変更なし）・jaのみ「蓬莱」→「蓬萊」。

## 修正3：i18n bio（8言語・該当文のみの差し替え）

該当文＝各言語の最終文（作品名を含む文）。**作品名部分のみを置換**（他は不変）：

| 言語 | 現在の該当箇所（一字一句） | 是正後 |
|---|---|---|
| ja | `代表作《蒔絵螺鈿八橋硯箱》などで知られ、` | `代表作《蓬萊之棚》などで知られ、` |
| en | `Known for works such as Maki-e Raden Yatsuhashi Suzuribako (Writing Box with Eight Bridges in Maki-e and Mother-of-Pearl Inlay), ` | `Known for works such as Hōrai no Tana (Hōrai Shelf), ` |
| zh_cn | `以代表作《蒔绘螺钿八桥砚箱》等知名，` | `以代表作《蓬莱之棚》等知名，` |
| zh_tw | `以代表作《蒔繪螺鈿八橋硯箱》等知名，` | `以代表作《蓬萊之棚》等知名，` |
| ko | `대표작 《마키에 라덴 야쓰하시 벼루함》 등으로 알려졌고,` | `대표작 《호라이노타나(蓬萊之棚)》 등으로 알려졌고,` |
| fr | `Connu pour des œuvres telles que Maki-e Raden Yatsuhashi Suzuribako (Écritoire aux huit ponts, maki-e et incrustation de nacre), ` | `Connu pour des œuvres telles que Hōrai no Tana (Étagère de Hōrai), ` |
| es | `Conocido por obras como Maki-e Raden Yatsuhashi Suzuribako (Caja de escritura con ocho puentes en maki-e e incrustación de nácar), ` | `Conocido por obras como Hōrai no Tana (Estante de Hōrai), ` |
| de | `Bekannt für Werke wie Maki-e Raden Yatsuhashi Suzuribako (Schreibkasten mit Acht-Brücken-Motiv in Maki-e und Perlmutteinlage), ` | `Bekannt für Werke wie Hōrai no Tana (Hōrai-Regal), ` |

※ko/fr/es/deの訳語（棚のレンダリング）は案＝翻訳担当の最終確認を推奨。zh_cnは簡体字慣行で「蓬莱」・zh_twは「蓬萊」。

## 修正4：i18n viewpoint（8言語・全文差し替え＝★最重要）

現在のviewpointは**混同疑いの《蒔絵螺鈿八橋硯箱》そのものの鑑賞記述**（「漆の黒い地に金粉で描かれた文様と、貝を埋め込んだ螺鈿の輝き」）＝実在未確認の作品の見どころを語る文になっており、捏造ゼロ原則上そのまま残せない。

- 現在のja全文：`近代の漆芸を主導した漆芸家。《蒔絵螺鈿八橋硯箱》などでは、漆の黒い地に金粉で描かれた文様と、貝を埋め込んだ螺鈿の輝きに注目すると、伝統の蒔絵の技を細部まで究めたうえで、古典の意匠を気品高く現代へよみがえらせようとした、円熟した美意識が感じられる。`
- **是正後ja（確定・Codex最終レビュー反映済み）：`近代の漆芸を主導した漆芸家。《蓬萊之棚》などでは、漆の地に蒔絵や卵殻、平文で表された意匠に注目すると、古典を深く研究し、正倉院宝物の調査や中尊寺金色堂の修復にも携わった経験のうえに、伝統の蒔絵の技を現代の造形へつなごうとした美意識が感じられる。`**
  - 根拠：正倉院宝物調査（『正倉院髹漆品調査報告』執筆者）・中尊寺金色堂保存修理委員会の修理委員＝東文研物故者記事 https://www.tobunken.go.jp/materials/bukko/9830.html ・国立アートリサーチセンター・藝大松田権六関係資料インベントリ／《蓬萊之棚》の技法（蒔絵・卵殻・平文・松竹梅と鶴亀の吉祥意匠・両面開きの扉を持つ棚）＝石川県立美術館（前掲）
  - Codex最終レビュー（codex-final-04_matsuda.md）＝「掲載可」判定・「細やかに」→「蒔絵や卵殻、平文で」への精緻化を採用。《有職文蒔絵螺鈿飾箱》は第33回日本伝統工芸展出品の**遺作**と日本工芸会が明記 https://www.nihonkogeikai.or.jp/works/372/90443/ （代表作欄への掲載は編集上の評価を含む＝裁定時の参考）
- en〜deの7言語＝**ja確定後に翻訳工程で作成**（既存訳の部分修正では対応不能・全文差し替えが必要）。

## 修正5（任意）：CSV没年補記

- 現在：没年`1986` → 補記可能：`1986年6月15日`（東文研）

## 未確認（推測で埋めない）

- 《有職文蒔絵螺鈿飾箱》のromaji・英訳の公的表記（案のみ提示）
- 第33回日本伝統工芸展の開催年（=1986年と推定されるが本指示書では年を書かない）

## 残留点検（差し替え実行後に制作Tが行うこと）

1. 「八橋」「Yatsuhashi」「八桥」「야쓰하시」で全データ（CSV・i18n全ジャンル・ライブ）を全文検索→松田関連の残存0件を確認。
2. 「蓬莱」（萊でない方）で検索→松田エントリ内の残存を確認（他作家の「蓬莱」は対象外）。
3. 完了の定義＝ライブ反映後にCSV/i18nとライブの差分ゼロを機械確認（2026-07-25代表決定）。
