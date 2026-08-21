# 制作T報告：言語別フィールド設計の根治便（2026-08-20）

**ターミナル：あつぺくと制作 ／ 使用モデル：Fable 5（司令塔指定・本便のみ） ／ 作業：言語別フィールド根治＋同梱2件**

## 結論

**完遂。** フラット欄の日本語が非日本語ページに出る問題を、テーマ161の表示ロジックで根治した（2ファイル反映・読み戻しバイト一致・実DOM検証で flat 日本語露出0・横溢れ0）。同梱2件（見出し【】統一の完成／藤代さま617字維持の決着）も反映・記録済み。

## 1. 何をどう変えたか（テーマ161・2ファイル）

- **`sections/atspect-artist-detail.liquid`**＝表示のはしごを **「その言語 → en（作品名は→romaji）→ 欄ごと非表示」** に統一し、従来の最後の「→ 日本語」への落下を廃止（対象＝一言・出身・肩書き・代表作・収蔵先・所属団体・功績・著書flat・図版キャプション）。日本語ページはSSR原文を `data-aad-ssr0` に退避して復元＝**1画素も変えない**（言語を何往復しても冪等）。値ゼロの欄は**見出しごと痕跡なく非表示**（3欄全滅ならセクションごと）。**訳が artist_i18n に入り次第、テーマ改修なしで自動復活。**
  反映前SHA `b310607a…5959ff` → 反映後 `2c012b42…0651e4`（CAS＝並行編集なしを確認）
- **`snippets/atspect-donation-works.liquid`**＝同梱A。寄贈枠見出し（作家ページ唯一の非【】欄見出し・現在全作家0点で非表示）を【】8言語へ統一。他の欄見出しの【】統一は2026-08-14反映済みをライブで確認。
  反映前SHA `48350624…b3993` → 反映後 `9c8db903…96b6b2`

## 2. 検証（すべて実物）

- 機械検証＝liquidタグ均衡OK／インラインJS node --check OK／旧はしご `aadPick(` 残存0。
- 読み戻し＝両ファイル BYTE-IDENTICAL（theme161-update.mjs＝バックアップ＋CAS＋SHA-256一体）。
- **実DOM検証＝7名×ja/en/de×390幅の21通り**（新版マーカーで新版を確認してから測定）：
  - flat日本語露出 **0件**。中原淳一さま en/de＝【Collections】【Art Groups】が欄ごと非表示（ja は弥生美術館等を従来どおり表示）／島成園さま en＝団体欄非表示／西川寧さま en＝著書flat欄非表示／丹下健三さま en＝**訳がある欄は英語で表示され続ける**ことを実証／鈴木・藤代・渡辺さま＝変化なし。横溢れ21件全てOK。
  - 非日本語に残る日本語の字は2種のみ＝①一言の下の日本語原文併記（訳が主・原文が従＝既存仕様）②訳値内の原語併記（例 de「Tokyo National Museum (東京国立博物館)」＝裁定D2の型で正当）。
- 全627名機械走査（ライブ15時台取り直し）＝新ロジックで flat 露出0＋上記DOMで機構を裏取り。
- スクショ検品＝指示の4名×ja/en/de×390幅の12枚を目視（`shots_after/`）。

## 3. Codex独立レビュー（設計書・観点＝読者視点で欄が消えて困る場面）

**総合NO-GO**（収蔵先等は原文でも照合価値がある／「情報なし」と「未翻訳」の区別が消える／zh圏は漢字を読める等の4指摘）。**裁定＝設計維持**（司令塔の指示した基本形）。根拠＝原文はサイトから消えず**言語切替1クリックで日本語版に到達できる**こと、「未翻訳」注記は表示標準P5と信頼感に反すること、zh例外は「かな混じり値」で作家ごとに出たり消えたりする不統一（P1違反）を生むこと。採用した点＝翻訳待ち期間の緩和（下記4）と方針の非一貫箇所の明記。詳細＝設計書§6。
**（任意の代表判断論点）**Codex提案の「zh圏のみ日本語原文の補助表示」を採るか＝採る場合も変更は1箇所（aadPickL）で済む。

## 4. 翻訳Tへの申し送り（訳が入り次第、欄が自動復活する対象）

`reports/assets/20260820_言語別フィールド設計根治/翻訳T申し送り_訳が必要な欄一覧.md`（handle・現行値の全数つき）
＝ **collection_places 30名／groups 74名／masterworks 5名（建築4・書1）／book_history 1名（西川寧さま）**＋訳値内日本語の判読候補153件（大半は正当な原語併記の見込み・当たり＝誤り件数ではない）。

## 5. 自分の誤りの訂正（正直な記録）

- **masterworks申し送りを初版26名と誤計数**→実DOM（丹下さまenが英語表示）とデータの矛盾から `artist_i18n.masterworks` の2形式（作品ごと配列581名／言語別オブジェクト21名）の後者の数え落としを発見→**5名に訂正**。
- **「反映前」スクショを撮り逃した**（反映1分後の撮影が既に新版＝配信キャッシュが新規コンテキストに新版を返した）。反映前の証拠＝翻訳T 2026-08-19のDOM実測（第35束）と本便のデータシミュレーション。

## 6. 実施していないこと・判定していないこと

- データの新規翻訳は作っていない（翻訳Tの持ち場）。bio/messageの「その言語が無ければja本文」フォールバックは言語別フィールドの別論点＝触っていない。og:description/JSON-LDの日本語は変更していない（1URLにHTMLは1枚＝言語別メタは構造的に不可）。代表作2点目のキャプション言語連動の器は未整備のまま（現在対象0名を実測）。
- `atspect-theme` リポジトリの git commit はしていない（事前承認が要るため。CLAUDE.mdへの恒久ルール1行追記が未コミットで載っている＝前回分と合わせて2件）。

## 7. 証拠の置き場所

`reports/assets/20260820_言語別フィールド設計根治/`（設計書・翻訳T申し送り・DOM実測JSON＋スクリプト・スクショ12枚・README）
Vault＝`_実装ログ_言語別フィールド根治_20260820_ATSPECT.md`／現在地サマリ追記219／バックアップ2件（`_backups\_auto\theme161-*\20260820-*.bak`）

最終更新：2026-08-20

---

# 制作T報告：3名の修正便（2026-08-20・第2便）

**ターミナル：あつぺくと制作 ／ 使用モデル：Opus 5（claude-opus-5[1m]・本便全体で切替なし） ／ 作業：3名（鈴木・渡辺・藤代）の表示と本文の修正**

## 結論

**完遂。** 指示9項目（鈴木4・藤代8・渡辺1）のうち **8項目を反映済み**、**1項目は指示どおり見送り**（藤代7＝ポスターの題と収蔵の別は本人確認待ちのため触らない）。
テーマ161を **14ファイル**（新規2・既存12）、データを **作家2名＋作品3点** 更新。
**画面に出る「●」＝0件**（18ページの可視テキストを機械で計数）。**Liquidエラー＝0件**（11ページ）。
Codexの独立レビューを **11回**（8言語の読者役＋実装3観点）通し、**指摘のうち実害のある5件を採用して直してから**公開状態を確定した。

## 1. 指示に対する対応（1対1）

| # | 指示 | 状態 |
|---|---|---|
| 鈴木1 | 代表作の題＝《相撲》（鳥獣戯画より）へ。「ウサギとカエル」削除 | 反映済み |
| 鈴木2 | 販売作品3点の題＝《…》（鳥獣戯画より） | 反映済み（題の外に添える器を新設） |
| 鈴木3 | 4点とも説明文から鳥獣人物戯画の言及を外す | 反映済み（3点×7言語＋商品の素の説明3件。代表作に説明欄は無い＝題の修正で対応） |
| 鈴木4 | （鳥獣戯画より）の型を各言語で統一 | 反映済み（**8言語**。関所で訳形を確定） |
| 藤代1 | 出身欄＝「出身 茨城 ／ 出生 山形」・同一の文字デザイン | 反映済み（出生欄を新設。8言語） |
| 藤代2 | 略歴の3文を差し替え・8言語追随／617字維持の決着を上書き | 反映済み（表示標準の改訂記録に記帳） |
| 藤代3 | 【ガラス】を「制作を行う」型へ／ヴェネツィアへ統一 | 反映済み（8言語） |
| 藤代4 | 見出し【デザインの仕事】→【デザイン作品】 | 反映済み（8言語） |
| 藤代5 | 【デザイン作品】を【デザイン】説明の直下へ移動 | 反映済み（8言語で確認） |
| 藤代6 | 美術館名の統一（日本語＝ルーヴル装飾美術館／欧文＝正式名） | 反映済み（8言語） |
| 藤代7 | ポスター2点の題・収蔵の別は**本便では行わない**・本人確認リストに起票 | **指示どおり未実施**＋起票済み |
| 藤代8 | 図版下情報の●＝項目ごと非表示・データは消さない | 反映済み（テーマ側で表示から外す＝データ無変更） |
| 渡辺1 | 作品図版下の●を同じ方式で非表示・不足項目を作品別に起票 | 反映済み＋起票済み |

## 2. テーマ161で変えたこと（14ファイル・すべて読み戻しバイト一致）

**考え方＝「●」はデータから消さない。** ご本人の回答が入り次第、テーマを触らずにそのまま表示へ戻ります。
表示の側で「●は値ではない」と扱う規則を **1か所（新規スニペット）に集め**、6つの画面から共通で呼ぶ形にしました（同じ穴を6か所に開けないため）。

| ファイル | 何をしたか | 反映後SHA-256(先頭12) |
|---|---|---|
| `snippets/atspect-clean-maru.liquid`（新規） | 「●」と隣の区切りだけを外す規則。●を含まない値には触れない | `21a093c719d1` |
| `snippets/atspect-work-title.liquid`（新規） | 作品名の組み立てを集約（《》・●除去・題の外の一言8言語） | `976e9f3a9a7f` |
| `snippets/atspect-work-spec.liquid` | 素材・寸法から●を落としてから判定（「●　F8号」→「F8号」） | `11ea16135824` |
| `snippets/atspect-wishlist-button.liquid` | お気に入りに保存する題から●を外す | `e349bb718608` |
| `snippets/meta-tags.liquid` | 共有カードの題が●だけのとき作家名に置き換える | `c8917b3fc5ca` |
| `sections/atspect-artist-detail.liquid` | 出生欄の新設／【デザイン作品】への改称と位置移動／代表作キャプションの●除去／題の外の一言 | `22cf6462c11d` |
| `sections/atspect-artwork-detail.liquid` | 題・素材・寸法・説明の●除去（空なら見出しごと非表示）／題の外の一言／関連作品の題を言語連動へ | `f4d9d534dba7` |
| `sections/atspect-collection.liquid` | カードの題を共通スニペットへ | `b4dbcef9dc3e` |
| `sections/atspect-artist-archive.liquid` | 同上 | `ffc81227b13e` |
| `sections/atspect-collector-cta.liquid` | 同上 | `77e458d10f04` |
| `sections/atspect-search.liquid` | 同上 | `292d6d600cf2` |
| `assets/atspect.css` | 題の外の一言の言語切替（`.awn-l`）を全体CSSに1回だけ定義 | `36a6337cf101` |
| `assets/atspect-wishlist.js` | 保存済みデータに残る●を描画時に落とす | `508490bb49f3` |
| `layout/theme.liquid` | タブの見出しが●だけのとき作家名に置き換える | `239e98dd8643` |

**★他ターミナルの編集を巻き込んでいない**＝編集前にライブから取り直したところ**ローカルは5ファイルで古かった**（SNS運用Tの区切り言語別化など）。ライブ版に自分の変更を載せ直してから押しています。押しは全件 `theme161-update.mjs`（バックアップ＋並行編集検知＋読み戻しSHA-256照合が一体）。

## 3. データで変えたこと（全件一覧）

### A. 藤代 範雄さま｜略歴（bio）＝置換5種 × 8言語 ＝ 40箇所

| 言語 | 変更前 | 変更後 |
|---|---|---|
| ja | 制作はイタリア・ヴェネツィアのガラス工房に渡って行い、沖縄をはじめ各地の工房でも手を動かす。 | イタリア・ヴェネツィアのガラス工房をはじめ、沖縄など国内外の工房で精力的に制作を行う。 |
| ja | デザイナーとしての歳月を重ねるうちに、ガラスへの憧れと情熱がふたたび呼び起こされた。 | デザイナーとしてのキャリアを築きあげるなかで、ガラス制作への魅力と憧れ、情熱がふたたび呼び起こされた。 |
| ja | その願いが、いまの仕事を支えている。 | その願いが、いまも制作のエネルギー源となっている。 |
| ja | ルーヴル宮パリ装飾芸術美術館に《テロと報復》が収蔵されている。 | ルーヴル装飾美術館に《テロと報復》が収蔵されている。 |
| ja | 沖縄の琉球ガラスと、イタリア・ヴェネチアのムラーノ島でガラスをつくっている。 | 沖縄の琉球ガラスと、イタリア・ヴェネツィアのムラーノ島で制作を行う。 |
| en | He travels to glass workshops in Venice, Italy to make his work, and also works at workshops in Okinawa and elsewhere. | He works tirelessly in glass workshops in Japan and abroad, from Venice in Italy to Okinawa. |
| en | and over his years as a designer his longing and passion for glass were awakened once more. | and as he built his career as a designer, he felt anew the appeal of glassmaking, and his longing and passion for it were awakened once more. |
| en | that wish sustains the work he does today. | that wish is still the source of energy for his work. |
| en | is held by the Musée des Arts Décoratifs at the Palais du Louvre, Paris. | is held by the Musée des Arts Décoratifs, Paris. |
| en | He makes Ryūkyū glass in Okinawa, and also works glass on the island of Murano in Venice, Italy. | He works with Ryūkyū glass in Okinawa, and also creates on the island of Murano in Venice, Italy. |
| zh-cn | 他远赴意大利威尼斯的玻璃工坊制作，也在冲绳等各地的工坊里动手。 | 他以意大利威尼斯的玻璃工坊为首，在冲绳等国内外的工坊里精力充沛地进行创作。 |
| zh-cn | 在作为设计师的岁月里，对玻璃的憧憬与热情再度被唤起。 | 在建立设计师生涯的过程中，他再次感受到玻璃创作的魅力，对它的憧憬与热情也重新被唤起。 |
| zh-cn | 这一心愿，支撑着他今天的工作。 | 这一心愿，至今仍是他创作的能量源泉。 |
| zh-cn | 《恐怖与报复》为位于巴黎卢浮宫的装饰艺术博物馆收藏。 | 《恐怖与报复》为巴黎卢浮宫装饰艺术博物馆收藏。 |
| zh-cn | 在冲绳从事琉球玻璃制作，也在意大利威尼斯的穆拉诺岛制作玻璃。 | 在冲绳从事琉球玻璃创作，也在意大利威尼斯的穆拉诺岛进行创作。 |
| zh-tw | 他遠赴義大利威尼斯的玻璃工坊製作，也在沖繩等各地的工坊裡動手。 | 他以義大利威尼斯的玻璃工坊為首，在沖繩等國內外的工坊裡精力充沛地進行創作。 |
| zh-tw | 在作為設計師的歲月裡，對玻璃的憧憬與熱情再度被喚起。 | 在建立設計師生涯的過程中，他再次感受到玻璃創作的魅力，對它的憧憬與熱情也重新被喚起。 |
| zh-tw | 這一心願，支撐著他今天的工作。 | 這一心願，至今仍是他創作的能量泉源。 |
| zh-tw | 《恐怖與報復》為位於巴黎羅浮宮的裝飾藝術博物館收藏。 | 《恐怖與報復》為巴黎羅浮宮裝飾藝術博物館收藏。 |
| zh-tw | 在沖繩從事琉球玻璃製作，也在義大利威尼斯的穆拉諾島製作玻璃。 | 在沖繩從事琉球玻璃創作，也在義大利威尼斯的穆拉諾島進行創作。 |
| ko | 이탈리아 베네치아의 유리 공방으로 건너가 작업하며, 오키나와를 비롯한 여러 곳의 공방에서도 손을 움직인다. | 이탈리아 베네치아의 유리 공방을 비롯해 오키나와 등 국내외의 공방에서 정력적으로 제작을 이어 간다. |
| ko | 디자이너로 보낸 세월 속에서 유리를 향한 동경과 열정이 다시 깨어났다. | 디자이너로서 경력을 쌓아 가는 가운데 유리 제작의 매력을 다시 느꼈고, 그에 대한 동경과 열정도 다시 깨어났다. |
| ko | 그 바람이 지금의 일을 떠받치고 있다. | 그 바람이 지금도 제작의 에너지가 되고 있다. |
| ko | 〈테러와 보복〉이 파리 루브르궁 안의 장식예술미술관에 소장되어 있다. | 〈테러와 보복〉이 파리 루브르 장식미술관에 소장되어 있다. |
| ko | 오키나와에서 류큐 유리를 만들고, 이탈리아 베네치아의 무라노섬에서도 유리를 만들고 있다. | 오키나와에서 류큐 유리를 다루며, 이탈리아 베네치아의 무라노섬에서도 제작을 이어 간다. |
| fr | Il se rend dans des ateliers de verre à Venise, en Italie, pour y travailler, et œuvre aussi dans des ateliers d'Okinawa et d'ailleurs. | Il travaille sans relâche dans des ateliers de verre au Japon comme à l'étranger, de Venise, en Italie, jusqu'à Okinawa. |
| fr | au fil de ses années de designer, son désir et sa passion pour le verre se sont réveillés. | à mesure qu'il bâtissait sa carrière de designer, il a de nouveau ressenti l'attrait du travail du verre, et son désir et sa passion se sont réveillés. |
| fr | ce souhait porte aujourd'hui son travail. | ce souhait est aujourd'hui encore la source d'énergie de sa création. |
| fr | est conservé au Musée des Arts décoratifs, au Palais du Louvre, à Paris. | est conservé au Musée des Arts Décoratifs, à Paris. |
| fr | Il travaille le verre de Ryūkyū à Okinawa et travaille également le verre sur l'île de Murano, à Venise, en Italie. | Il travaille le verre de Ryūkyū à Okinawa et crée également sur l'île de Murano, à Venise, en Italie. |
| es | Viaja a talleres de vidrio de Venecia, en Italia, para trabajar, y también trabaja en talleres de Okinawa y de otros lugares. | Trabaja sin descanso en talleres de vidrio dentro y fuera de Japón, desde Venecia, en Italia, hasta Okinawa. |
| es | a lo largo de sus años como diseñador, su anhelo y su pasión por el vidrio despertaron de nuevo. | mientras construía su carrera como diseñador, volvió a sentir el atractivo de la creación en vidrio, y su anhelo y su pasión despertaron de nuevo. |
| es | ese deseo sostiene hoy su trabajo. | ese deseo sigue siendo hoy la fuente de energía de su trabajo. |
| es | se conserva en el Musée des Arts Décoratifs, en el Palacio del Louvre, París. | se conserva en el Musée des Arts Décoratifs, en París. |
| es | Trabaja el vidrio de Ryūkyū en Okinawa y también trabaja el vidrio en la isla de Murano, en Venecia, Italia. | Trabaja el vidrio de Ryūkyū en Okinawa y crea también en la isla de Murano, en Venecia, Italia. |
| de | Zum Arbeiten reist er in Glaswerkstätten nach Venedig in Italien und arbeitet auch in Werkstätten auf Okinawa und andernorts. | Unermüdlich arbeitet er in Glaswerkstätten im In- und Ausland – von Venedig in Italien bis Okinawa. |
| de | und über die Jahre als Gestalter erwachten Sehnsucht und Leidenschaft für das Glas erneut. | und während er sich eine Laufbahn als Gestalter aufbaute, spürte er erneut die Faszination der Glasarbeit, und seine Sehnsucht und seine Leidenschaft erwachten von Neuem. |
| de | dieser Wunsch trägt seine Arbeit bis heute. | dieser Wunsch ist bis heute die Energiequelle seines Schaffens. |
| de | befindet sich im Musée des Arts Décoratifs im Palais du Louvre, Paris. | befindet sich im Musée des Arts Décoratifs in Paris. |
| de | Er arbeitet mit Ryūkyū-Glas auf Okinawa und arbeitet außerdem mit Glas auf der Insel Murano in Venedig, Italien. | Er arbeitet auf Okinawa mit Ryūkyū-Glas und gestaltet außerdem auf der Insel Murano in Venedig, Italien. |

### B. 藤代 範雄さま｜出身欄＝2欄に分けた（8言語 × 2欄 ＝ 16箇所）

| 欄 | 言語 | 変更前 | 変更後 |
|---|---|---|---|
| 出身(location) | ja | 茨城（出生 山形） | 茨城 |
| 出身(location) | en | Ibaraki (born in Yamagata) | Ibaraki |
| 出身(location) | zh-cn | 茨城（生于山形） | 茨城 |
| 出身(location) | zh-tw | 茨城（生於山形） | 茨城 |
| 出身(location) | ko | 이바라키(야마가타 출생) | 이바라키 |
| 出身(location) | fr | Ibaraki (né à Yamagata) | Ibaraki |
| 出身(location) | es | Ibaraki (nacido en Yamagata) | Ibaraki |
| 出身(location) | de | Ibaraki (geboren in Yamagata) | Ibaraki |
| 出生(birthplace・新設) | ja | （欄そのものが無かった） | 山形 |
| 出生(birthplace・新設) | en | （欄そのものが無かった） | Yamagata |
| 出生(birthplace・新設) | zh-cn | （欄そのものが無かった） | 山形 |
| 出生(birthplace・新設) | zh-tw | （欄そのものが無かった） | 山形 |
| 出生(birthplace・新設) | ko | （欄そのものが無かった） | 야마가타 |
| 出生(birthplace・新設) | fr | （欄そのものが無かった） | Yamagata |
| 出生(birthplace・新設) | es | （欄そのものが無かった） | Yamagata |
| 出生(birthplace・新設) | de | （欄そのものが無かった） | Yamagata |

### C. 鈴木 千賀子さま｜代表作の題

| 欄 | 言語 | 変更前 | 変更後 |
|---|---|---|---|
| 代表作の題 artist_i18n.works[0].title | ja | 《相撲》ウサギとカエル | 《相撲》（鳥獣戯画より） |
| 同 | romaji | Sumō: Usagi to Kaeru | Sumō |
| 同 | en | Sumo: Rabbit and Frog | Sumo |
| 題の外の一言 works[0].note（新設） | ja | （無し） | （鳥獣戯画より） |
| 題の外の一言 works[0].note（新設） | en | （無し） | (after Chōjū-giga) |
| 題の外の一言 works[0].note（新設） | zh-cn | （無し） | （取自《鸟兽戏画》） |
| 題の外の一言 works[0].note（新設） | zh-tw | （無し） | （取自《鳥獸戲畫》） |
| 題の外の一言 works[0].note（新設） | ko | （無し） | (조수희화에서) |
| 題の外の一言 works[0].note（新設） | fr | （無し） | (d'après le Chōjū-giga) |
| 題の外の一言 works[0].note（新設） | es | （無し） | (a partir del Chōjū-giga) |
| 題の外の一言 works[0].note（新設） | de | （無し） | (nach dem Chōjū-giga) |
| 図版キャプション masterpiece_1_caption | ja（この欄は日本語のみ） | 《相撲》ウサギとカエル ／ ヒノキ・彩色・箔　H23×W30×D20㎝ | 《相撲》（鳥獣戯画より） ／ ヒノキ・彩色・箔　H23×W30×D20㎝ |

### D. 鈴木 千賀子さま｜販売作品3点（説明文から出典の一文を外す・題の外の一言を新設）

| 作品 | 欄 | 言語 | 変更前 | 変更後 |
|---|---|---|---|---|
| 舟奏楽 | 説明（商品の素の説明） | ja | 小さな舟の上で、蛙・兎・猿・猫が楽器を奏でています。眺めていると楽しい音色が聞こえてくるようで、見るたびに楽しい気持ちにしてくれます。（「鳥獣人物戯画」の立体表現作品） | 小さな舟の上で、蛙・兎・猿・猫が楽器を奏でています。眺めていると楽しい音色が聞こえてくるようで、見るたびに楽しい気持ちにしてくれます。 |
| 舟奏楽 | 説明 product_i18n.description | ja | 小さな舟の上で、蛙・兎・猿・猫が楽器を奏でています。眺めていると楽しい音色が聞こえてくるようで、見るたびに楽しい気持ちにしてくれます。⏎（「鳥獣人物戯画」の立体表現作品） | 小さな舟の上で、蛙・兎・猿・猫が楽器を奏でています。眺めていると楽しい音色が聞こえてくるようで、見るたびに楽しい気持ちにしてくれます。 |
| 舟奏楽 | 説明 product_i18n.description | en | On a small boat, a frog, rabbit, monkey, and cat play their instruments together. As you look at it, you can almost hear their cheerful music, bringing a joyful feeling each time.⏎(A three-dimensional work based on the Chōjū-jinbutsu-giga, the Scrolls of Frolicking Animals) | On a small boat, a frog, rabbit, monkey, and cat play their instruments together. As you look at it, you can almost hear their cheerful music, bringing a joyful feeling each time. |
| 舟奏楽 | 説明 product_i18n.description | zh-cn | 在一叶小舟上，青蛙、兔子、猴子和猫正演奏着乐器。凝望时仿佛能听见愉快的旋律，每一次观看都让心情变得轻快。⏎（《鸟兽人物戏画》的立体表现作品） | 在一叶小舟上，青蛙、兔子、猴子和猫正演奏着乐器。凝望时仿佛能听见愉快的旋律，每一次观看都让心情变得轻快。 |
| 舟奏楽 | 説明 product_i18n.description | zh-tw | 在一葉小舟上，青蛙、兔子、猴子和貓正演奏著樂器。凝望時彷彿能聽見愉快的旋律，每一次觀看都讓心情變得輕快。⏎（《鳥獸人物戲畫》的立體表現作品） | 在一葉小舟上，青蛙、兔子、猴子和貓正演奏著樂器。凝望時彷彿能聽見愉快的旋律，每一次觀看都讓心情變得輕快。 |
| 舟奏楽 | 説明 product_i18n.description | ko | 작은 배 위에서 개구리, 토끼, 원숭이, 고양이가 악기를 연주하고 있습니다. 바라보고 있으면 즐거운 선율이 들려오는 듯해, 볼 때마다 기분을 밝게 해 줍니다.⏎(조수인물희화(鳥獸人物戲畫)의 입체 표현 작품) | 작은 배 위에서 개구리, 토끼, 원숭이, 고양이가 악기를 연주하고 있습니다. 바라보고 있으면 즐거운 선율이 들려오는 듯해, 볼 때마다 기분을 밝게 해 줍니다. |
| 舟奏楽 | 説明 product_i18n.description | fr | Sur une petite barque, une grenouille, un lapin, un singe et un chat jouent de leurs instruments. En la contemplant, on croit presque entendre leur joyeuse mélodie, qui met le cœur en fête à chaque regard.⏎(Œuvre en trois dimensions d'après le Chōjū-jinbutsu-giga, les Caricatures d'animaux) | Sur une petite barque, une grenouille, un lapin, un singe et un chat jouent de leurs instruments. En la contemplant, on croit presque entendre leur joyeuse mélodie, qui met le cœur en fête à chaque regard. |
| 舟奏楽 | 説明 product_i18n.description | es | En una pequeña barca, una rana, un conejo, un mono y un gato tocan sus instrumentos. Al contemplarla, casi parece escucharse una melodía alegre, capaz de despertar una sensación de alegría cada vez.⏎(Obra tridimensional basada en el Chōjū-jinbutsu-giga, las Caricaturas de animales antropomorfos) | En una pequeña barca, una rana, un conejo, un mono y un gato tocan sus instrumentos. Al contemplarla, casi parece escucharse una melodía alegre, capaz de despertar una sensación de alegría cada vez. |
| 舟奏楽 | 題の外の一言 title_note（新設） | 8言語 | （無し） | ja 《…》（鳥獣戯画より） ／ en (after Chōjū-giga) ／ zh-cn （取自《鸟兽戏画》） ／ zh-tw （取自《鳥獸戲畫》） ／ ko (조수희화에서) ／ fr (d'après le Chōjū-giga) ／ es (a partir del Chōjū-giga) ／ de (nach dem Chōjū-giga) |
| かけくらべ | 説明（商品の素の説明） | ja | 鹿に乗って、颯爽と駆け抜ける猿。その軽やかな姿は、目に入るたびに元気をくれて、毎日を明るくしてくれます。（「鳥獣人物戯画」の立体表現作品） | 鹿に乗って、颯爽と駆け抜ける猿。その軽やかな姿は、目に入るたびに元気をくれて、毎日を明るくしてくれます。 |
| かけくらべ | 説明 product_i18n.description | ja | 鹿に乗って、颯爽と駆け抜ける猿。その軽やかな姿は、目に入るたびに元気をくれて、毎日を明るくしてくれます。⏎（「鳥獣人物戯画」の立体表現作品） | 鹿に乗って、颯爽と駆け抜ける猿。その軽やかな姿は、目に入るたびに元気をくれて、毎日を明るくしてくれます。 |
| かけくらべ | 説明 product_i18n.description | en | A monkey rides swiftly on a deer, dashing forward with lively grace. Its light, spirited form brings a lift of energy each time you see it, brightening the everyday.⏎(A three-dimensional work based on the Chōjū-jinbutsu-giga, the Scrolls of Frolicking Animals) | A monkey rides swiftly on a deer, dashing forward with lively grace. Its light, spirited form brings a lift of energy each time you see it, brightening the everyday. |
| かけくらべ | 説明 product_i18n.description | zh-cn | 猴子骑在鹿背上，轻快地疾驰而过。那灵动的身姿，每次映入眼帘都带来活力，让日常更加明亮。⏎（《鸟兽人物戏画》的立体表现作品） | 猴子骑在鹿背上，轻快地疾驰而过。那灵动的身姿，每次映入眼帘都带来活力，让日常更加明亮。 |
| かけくらべ | 説明 product_i18n.description | zh-tw | 猴子騎在鹿背上，輕快地疾馳而過。那靈動的身姿，每次映入眼簾都帶來活力，讓日常更加明亮。⏎（《鳥獸人物戲畫》的立體表現作品） | 猴子騎在鹿背上，輕快地疾馳而過。那靈動的身姿，每次映入眼簾都帶來活力，讓日常更加明亮。 |
| かけくらべ | 説明 product_i18n.description | ko | 사슴을 타고 경쾌하게 달려 나가는 원숭이. 가볍고 생기 있는 모습은 볼 때마다 힘을 주고, 매일을 환하게 밝혀 줍니다.⏎(조수인물희화(鳥獸人物戲畫)의 입체 표현 작품) | 사슴을 타고 경쾌하게 달려 나가는 원숭이. 가볍고 생기 있는 모습은 볼 때마다 힘을 주고, 매일을 환하게 밝혀 줍니다. |
| かけくらべ | 説明 product_i18n.description | fr | Un singe file avec élan sur le dos d'un cerf. Sa silhouette légère et pleine de vie insuffle de l'énergie à chaque regard et illumine le quotidien.⏎(Œuvre en trois dimensions d'après le Chōjū-jinbutsu-giga, les Caricatures d'animaux) | Un singe file avec élan sur le dos d'un cerf. Sa silhouette légère et pleine de vie insuffle de l'énergie à chaque regard et illumine le quotidien. |
| かけくらべ | 説明 product_i18n.description | es | Un mono avanza con brío montado sobre un ciervo. Su figura ligera y llena de vida transmite energía cada vez que aparece ante la vista, iluminando el día a día.⏎(Obra tridimensional basada en el Chōjū-jinbutsu-giga, las Caricaturas de animales antropomorfos) | Un mono avanza con brío montado sobre un ciervo. Su figura ligera y llena de vida transmite energía cada vez que aparece ante la vista, iluminando el día a día. |
| かけくらべ | 題の外の一言 title_note（新設） | 8言語 | （無し） | ja 《…》（鳥獣戯画より） ／ en (after Chōjū-giga) ／ zh-cn （取自《鸟兽戏画》） ／ zh-tw （取自《鳥獸戲畫》） ／ ko (조수희화에서) ／ fr (d'après le Chōjū-giga) ／ es (a partir del Chōjū-giga) ／ de (nach dem Chōjū-giga) |
| カエル仏 | 説明（商品の素の説明） | ja | 蓮の上で、静かに手を合わせる蛙の仏さま。そのおだやかな姿は、忙しい毎日に、心が落ち着くひとときをそっと添えてくれます。（「鳥獣人物戯画」の立体表現作品） | 蓮の上で、静かに手を合わせる蛙の仏さま。そのおだやかな姿は、忙しい毎日に、心が落ち着くひとときをそっと添えてくれます。 |
| カエル仏 | 説明 product_i18n.description | ja | 蓮の上で、静かに手を合わせる蛙の仏さま。そのおだやかな姿は、忙しい毎日に、心が落ち着くひとときをそっと添えてくれます。⏎（「鳥獣人物戯画」の立体表現作品） | 蓮の上で、静かに手を合わせる蛙の仏さま。そのおだやかな姿は、忙しい毎日に、心が落ち着くひとときをそっと添えてくれます。 |
| カエル仏 | 説明 product_i18n.description | en | A frog Buddha quietly presses its hands together atop a lotus. Its peaceful presence gently brings a calming moment into the busyness of everyday life.⏎(A three-dimensional work based on the Chōjū-jinbutsu-giga, the Scrolls of Frolicking Animals) | A frog Buddha quietly presses its hands together atop a lotus. Its peaceful presence gently brings a calming moment into the busyness of everyday life. |
| カエル仏 | 説明 product_i18n.description | zh-cn | 蛙佛静静地在莲花上合掌。那安详的姿态，仿佛为忙碌的日常轻轻添上一段让心安定的时光。⏎（《鸟兽人物戏画》的立体表现作品） | 蛙佛静静地在莲花上合掌。那安详的姿态，仿佛为忙碌的日常轻轻添上一段让心安定的时光。 |
| カエル仏 | 説明 product_i18n.description | zh-tw | 蛙佛靜靜地在蓮花上合掌。那安詳的姿態，彷彿為忙碌的日常輕輕添上一段讓心安定的時光。⏎（《鳥獸人物戲畫》的立體表現作品） | 蛙佛靜靜地在蓮花上合掌。那安詳的姿態，彷彿為忙碌的日常輕輕添上一段讓心安定的時光。 |
| カエル仏 | 説明 product_i18n.description | ko | 연꽃 위에서 조용히 두 손을 모은 개구리 부처님. 그 평온한 모습은 바쁜 일상 속에 마음이 차분해지는 시간을 살며시 더해 줍니다.⏎(조수인물희화(鳥獸人物戲畫)의 입체 표현 작품) | 연꽃 위에서 조용히 두 손을 모은 개구리 부처님. 그 평온한 모습은 바쁜 일상 속에 마음이 차분해지는 시간을 살며시 더해 줍니다. |
| カエル仏 | 説明 product_i18n.description | fr | Sur un lotus, un bouddha grenouille joint paisiblement les mains. Sa présence douce apporte, au cœur des journées chargées, un moment de calme intérieur.⏎(Œuvre en trois dimensions d'après le Chōjū-jinbutsu-giga, les Caricatures d'animaux) | Sur un lotus, un bouddha grenouille joint paisiblement les mains. Sa présence douce apporte, au cœur des journées chargées, un moment de calme intérieur. |
| カエル仏 | 説明 product_i18n.description | es | Sobre una flor de loto, un Buda rana junta las manos en silencio. Su presencia serena aporta suavemente un momento de calma al ritmo de cada día.⏎(Obra tridimensional basada en el Chōjū-jinbutsu-giga, las Caricaturas de animales antropomorfos) | Sobre una flor de loto, un Buda rana junta las manos en silencio. Su presencia serena aporta suavemente un momento de calma al ritmo de cada día. |
| カエル仏 | 題の外の一言 title_note（新設） | 8言語 | （無し） | ja 《…》（鳥獣戯画より） ／ en (after Chōjū-giga) ／ zh-cn （取自《鸟兽戏画》） ／ zh-tw （取自《鳥獸戲畫》） ／ ko (조수희화에서) ／ fr (d'après le Chōjū-giga) ／ es (a partir del Chōjū-giga) ／ de (nach dem Chōjū-giga) |

**★渡辺 玄一さまの本文は1文字も変えていません**（指示どおり）。変えたのは表示の側だけ（●を出さない）。

## 4. 検証（すべて実物・機械で数えた値）

1. **「●」の全数把握**＝反映前にライブ全体を走査。作家627名・商品13点のうち、●があるのは**作家2名・商品6点の162箇所**だけと確定してから着手（1枚ずつ直さず共通側で塞ぐ判断の根拠）。
2. **規則の空振り・巻き込み検査**＝押す前に、同じ置換の並びをJSで再現して162箇所すべてに当て、
   **●の残存0／「●を含まない値」25,080件のうち変化0**を確認。
3. **画面の実測**＝`page-audit.mjs`（実ブラウザ・読み取り専用）で 3名×ja/en/de×390幅＋作品3点×ja/en/de×390幅＝**18ページ**を撮影し、可視テキストの●を機械で計数＝**0件**。
4. **Liquidエラー**＝セッションCookieを持った状態で トップ／作品一覧3種／作家一覧／作家3ページ／作品6ページ＝**11ページ**を取得し**0件**。
5. **並び替えの実測**＝8言語すべてで【デザイン】→【デザイン作品】→【ガラス】の順になることを可視テキストで確認。
6. **是正した「理由」での残留点検**（CLAUDE.md §8-7）＝「鳥獣人物戯画」「ヴェネチア」「ルーヴル宮」「装飾芸術美術館」「Palais du Louvre」等**15語**を3名＋その作品の全フィールドで再検索＝**すべて0件**。
   同時に、**消してはいけない**鈴木さまの著書名『立体で見る鳥獣戯画…』が**残っていること**も確認。
7. **目視**＝反映前後のスクリーンショットを実際に開いて見た（証拠フォルダに27枚）。
8. **タブの見出し・共有カードの●**＝3ページとも **実ブラウザで「藤代 範雄｜あつぺくと」に変わっていることを確認**（`page-audit.mjs`・og:title も「藤代 範雄」）。
   ★**自分の誤りの訂正**＝いったん「`-01`・`-02` は28分たっても●のまま」と書きましたが、**それは素の `fetch` で取っていたためでした。**
   素の取得にはbot向けの旧版が返り続けます（CLAUDE.md §8-2・記憶 `verify-live-in-real-browser` に既に書いてある型を自分で踏みました）。
   **実ブラウザで測り直したところ3ページとも新版でした。** 反映は完了しています。

## 5. Codexの独立レビュー（関所）＝11回

### (a) 8言語の読者役による通読（公開前の関所）

8言語すべてで、その言語の読者として3名のページを通読させました。**自分が新しく書いた文への指摘は採用し、直してから公開状態を確定**しています。

| 採用した指摘 | 直した内容 |
|---|---|
| en/zh-cn/zh-tw/ko/fr/es/de **6言語が独立に指摘**＝「**魅力**が呼び起こされる」の係り受けが成り立たない | 各言語で「魅力を再び感じ、憧れと情熱が呼び起こされた」の形へ（日本語の3語＝魅力・憧れ・情熱を落とさずに） |
| ja/zh-cn/ko/fr/es/de が指摘＝「**琉球ガラスと…ムラーノ島で**」の並列（分野と場所を「と」で結んでいる） | 訳文側を「沖縄で琉球ガラスを、ムラーノ島でも制作」の形へ（**日本語は代表確定文のため変えず**、下記6-①で案を提示） |
| fr/de が指摘＝**題の外の一言が英語のまま**フランス語・ドイツ語のページに出る | 一言を **8言語**に作り直し、その言語のものだけを出す形へ（英語へ落とさない） |

### (b) 実装の独立レビュー（3観点・こちらは「どう壊れるか」を突く依頼）

| 指摘 | 検証 | 対応 |
|---|---|---|
| 「●」除去の規則が、文中の正当な `《》` まで消す（例 `《●》＋《》`→`＋`） | 反例を再現して確認。実データには無いが規則としては広すぎる | **採用**。`《●》`を先にひと塊で外し、`《》`の一括削除を廃止。再検査で162箇所の結果は同一・巻き込み0 |
| 題が空でも「題の外の一言」だけが出る呼び方がある | 作品ページ側では既に守られていたが、スニペット単体では起きうる | **採用**（スニペットにも同じ守りを追加） |
| 【デザイン作品】枠の移動JSは、言語を何度も切り替えると壊れるか | — | **問題なし** |

## 6. 判断をお願いしたいこと

1. **【ガラス】の日本語の並列**＝現行「沖縄の琉球ガラスと、イタリア・ヴェネツィアのムラーノ島で制作を行う。」は、
   分野（琉球ガラス）と場所（ムラーノ島）を「と」で結んでいます（**改稿前から同じ形**で、今回は語尾だけを指示どおり替えました）。
   Codexが日本語を含む6言語で不自然と指摘したため、**日本語だけ独断で直さず**案をお出しします。
   - **案A**（事実を全部残す）「沖縄では琉球ガラス、イタリア・ヴェネツィアのムラーノ島でも制作を行う。」
   - **案B**（場所で揃える）「沖縄と、イタリア・ヴェネツィアのムラーノ島で制作を行う。」※「琉球ガラス」の語が消えます
   - **案C**＝現行のまま（訳文は既に自然な形にしてあります）
2. **価格が未設定の作品6点（渡辺さま3点・藤代さま3点）の「価格」欄に「●」が出ています。**
   これは**データ由来ではなくテーマの既存の作り**（価格が0円なら●）で、今回の「図版下情報の●」とは別物のため触っていません。
   - **案A**「価格はお問い合わせください」（8言語）に置き換える
   - **案B**＝価格欄ごと出さない（予約・お問い合わせの導線だけ残す）
   - **案C**＝現行のまま
3. **出身欄の新しい型（出身／出生の2欄）を既存625名へ広げるか**（前便からの継続論点）。
   ★中国語・韓国語の読者役から「出身と出生が並ぶと矛盾して見える」との指摘がありました。
   ただし指摘は当方の点検用資料の日本語ラベルを読んだもので、**実際の画面は各言語のラベル**（zh-cn 出身／出生地、ko 출신／출생지）です。
   広げるかどうかの判断とあわせて、**「出身」のラベル自体を「拠点」系の語に変えるか**もご検討ください（変えると全627名に及びます）。

## 7. 本人確認リスト（代表がそのままLINEで伺える形）

### 藤代 範雄さま

1. **ポスター2点の正式なお題**／現状＝「TERRORISM AND WAR ON TERRORISM Ⅰ・Ⅱ」（欧文のみ）／伺いたいこと＝日本語のお題はございますか。無ければ欧文のまま掲載してよろしいでしょうか。
2. **ルーヴル装飾美術館の収蔵**／現状＝略歴に「《テロと報復》が収蔵されている」と1点だけ書いています／伺いたいこと＝収蔵されているのはⅠ・Ⅱの両方でしょうか、どちらか一方でしょうか。
   ※あわせて、中国語の読者から「《恐怖與報復》」と「TERRORISM AND WAR ON TERRORISM」で題が食い違って見えるとの指摘がありました。**同じ作品でしょうか、別の作品でしょうか。**
3. **代表作（ページ上部の1点）のお題**／現状＝未記入／伺いたいこと＝この作品のお題をお教えください。
4. **代表作の素材・技法・寸法**／現状＝未記入／伺いたいこと＝素材と技法、寸法をお教えください。
5. **ガラス作品①②③（販売作品）のお題**／現状＝未記入／伺いたいこと＝3点それぞれのお題をお教えください。
6. **ガラス作品①②③の素材・技法**／現状＝未記入／伺いたいこと＝素材・技法をお教えください。
7. **ガラス作品①②③の寸法**／現状＝未記入／伺いたいこと＝寸法をお教えください。
8. **ガラス作品①②③の説明文**／現状＝未記入／伺いたいこと＝作品の見どころを2〜3行でお教えください。
9. **ガラス作品①②③の価格**／現状＝未設定／伺いたいこと＝ご希望の価格をお教えください。

※ガラス作品①②③のURL＝`/products/fujishiro-norio-glass-01` ／ `-02` ／ `-03`。
※**題をいただくまでは、作品名の行そのものを出しません**（「●」は出ません）。

### 渡辺 玄一さま

1. **代表作《しらたま（猫）》の素材**／現状＝寸法（F8号）だけ分かっています／伺いたいこと＝何で描かれた作品かをお教えください。
2. **《ぶどう Ⅶ》の素材・技法**／現状＝未記入／伺いたいこと＝素材・技法をお教えください。
3. **《ぶどう Ⅶ》の説明文**／現状＝未記入／伺いたいこと＝作品の見どころを2〜3行でお教えください。
4. **《ぶどう Ⅶ》の価格**／現状＝未設定／伺いたいこと＝ご希望の価格をお教えください。
5. **《アヤメ Ⅰ》の素材・技法**／現状＝未記入／同上
6. **《アヤメ Ⅰ》の説明文**／現状＝未記入／同上
7. **《アヤメ Ⅰ》の価格**／現状＝未設定／同上
8. **《ワイン Ⅱ》の素材・技法**／現状＝未記入／同上
9. **《ワイン Ⅱ》の説明文**／現状＝未記入／同上
10. **《ワイン Ⅱ》の価格**／現状＝未設定／同上
11. **制作年**／現状＝《アヤメ Ⅰ》だけ「2019年10月」が入っています／伺いたいこと＝ほかの2点の制作年もお教えください（分かる範囲で構いません）。

## 8. 発見メモ（本便の指示範囲外。直していません）

Codexの8言語通読で、**今回触っていない既存の文**にも指摘が出ました。**同じ語が出る＝同じ誤りではない**ため、1件ずつ文脈を読んだうえで、範囲外として残します（次便または翻訳Tの持ち場）。

1. **鈴木さまの略歴に、日本語のお名前が漢字のまま残る言語がある**（ko/es/de の「菱田宏治」「名越詔司」）。読みが確認できていないため、**推測でローマ字を作らない**のが正しい状態です。読みを伺えるかが論点。
2. **鈴木さまの販売作品の説明文**に、英語・スペイン語・フランス語・韓国語で言い回しの不自然さの指摘（例 en「each time」が何の each time か言っていない）。**出典の一文を外したことによる不自然さではなく、以前からの文**のため触っていません。
3. **藤代さまの略歴の既存部分**に指摘＝「同じ賞で国際審査員をつとめた」（賞ではなく大会の審査員では）／「Golden Award」が賞か大会か分からない／中国語「献上」が直訳的。**いずれも改稿前からある文**です。
4. **「工作现场」「修行」の具体が書かれていない**との指摘が中国語圏から出ましたが、これは**細部を語らない意向の作家には細部を書かない**という当社の方針どおりの状態です（CLAUDE.md §7）。**採用しません。**
5. **ドイツ語のページでは、作品の説明文が英語で出ます**（ドイツ語の説明が無いときの既存のフォールバック）。ドイツ語の説明を用意するかは翻訳Tの持ち場。
6. **「ヴェネチア」表記が他の作家にも残っています**＝藤田喬平さま（本文1箇所）。三岸節子さまの「ヴェネチア」は**作品名《ヴェネチア》**なので直してはいけません。
7. **「パリ装飾芸術美術館」が高田賢三さまの収蔵先に残っています**（今回の藤代さまの統一と同じ施設）。統一するかは全体の判断。

## 9. 実施していないこと・判定していないこと

- **藤代さまのポスター2点への《》題の付与と収蔵表記の追記＝指示どおり実施していません。**
- **渡辺さまの本文は変更していません。**
- **価格の●は変えていません**（6-②で判断待ち）。
- **鈴木さまの `message.ja` が artist_i18n 側で空**（個別フィールド側にはある）という食い違いが1件残っています。**本便の前からあり、増えても減ってもいません**（画面には日本語のメッセージが正しく出ています）。
- **`atspect-theme` の git commit / push はしていません**（事前承認が要る操作）。CLAUDE.mdの未コミット1行（前便からの持ち越し）も、そのままです。
- **Shopifyの商品名そのもの（藤代さま3点＝「●」）は変えていません。** 題を勝手に作らないためです。
  画面・タブの見出し・共有カードには出ないようにしましたが、**管理画面・カート・注文メールには「●」のまま出ます**。題をいただき次第、商品名を直す必要があります。
- **他の624名の作家データは1件も触っていません**（実測＝「●を含まない値」25,080件で変化0）。

## 10. 証拠と材料の置き場所

- **スクリーンショット27枚とREADME**＝`reports/assets/20260820_3名の修正便/`（反映前9・反映後18）
- **作家データのバックアップ**＝`C:\Vault\ARTS-RESPECT\_backups\_auto\artist-i18n\20260820-172744\backup.json`
- **作品データのバックアップ**＝`C:\Vault\ARTS-RESPECT\_backups\_auto\product-i18n\20260820-172843_suzuki-choju.json`
- **テーマのバックアップ**＝`C:\Vault\ARTS-RESPECT\_backups\_auto\theme161-<ファイル名>\20260820-*.bak`（14ファイル分）
- **書き込みツールの改修前**＝`C:\Vault\ARTS-RESPECT\_backups\_auto\artist-i18n-update\20260820-171041_add-birthplace-and-caption.mjs`
  （`artist-i18n-update.mjs` に「出生」欄と代表作キャプションを直せるよう2キーだけ足しました。**他ターミナルの充足率の数え方（8キー×8言語）は変えていません**＝実測で確認済み）

## 11. 指示から1点だけ変えたこと（理由つき）

**証拠フォルダの名前から、お三方の現在の状態を表す語を外しました**（指示の名前 → `20260820_3名の修正便`）。
`atspect-handoff` は**公開リポジトリ**で、CLAUDE.md §3 に「置く前に未公開情報の写り込みを検査する」とあります。
作家お三方のページ自体は公開済みですが、**その状態は公開情報ではなく**、同じコミットに載る本報告がお名前を挙げているため、
フォルダ名と結びつけると、どなたがその状態かを公開の場から読み取れてしまいます。**中身と置き場所は指示どおりです。**
この配慮が不要であれば、次便でフォルダ名を指示どおりに戻します（**指示の元の名前はここには書きません**。同じ理由です）。

最終更新：2026-08-20

---

# 制作T報告：修正便の残り是正＋【ガラス】文の確定反映（2026-08-20・第3便）

**ターミナル：あつぺくと制作 ／ 使用モデル：Opus 5（claude-opus-5[1m]・本便全体で切替なし） ／ 作業：関連作品の題／価格欄の裁定反映／【ガラス】文の確定**

## 結論

**完遂。** 指示3件をすべて反映しました（優先順どおり 1→2→3）。
**①関連作品の題**＝テーマの直し自体は前便で入っていました。司令塔がご覧になったのは、**私が前便の途中で公開してしまった中間版**が配信キャッシュに残っていたものです（下記1に経緯と再現、私の誤りとして記録）。
**②価格欄**＝裁定（案B）どおり、価格が決まっていない作品は**価格欄ごと出さない**共通実装にしました。
**③【ガラス】文**＝代表確定の日本語をそのまま反映し、7言語を追随。**関所を3巡**して「本場」にあたる語を煽らない形に確定しました。

**検証＝実ブラウザ15ページで Liquidエラー0件・画面に出る「●」0件。** 関連作品の題は**4作品×8言語＝32通りすべて**その言語で表示。

## 1. 関連作品の題（en/de で日本語のまま）— 原因と是正

### 何が起きていたか（私の誤りです）

前便で作品ページの関連作品欄を2回さわりました。

| 時刻 | 版 | 関連作品の題の出方 |
|---|---|---|
| 17:20 | **中間版（不良）** | `plain: 'ja'` で組み立て＝**全言語で日本語の題**（しかも「（鳥獣戯画より）」付き） |
| 17:44 | 現行版（正） | `lcls: 'awt-l'` ＝言語連動。日本語＝原題／非日本語＝en→romaji |

**17:20〜17:44 の24分間、私は不良版を公開していました。** 司令塔がご覧になったスクリーンショットは、この中間版か、そのキャッシュです。

### 実ブラウザでの再現と確認

- 18時台に測ったところ、**同じURL・同じ言語でも、測るたびに正しかったり日本語のままだったり**しました。
  日本語のまま出た応答は、HTMLに `awt-l--latin` のスパンが**そもそも無い**＝**中間版のHTMLがキャッシュから返っていた**ことを確認しました（マークアップで判別）。
- **②の反映（テーマ更新）でキャッシュが入れ替わり**、その後は
  **4作品（カエル仏・かけくらべ・舟奏楽・ぶどうⅦ）×8言語＝32通りすべてで、その言語の題が出る**ことを実ブラウザで確認しました（**2回続けて32/32**）。

### 学び（次に同じ失敗をしないために）

- **本番へ「途中の版」を押さない。** 直した後も、**中間版のHTMLは配信キャッシュに残って人の目に触れ続けます**（今回は1時間以上）。
  1つの直しは、実画面で確かめてから1回で押す。
- **判定は「見えている文字」ではなく「マークアップの形」で行うと、キャッシュか実装かを切り分けられる。**
  今回は `awt-l--latin` スパンの有無で「中間版が返っている」と特定できました。
- ★**私の測り方の誤りも1件**＝最初の全数検査で、中国語の「（取自《鳥獸戲畫》）」を漢字が入っているという理由で「日本語のまま」と誤判定しました。
  **判定を「見えている文字＝日本語スパンの文字と同じか」に改めて測り直しています。**

**フォーム内の「対象作品／SELECTED WORK」欄は、ご指示どおり日本語表記のまま**にしてあります（注文処理の照合用）。

## 2. 価格欄（判断待ち6-② の裁定＝案B）

**価格が決まっていない作品（税込0円）は、価格欄をまるごと出さない。** 「●」も「価格はお問い合わせください」も出しません。

- **共通実装**＝作品ごとの個別対応ではなく、**0円の作品すべてに同じ規則**が効きます（`price_tbd`）。価格を入れれば自動的に価格欄が戻ります（可逆・**データは変更していません**）。
- **一緒に伏せたもの**＝価格欄の中にある「表示している価格は作品本体（税込）です…」の説明文と「費用について詳しく」。
  価格が出ていない画面に残すと**指し示す先が無くなる**ためです（8言語とも）。
- **残したもの**＝「一点もの・予約制（即時のご購入はできません）」と「**予約・お問い合わせする**」の導線は従来どおり。
- **お問い合わせ欄の「対象作品」**＝価格と区切りの「·」も出しません（`《ぶどう Ⅶ》 — 渡辺 玄一` のみ）。
- **共有カード（og:price）も0円のときは出しません**（0円を「無料」と読ませないため。構造化データの offers は以前から除外済み）。

**対象＝渡辺さま3点・藤代さま3点。** 価格のある鈴木さま3点は従来どおり価格が出ることを確認しました。

## 3. 藤代さま【ガラス】第1文の確定反映（8言語）

**日本語は代表確定文をそのまま反映しました。**

| 言語 | 変更後（第1文） |
|---|---|
| ja | 沖縄の琉球ガラスの工房と、ヴェネツィアンガラスの本場・イタリア ムラーノ島の工房で制作を行う。 |
| en | He works at Ryūkyū glass workshops in Okinawa and at workshops on the Italian island of Murano, the historic home of Venetian glass. |
| zh-cn | 在冲绳的琉球玻璃工坊，以及威尼斯玻璃的故乡——意大利穆拉诺岛的工坊进行创作。 |
| zh-tw | 在沖繩的琉球玻璃工坊，以及威尼斯玻璃的故鄉——義大利穆拉諾島的工坊進行創作。 |
| ko | 오키나와의 류큐 유리 공방과 베네치아 유리의 역사적 중심지인 이탈리아 무라노섬의 공방에서 제작을 이어 간다. |
| fr | Il travaille dans des ateliers verriers des Ryūkyū, à Okinawa, ainsi qu'à Murano, en Italie, foyer historique du verre vénitien. |
| es | Trabaja en talleres de vidrio de Ryūkyū en Okinawa y en los de Murano, en Italia, hogar histórico del vidrio veneciano. |
| de | Er arbeitet in Ryūkyū-Glaswerkstätten auf Okinawa sowie in Glaswerkstätten auf Murano in Italien, der historischen Heimat des venezianischen Glases. |

**続く文（銀座三越と水戸京成百貨店で個展〜以降）は変えていません。**

### 「本場」にあたる語＝関所で3巡して確定

| 巡 | 指摘 | 対応 |
|---|---|---|
| 1巡目 | fr『berceau（ゆりかご）』・ko『본고장』は**権威づけ・宣伝的に聞こえる** | **採用**＝「歴史的な位置づけを述べる」形へ（fr `foyer historique` ／ ko `역사적 중심지`）。es・de も同じ考え方で揃えた |
| 2巡目 | en『workshops of Ryūkyū glass』が不自然／de『für Ryūkyū-Glas』が**ムラーノ島の工房にも係って読める** | **採用**（両方とも書き替え） |
| 3巡目 | en の同格が『イタリア』に係って読める | **採用**（Murano を島として明示）。**en/de/fr/es/ko/zh-cn/zh-tw の7言語すべてが最終的に「問題なし」** |

### 日本語について、関所の意見（採用していません）

日本語の読者役から**「本場」は広告的な権威づけに聞こえる／「イタリア ムラーノ島」の半角空白が不自然**との指摘がありました。
**日本語は代表確定文のため、独断では変えていません**（そのまま反映）。ご参考までに関所の代案を記します＝
「沖縄の琉球ガラス工房と、ヴェネツィアンガラスの歴史的拠点であるイタリア・ムラーノ島の工房で制作を行う。」
**ご指示があれば差し替えます。無ければ確定文のままにします。**

### 略歴との整合（★矛盾はありませんが、1点お知らせします）

- **矛盾なし**＝略歴の導入は「イタリア・ヴェネツィアのガラス工房をはじめ、沖縄など国内外の工房で…」、
  【ガラス】は「沖縄の琉球ガラスの工房と、…イタリア ムラーノ島の工房で…」。
  **ムラーノ島はヴェネツィアの島**なので、粒度が違うだけで食い違っていません（日本語の読者役も「矛盾なし」と判定）。
- ★**ただし言い回しが重なりました**＝日本語ページで「**制作を行う**」が2回、「**工房**」が4回出ます。
  **ご指示どおり略歴は変えていません。** 気になる場合は、略歴側の「精力的に制作を行う」を別の言い方にする案をお出しできます。

## 4. 検証（すべて実ブラウザ・素の fetch は使っていません）

1. **Liquidエラー＝0件／画面に出る「●」＝0件**（トップ・作品一覧・作家一覧・作家3ページ・作品9ページ＝**15ページ**を実ブラウザで巡回して機械計数）。
2. **関連作品の題＝32/32 その言語で表示**（4作品×8言語）。**2回続けて 0 NG。**
3. **藤代さま作家ページを8言語で通し確認**＝【ガラス】の新しい第1文が8言語すべてで出ていること、**●が8言語とも0件**であることを可視テキストで計数。
4. **価格欄**＝価格のある作品（鈴木さま）は価格が出る／価格の無い作品（渡辺さま・藤代さま）は**価格欄そのものが無い**（`価格欄: null`）ことをDOMで実測。
5. **書き込みの安全**＝データは `honyaku-patch-build.mjs`（置換元がちょうど1回でなければ停止）→ `artist-i18n-update.mjs`（バックアップ＋楽観ロック＋読み戻し照合）。テーマは `theme161-update.mjs`（バックアップ＋並行編集検知＋読み戻しSHA-256照合）。**全件バイト一致。**

## 5. 変えたファイル

| ファイル | 何をしたか | 反映後SHA-256(先頭12) |
|---|---|---|
| `sections/atspect-artwork-detail.liquid` | 価格未定なら価格欄ごと非表示／お問い合わせ欄の「対象作品」から価格と区切りを外す | `56496105ab66` |
| `snippets/meta-tags.liquid` | 価格0のとき og:price を出さない | `0f43f84b24e2` |

**データ**＝藤代 範雄さま `artist_i18n.bio` 8言語＋個別フィールド `bio_ja/en/zh_cn/zh_tw/ko/fr/es` の**15箇所**（【ガラス】第1文のみ）。
**関連作品の題（①）はテーマ・データとも追加の変更なし**＝前便の版が正しく、キャッシュが入れ替わって解消しました。

## 6. 実施していないこと・判定していないこと

- **略歴（bio）の導入文は変えていません**（ご指示どおり。重なりは上記3に記載）。
- **日本語の【ガラス】文は代表確定文のまま**＝関所の代案は採用していません（3に記載）。
- **「対象作品／SELECTED WORK」欄は日本語のまま**（ご指示どおり・注文処理用）。
- **お問い合わせフォームの隠し項目 `本体価格` は「●（未確定）」のまま**です。画面には出ませんが、**通知メールには出ます**（社内向けの記録として残しました）。変えるべきならご指示ください。
- **藤代さま3点のShopify商品名は「●」のまま**（題を作らないため）。画面・タブ・共有カードには出ませんが、**管理画面・カート・注文メールには出ます**。
- **他の作家・作品のデータは1件も触っていません。**
- **`atspect-theme` の git commit / push はしていません**（事前承認が要る操作。CLAUDE.md の未コミット1行が前々便から持ち越しです）。

## 7. 証拠

`reports/assets/20260820_3名の修正便/shots/` に **`b2_` で始まる8枚**を追加しました（390幅）。

| ファイル | 中身 |
|---|---|
| `b2_artist_fujishiro-norio_ja/en_390.png` | 藤代さま作家ページ（【ガラス】新文・●なし） |
| `b2_work_fujishiro-glass-01_ja/en_390.png` | 藤代さま作品（価格欄なし・題なし・予約導線は健在） |
| `b2_work_kaeru-butsu_en/de_390.png` | 鈴木さま作品（価格あり・関連作品の題がその言語） |
| `b2_work_watanabe-budo-7_ja/en_390.png` | 渡辺さま作品（価格欄なし・寸法F8号は表示） |

**バックアップ**＝`C:\Vault\ARTS-RESPECT\_backups\_auto\artist-i18n\20260820-190510\backup.json`（データ）／
`C:\Vault\ARTS-RESPECT\_backups\_auto\theme161-*\20260820-*.bak`（テーマ2ファイル）

最終更新：2026-08-20


---

# 制作T報告：図版ホバー無効＋申し送り3件（2026-08-20 夜間便）

**ターミナル：あつぺくと制作 ／ 使用モデル：Opus 5（本便の全体・途中で切り替わっていない） ／ 作業：図版ホバー拡大の全体無効＋申し送り3件**

## 結論

**完遂。** 指示6件すべてに手を付け、テーマ161は**1ファイル（`assets/atspect.css` の末尾に1ブロック追記）**、
作家データは**1名1箇所**だけを変更した。読み戻しバイト一致・実ブラウザで幅1280/390とも数値で確認済み。
**判断を仰ぎたいことが4つ**あります（末尾）。

---

## 1. 図版ホバー拡大の全体無効（代表確定＝案A）

### 1-1. まず数えた（直す前に「同じ穴が何個あるか」）

ライブ161の全テキストファイル **449件**（531件中・画像等82件を除く）を取得して走査しました。

| 数えたもの | 件数 |
|---|---|
| `:hover` を含むCSS規則 | **313件** |
| うち図版らしいセレクタで、大きさに関わる宣言を持つもの | **26件** |
| `scale`/`zoom` を含むホバー規則（UIアイコンも含む全体） | **33件** |
| **実際にライブで拡大していた箇所** | **3件** |

**実際に拡大していた3件（反映前・幅1280・CDPで `:hover` を強制して実測）**

| 場所 | 反映前 | 定義元 |
|---|---|---|
| トップ featured-media の図版 | 720×405 → **741.6×417.15**（scale 1.03） | `sections/atspect-featured-media.liquid:166` |
| 作品詳細「関連作品」の図版 | 162×162 → **168.48×168.48**（scale 1.04） | `sections/atspect-artwork-detail.liquid:1574` |
| `/collections`（Dawnのコレクション一覧）のカード | 361.28 → **372.12**（scale 1.03） | `assets/component-card.css:387` |

★**残りは既に止まっていました。** `assets/atspect.css` の **2026-07-04「V3 灯りのホバー」ブロック**（2097行・2442行）が
`transform: none !important` ＋ `filter: brightness(1.03) !important` で、作品カード・検索カード・作家カード・
アーカイブ・featured・ジャンル・作家ページの販売作品を押さえていました。
**＝この便は新しい方針ではなく、V3の作法をまだ届いていない図版へ広げたものです。**

### 1-2. 何をどう変えたか

- **`assets/atspect.css` の末尾に1ブロック追記しただけ**（既存行は1バイトも変えていないことを機械確認）。
  10セレクタに `transform: none !important; scale: none !important;`。
  111,566 B → 114,182 B ／ sha256 `36a6337c…6f9beb` → `0268aec3…34a2bf`。
- **共通側1か所で塞ぎました**（ページごとの継ぎ当てはしていません）。
  **いまライブに出ていない図版**（collector-ctaの図版・Instagramのセル・pressの図版・`atspect-artist-card__scene-img`・
  `atspect-collection-card__image`）**も同じブロックに並べてあります**＝後でその区画を出したときに、拡大だけが復活しないように。
- **止めていないもの（意図的）**
  - 矢印・共有・検索・ページ送り・SNS・カート等の**UIアイコン**のわずかな拡大（図版ではない）
  - 見出し下線の `scaleX`（図版ではない）
  - **動画の再生ボタン**の拡大（テーマ設定 `animations_hover_elements: "none"` のため、そもそも当たっていません）
  - Dawn商品ページの `cursor: zoom-in`（**クリックで拡大を開く合図**＝ライトボックス側）
- **ライトボックスは無傷**です。作家ページの販売作品をクリック → ビューアが `display:none` → `display:flex` に変わり、
  拡大画像 **966×720** で開くことを実測しました（スクショあり）。

### 1-3. 検証（数値）

| 場所 | 幅 | 反映後 | 追記した規則だけを外して再現した「反映前」 |
|---|---|---|---|
| トップ featured-media | 1280 | **none** ／ 720×405 | matrix(1.03) ／ 741.6×417.15 |
| トップ featured-media | 390 | **none** ／ 350×196.88 | matrix(1.03) ／ 360.5×202.78 |
| 作品詳細 関連作品 | 1280 | **none** ／ 162×162 | matrix(1.04) ／ 168.48×168.48 |
| 作品詳細 関連作品 | 390 | **none** ／ 163×163 | matrix(1.04) ／ 169.52×169.52 |
| /collections Dawnカード | 1280 | **none** ／ 361.28 | matrix(1.03) ／ 372.12 |
| /collections Dawnカード | 390 | none ／ 173×173 | none ／ 173×173（★下記） |

★**Dawnのカードの拡大は `@media (min-width: 990px)` の中にあり、モバイル幅では元から起きません。**
幅390で「変わらない」のは無効化の効果ではありません。**この区別をしないと、効いていないのに効いたと読めます。**

- **機械検証**＝波括弧 644/644 一致・コメント入れ子の深さ0で閉じる・追記が末尾のみであること。
- **読み戻し**＝BYTE-IDENTICAL（1回目・2回目は伝播待ちで不一致、3回目で一致。**押し直していません**）。
  **20分後に取り直しても sha256 一致**＝他ターミナルの上書きなし。
- **Liquidエラー・翻訳欠落の語**＝10ページ（トップ／作品一覧／コレクション一覧／作家一覧／作家詳細2名／作品詳細／
  検索／プレス／寄贈）で**0件**。atspectドメインの 4xx/5xx **0件**。
- ★**配信キャッシュはページごとに切り替わる時刻が違いました**（トップは約20分、`/collections` と作品詳細はさらに数分後）。
  **1回の測定で「効いていない」と判断していません。**

### 1-4. Codexの独立レビューと、その突き合わせ

観点を「**この無効化で壊れる操作・見え方はないか**」1つに絞り、1ファイルだけ渡しました。
**Codexの総合＝NO-GO。ただし2件とも「渡した資料だけでは確認できない」という理由**でしたので、実測で決着させました。

| 観点 | Codex | 当方の実測 | 結論 |
|---|---|---|---|
| (a) Dawnの「2枚目画像へ切替」が壊れないか | PASS | `opacity:1` は上書きしていない。加えて `/collections` の該当7件は**すべて画像1枚**＝2枚目の実例がライブに無い | PASS |
| (b) 位置合わせ用の transform が混ざっていないか | **FAIL（確認不能）** | 全ファイル走査＝**基底（非ホバー）で transform を持つのは `.atspect-artist-card__scene-img` の1つだけ**（`scale(1.05)`）。今回の規則は `:hover` にしか当たらないので基底は不変。しかもこのセクションは**どのテンプレートにも未配置**。translate等の位置合わせは**0件** | PASS（観点は妥当・実害なし） |
| (c) `scale: none` の副作用 | PASS | 独立した `scale:` プロパティの宣言はテーマ内に他に無い | PASS |
| (d) 押せることが伝わらなくなる箇所 | PASS | 実測＝関連作品は `opacity 1→0.68` が残る／Dawnカードは矢印が動く／**トップ featured-media は反応が0になった**。ただし**その要素は `<div>`・`href` なし・`cursor:auto` ＝そもそもリンクではない** | PASS（下記の要判断①） |
| (e) セクションの `<style>` に確実に勝てるか | **FAIL（確認不能）** | 全ファイル走査＝対象要素に `transform …!important` を宣言する規則は**今回の1件以外に存在しない**。加えて反映後の実測で1280/390とも `transform: none` | PASS（反証） |

**当方の総合＝GO。** NO-GOの原因は、渡す資料をCSS3点に絞り、セクションの `<style>` を渡さなかったこと（依頼の作り方）です。
指摘そのものは(b)(e)とも観点として正しく、**(b)は「基底の transform と :hover の transform を区別せよ」という
有用な指摘**でした（表示標準書 §13-1 に規格として書き足しました）。

---

## 2. 申し送り①＝鈴木さまページ【あつぺくとチャンネル】の動画枠が黒い

**結論＝サイトの不具合ではありません。撮影機構の限界です。実機では正常に表示されます。**

- 原因＝`.aad-film { background:#0c0c0c }` の上に **YouTube（別ドメイン）のiframe** が載る作り。
  **枠が画面内に入っていない状態で全体スクリーンショットを撮ると、iframe が合成されず下地の黒だけが写ります。**
- **症状を再現しました**＝スクロールせずに撮った全体スクショで、枠は真っ黒（平均色 RGB 約 13,13,13）。
- **実機の再現＝正常**＝枠までスクロールして待つと、サムネイル（鳥獣戯画の作品と再生ボタン）が描画されます。
  **ja／de／幅390 の3条件とも正常。** YouTubeへの通信も17〜22件が完了しています。
- ★`page-audit.mjs` は**スクロールしません**。この機構では毎回黒く写ります（既知の制約と同型）。
- **テーマもデータも触っていません。** 証拠＝`shots/film-*.png`（正常）／`shots/crop-noscroll-ja.png`（黒く写る側）。

---

## 3. 申し送り②＝`artist_i18n.message.ja` が空 → 複写して解消

- **627名×8言語を走査**して、フラット `message_*` と `artist_i18n.message.*` の食い違いを数えました。
  該当は**鈴木千賀子さま ja の1件のみ**（フラット103字／i18n 空）。他の6言語は一致していました。
- **フラットの値をそのまま複写**しました（新しい文は作っていません）。**手で転記せず、ライブから取り直して指示書を機械生成**し、
  `artist-i18n-update.mjs` の plan → apply（バックアップ＋楽観ロック＋読み戻し照合）で反映。
- **反映後の実測**＝「フラットだけにある」**1件 → 0件**。
  鈴木さまの `artist_i18n` の変更点は **`message.ja` の1つだけ**（他のキーは1つも変わっていないことを機械照合）。
- **画面は変わりません**＝テーマは message の ja/en/zh_cn/zh_tw/ko/fr/es を**フラット側から**描いており、
  `artist_i18n.message` は **de だけ**参照しています。JSは `AAD_DATA.message` を一切読みません。
- ★**残る1件（de）は食い違いではなく設計です**＝`message_de` という個別フィールドは**metaobjectの定義に存在しません**
  （鈴木さまの定義フィールド40個を実測して確認）。de は `artist_i18n` が唯一の置き場＝**直せませんし、直しません。**
- ★**並行作業の記録**＝反映の前後で全627名を比較したところ、**当方の1件のほかに7名（bio_en / bio_zh_* 等）が
  変わっていました**＝他ターミナルが同じ時間帯に作業しています。**当方は触っていません。**

---

## 4. 申し送り③＝【ガラス】文の「本場」訳（記録の食い違いの解消）

- ライブ実測＝**7言語すべてが新しい訳に入れ替わっていました。**
  ★**翻訳Tの報告は「6言語」ですが、実測では de も変わっています**（`der historischen Heimat` → `der Heimat`）。
- 当方の記録（本ファイル 2026-08-20 第2便の表）は**反映当時の値**なので、
  **表示標準書に §13-3 として現在のライブ値の表を追補**し、両Tの記録の食い違いを解消しました（データは1文字も触っていません）。
- ★**要判断です**＝**韓国語が `본고장` に戻っています。** 当方の関所（Codex各言語読者役・3巡）では、
  **1巡目に「`본고장` は権威づけ・宣伝的に聞こえる」と判定して外した語**です。
  どちらが正かは当方では決めません（訳語は翻訳Tの持ち場）。実測を添えて上げます。

---

## 5. この便で見つけた別件（直していません・発見メモ）

★**`assets/atspect.css` に、コメントが途中で閉じてしまい、規則が1つ丸ごと落ちている箇所があります。**

- 場所＝2026-06-30 の「文字可読性 底上げ」ブロックの説明文中、
  `※既存ブロックがクラス名不一致(aad-*/aad-arch-*/…)` の **`*/` がコメントの終わりとして読まれています。**
- 結果＝直後の
  `.atspect-mission__body{ font-size:1.5rem !important; line-height:1.9 !important; color:#4a4a4a !important; }`
  が**まるごと無効**です（配信CSSのCSSOMを実測＝この規則だけ存在しません）。
- 実害＝トップの mission 本文の**色だけ**が意図と違います（`#4a4a4a` のはずが `rgb(89,89,89)`）。
  字の大きさ・行間は別の規則が同じ値を当てているため影響ありません。**落ちる規則はこの1つだけ**（以降は正常に解釈されます）。
- **直していません**＝直すとトップの見た目（文字色）が変わります。**本便の依頼範囲外のため、判断を仰ぎます。**

---

## 6. 実施していないこと・判定していないこと

- **実機（代表のPC・スマホ）での目視は行っていません。** 検証はすべて実ブラウザ（Playwright・Chromium）です。
- **タップ（実機のタッチ）での確認は行っていません。** CSSの `:hover` を止めているため、タップ後に
  ホバー状態が残る端末でも拡大は起きませんが、**実端末では確かめていません。**
- **`/blogs/*` と既定product テンプレート（非公開商品）でのDawnカードの拡大は、実例が無く未判定**です
  （どちらも表示されるカードが0件でした）。**定義元（`component-card.css`）で止めているので、出れば止まります。**
- **8言語すべてでのホバー検証はしていません**（ホバーの挙動は言語に依存しないため、ja で代表させました）。
- **`atspect-theme` の git commit / push はしていません**（事前承認が要る操作。`CLAUDE.md` の未コミット1行が持ち越し中）。

---

## 7. 要田川（判断をお願いしたいこと）

1. **★トップ featured-media の図版は、触れても反応が無くなりました。** その枠は今 `<div>`・`cursor:auto` ＝
   **リンクではない**ため、当方は「拡大のほうが誤った合図だった」と判断して何も足していません。
   **将来ここをリンクにするなら、サイトの作法（`filter: brightness(1.03)`＝V3 灯りのホバー）を当てるべきです。**
   いま当てるかどうか、ご指示ください。
2. **★上の「5.」（コメントが閉じて規則が1つ落ちている件）を直すか。**
   直すとトップの mission 本文の色が `rgb(89,89,89)` → `#4a4a4a`（濃くなる）に変わります。
3. **★韓国語の `본고장`**（4. の論点）。当方の関所の判断と翻訳Tの判断が割れています。
4. `atspect-theme` の git commit / push（前々便からの持ち越し1行を含む）。

---

## 8. 証拠・バックアップ

- 証拠＝`reports/assets/20260820_夜間_図版ホバー無効/`
  - `shots/`＝ホバーの前後（`*-after.png` ／ `*-before-reproduced.png`・1280と390）17枚。
    ★`before-reproduced` は**今回追記した1規則だけをブラウザ側で外して反映前の挙動を再現したもの**です
    （実際の反映前スクショではありません。同じ条件で並べるためにこの方式にしました）。
  - `shots/film-*.png`＝動画枠が実機では正常に描画される証拠（ja/de/390）。`shots/crop-noscroll-ja.png`＝黒く写る側の再現。
  - `shots/lightbox-1280-after-click.png`＝ライトボックスが生きている証拠。
  - `before-sweep2-1280.json` / `after2-sweep2-1280.json` / `after-sweep2-390.json`＝全ページ種別の実測値。
  - `atspect.css.diff`＝テーマの差分（37行）。
- バックアップ＝`C:\Vault\ARTS-RESPECT\_backups\_auto\theme161-atspect.css\20260820-212455.bak`（テーマ）／
  `C:\Vault\ARTS-RESPECT\_backups\_auto\artist-i18n\20260820-213124\backup.json`（作家データ）。
- 実装ログ＝Vault `_実装ログ_図版ホバー無効と申し送り3件_20260820_ATSPECT.md`／現在地サマリ 追記222。

最終更新：2026-08-20（夜間便）

**★最終確認（全ページ種別・全規則の再測定）**＝配信キャッシュがすべて入れ替わったあとに測り直し、**拡大する箇所 0 / 測定38**（幅1280）。生データ＝`reports/assets/20260820_夜間_図版ホバー無効/final-sweep2-1280.json`。

---

# 制作T報告：裁定反映の小便（2026-08-20・第5便）

**ターミナル：あつぺくと制作 ／ 使用モデル：Opus 5（1M context） ／ 作業：裁定②のCSS是正＋裁定①③の記帳**

## 結論

**完遂。** 夜間便で判断待ちにした3件の裁定を反映した。テーマ161は **`assets/atspect.css` のコメント1箇所だけ**（読み戻しバイト一致）。
**★ただし当方の夜間便の見立てを1つ訂正する＝この是正で画面は1画素も変わらない**（落ちていた規則の対象要素が、ライブのどのページにも存在しないため）。

## 1. 裁定②＝CSSコメントの早期閉じを是正（テーマ161反映済・1ファイル）

**症状**＝`assets/atspect.css` 2166〜2173行の見出しコメント（2026-06-30「文字可読性 底上げ」）の説明文
`(aad-*/aad-arch-*/featured__genre-tag等)` の **`aad-*` の直後の `*/` でコメントが閉じ**、
残りが選択子として次の `{` まで伸びて、**直後の1規則が丸ごと落ちていた。**

| | 内容 |
|---|---|
| 変更前 | `…クラス名不一致(aad-*/aad-arch-*/featured__genre-tag等)で空振りしていた箇所も…` |
| 変更後 | `…クラス名不一致(aad-* / aad-arch-* / featured__genre-tag等)で空振りしていた箇所も…` ＋ 同じコメント内に注意書き2行 |

**CSSの選択子・宣言・値・規則の順序は1つも変えていない。**

### 検証（すべて実測）

- **同じ穴を先に数えた**＝ライブ161の**全テキスト449ファイル**（`.css` 67件／liquidの `<style>` 103ブロック）を状態機械で走査し、
  「コメントの外に現れる `*/`」を数えた。**是正前＝1ファイル2箇所／是正後＝0件。サイト全体でこの1箇所だけ。**
- **CSSOM実測**（変更前後のCSSを同じページに並べてブラウザに解釈させ、全規則を平坦化して突き合わせ）＝
  **615規則 → 616規則。増えたのは1件のみ**＝`.atspect-mission__body{font-size:1.5rem!important;line-height:1.9!important;color:rgb(74,74,74)!important}`。
  **消えた規則0件・他の規則の並び順も完全一致。**
- **ライブ配信CSSでの実測**（`/cart` を踏んでセッションを持ってから測定）

  | | 配信CSS | ブラウザが解釈した規則数 | 色の規則 |
  |---|---|---|---|
  | 変更前 | `?v=1108…8698`（未圧縮 97,727B） | 579（最上位） | **無し**＝バグは配信段階まで実在 |
  | 変更後 | `?v=5260…3337`（圧縮 61,382B） | 535（最上位） | **有り** |

  実効性の証明＝そのクラスだけを持つ検査用要素をライブに一時的に作り、計算値を読んだ＝
  **`color: rgb(74,74,74)` ／ `font-size: 15px` ／ `line-height: 28.5px`**。
- **読み戻し**＝**BYTE-IDENTICAL**（`0268aec3…` → `1532b725…`）。1・2回目は伝播待ちで旧内容・3回目で一致＝**押し直していない**。
- **push直前にライブを取り直し**、バックアップと完全一致＝他ターミナルの並行編集が無いことを確認してから当てた。
- **Codex独立レビュー＝3観点すべてPASS・総合GO**（基準＝`_backups/atspect.css.pre-commentfix_20260820.bak`・tool_uses=1）。

## 2. ★訂正＝「実害はトップ mission 本文の色だけ」は誤りだった

**`.atspect-mission__body` は、ライブのどのページにも1つも描かれていない。**

- mission の本文は `{%- if section.settings.body != blank -%}` の中にあり、`templates/index.json` の設定は
  `{"eyebrow":"","cta_url":"/pages/about"}` ＝ **`body` が空**。schema にも既定値は無い。
- `atspect-mission` を配置しているテンプレートは **`templates/index.json` だけ**。
- 実ブラウザでも該当要素**0件**（PC1280／モバイル390とも）。表示領域そのままの撮影でも、mission節に**本文段落が無い**ことを目視で確認。

→ **この是正による見た目の変化は現時点でゼロ。** 将来「補足テキスト（任意）」に文言が入ったときに、この規則が最後に効いて
**色 #4a4a4a・行間1.9**（従来の最後の規則は行間2.1）になる。
**夜間便では「規則が落ちている」ことだけを見て「実害は色」と書いた＝対象要素の有無を確かめていなかった。**

## 3. 見た目の前後比較（実ブラウザ・トップ）

撮影前にいちど最下部まで送り、位置0に戻してから撮影（`scrollY=0` を実測）。

| 幅 | 差のある画素 | 全画素 | 差の場所 |
|---|---|---|---|
| PC 1280 | **8,207**（0.12%） | 7,028,208 | エピグラフの淡入の途中経過のみ |
| モバイル 390 | **4,916**（0.25%） | 1,962,038 | 同上 |

**それ以外は1画素も違わない。** 横溢れ**0px**・**Liquidエラー0**・コンソールエラー0（両幅）。

## 4. ★副次の発見＝配信CSSが Shopify 側で圧縮されるようになった（当方の変更ではない）

変更前の配信は未圧縮（97,727B・615規則）、アップロード後は圧縮版（61,382B・566規則）。
押す前から**版指定なしのURL**では同じ圧縮版が返っていた＝**プラットフォーム側の処理**。

**圧縮で効き方が変わっていないかを、選択子単位に展開して照合した**（規則が統合されるため規則数の比較は無意味）。

| | 件数 | 中身 |
|---|---|---|
| 配信にだけ無い選択子 | **1** | `.atspect-collection__sort-arrow`＝**中身が空の規則**。圧縮で空規則が捨てられただけ＝効果なし |
| 宣言の並びが違う選択子 | **13** | **12件は書き方の違いだけ**（`'…'`→`"…"`／`0.12`→`.12`／`translateX(x)`→`translate(x)`＝計算値同一）。<br>残り1件＝`*:focus-visible` が**原本に2回**あり（1019行・1936行）圧縮で1つに畳まれた。ダーク地の白リングは**詳細度**（0,2,0＞0,1,0）で決まるため**挙動は不変**。 |

→ **圧縮による効き方の変化はゼロ。**

## 5. 裁定①・③の記帳（コード・データは触っていない）

- **裁定①**＝トップ featured-media の図版は**現状（触れても何も起きない）で確定**。リンクではないため反応しないのが正しい状態。
  **将来リンク化するときは拡大ではなく V3の作法＝`filter: brightness(1.03)`。** → 表示標準書 **§14-1**。
- **裁定③**＝【ガラス】第1文の韓国語 **`본고장` は翻訳Tの訳を正**とする（原文「本場」への忠実訳）。
  制作Tの関所が1巡目に外した判断は採らない。**訳語の当否は翻訳Tの持ち場**であることの確認。→ 表示標準書 **§14-2**（§13-3の未決を閉じた）。
  **データは1文字も触っていない。**
- 表示標準書への追記は**末尾に §14 を足しただけ**＝既存本文（§1〜§13）は1行も書き換えていない。

## 6. ★教訓（原因の型）

1. **コメントの説明文に `*/` を作り得る文字列を書かない。** クラス名をスラッシュで連ねると起きる。
   CSSはエラーを出さずに**直後の1規則を丸ごと捨てる**ため、2026-06-30から誰も気づかなかった。
2. **`instanceof CSSStyleRule` で数える。** ChromeのCSSStyleRuleはCSS入れ子対応で `cssRules` を持つため、
   「`cssRules` があるか」で分岐すると**615件を4件と数える**（実際にこの誤判定を出してから気づいた）。
   **数え方がおかしな数を返したら、まず数え方を疑う。**
3. **規則が落ちていた＝実害がある、ではない。** その規則が当たる要素が**画面に1つも無い**ことがある。
   **「規則の有無」と「対象要素の有無」は別に確かめる。**

## 7. 実施していないこと／判定していないこと

- **`atspect-theme` の git commit / push は未実施**（代表承認待ちのまま。テーマ161への反映のみ）。
- **実機（実端末）での目視は未実施**（当方は実ブラウザのみ）。**今回は見た目が変わらない是正のため急ぎの確認は不要。**
- **8言語の全ページ検証はしていない**（変更はトップの1クラスにしか関係しないため、トップの ja・PC/モバイル2幅のみ）。
- **`section.settings.body` に文言を入れた状態での見え方は判定していない**（ライブで空のため実物が無い）。
- Shopifyが**今後も圧縮版を配信し続けるか**は判定していない（今回の実測時点の事実のみ）。

## 8. 要判断（代表・司令塔）

- **mission の「補足テキスト（任意）」を今後使うのか。** 使わないなら、この規則を含む mission 本文まわりのCSSは将来の掃除の対象にできる。
  **当方からは提案のみで、掃除は行っていない。**

## 証拠・記録

- 証拠＝`reports/assets/20260820_裁定反映_CSSコメント是正/`（`実測.md` ＋ スクショ6点＝前後比較・差分の並べ・表示領域そのまま）。
- 実装ログ＝Vault `_実装ログ_裁定反映_CSSコメント是正_20260820_ATSPECT.md`／現在地サマリ **追記223**。
- バックアップ＝`atspect-theme/_backups/atspect.css.pre-commentfix_20260820.bak`／
  `C:\Vault\ARTS-RESPECT\_backups\_auto\theme161-atspect.css\20260820-224214.bak`。

最終更新：2026-08-20（第5便・裁定反映の小便）

---

# 制作T報告：見本ページの noindex 修正便（2026-08-21）

**ターミナル：あつぺくと制作 ／ 使用モデル：Opus 5（1M context） ／ 作業：見本ページに noindex が出ない不具合の是正**

## 結論

**完遂。テーマ側の不具合（手順書§6(1)）は解消した。** システム開発Tの道具の**関所Cが通り、自動で下書きへ戻らなくなった**
＝**見本が作れる状態になった**（最終版のコードで実測）。**正式掲載627名への誤爆はゼロ**（20件＋実ブラウザ6名で実測・対照実験つき）。
**運用開始の可否そのものは当方の判断ではない**（§7）。

## 1. 何をどう直したか（`layout/theme.liquid`・コード行の変更は1行だけ）

| | 条件式 |
|---|---|
| 変更前 | `{%- if metaobject and metaobject.type == 'artist' and metaobject.is_listed.value == false -%}` |
| 変更後 | `{%- if metaobject and metaobject.system.type == 'artist' and metaobject.is_listed.value == false -%}` |

`metaobject.type` は「**`type` という名前の“欄”**」を読む書き方。artist 定義の**40欄に `type` は無い**（実測）ため常に nil ＝
**この行は一度も実行されていなかった。** あわせて、なぜ効かなかったかの説明コメントを増やした（コード行は上の1行のみ）。

★**手順書§6(1)は「型判定を外す」案を推奨していたが、当方は `system.type` を実描画で確かめたうえで型判定を残した**（理由＝§6）。

## 2. 誤爆ゼロの設計条件を、先に数えて確かめた

| 対象 | 実測 |
|---|---|
| artist メタオブジェクト | **629件**（ACTIVE＝正式掲載 **627** ／ DRAFT＝ダミー **2**） |
| `is_listed` 未設定 | **625件** |
| `is_listed = true` | **2件**（渡辺 玄一・藤代 範雄。いずれもACTIVE） |
| `is_listed = false` | **2件**（見本用ダミーのみ。いずれもDRAFT） |

→ **`is_listed.value == false` が真になる正式掲載ページは存在しない**（未設定は nil・`true` は真＝どちらも `== false` にならない）。

## 3. 手順書が「確かめられていない」としていた点を、実描画で確かめた

手順書§6(1)＝「`metaobject` がレイアウト側で使えるかは確かめられていない」「どちらの案も実際に描画して確かめてから採用すること」。

**見本ハンドルのURLでだけ出力される一時プローブ**を1度だけ入れて実HTMLを読んだ（**正式掲載627名のページには1バイトも出ない**書き方）：

```html
<!-- mihon-probe metaobject=yes systype=[artist] syshandle=[mihon-c7aa…8ab6] islisted=[false] eqfalse=yes -->
```

＝`metaobject` は**レイアウトで使える**／`system.type` は **`artist` を返す**／`is_listed.value` は **`false`**／比較は**真**。
**確認後にプローブを削除して最終版を反映**（最終版に残っていないことを実ブラウザで確認済み）。

## 4. 検証（すべて実測）

### 4-1. 見本ページに noindex が出るか＝**出る**

- **関所C**＝`to-mihon` が「**noindex を3回続けて確認しました**」で**通過**＝**自動で下書きへ戻らなくなった。**
  ★**最終版のコードで確認した**（プローブ版で1度通したあと、**下書きへ戻して10回引いて全部404**にしてから作り直して再度通した）。
- **`status`**＝ページ200 ／ **noindex＝あり** ／ 一覧の索引に**載っていない**（627件のまま）／ 一覧SSRに**URL・名前とも出ない** ／
  ストア内検索に**出ない** ／ サイトマップには**載る**（＝手順書§6(2)の既知・仕組み上避けられない）。
- **実ブラウザ**＝`meta[name="robots"]` が**ちょうど1つ**・`noindex, nofollow`。Liquidエラーなし。プローブの残りなし。

### 4-2. 正式掲載ページで noindex が出ていないこと＝**誤爆0件**

| 検査 | 件数 | 結果 |
|---|---|---|
| 正式掲載ページ（テーマ161指定の取得） | **20件** | **noindex 0件** |
| 実ブラウザ（`is_listed=true` の2名を含む） | **6名** | **robots メタが1つも無い**・Liquidエラー0 |

★**対照実験**＝同じ検査を見本ページに当てると**1件検出**＝**空振りしていない。**
★最初の検査は `?preview_theme_id=` が**302**を返し、**中身を見ずに「0件」と出ていた**。
リダイレクト追随＋クッキー保持に直して数え直した（**0件は、当たっているかを確かめてから採る**）。

### 4-3. 全ページ種別（`layout/theme.liquid` は全ページの土台のため）

トップ／作家一覧／作家詳細／`/collections/all`／about／contact／検索／カート／FAQ／作家案内＝**10種すべて 200・Liquidエラー0・意図しない noindex 0**。

### 4-4. 反映の証跡

- 読み戻し**BYTE-IDENTICAL**（`239e98dd…` → `2ff4def0…`）。**push直前にライブを取り直し**、並行編集が無いことを確認してから当てた。
- 機械検証＝Liquidタグ・変数・comment/endcomment・if/endif・HTMLコメントの開閉数が**変更前とすべて同数**。
- バックアップ＝`_backups/theme.liquid.pre-mihonnoindex_20260821.bak` ／ `C:\Vault\…\_backups\_auto\theme161-theme.liquid\20260821-150939.bak`。

## 5. Codex独立レビュー（観点＝正式ページに副作用が出る穴）

**3観点すべてPASS・総合GO。** ①boolean型で未設定は nil・Liquidの `==` は暗黙変換しないため、未設定/true が `== false` にならない
②`system.type` が artist 以外や nil なら条件は成立しない ③単数形 `metaobject` はメタオブジェクトテンプレートでのみ対象を持つため、
商品・コレクション・通常ページ・検索・404では偽。

## 6. ★手順書の記述と実測が食い違った点（システム開発Tへ申し送り）

手順書§6(1)の「**`is_listed` を持つのは artist だけ**」は**実測と食い違う**＝`donation_work` にも `is_listed` 欄がある（boolean）。
さらに `zz-verify-do-not-list` が **`is_listed=false` かつ ACTIVE** で存在する。

**結論（取り違えは起きない）は変わらない**＝`donation_work` は**オンラインストア公開が無効**（実測）＝ページとして描かれないため。
**ただし根拠は誤り。** 将来 `donation_work` をページ化する判断が出たときに効くため、**当方は型判定を残した。**

## 7. 見本運用の開始可否

- **テーマ側の前提条件は満たした**＝noindex が出る／関所Cが通る／誤爆ゼロ、を最終版のコードで実測。
- **開始してよいかの判断そのものは当方の担当ではない。** 手順書§0「まだ始めてはいけない」と§6(1)の更新は、
  **手順書の持ち主であるシステム開発T**にお願いする（当方は他ターミナルの文書を書き換えない）。
- ★**見本ハンドルはPublicリポジトリに書かない**（台帳と同じ扱い＝Vaultのみ）。本報告でも伏せ字にした。
  今回のものは実在しないダミーだが、**実在の作家さまのときと同じ扱いにする**。

## 8. 同梱＝先行の判断待ちへの回答を記帳（テーマ変更なし）

**mission の「補足テキスト（任意）」は当面使わない・現状のまま**（司令塔裁定）→ 表示標準書 **§14-3** に記帳。
★**CSSは掃除しない**（2026-08-20に生き返らせた `.atspect-mission__body` の規則はそのまま残す）＝
**将来この欄を使うときに色と行間が正しく効く状態にしておくため。**

## 9. 実施していないこと／判定していないこと

- **`atspect-theme` の git commit / push は未実施**（代表承認待ちのまま）。
- **実在の作家さまの見本は作っていない**（ダミー1件のみ・**確認後は下書きへ戻した**）。
- **サイトマップから見本を外せないという結論（§6(2)）は、当方では再検証していない**（システム開発Tの実測をそのまま引く）。
- **Google以外のクローラが noindex に従うか**は未確認（手順書§9と同じ限界）。
- **見本を長時間ACTIVEのまま置いたときの挙動**は測っていない。

## 証拠・記録

- 証拠＝`reports/assets/20260821_見本noindex修正/実測.md`。
- 実装ログ＝Vault `_実装ログ_見本ページnoindex修正_20260821_ATSPECT.md`／現在地サマリ **追記224**。

最終更新：2026-08-21（見本ページ noindex 修正便）
