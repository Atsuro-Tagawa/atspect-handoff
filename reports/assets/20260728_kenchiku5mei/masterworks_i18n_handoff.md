# 建築5名 masterworks 8言語訳・制作T引き渡し（再検証・是正版）

- 対象：丹下健三・清家清・磯崎新・槇文彦・内田祥三
- 正本：`C:\Vault\ARTS-RESPECT\_翻訳データ_建築5名artist_i18n_masterworks_20260728_再検証版_ATSPECT.md`（Vaultローカル・完成次第このファイルの最終版と同期）
- 本ファイルは1名完了ごとに追記・push（進捗を都度可視化するため）

## ライブ実測（2026-07-28）
5名全員の英語ページ（`?lang=en`）で「Selected Works」欄が日本語原文のまま表示されていることを実機確認（`/pages/artist/tange-kenzo`・`seike-kiyoshi`・`isozaki-arata`・`maki-fumihiko`・`uchida-yoshikazu`）。2026-07-25作成の旧版翻訳データが未反映のまま残っていたことを確認した。

## 進捗
- [x] 丹下健三：Codex独立レビュー完了・「本館」欠落を発見し8言語で是正
- [x] 清家清：Codex独立レビュー完了・「登録有形文化財」の年号表記を是正
- [x] 磯崎新：Codex独立レビュー完了・「登録有形文化財」の年号表記を是正
- [x] 槇文彦：Codex独立レビュー完了・ヒルサイドテラスの竣工年範囲の誤りを一次資料で発見・是正
- [ ] 内田祥三

## 丹下健三（完了）

**是正**：CSV原文「広島平和記念資料館本館」の「本館」が、07-25版の7言語訳すべてで脱落していた（Codex独立レビューで発見）。8言語すべてで復元。

```json
{
  "丹下健三": {
    "masterworks": {
      "ja": "広島平和記念資料館本館（広島県広島市・1955年竣工・現存・重要文化財2006年指定）、香川県庁舎東館（香川県高松市・1958年竣工・現存・重要文化財2022年指定）、国立代々木競技場（東京都渋谷区・1964年竣工・現存・重要文化財2021年指定）",
      "en": "Hiroshima Peace Memorial Museum Main Building (Hiroshima, Hiroshima Prefecture; completed 1955; extant; Important Cultural Property, designated 2006), Kagawa Prefectural Government Office East Building (Takamatsu, Kagawa Prefecture; completed 1958; extant; Important Cultural Property, designated 2022), Yoyogi National Gymnasium (Tokyo, Shibuya Ward; completed 1964; extant; Important Cultural Property, designated 2021)",
      "zh_cn": "广岛和平纪念资料馆本馆（广岛县广岛市·1955年竣工·现存·重要文化财2006年指定）、香川县厅舍东馆（香川县高松市·1958年竣工·现存·重要文化财2022年指定）、国立代代木竞技场（东京都涩谷区·1964年竣工·现存·重要文化财2021年指定）",
      "zh_tw": "廣島和平紀念資料館本館（廣島縣廣島市·1955年竣工·現存·重要文化財2006年指定）、香川縣廳舍東館（香川縣高松市·1958年竣工·現存·重要文化財2022年指定）、國立代代木競技場（東京都澀谷區·1964年竣工·現存·重要文化財2021年指定）",
      "ko": "히로시마 평화기념자료관 본관(히로시마현 히로시마시·1955년 준공·현존·중요문화재 2006년 지정), 가가와현청사 동관(가가와현 다카마쓰시·1958년 준공·현존·중요문화재 2022년 지정), 국립요요기경기장(도쿄도 시부야구·1964년 준공·현존·중요문화재 2021년 지정)",
      "fr": "bâtiment principal du Musée commémoratif de la paix d'Hiroshima (Hiroshima, préfecture de Hiroshima; achevé en 1955; existant; Bien culturel important, classé en 2006), aile est de l'hôtel de la préfecture de Kagawa (Takamatsu, préfecture de Kagawa; achevée en 1958; existante; Bien culturel important, classé en 2022), Gymnase national de Yoyogi (Tokyo, arrondissement de Shibuya; achevé en 1964; existant; Bien culturel important, classé en 2021)",
      "es": "edificio principal del Museo Conmemorativo de la Paz de Hiroshima (Hiroshima, prefectura de Hiroshima; terminado en 1955; existente; Bien Cultural Importante, declarado en 2006), ala este de la sede del gobierno de la prefectura de Kagawa (Takamatsu, prefectura de Kagawa; terminada en 1958; existente; Bien Cultural Importante, declarado en 2022), Gimnasio Nacional de Yoyogi (Tokio, distrito de Shibuya; terminado en 1964; existente; Bien Cultural Importante, declarado en 2021)",
      "de": "Hauptgebäude des Hiroshima-Friedensgedenkmuseums (Hiroshima, Präfektur Hiroshima; fertiggestellt 1955; erhalten; Wichtiges Kulturgut, ausgewiesen 2006), Ostflügel des Regierungsgebäudes der Präfektur Kagawa (Takamatsu, Präfektur Kagawa; fertiggestellt 1958; erhalten; Wichtiges Kulturgut, ausgewiesen 2022), Yoyogi-Nationalsportstätte (Tokio, Bezirk Shibuya; fertiggestellt 1964; erhalten; Wichtiges Kulturgut, ausgewiesen 2021)"
    }
  }
}
```

## 清家清（完了）

**是正**：「登録有形文化財2017年指定」は法令上の誤り。文化財保護法上、重要文化財は「指定」、登録有形文化財は「登録」と動詞が異なる（出典＝文化庁公式「文化財の種類，指定・選定・登録」）。8言語すべてで「指定」→「登録」に修正。「(Watashi no Ie)」の音訳併記はCodexが削除提案したが、原題の参照性を高める目的で意図的に残す判断とした（原文にない事実の追加ではないため）。

```json
{
  "清家清": {
    "masterworks": {
      "ja": "私の家（東京都大田区・1954年竣工・現存・登録有形文化財2017年登録）、九州工業大学記念講堂（福岡県北九州市・1960年竣工・現存）",
      "en": "\"My House\" (Watashi no Ie) (Tokyo, Ota Ward; completed 1954; extant; Registered Tangible Cultural Property, registered 2017), Kyushu Institute of Technology Memorial Auditorium (Kitakyushu, Fukuoka Prefecture; completed 1960; extant)",
      "zh_cn": "\"我的家\"（Watashi no Ie）（东京都大田区·1954年竣工·现存·登记有形文化财2017年登记）、九州工业大学纪念讲堂（福冈县北九州市·1960年竣工·现存）",
      "zh_tw": "「我的家」（Watashi no Ie）（東京都大田區·1954年竣工·現存·登錄有形文化財2017年登錄）、九州工業大學紀念講堂（福岡縣北九州市·1960年竣工·現存）",
      "ko": "'나의 집'(Watashi no Ie)(도쿄도 오타구·1954년 준공·현존·등록유형문화재 2017년 등록), 규슈공업대학 기념강당(후쿠오카현 기타큐슈시·1960년 준공·현존)",
      "fr": "« Ma maison » (Watashi no Ie) (Tokyo, arrondissement d'Ota; achevée en 1954; existante; bien culturel tangible enregistré en 2017), auditorium commémoratif de l'Institut de technologie de Kyushu (Kitakyushu, préfecture de Fukuoka; achevé en 1960; existant)",
      "es": "«Mi casa» (Watashi no Ie) (Tokio, distrito de Ota; terminada en 1954; existente; Bien Cultural Tangible Registrado en 2017), auditorio conmemorativo del Instituto de Tecnología de Kyushu (Kitakyushu, prefectura de Fukuoka; terminado en 1960; existente)",
      "de": "„Mein Haus\" (Watashi no Ie) (Tokio, Bezirk Ota; fertiggestellt 1954; erhalten; registriertes materielles Kulturgut, eingetragen 2017), Gedenkauditorium des Kyushu Institute of Technology (Kitakyushu, Präfektur Fukuoka; fertiggestellt 1960; erhalten)"
    }
  }
}
```

## 磯崎新（完了）

**是正**：清家清と同様、「登録有形文化財2022年指定」→「2022年登録」に是正（法令上の動詞誤り）。カタカナ由来の建物名（つくばセンタービル・水戸芸術館）を不訳とする方針はCodexレビューで妥当と確認（「不訳」ではなく「公式のラテン文字表記の維持」という理解が正確、との指摘を注記に反映）。

```json
{
  "磯崎新": {
    "masterworks": {
      "ja": "旧大分県立大分図書館（現アートプラザ）（大分県大分市・1966年竣工・現存・登録有形文化財2022年登録）、つくばセンタービル（茨城県つくば市・1983年竣工・現存）、水戸芸術館（茨城県水戸市・1990年竣工・現存）",
      "en": "former Oita Prefectural Library (now Art Plaza) (Oita, Oita Prefecture; completed 1966; extant; Registered Tangible Cultural Property, registered 2022), Tsukuba Center Building (Tsukuba, Ibaraki Prefecture; completed 1983; extant), Art Tower Mito (Mito, Ibaraki Prefecture; completed 1990; extant)",
      "zh_cn": "旧大分县立大分图书馆（现Art Plaza）（大分县大分市·1966年竣工·现存·登记有形文化财2022年登记）、筑波中心大厦（茨城县筑波市·1983年竣工·现存）、水户艺术馆（茨城县水户市·1990年竣工·现存）",
      "zh_tw": "舊大分縣立大分圖書館（現Art Plaza）（大分縣大分市·1966年竣工·現存·登錄有形文化財2022年登錄）、筑波中心大廈（茨城縣筑波市·1983年竣工·現存）、水戶藝術館（茨城縣水戶市·1990年竣工·現存）",
      "ko": "구 오이타현립 오이타도서관(현 아트플라자)(오이타현 오이타시·1966년 준공·현존·등록유형문화재 2022년 등록), 쓰쿠바 센터 빌딩(이바라키현 쓰쿠바시·1983년 준공·현존), 미토 예술관(이바라키현 미토시·1990년 준공·현존)",
      "fr": "ancienne bibliothèque préfectorale d'Ōita (aujourd'hui Art Plaza) (Ōita, préfecture d'Ōita; achevée en 1966; existante; bien culturel tangible enregistré en 2022), Tsukuba Center Building (Tsukuba, préfecture d'Ibaraki; achevé en 1983; existant), Art Tower Mito (Mito, préfecture d'Ibaraki; achevé en 1990; existant)",
      "es": "antigua Biblioteca Prefectural de Oita (actualmente Art Plaza) (Oita, prefectura de Oita; terminada en 1966; existente; Bien Cultural Tangible Registrado en 2022), Tsukuba Center Building (Tsukuba, prefectura de Ibaraki; terminado en 1983; existente), Art Tower Mito (Mito, prefectura de Ibaraki; terminado en 1990; existente)",
      "de": "ehemalige Präfekturbibliothek Ōita (heute Art Plaza) (Ōita, Präfektur Ōita; fertiggestellt 1966; erhalten; registriertes materielles Kulturgut, eingetragen 2022), Tsukuba Center Building (Tsukuba, Präfektur Ibaraki; fertiggestellt 1983; erhalten), Art Tower Mito (Mito, Präfektur Ibaraki; fertiggestellt 1990; erhalten)"
    }
  }
}
```

## 槇文彦（完了）

**★是正（重要・事実誤りの発見）**：「ヒルサイドテラス（東京都渋谷区・1969-1998年にかけて段階的に竣工・現存）」の竣工年範囲が誤り。設計者自身の事務所「マキ アンド アソシエイツ」公式サイト（`maki-and-associates.co.jp/projects/HST`）を確認したところ、ヒルサイドテラス（I〜VI期）の竣工年は**1969-1992年**であり、同社サイトは1998年の「ヒルサイドウエスト」を別プロジェクト（`HTW`）として扱っている。1969-1998年という表記は、この2つのプロジェクトを混同したものと判断し、日本語原文ごと「1969-1992年」に是正した（ヒルサイドウエストは範囲を広げて含めず、確実に一次資料と一致する期間のみ採用）。**この誤りはCSVの`masterworks_text`（日本語原文）自体に存在しており、8言語訳だけの問題ではない**。あわせてCodex指摘により英語の「Chiba, Chiba Prefecture」を「Chiba City, Chiba Prefecture」に精緻化。

```json
{
  "槇文彦": {
    "masterworks": {
      "ja": "ヒルサイドテラス（東京都渋谷区・1969-1992年にかけて段階的に竣工・現存）、スパイラル（東京都港区・1985年竣工・現存）、幕張メッセ（千葉県千葉市・1989年竣工・現存）",
      "en": "Hillside Terrace (Tokyo, Shibuya Ward; completed in stages 1969–1992; extant), Spiral (Tokyo, Minato Ward; completed 1985; extant), Makuhari Messe (Chiba City, Chiba Prefecture; completed 1989; extant)",
      "zh_cn": "Hillside Terrace（东京都涩谷区·1969-1992年分阶段竣工·现存）、Spiral（东京都港区·1985年竣工·现存）、Makuhari Messe（千叶县千叶市·1989年竣工·现存）",
      "zh_tw": "Hillside Terrace（東京都澀谷區·1969-1992年分階段竣工·現存）、Spiral（東京都港區·1985年竣工·現存）、Makuhari Messe（千葉縣千葉市·1989年竣工·現存）",
      "ko": "힐사이드 테라스(도쿄도 시부야구·1969-1992년에 걸쳐 단계적으로 준공·현존), 스파이럴(도쿄도 미나토구·1985년 준공·현존), 마쿠하리 멧세(지바현 지바시·1989년 준공·현존)",
      "fr": "Hillside Terrace (Tokyo, arrondissement de Shibuya; achevé par étapes entre 1969 et 1992; existant), Spiral (Tokyo, arrondissement de Minato; achevé en 1985; existant), Makuhari Messe (Chiba, préfecture de Chiba; achevé en 1989; existant)",
      "es": "Hillside Terrace (Tokio, distrito de Shibuya; terminado por etapas entre 1969 y 1992; existente), Spiral (Tokio, distrito de Minato; terminado en 1985; existente), Makuhari Messe (Chiba, prefectura de Chiba; terminado en 1989; existente)",
      "de": "Hillside Terrace (Tokio, Bezirk Shibuya; in Etappen zwischen 1969 und 1992 fertiggestellt; erhalten), Spiral (Tokio, Bezirk Minato; fertiggestellt 1985; erhalten), Makuhari Messe (Chiba, Präfektur Chiba; fertiggestellt 1989; erhalten)"
    }
  }
}
```

**Codexが提案したが不採用とした点**：①文化財指定欄の追加＝DOCOMOMO Japan選定等は文化財保護法上の法的指定・登録とは別制度のため、他の建築家分と同じ「未確認は欄自体を省略」の規則を適用し追加しなかった。②「不訳」方針の説明の言い換え＝「公式のラテン文字表記の維持」という表現の方が正確、との指摘を上記の方針欄に反映した。

<!-- created: 2026-07-28 by terminal=あつぺくとリサーチ model=Sonnet 5 work=建築5名masterworks再検証・是正・制作T引き渡し（進捗:丹下健三・清家清・磯崎新・槇文彦完了） -->
