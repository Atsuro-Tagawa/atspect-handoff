# レビュー観点＝1つだけ：2つの検索窓で共有する正規化・照合モジュールに穴や退行がないか

Web検索・外部URLアクセスを一切行わず、この本文だけで判断してください。日本語で答えてください。
コードの書き換えはしないでください。**指示された箇所以外に同じ問題が残っていないかも見てください。**

## 背景
美術サイトに検索窓が2つある（「作家を探す」「作品を探す」）。どちらもブラウザ内での照合。
代表の実体験「鈴木ちかこ」で出なかったことが発端。実測したところ、2つの窓で**鏡写しの穴**があった：

| 打った語 | 作家を探す（是正前） | 作品を探す（是正前） |
|---|---|---|
| `suzuki chikako` | 当たる | **落ちる** |
| `chikako suzuki` | **落ちる** | 当たる |

原因＝同じ作家のローマ字が、作家データは「姓 名」（Suzuki Chikako）、作品データは「名 姓」（Chikako Suzuki）。
正規化の関数も2つのファイルに別々に書かれていた。

## 作った共有モジュール（全文）

```js
(function (w) {
  'use strict';
  if (w.ATSPECT_SEARCH) return;
  var EXACT = '/';
  var MACRON = { 'ā':'a','ī':'i','ū':'u','ē':'e','ō':'o','â':'a','î':'i','û':'u','ê':'e','ô':'o' };
  var MACRON_LONG = { 'ā':'aa','ī':'ii','ū':'uu','ē':'ei','ō':'ou','â':'aa','î':'ii','û':'uu','ê':'ei','ô':'ou' };
  var SEP_RE = /[\s　-‐‑‒–—―−・･‧·_/]+/g;

  function foldMacron(s, table) {
    return String(s || '').replace(/[āīūēōâîûêô]/g, function (c) { return table[c] || c; });
  }
  function kataToHira(s) {
    return String(s || '').replace(/[ァ-ヶ]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0x60); });
  }
  function norm(s) {
    return kataToHira(foldMacron(String(s || '').toLowerCase(), MACRON)).replace(SEP_RE, '');
  }
  function normLong(s) {
    return kataToHira(foldMacron(String(s || '').toLowerCase(), MACRON_LONG)).replace(SEP_RE, '');
  }
  function keysFrom(s) {
    var a = norm(s); if (!a) return [];
    var out = [a];
    var b = normLong(s);
    if (b && b !== a) out.push(b);
    var parts = String(s || '').trim().split(SEP_RE).filter(function (x) { return x.length > 0; });
    if (parts.length === 2) {
      var r = norm(parts[1] + ' ' + parts[0]);
      if (r && r !== a && out.indexOf(EXACT + r) === -1) out.push(EXACT + r);
      var rl = normLong(parts[1] + ' ' + parts[0]);
      if (rl && rl !== r && out.indexOf(EXACT + rl) === -1) out.push(EXACT + rl);
    }
    return out;
  }
  function keysFromAll(values) {
    var out = [], i, k, j;
    for (i = 0; i < values.length; i++) { k = keysFrom(values[i]); for (j = 0; j < k.length; j++) if (out.indexOf(k[j]) === -1) out.push(k[j]); }
    return out;
  }
  function tokens(q) {
    var raw = String(q || '').trim();
    if (!raw) return [];
    return raw.split(SEP_RE).map(function (t) { return norm(t); }).filter(function (t) { return t.length > 0; });
  }
  function matches(toks, keys) {
    if (!toks.length) return true;
    for (var i = 0; i < toks.length; i++) {
      var hit = false;
      for (var j = 0; j < keys.length; j++) {
        var k = keys[j];
        if (k.charAt(0) === EXACT) { if (k.slice(1) === toks[i]) { hit = true; break; } }
        else if (k.indexOf(toks[i]) !== -1) { hit = true; break; }
      }
      if (!hit) return false;
    }
    return true;
  }
  w.ATSPECT_SEARCH = { norm:norm, normLong:normLong, keysFrom:keysFrom, keysFromAll:keysFromAll, tokens:tokens, matches:matches, kataToHira:kataToHira };
})(window);
```

## 設計の意図
- 照合は**語単位**＝入力を区切り（空白・ハイフン・中点）で分け、**すべての語がどれかのキーに当たれば一致**。
  これで「姓だけ」「名だけ」「順序が逆」でも当たる。
- 語順を入れ替えた形（`/` 印つき）は**丸ごと一致のときだけ**当たる。
  部分一致まで許すと、つなぎ目に元々無い並びができて誤ヒットが増えたため
  （610名で総当たりしたところ `Ota` が18件→35件に膨らんだ。丸ごと一致に限れば増分0件）。
- `EXACT = '/'` は `SEP_RE` が必ず取り除く文字なので、正規化済みのキーには絶対に現れない（印として安全）。
- マクロンは「ō→o」の形に加えて「ō→ou」の形もキーに持つ（`Funasōgaku` / `Funasogaku` / `Funasougaku` のどれでも当たる）。
- 長音符「ー」(U+30FC) は区切りに**含めない**（「ラーメン」を壊さないため）。

## 呼び出し側
- 作家を探す＝キーの元の値は `[漢字名, ローマ字名, ジャンル, かな名, 別名]`（値ごとに `keysFromAll` に渡す）。
- 作品を探す＝カードの `data-vendor="漢字名|ローマ字名|かな名"` と `data-title="原題|romaji|en"` を
  `|` で分けて値ごとに渡す。
  ★はじめは1本につないだ文字列で渡していたため「2語の値」に該当せず、
  `suzukichikako`（空白なし）が作品側だけ落ちていた。実測で気づいて分割に直した。

## 机上検査の結果（作家610名で総当たり）
- 旧実装で当たっていて新実装で落ちるもの＝**0件**（退行なし）
- 610名の姓で総当たりして件数が増えたもの＝**0件**（誤ヒットの増分なし）
- ローマ字の姓名を逆順で打ったとき当たる作家＝**42名 → 608名**（残る2名はローマ字が1語＝Aimitsu / Ei-Q）

## 実画面での結果（両窓・36通り打鍵）
落ちるのは次の2つだけ（意図して未対応）：`鈴木ちかこ`（漢字とかなの交ぜ書き）／`铃木`（簡体字）。

## 質問（この5点だけ答えてください）
1. このモジュールに、**誤ヒットを生む穴**はありますか。とくに1文字の語を打ったとき、`EXACT` 印の扱い、
   `keysFromAll` の重複除去まわりを見てください。
2. **取りこぼしを生む穴**はありますか。とくに `SEP_RE` に入れるべきなのに入っていない文字、
   逆に入れてはいけないのに入っている文字（長音符・アポストロフィ・アクセント付き文字など）を見てください。
3. `EXACT = '/'` という印の付け方に危険はありますか。`/` が入力や実データに現れる経路はありますか。
4. 呼び出し側が `|` でつないだ文字列を `split('|')` して渡しています。**実データに `|` が含まれていた場合**、
   何が起きますか。防ぐべきですか。
5. 「指示された箇所以外に同じ問題が残っていないか」＝この設計で、**まだ直っていない検索の穴**は何だと思いますか。
