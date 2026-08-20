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
8. **★1つだけ未確認のまま報告します**＝タブの見出し・共有カードの●を作家名へ置き換える改修は、
   `fujishiro-norio-glass-03` では **「藤代 範雄｜あつぺくと」**に変わったことを確認しましたが、
   **`-01` と `-02` は配信キャッシュが旧版を返し続けており、反映15分後の時点でも「●｜あつぺくと」のまま**です。
   3ページとも同じコードを通るため追随する見込みですが、**見ていないので「直った」とは書きません。**
   次便で取り直して確かめます（当サイトの配信キャッシュは8〜10分と記録していましたが、今回は15分でも残りました＝記録を更新）。

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
