# .com側プライバシーポリシー 権利範囲の是正指示票

作成：SNS運用ターミナル（Sonnet 5）。読み取り・実測のみ。サイトは一切変更していません。
対象＝`sections/atspect-privacy.liquid`（.com側・Shopifyテーマ）。

## 背景

コーポレート側（atspect.co.jp/privacy.html）を7言語通読した結果、A評価8件（すべて「原文にあった限定・非限定列挙・権利の強さが、訳文で狭まる／弱まる」方向）が見つかった。同じ日本語から同じ7言語に訳しているため、.com側にも同型の誤りがある可能性が高いとして、司令塔指示により本日確認した。

**「同じはず」で通さず、1件ずつ実物で確認した結果＝.com側は単に corp 側と同一の誤りを引き継いでいるのではなく、翻訳が別々に作られているため、corp 側にはない.com側独自の誤りも複数見つかった。**

## 判定方法

corp側で見つかった5つの横断パターンを基準に、.com側の該当4か所（§1適用範囲・§4第三者提供・§6越境移転・§11開示等の請求）を全8言語（en/fr/de/es/zh-cn/zh-tw/ko、+日本語原文）で1件ずつCodexに独立判定させた（1言語1回・計8回）。「原文と比べて権利・例外の範囲が狭まっているか」だけを判定基準とした。

## 結果サマリ（言語別）

| 言語 | 判定した4パターン中の問題件数 | 内訳 |
|---|---|---|
| 英語(en) | 4/4 | ①法人／事務所の方②法令に基づく場合③等の脱落⑤委託等 |
| フランス語(fr) | 4/4 | ①②③⑤（corp側と同じ3件＋新規1件） |
| ドイツ語(de) | 4/4 | ①②③④⑤（corp側と同じ2件＋新規2件、③④は1文で重複） |
| スペイン語(es) | 2/4 | ②⑤（corp側では0件だった言語だが.com側独自に発見） |
| 簡体中文(zh-cn) | 0/4 | 該当なし |
| 繁体中文(zh-tw) | 0/4 | 該当なし |
| 韓国語(ko) | 0/4※ | ※「開示→열람」の1点についてCodexから指摘があったが、corp側が既に確認した「韓国個人情報保護法の標準法律用語であり訳抜けではない」という判断（同一箇所・同一表現）を踏襲し、対象外とした |

**是正対象＝14件（en4・fr4・de4・es2）。corp側で既に見つかっていたのと同一の誤りは8件、.com側で独自に見つかった誤りは6件。**

corp側との対応関係：
- corp側と同一の誤り＝PVLEGAL-01(en①)・02(fr①)・04(en②)・05(fr②)・06(de②)・09(fr⑤)・12(en③)・14(de③④)
- **.com側独自の誤り（corp側では該当なし・新規発見）**＝PVLEGAL-03(de①)・07(es②)・08(en⑤)・10(de⑤)・11(es⑤)・13(fr③)

## この点検で見つけられないもの（限界）

- 対象はcorp側で確立した5つの横断パターンに絞っており、それ以外の型の翻訳誤りは対象外（corp側の7言語通読ほどの全文精読は今回行っていない）。
- 各言語の法律専門家によるレビューではない（日本語との対応関係の読解に基づく指摘）。
- 日本語原文自体の妥当性は検証していない（原文を正として扱っている）。

## 是正対象14件

### ①法人／事務所の方→組織のみ

**PVLEGAL-01｜§1 適用範囲（37行目）・英語（corp側と同一の誤り）**

現在：
```
the corporations / offices to which they belong
```
置換後：
```
persons at the corporations / offices to which they belong
```

**PVLEGAL-02｜§1 適用範囲（37行目）・フランス語（corp側と同一の誤り）**

現在：
```
les personnes morales / agences dont ils relèvent.
```
置換後：
```
les personnes appartenant aux personnes morales / agences dont elles relèvent.
```
★Codexレビューで代名詞不一致(ils→elles)を指摘・修正済み

**PVLEGAL-03｜§1 適用範囲（37行目）・ドイツ語（.com側独自の発見）**

現在：
```
die Gesellschaften bzw. Agenturen, denen sie angehören.
```
置換後：
```
die Personen bei den Gesellschaften bzw. Agenturen, denen sie angehören.
```

### ②法令に基づく場合→要求される場合に限定

**PVLEGAL-04｜§4 第三者への提供（108行目）・英語（corp側と同一の誤り）**

現在：
```
Where required by law
```
置換後：
```
Where based on laws and regulations
```

**PVLEGAL-05｜§4 第三者への提供（108行目）・フランス語（corp側と同一の誤り）**

現在：
```
lorsque la loi l'exige&nbsp;;
```
置換後：
```
lorsque cela est fondé sur les lois et règlements&nbsp;;
```
★Codexレビューで「les lois et règlements」への変更を推奨・反映済み

**PVLEGAL-06｜§4 第三者への提供（108行目）・ドイツ語（corp側と同一の誤り）**

現在：
```
wenn dies aufgrund von Rechtsvorschriften erforderlich ist;
```
置換後：
```
wenn dies auf Rechtsvorschriften beruht;
```

**PVLEGAL-07｜§4 第三者への提供（108行目）・スペイン語（.com側独自の発見）**

現在：
```
Cuando así lo exija la legislación.
```
置換後：
```
Cuando ello se base en la legislación.
```

### ⑤委託等→委託のみに限定

**PVLEGAL-08｜§6 越境移転（125行目）・英語（.com側独自の発見）**

現在：
```
in connection with the outsourcing described in the preceding section
```
置換後：
```
in connection with the outsourcing or similar arrangements described in the preceding section
```

**PVLEGAL-09｜§6 越境移転（125行目）・フランス語（corp側と同一の誤り）**

現在：
```
dans le cadre de la sous-traitance visée à l'article précédent
```
置換後：
```
dans le cadre de la sous-traitance ou d'accords similaires visés à l'article précédent
```

**PVLEGAL-10｜§6 越境移転（125行目）・ドイツ語（.com側独自の発見）**

現在：
```
im Rahmen der vorgenannten Auftragsverarbeitung nutzen
```
置換後：
```
im Rahmen der vorgenannten Auftragsverarbeitung oder ähnlicher Vereinbarungen nutzen
```

**PVLEGAL-11｜§6 越境移転（125行目）・スペイン語（.com側独自の発見）**

現在：
```
en los encargos mencionados en el apartado anterior
```
置換後：
```
en los encargos o acuerdos similares mencionados en el apartado anterior
```

### ③「等」の脱落

**PVLEGAL-12｜§11 開示等の請求（160行目）・英語（corp側と同一の誤り）**

現在：
```
suspension of use, or suspension of provision to third parties of your own personal information held by the Company.
```
置換後：
```
suspension of use, suspension of provision to third parties, or other similar measures regarding your own personal information held by the Company.
```

**PVLEGAL-13｜§11 開示等の請求（160行目）・フランス語（.com側独自の発見）**

現在：
```
la cessation d'utilisation ou la cessation de communication à des tiers des données personnelles vous concernant que la Société détient.
```
置換後：
```
la cessation d'utilisation, la cessation de communication à des tiers, ou toute autre mesure similaire concernant les données personnelles vous concernant que la Société détient.
```

### ③「等」の脱落＋④利用停止→制限（1件で両方是正）

**PVLEGAL-14｜§11 開示等の請求（160行目）・ドイツ語（corp側と同一の誤り）**

現在：
```
Einschränkung der Nutzung oder die Einstellung der Weitergabe an Dritte verlangen.
```
置換後：
```
die Einstellung der Nutzung, der Weitergabe an Dritte oder sonstige entsprechende Maßnahmen bezüglich Ihrer personenbezogenen Daten verlangen.
```
★Codexレビューで「Nutzungsstopp」が口語的と指摘・「die Einstellung der Nutzung」(利用の停止・文体を隣接する「die Einstellung der Weitergabe」に統一)へ修正済み

---

## Codex独立レビュー（検出4回＋修正案検証2回・計6回）

**検出フェーズ**：en/fr/de/esの4言語は個別に1言語1回、各4パターンを判定（zh-cn/zh-tw/koも同様に個別実施・問題なしを確認）。

**修正案検証フェーズ**：ラテン文字系（en+fr）とゲルマン・ロマンス系（de+es）の2回に分けて、修正案が(a)日本語原文の意味の広さを正しく回復しているか(b)不自然な訳文になっていないか(c)新たな意味のズレを生んでいないかを検証。**2件の文法・語彙上の指摘を受け、反映済み**＝①フランス語①の代名詞不一致（'dont ils'→'dont elles'、'les personnes'が女性名詞のため）②ドイツ語③④の「Nutzungsstopp」が口語的との指摘（「die Einstellung der Nutzung」へ変更・隣接する「die Einstellung der Weitergabe」と文体を統一）。

**韓国語の「開示→열람」については、Codexから今回あらためて指摘があったが、corp側の7言語通読でこの同一箇所・同一表現を既に確認済みで「韓国個人情報保護法の標準法律用語（access/viewing相当）であり訳抜けではない」と判断されている。今回は新規の実害確認材料がないため、この既存判断を踏襲し是正対象に含めなかった。**

## 対外文言の禁止事項の確認

置換はいずれも「原文の権利・例外の範囲を回復する」句読点・語句レベルの修正のみで、掲載作家数・「物故／現存」の分け方・価格・確定タグライン等への抵触はありません。

## 実施していないこと

- 是正の実行はしていません（票の作成まで。実行は制作T）。
- corp側（.co.jpのprivacy.html）の同型是正は、コーポレート制作Tが別途対応中のため本票の対象外です（.com側のみ）。
- `apply-fixes.mjs`への実際の収録・実行はしていません。`fixes-privacy-legal.json`（同梱）はapply-fixes.mjsが読み込める形式で用意しましたが、投入・実行の判断は制作T・司令塔・代表に委ねます（法的文書のため）。
- 韓国語の繁体・簡体を除く全8言語の全文（前文＋13節）通読はしていません（corp側で確立した5パターンに限定した点検）。

証拠の置き場所＝`reports/assets/20260729_i18n/fix-orders-privacy-legal.md`（本ファイル）・`fixes-privacy-legal.json`（機械可読版）。
