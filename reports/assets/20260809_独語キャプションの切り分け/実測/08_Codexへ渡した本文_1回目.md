# レビュー対象＝1観点のみ：「独語ページで作品キャプションが英語のまま」の原因の切り分けが正しいか

Web検索・外部URLアクセスは一切行わないでください。以下の本文だけで判断してください。

## 私の結論（これを反証してください）
「表示側（liquid）に言語分岐の欠落は無い。原因はデータ側（product_i18n に de の鍵が無い）である。」

## 1. 表示側のコード：snippets/atspect-work-spec.liquid（全文）

```liquid
{%- assign _pi = product.metafields.custom.product_i18n.value -%}
{%- assign _rm = product.metafields.custom.medium.value -%}
{%- assign _rs = product.metafields.custom.size.value -%}
{%- assign _m_en = _pi.medium.en | default: _rm -%}{%- assign _s_en = _pi.size.en | default: _rs -%}
{%- assign _m_ja = _pi.medium.ja | default: _m_en -%}
{%- assign _s_ja = _pi.size.ja | default: _s_en -%}
{%- if _m_ja != blank or _s_ja != blank -%}
  {%- assign _m_zhcn = _pi.medium.zh_cn | default: _m_en -%}{%- assign _s_zhcn = _pi.size.zh_cn | default: _s_en -%}
  {%- assign _m_zhtw = _pi.medium.zh_tw | default: _m_en -%}{%- assign _s_zhtw = _pi.size.zh_tw | default: _s_en -%}
  {%- assign _m_ko = _pi.medium.ko | default: _m_en -%}{%- assign _s_ko = _pi.size.ko | default: _s_en -%}
  {%- assign _m_fr = _pi.medium.fr | default: _m_en -%}{%- assign _s_fr = _pi.size.fr | default: _s_en -%}
  {%- assign _m_es = _pi.medium.es | default: _m_en -%}{%- assign _s_es = _pi.size.es | default: _s_en -%}
  {%- assign _m_de = _pi.medium.de | default: _m_en -%}{%- assign _s_de = _pi.size.de | default: _s_en -%}
  {%- capture _spec -%}<span class="aw-l aw-l--ja">…</span>…<span class="aw-l aw-l--de">{% if _m_de != blank %}{{ _m_de | escape }}{% endif %}{% if _m_de != blank and _s_de != blank %}　{% endif %}{% if _s_de != blank %}<span class="aw-spec-size">{{ _s_de | escape }}</span>{% endif %}</span>{%- endcapture -%}
  {%- if tag == 'span' -%}<span class="{{ cls }}">{{ _spec }}</span>{%- else -%}<p class="{{ cls }}">{{ _spec }}</p>{%- endif -%}
{%- endif -%}
```
※ja/en/zh-cn/zh-tw/ko/fr/es/de の8スパンをすべて出力しています（deも含む）。

## 2. 言語の出し分けCSS（このスニペットを使う4セクションすべてに存在することを実測済み）
```css
.aw-l{display:none;}
html[data-lang="de"] .aw-l--de{display:inline;}
```
`aw-l--de` を含むCSSがあるファイル＝artist-detail / artwork-detail / collection / collector-cta / search の5本（実測）。

## 3. データの実測（Admin API・全商品7件を走査）
商品は7件。うち product_i18n を持つのは3件（作品）で、残り4件は利用料等で作品ではない。
3件すべてで product_i18n の鍵は次のとおり（3件とも完全に同じ構成）：

| 項目 | 入っている言語の鍵 | de の有無 |
|---|---|---|
| medium | ja, en, zh_cn, zh_tw, ko, fr, es | **無し（0/3）** |
| size | ja, en, zh_cn, zh_tw, ko, fr, es, **de** | 有り（3/3） |
| description | ja, en, zh_cn, zh_tw, ko, fr, es | **無し（0/3）** |
| title | ja, romaji, en | 無し |
| artist | ja, romaji | 無し |

実値の例（kakekurabe）：
- medium.en = `Japanese cypress (hinoki), polychromy, gold leaf`
- medium.ja = `ヒノキ・彩色・箔`
- medium.de = （鍵そのものが無い）
- size.de = `H 28 × B 25 × T 15 cm`
- size.en = `H 28 × W 25 × D 15 cm (11 × 9.8 × 5.9 in)`

## 4. 実画面の実測（ヘッドレスChromeでDOMを読み、getComputedStyle と offsetParent の両方で「見えているスパン」だけを抽出）
8言語 × 5経路 で測定。どの言語・どの経路でも「8スパン中1スパンだけ表示」で、表示中のクラスは常にその言語のもの。

独語（data-lang=de）で実際に画面に出ている文字：
- 作家ページ／作品一覧／トップ／検索：`Japanese cypress (hinoki), polychromy, gold leaf　H 28 × B 25 × T 15 cm`
- 作品ページ：`Material & Technik = Japanese cypress (hinoki), polychromy, gold leaf` ／ `Maße = H 28 × B 25 × T 15 cm`

他7言語（ja/en/zh-cn/zh-tw/ko/fr/es）は、素材も寸法もその言語の文字が出ています（英語のまま残っている箇所は0）。
つまり**独語だけ、素材は英語・寸法は独語**という状態です。

## 5. 別経路の可能性を潰した確認
- Shopify標準の翻訳（Translate & Adapt）が入っていて、テーマが読んでいないだけ、という可能性
  → `https://atspect.com/de/products/kakekurabe` は 302 で `/products/kakekurabe` へ戻され、`https://atspect.com/de` は 404。
     ロケール接頭辞のURLが存在しない＝Shopify標準のロケール切替は使われていない。
     言語切替は `?lang=de` で `html[data-lang]` を変え、CSSで該当スパンだけ出す自前の仕組み。
  → ただし `read_locales` / `read_translations` の権限が当方のトークンに無く、**標準翻訳の中身は直接には未確認**（この点は正直に「未確認」と報告する予定）。

## 質問（この3点だけ答えてください）
1. 上記の結論「表示側に欠落は無い・原因はデータ側」に反証はありますか。反証があるなら、どの行のどの条件で表示側の欠陥になりうるかを具体的に指摘してください。
2. `{%- assign _m_de = _pi.medium.de | default: _m_en -%}` のように「訳が無ければ英語に落とす」設計そのものは、独語の利用者から見て妥当だと思いますか。落とさず「素材の行を出さない」ほうがよいという考え方もありえますか。どちらが良いかの理由を1つずつ挙げてください。
3. キャプションの素材と寸法の区切りが、**全言語で全角空白（U+3000）固定**になっています（例：英語で `gold leaf　H 28 × W 25 × D 15 cm`）。ラテン文字の言語（en/fr/es/de）でこれは組版として不自然ですか。不自然なら、どう直すのが妥当ですか。
