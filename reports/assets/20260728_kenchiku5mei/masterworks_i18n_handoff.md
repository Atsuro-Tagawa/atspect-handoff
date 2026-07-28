# 建築5名 masterworks 8言語訳・制作T引き渡し（再検証・是正版）

- 対象：丹下健三・清家清・磯崎新・槇文彦・内田祥三
- 正本：`C:\Vault\ARTS-RESPECT\_翻訳データ_建築5名artist_i18n_masterworks_20260728_再検証版_ATSPECT.md`（Vaultローカル・完成次第このファイルの最終版と同期）
- 本ファイルは1名完了ごとに追記・push（進捗を都度可視化するため）

## ライブ実測（2026-07-28）
5名全員の英語ページ（`?lang=en`）で「Selected Works」欄が日本語原文のまま表示されていることを実機確認（`/pages/artist/tange-kenzo`・`seike-kiyoshi`・`isozaki-arata`・`maki-fumihiko`・`uchida-yoshikazu`）。2026-07-25作成の旧版翻訳データが未反映のまま残っていたことを確認した。

## 進捗
- [x] 丹下健三：Codex独立レビュー完了・「本館」欠落を発見し8言語で是正
- [ ] 清家清
- [ ] 磯崎新
- [ ] 槇文彦
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

<!-- created: 2026-07-28 by terminal=あつぺくとリサーチ model=Sonnet 5 work=建築5名masterworks再検証・是正・制作T引き渡し（進捗:丹下健三のみ完了） -->
