# レビュー観点＝1つだけ：検索窓に出す注記の7言語訳を、その言語の読者として読む

Web検索・外部URLアクセスを一切行わず、この本文だけで判断してください。日本語で答えてください。
**訳し直しはしないでください。**「その言語の読者として違和感がある箇所の指摘」だけをしてください。
コードの書き換えもしないでください。

## これは何か
美術サイトに検索窓が2つあります。「作家を探す」と「作品を探す」。
その入力欄のすぐ下に置く、1行の注記です。**日本語と英語の文面は確定済みで、変更できません。**
残る6言語（zh-cn / zh-tw / ko / fr / es / de）を、確定した英語に合わせて作りました。

- 日本語（確定・変更不可）
  - 作家を探す＝`※作家名は読みがな（ひらがな）でも検索可能です`
  - 作品を探す＝`※作品名・作家名は読みがな（ひらがな）でも検索可能です`
- 英語（確定・変更不可）
  - 作家を探す＝`Artist names can be searched in romaji (lowercase is fine).`
  - 作品を探す＝`Titles and artist names can be searched in romaji (lowercase is fine).`

★日本語だけ「読みがな（ひらがな）」、外国語は「romaji」と言い分けています。これは意図した使い分けです
（日本語の読者にはひらがな入力を、外国語の読者にはローマ字入力を案内する）。**ここは指摘の対象外です。**

## 判定してほしい6言語（作った訳）

### ①「作家を探す」の注記
| 言語 | 訳 |
|---|---|
| zh-cn | 艺术家姓名可用罗马字检索（小写亦可）。 |
| zh-tw | 藝術家姓名可用羅馬字檢索（小寫亦可）。 |
| ko | 작가 이름은 로마자로도 검색할 수 있습니다(소문자도 괜찮습니다). |
| fr | Les noms d'artistes peuvent être recherchés en rōmaji (les minuscules conviennent). |
| es | Los nombres de artistas se pueden buscar en romaji (las minúsculas son válidas). |
| de | Künstlernamen können in Rōmaji gesucht werden (Kleinschreibung ist ausreichend). |

### ②「作品を探す」の注記
| 言語 | 訳 |
|---|---|
| zh-cn | 作品名与艺术家姓名可用罗马字检索（小写亦可）。 |
| zh-tw | 作品名稱與藝術家姓名可用羅馬字檢索（小寫亦可）。 |
| ko | 작품명과 작가 이름은 로마자로도 검색할 수 있습니다(소문자도 괜찮습니다). |
| fr | Les titres et les noms d'artistes peuvent être recherchés en rōmaji (les minuscules conviennent). |
| es | Los títulos y los nombres de artistas se pueden buscar en romaji (las minúsculas son válidas). |
| de | Titel und Künstlernamen können in Rōmaji gesucht werden (Kleinschreibung ist ausreichend). |

## 社内で既に確定しているルール（これに反していないかも見てください）
- 中国語・韓国語では**全角の（）、。が正しい約物**。ラテン文字の言語（en/fr/es/de）では半角 ( )。
- 英語のローマ字表記は**マクロンを使わない**（`Tokyo` であって `Tōkyō` ではない）。
  ★この規則は「英語」について実測で決まったものです。**fr/es/de で `rōmaji` / `Rōmaji` と
  マクロン付きで書いてよいか**は未決なので、そこも判定してください。
- 大げさな言い方・売り込みの言葉を足さない。原文にない情報を足さない。

## 質問（この5点だけ答えてください）
1. 6言語それぞれについて、**その言語の読者として不自然な点**を挙げてください（無ければ「無し」）。
2. `romaji` の綴りは、fr / es / de でどう書くのが読者にとって普通ですか
   （`romaji` / `rōmaji` / `Rōmaji` / `Romaji` のどれか）。言語ごとに1つ選んでください。
3. ko の丸括弧は**半角 ( ) で書いていますが、韓国語では全角（）が正しい**という社内規則があります。
   韓国語の読者として、この文ではどちらが自然ですか。
4. de の `Kleinschreibung ist ausreichend` は「小文字でよい」の意味として通じますか。
   通じないなら、**どこが伝わらないか**だけ指摘してください（訳し直しは不要です）。
5. ①と②で、同じ言語の中で言い回しが揃っていない箇所はありますか。
