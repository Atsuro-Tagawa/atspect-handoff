#!/bin/bash
# 翻訳品質T 無人便＝巡回ドライバ（読むだけ・是正なし）。
# 「その言語の読者として開き、目に付く違和感を最大3件だけ」＝深掘り禁止・速いペース。
# 使い方: bash drive_patrol.sh <handle>
set -u
D="/c/Users/ataga/AppData/Local/Temp/claude/C--Users-ataga-Desktop----------/073fe1f4-9836-4989-8ced-8989c944b568/scratchpad/honyaku/patrol1"
cd "$D"
H="$1"

declare -A NAME=( [en]="英語" [zh_cn]="中国語簡体字" [zh_tw]="中国語繁体字" [ko]="韓国語" [fr]="フランス語" [es]="スペイン語" [de]="ドイツ語" )

for L in en zh_cn zh_tw ko fr es de; do
(
  F="pin_${H}_${L}.txt"
  [ -f "$F" ] || { echo "SKIP" > "pout_${H}_${L}.out"; exit 0; }
  BODY=$(cat "$F")
  codex exec --skip-git-repo-check "あなたは${NAME[$L]}のネイティブ読者です。日本の美術作家を紹介するページを、ざっと開いて読みました。
深く分析せず、**パッと目についた違和感だけ**を、多くても3件、挙げてください。無ければ0件でよい。数を稼がない。

【出力＝1件につき次の2行だけ】
  引用: <目についた箇所をそのまま短く>
  違和感: <何が気になったか。1文だけ>

最後に「総評: 」で1行、全体の第一印象を書いてください。

────────── 読んだ文章（${L}） ──────────
${BODY}
────────── ここまで ──────────" < /dev/null > "pout_${H}_${L}.out" 2>&1
) &
done
wait
