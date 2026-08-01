# 走査の語境界判定が効いていなかった（2026-08-01 発見・修正済み）

## 1. 何が起きていたか

`rank-words-scan-live.mjs` の語境界判定は、**書いた時点から一度も効いていなかった。**

```js
// 誤り（シングルクォートの中では \p の \ が落ちて、ただの p になる）
new RegExp('(^|[^\p{L}\p{M}])' + w + '($|[^\p{L}\p{M}])', 'iu')
// → 実際に組み立てられていた正規表現
   (^|[^p{L}p{M}])guió($|[^p{L}p{M}])
```

`[^p{L}p{M}]` は「p・{・L・}・M 以外の1文字」という文字クラスにすぎない。
そのため `distinguió` の `n` も `persiguió` の `i` も「語境界」として通ってしまい、
**語の内部一致を1件も除外できていなかった。**

前便で「語境界つきの判定に直した」と報告したが、**直っていなかった。**
`es:guió(92)` が語別の最多として残り続けていたのが、その症状だった。

## 2. 修正

```js
new RegExp('(^|[^\\p{L}\\p{M}])' + esc(w) + '($|[^\\p{L}\\p{M}])', 'iu')
```

文字列で正規表現を組むときは `\\p{L}` と二重に書く必要がある。

実測（修正前／修正後）：

| 文 | 語 | 修正前 | 修正後 |
|---|---|---|---|
| Se **distinguió** por su técnica. | `guió` | ヒット | ヒットせず |
| **Consiguió** el premio en 1950. | `guió` | ヒット | ヒットせず |
| **Siguió** estudiando en París. | `guió` | ヒット | ヒットせず |
| Un artista que **guió** la enseñanza. | `guió` | ヒット | ヒット |
| Er **begleitete** die Ausstellung. | `leitete` | ヒット | ヒットせず |
| Er **leitete** die Schule. | `leitete` | ヒット | ヒット |

## 3. 残存件数への影響

| | 修正前（前便の報告値） | 修正後（実測） |
|---|---|---|
| B判定の残存 | 1,069件／256名 | **866件／186名** |
| ja | 138 | 138 |
| en | 142 | 104 |
| zh_cn | 80 | 80 |
| zh_tw | 79 | 79 |
| ko | 195 | 195 |
| fr | 134 | 113 |
| es | 206 | **103** |
| de | 95 | **54** |

**203件・70名は、実在しない残存だった**（ラテン文字4言語の語内部一致）。
CJK・ハングルは語境界の概念が無く素の包含で判定しているため、件数は変わらない。

## 4. ★任務2の回答＝es `guió` の4件は、すべて内部一致だった

前便で「未確認」と申告した4件を、1件ずつ現物で確認した。**4件とも `guió` ではない。**

| # | 作家 | 欄 | 実際の語形 | 意味 | 修正後の判定 |
|---|---|---|---|---|---|
| 1 | 高橋 由一 | statement | **persiguió** | 追い求めた | ヒットせず |
| 2 | 高橋 由一 | bio | **Persiguió** | 追い求めた | ヒットせず |
| 3 | 杉浦 非水 | bio | **distinguió** | 際立っていた | ヒットせず |
| 4 | 瑛九 | bio | **Persiguió** | 追い求めた | ヒットせず |

該当の文（現物）：

1. `Pintor de yōga que persiguió en serio la pintura al óleo`
2. `Persiguió en serio un realismo plasmado al óleo, eligiendo como temas cosas y personas cercanas: salmón, tofu, cortesanas.`
3. `Conocido por sus carteles y motivos para los grandes almacenes Mitsukoshi, su obra se distinguió por una composición y un color refinados.`
4. `Persiguió una expresión de vanguardia mediante técnicas variadas: el photo-dessin, ...`

**この4件について是正は不要。書き換えてはならない**（3件は「追い求めた」、1件は「際立っていた」という事実の記述であり、序列語ではない）。

## 5. ライブ全体での `guió` の実態

ライブ8言語の本文で `guió` を含む語形は全94件。**単独の `guió` は3件だけ。**

| 語形 | 件数 | 意味 |
|---|---|---|
| persiguió / Persiguió | 45 | 追い求めた |
| siguió / Siguió | 44 | 〜し続けた |
| distinguió | 2 | 際立っていた |
| **guió** | **3** | 導いた（★これだけが検出の対象） |

## 6. 教訓

**「語境界つきにした」と書いた時点では、実際に効いているかを1件も確かめていなかった。**
正規表現は、組み立てた結果の文字列（`re.source`）を出力して目で見るまで、効いているとは言えない。

- 検証コード＝`re-test.mjs`（修正前後の両方の関数で同じ6文を判定させ、差を出す）
- 修正前のスクリプトは `C:\Vault\ARTS-RESPECT\_backups\_auto\rank-words-scan-live.mjs\` に保存済み
