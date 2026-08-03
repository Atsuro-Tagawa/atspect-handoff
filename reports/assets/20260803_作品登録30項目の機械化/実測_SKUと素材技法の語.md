# 本番データの数え上げ：SKU・素材・技法（2026-08-03 実測・あつぺくと制作T）

**机上の案ではない。** Shopify Admin API から読み取り専用で取得した本番データを機械で数えたもの。
スクリプト＝`count-vocab.mjs`／入力＝`products-live.json`（全商品）・`artists-live.json`（artist全件）・`C:/Users/ataga/atspect-theme/_facet_vocab_v4_compact.json`。

## 0. 母数（★ここが結論を左右する）

| 供給源 | 件数 |
|---|---|
| 全商品 | 7 |
| うち **作品**（custom.artist_handle を持つもの） | **3** |
| うち 非作品（システム利用料・登録料・AR試作・検証用ダミー） | 4 |
| 作家メタオブジェクト | 625 |
| 既存語彙表 v4 | 318 語（material 16／technique 34／ware 180／その他 88） |

★**本番に実在する作品は 3 点しかない**（全点が同一作家）。
　素材・技法の語彙表を「作品データの出現数」だけで決めることは、この母数では**できない**。
　そのため下記 C（作家625名の肩書）と E（既にコード化済みの語彙表318語）を主な根拠として扱う。

非作品の内訳（作品として数えなかった理由の明示）：
- `ar試作用-テスト-非公開` … AR試作用（テスト・非公開）（status=DRAFT・type=internal-test）
- `member-d56916fa1bf2` … あつぺくとシステム利用料（月額）（status=UNLISTED・type=(空)）
- `zzz検証用ダミー月額テスト商品-非公開予定-削除しないこと` … ZZZ検証用ダミー月額テスト商品（非公開予定・削除しないこと）（status=DRAFT・type=(空)）
- `reg-7f2fff5a4a1b` … あつぺくと情報登録料（初回のみ）（status=UNLISTED・type=(空)）

---

## A. #14 素材：`custom.medium` の実測（母数 3 点）

### A-1. 生の値

| 出現数 | 値 |
|---|---|
| 2 | ヒノキ・彩色・箔 |
| 1 | バルサ・彩色・箔 |

### A-2. 「・」で分解した語（＝語彙表の最小単位の候補）

| 出現数 | 語 | 語彙表v4に同じ語があるか | 素材か技法か（当方の見立て） |
|---|---|---|---|
| 3 | 彩色 | **なし** | **技法** |
| 3 | 箔 | **なし** | **技法（仕上げ）** |
| 2 | ヒノキ | **なし** | 素材（木） |
| 1 | バルサ | **なし** | 素材（木） |

★**実測から出た一番大きな発見**＝`custom.medium` という**1つの自由文フィールドに、素材（ヒノキ・バルサ）と技法（彩色・箔）が混ざって入っている**。
　設計は #14 を素材、#15 を技法として**別々に検査する**前提だが、**いまのデータ構造では2つを分離できない**。
　語彙表を作るより先に、この1フィールドを分けるかどうかを決める必要がある（下記「案」参照）。

## B. #15 技法：作品のファセットコード（axis2/axis3）の実測

| 出現数 | コード値 | 語彙表v4の日本語 |
|---|---|---|
| 3 | `sculpture.wood-carving` | 木彫 |

実在する第二軸コードは **1 種だけ**（作品が3点しかないため）。

## C. 作家625名の肩書（`genre` フィールド）＝技法の呼び名として本番に実在する語（83 種）

素材そのものではないが、**「何をする人か」＝技法・分野の語が本番に実在している唯一のまとまった集合**。
語彙表の第二軸（技法）を起草するときの実データ根拠になる。

| 出現数 | 肩書 | 語彙表v4に対応がありそうか |
|---|---|---|
| 93 | 洋画家 | — |
| 83 | 日本画家 | 日本画 |
| 65 | 写真家 | 写真 |
| 61 | 彫刻家 | 彫刻 |
| 41 | 現代美術家 | 現代美術 |
| 39 | 陶芸家 | 陶芸 |
| 29 | 書家／漢字 | — |
| 27 | 建築家 | 建築 |
| 14 | 漆芸家 | 漆芸 |
| 13 | 書家／かな | — |
| 10 | 金工家 | 金工 |
| 9 | ファッションデザイナー | — |
| 8 | 染色家 | — |
| 7 | 書家／前衛 | — |
| 7 | 染織家 | 染織 |
| 6 | グラフィックデザイナー | — |
| 5 | グラフィックデザイナー（アートディレクター） | — |
| 5 | 書家 | 書 |
| 5 | 刀工 | — |
| 4 | イラストレーター（グラフィックデザイナー） | — |
| 4 | 現代美術家（パフォーマンス作家） | — |
| 4 | 人形作家 | 人形 |
| 4 | 木工芸家 | — |
| 3 | インダストリアルデザイナー | — |
| 3 | ガラス工芸家 | — |
| 3 | 書家／篆刻 | — |
| 3 | 竹工芸家 | — |
| 3 | 彫刻家（画家） | — |
| 3 | 版画家 | 版画 |
| 2 | インテリアデザイナー | — |
| 2 | インテリアデザイナー（家具デザイナー） | — |
| 2 | グラフィックデザイナー（イラストレーター） | — |
| 2 | グラフィックデザイナー（図案家） | — |
| 2 | グラフィックデザイナー（装丁家） | — |
| 2 | 伊勢型紙彫師 | — |
| 2 | 七宝家 | 七宝 |
| 2 | 写真家（画家） | — |
| 2 | 水彩画家 | 水彩画 |
| 2 | 報道写真家 | — |
| 1 | アートディレクター（デザイナー） | — |
| 1 | イラストレーター（デザイナー） | — |
| 1 | インダストリアルデザイナー（家具デザイナー） | — |
| 1 | インテリアデザイナー（プロダクトデザイナー） | — |
| 1 | グラフィックデザイナー（エディトリアルデザイナー） | — |
| 1 | グラフィックデザイナー（フォトモンタージュ作家） | — |
| 1 | グラフィックデザイナー（装丁家・画家） | — |
| 1 | グラフィックデザイナー（造形作家） | — |
| 1 | グラフィックデザイナー（美術家） | — |
| 1 | デザイナー | — |
| 1 | ブライダルファッションデザイナー | — |
| 1 | 家具デザイナー | — |
| 1 | 家具デザイナー（建築家） | — |
| 1 | 画家 | 絵画 |
| 1 | 画家（パフォーマンス作家） | — |
| 1 | 建築家／建築史家 | — |
| 1 | 現代美術家（デザイナー） | — |
| 1 | 現代美術家（メディアアート作家） | — |
| 1 | 現代美術家（映像作家） | — |
| 1 | 現代美術家（音響作家） | — |
| 1 | 現代美術家（写真家） | — |
| 1 | 現代美術家（彫刻家） | — |
| 1 | 工業デザイナー | — |
| 1 | 図案家（絵葉書デザイナー） | — |
| 1 | 図案家（装丁家・版画家） | — |
| 1 | 水墨画家 | 水墨画 |
| 1 | 染色家（テキスタイルデザイナー） | — |
| 1 | 挿絵画家（ファッションデザイナー） | — |
| 1 | 造形作家 | — |
| 1 | 彫刻家（版画家） | — |
| 1 | 彫刻家（美術家） | — |
| 1 | 陶芸家／書・篆刻 | — |
| 1 | 陶磁器デザイナー | — |
| 1 | 日本画家（画僧） | — |
| 1 | 版画家（彫刻家） | — |
| 1 | 版画家（美術家） | — |
| 1 | 版画家（洋画家） | — |
| 1 | 文人画家 | — |
| 1 | 洋画家（絵本作家） | — |
| 1 | 洋画家（書家） | — |
| 1 | 洋画家（図案家） | — |
| 1 | 洋画家（日本画家） | — |
| 1 | 洋画家（版画家） | — |
| 1 | 截金師 | — |

## D. 作家のジャンル（`category`）＝8分類の実分布

| 出現数 | ジャンル |
|---|---|
| 187 | 絵画 |
| 103 | 工芸 |
| 69 | 写真 |
| 64 | 彫刻 |
| 61 | 現代美術 |
| 57 | 書 |
| 56 | デザイン |
| 28 | 建築 |

## E. 既にコード化されている語彙（`_facet_vocab_v4_compact.json`）

★**この318語は既に本番テーマが読んでいるファイル**であり、新しく語彙表を作る前に必ず突き合わせる相手。

### E-1. concept_type = material（16語）＝素材の候補

| コード値 | 日本語 | 英語 | 有効 |
|---|---|---|---|
| `painting.pastel` | パステル画 | Pastel | ○ |
| `painting.tempera` | テンペラ | Tempera | — |
| `sculpture.mixed-media` | ミクストメディア | Mixed media | ○ |
| `sculpture.terracotta` | テラコッタ | Terracotta | — |
| `sculpture.plaster` | 石膏 | Plaster | — |
| `sculpture.resin-frp` | 樹脂・FRP | Resin / Fiberglass | — |
| `craft.ceramics` | 陶芸 | Ceramics | ○ |
| `craft.lacquer` | 漆芸 | Lacquerware (urushi) | ○ |
| `craft.metalwork` | 金工 | Metalwork | ○ |
| `craft.textiles` | 染織 | Textiles | ○ |
| `craft.wood-bamboo` | 木竹工 | Wood and bamboo work | ○ |
| `craft.glass` | ガラス | Glass | — |
| `craft.dolls` | 人形 | Dolls | ○ |
| `craft.cloisonne` | 七宝 | Cloisonné | — |
| `craft.swords` | 刀剣 | Swords | — |
| `contemporary.mixed-media` | ミクストメディア | Mixed media | ○ |

### E-2. concept_type = technique（34語）＝技法の候補

| コード値 | 日本語 | 英語 | 有効 |
|---|---|---|---|
| `painting.oil` | 油彩画 | Oil painting | ○ |
| `painting.watercolor` | 水彩画 | Watercolor | ○ |
| `painting.acrylic` | アクリル | Acrylic painting | — |
| `painting.drawing` | 素描 | Drawing | — |
| `painting.gouache` | グワッシュ | Gouache | — |
| `painting.fresco` | フレスコ | Fresco | — |
| `painting.collage` | コラージュ | Collage | — |
| `painting.print.woodcut` | 木版 | Woodcut | — |
| `painting.print.etching` | エッチング | Etching | — |
| `painting.print.engraving` | エングレーヴィング | Engraving | — |
| `painting.print.drypoint` | ドライポイント | Drypoint | — |
| `painting.print.lithograph` | リトグラフ | Lithograph | — |
| `painting.print.screenprint` | シルクスクリーン | Screenprint | — |
| `painting.print.mezzotint` | メゾチント | Mezzotint | — |
| `painting.print.aquatint` | アクアチント | Aquatint | — |
| `sculpture.wood-carving` | 木彫 | Wood carving | ○ |
| `sculpture.stone-carving` | 石彫 | Stone carving | ○ |
| `sculpture.bronze` | ブロンズ（鋳造） | Bronze (casting) | ○ |
| `sculpture.modeling` | 塑造 | Clay modeling | — |
| `sculpture.kanshitsu` | 乾漆 | Dry-lacquer (kanshitsu) | — |
| `sculpture.ceramic-sculpture` | 陶彫 | Ceramic sculpture | — |
| `sculpture.metal` | 金属 | Metal | ○ |
| `photography.gelatin-silver` | ゼラチン・シルバー・プリント | Gelatin silver print | ○ |
| `photography.platinum` | プラチナ・プリント | Platinum print | ○ |
| `photography.albumen` | 鶏卵紙 | Albumen print | ○ |
| `photography.chromogenic` | 発色現像方式 | Chromogenic color print | ○ |
| `photography.digital` | デジタル・プリント | Digital print | ○ |
| `photography.inkjet` | インクジェット・プリント | Inkjet print | — |
| `photography.cyanotype` | サイアノタイプ | Cyanotype | — |
| `photography.daguerreotype` | ダゲレオタイプ | Daguerreotype | — |
| `photography.ambrotype` | アンブロタイプ | Ambrotype | — |
| `photography.dye-transfer` | ダイ・トランスファー | Dye transfer print | — |
| `painting.chigirie` | ちぎり絵 | Chigirie | — |
| `craft.washi` | 手漉和紙 | Papermaking (washi) | ○ |

## F. #9 SKU：実態

| 商品 | 作品か | SKU |
|---|---|---|
| `funasogaku` | 作品 | **null（未設定）** |
| `kakekurabe` | 作品 | **null（未設定）** |
| `kaeru-butsu` | 作品 | **null（未設定）** |
| `ar試作用-テスト-非公開` | 非作品 | **null（未設定）** |
| `member-d56916fa1bf2` | 非作品 | **null（未設定）** |
| `zzz検証用ダミー月額テスト商品-非公開予定-削除しないこと` | 非作品 | **null（未設定）** |
| `reg-7f2fff5a4a1b` | 非作品 | **null（未設定）** |

**7 個のバリエーションすべてで SKU が null。本番に採番の実例は1件も無い。**
＝「既存の付け方に合わせる」ことができないので、規則は新しく決めるしかない。

いっぽう、**中立な識別子の付け方の先例は本番に既にある**（SKUではなく handle だが、同じ「中立採番」の問題を解いている）：

- `member-d56916fa1bf2` … あつぺくとシステム利用料（月額）（プレフィックス＋16進12桁のランダム）
- `reg-7f2fff5a4a1b` … あつぺくと情報登録料（初回のみ）（プレフィックス＋16進12桁のランダム）
