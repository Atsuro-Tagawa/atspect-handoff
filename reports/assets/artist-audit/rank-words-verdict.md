# 序列語リストの確定（1語＝1行の採否判定）

**判定の原則＝日本語の原文の意味に合わせ、8言語で同じ扱いにする。**
ある語をある言語だけ外すと、同じ作家の説明が言語によって食い違うため。

**「採用（常に序列）」＝検出したら外してよい／「文脈次第」＝検出はするが1文ずつ判断し、事実の記述なら据え置く／「不採用（常に事実）」＝検出リストから外す。**
★検出は削除ではない。文脈次第の語は、下請けが1件ずつ判断して据え置いてよい。

## 集計

| | 語数 |
|---|---|
| Codexが洗い出した追加語 | 688語（未判定 0語） |
| └ 採用（常に序列） | 545 |
| └ 文脈次第 | 5 |
| └ 不採用 | 137 |
| └ 重複 | 1 |
| **★本体がCodexの判定を覆した** | **19語** |
| 既存リストのうちライブに出現する語 | 109語 |
| └ 常に序列 / 文脈次第 / 常に事実 | 60 / 43 / 6 |
| 最終の検出リスト | 777語 |

## ★本体がCodexの判定を覆した語（現物を読んで判断した）

| 言語 | 語 | 出現 | Codexの判定 | 最終判定 | 覆した理由 |
|---|---|---|---|---|---|
| en | `old master` | 2 | 採用 | **不採用** | 「old master blades」＝古名刀。作家の序列ではない |
| en | `Old Master` | 2 | 採用 | **不採用** | 同上（大文字表記） |
| fr | `maîtres` | 4 | 採用 | **文脈次第** | 「anciennes lames de maîtres」＝古名刀の意味が実在する |
| fr | `pionnières` | 4 | 採用 | **文脈次第** | 「des années pionnières」＝黎明期という時期の記述がある |
| es | `fundadores` | 2 | 採用 | **文脈次第** | 「具体美術協会の創立会員」＝事実／「近代竹工芸の創始者の一人」＝評価。両方ある |
| es | `liderando` | 1 | 採用 | **文脈次第** | 「率いた」。組織の運営という事実の用法があり得る |
| es | `abrió camino` | 14 | 採用 | **文脈次第** | 「se abrió camino gracias a su destreza」＝世に出た、という事実の用法が実在する |
| es | `las mejores` | 1 | 採用 | **不採用** | 「en las mejores condiciones posibles」＝撮影条件の話。作家の序列ではない |
| es | `culminación de` | 1 | 採用 | **不採用** | 「la culminación de su arte」＝本人の画業の到達点。他者との序列ではない |
| es | `encarnó` | 4 | 採用 | **不採用** | 「体現した」。ja側に対応する序列語が無く、esだけ外すと8言語で内容が食い違う |
| de | `Leitfigur der` | 2 | 採用 | **重複** | `Leitfigur` に包含される。検出は `Leitfigur` だけでよい |
| ja | `中心となった` | 1 | 常に事実 | **文脈次第** | 「一陽会の結成に加わり中心となった」＝結成時の役割の事実だが、中心性の評価にもなり得る。1件ずつ判断する |
| en | `foremost` | 2 | 常に事実 | **文脈次第** | 現在の2件は「foremost among them＝なかでも」で据え置き。ただし「foremost figure」なら序列 |
| en | `guided the` | 1 | 常に事実 | **常に序列** | 「guided the postwar calligraphy world」＝戦後の書道界を導いた。ja『導いた』はB判定であり扱いを揃える |
| en | `laid the foundation` | 1 | 常に事実 | **常に序列** | ja『基礎を築』はB判定であり扱いを揃える |
| ko | `이끌` | 25 | 常に事実 | **文脈次第** | `이끈` と同じ動詞の活用形。`이끈` を常に序列としながら活用形だけ事実とするのは整合しない |
| ko | `이끌었` | 12 | 常に事実 | **文脈次第** | 同上 |
| es | `dirigió` | 28 | 常に事実 | **文脈次第** | 「dirigió el yōga moderno」＝近代洋画を主導した（序列）／「dirigió su propia escuela」＝画塾を運営した（事実）。両方が実在する |
| es | `encabezó` | 3 | 常に事実 | **文脈次第** | 「encabezó un movimiento de renacimiento del yamato-e」＝運動を主導した。序列の用法が実在する |

## ① 既存の検出リスト：ライブに出現する語の3分類（109語）

| 言語 | 語 | 出現 | 最終判定 | 理由 |
|---|---|---|---|---|
| zh_cn | `代表` | 51 | **常に序列** | 分野や流派を象徴する上位者と位置づける |
| zh_tw | `代表` | 51 | **文脈次第** | 代表者の職務や流派の例示にも使われる |
| ko | `이끈` | 46 | **常に序列** | 近代化や画派を牽引した中心性を示す |
| en | `leading` | 42 | **文脈次第** | 団体運営と第一人者の評価が混在する |
| ko | `개척` | 42 | **常に序列** | 新分野や技法を最初に切り開いた評価 |
| ja | `代表する` | 36 | **常に序列** | 分野を代表する地位を与える評価表現 |
| ja | `切り開いた` | 36 | **文脈次第** | 先駆性の評価にも歴史的事実にもなる |
| ko | `대표하는` | 35 | **常に序列** | 分野を代表する作家という中心性の評価 |
| es | `dirigió` | 28 | **文脈次第** | 「dirigió el yōga moderno」＝近代洋画を主導した（序列）／「dirigió su propia escuela」＝画塾を運営した（事実）。両方が実在する |
| fr | `mena` | 26 | **文脈次第** | 人生を送る・制作を進める事実にも使う |
| fr | `ouvrit la voie` | 26 | **常に序列** | 分野を切り開いた先駆者と評価している |
| ko | `이끌` | 25 | **文脈次第** | `이끈` と同じ動詞の活用形。`이끈` を常に序列としながら活用形だけ事実とするのは整合しない |
| en | `led the` | 24 | **文脈次第** | 組織運営にも運動を主導した評価にもなる |
| fr | `dirigea` | 23 | **文脈次第** | 組織を運営した事実にも使われる |
| zh_cn | `引领` | 21 | **文脈次第** | 先導の評価にも実際の統率にもなる |
| zh_tw | `引領` | 21 | **文脈次第** | 功績評価にも実際の指導行為にもなり得る |
| zh_cn | `开创` | 19 | **文脈次第** | 功績評価にも技法創始の事実にもなる |
| zh_tw | `開創` | 19 | **常に事実** | 書法や技法を創始した事実を述べている |
| de | `leitete` | 19 | **文脈次第** | 組織運営の事実にも分野を牽引した評価にもなる |
| es | `figura destacada` | 17 | **常に序列** | 芸術界で傑出した人物という評価 |
| zh_cn | `开辟` | 15 | **文脈次第** | 先駆的評価にも道を開いた事実にもなる |
| zh_tw | `開闢` | 15 | **常に序列** | 新たな道を切り開いた先駆性を評価する語 |
| fr | `maître de` | 15 | **文脈次第** | 工芸上の親方・熟練者も意味する |
| es | `maestro de` | 15 | **文脈次第** | 巨匠評価にも技能・職名にもなる |
| ja | `導いた` | 14 | **文脈次第** | 発展への評価と後進指導の事実がある |
| en | `master of` | 14 | **文脈次第** | 職位・流派継承と技能評価の両義がある |
| de | `anführte` | 14 | **文脈次第** | 団体を率いた事実にも分野を先導した評価にもなる |
| fr | `figure majeure` | 13 | **常に序列** | 分野の主要人物という評価である |
| es | `abrió el camino` | 13 | **常に序列** | 分野を最初に切り開いたという評価 |
| en | `the first to` | 12 | **常に序列** | 全例が先駆性や時間的優先を示す |
| zh_cn | `先驱` | 12 | **常に序列** | 他者に先行した先駆者と位置づける |
| zh_tw | `先驅` | 12 | **常に序列** | 他者に先行した人物という評価を示す |
| ko | `이끌었` | 12 | **文脈次第** | 同上 |
| ko | `선구` | 11 | **常に序列** | 先駆けという時間的優位を示す |
| ko | `선구자` | 10 | **常に序列** | 先駆者という最初性の評価 |
| de | `Meister der` | 9 | **常に序列** | 達人・巨匠として他者より上位に置く表現 |
| ja | `礎を築` | 8 | **文脈次第** | 基礎的功績の評価と活動実績が重なる |
| zh_cn | `核心人物` | 7 | **常に序列** | 集団や分野の中核的存在と評価する |
| zh_tw | `核心人物` | 7 | **常に序列** | 集団内での中心的重要性を評価する語 |
| fr | `à l'avant-garde` | 7 | **文脈次第** | 前衛芸術という様式名にもなり得る |
| es | `lideró` | 7 | **文脈次第** | 団体の指揮にも芸術界の首位評価にもなる |
| de | `an der Spitze` | 7 | **文脈次第** | 役職上の事実にも第一線という評価にもなる |
| ja | `先達` | 6 | **常に序列** | 分野の先駆者として高く位置づける語 |
| ko | `대가` | 6 | **文脈次第** | 「大家」の評価と助詞連結の誤検出が混在 |
| fr | `pionnier` | 5 | **文脈次第** | 事実として最初の人物にも使われる |
| fr | `figure centrale` | 5 | **常に序列** | 分野の中心人物という評価である |
| es | `pionero` | 5 | **常に序列** | 分野の先駆者という最初性の評価 |
| es | `figura central` | 5 | **常に序列** | 分野の中心人物という評価 |
| ja | `中心人物` | 4 | **常に序列** | 分野の中心という序列を示す評価表現 |
| ja | `先駆` | 4 | **文脈次第** | 先行性の評価にも年代上の事実にもなる |
| en | `central figure` | 4 | **常に序列** | 分野の中心人物という評価を示す |
| zh_cn | `主导` | 4 | **文脈次第** | 中心的評価にも組織運営の事実にもなる |
| zh_tw | `主導` | 4 | **文脈次第** | 主導的人物の評価と組織運営の事実がある |
| fr | `guida` | 4 | **文脈次第** | 教育や実践を導いた事実にも使う |
| es | `representativo` | 4 | **常に序列** | 時代や分野を代表する作家という評価 |
| es | `a la vanguardia` | 4 | **文脈次第** | 最先端評価にも前衛芸術の事実にもなる |
| de | `Wegbereiter` | 4 | **常に序列** | 分野を切り開いた先駆者と評価する表現 |
| ja | `先駆者` | 3 | **文脈次第** | 称揚表現にも実際の先行者にも使われる |
| ja | `を主導` | 3 | **文脈次第** | 中心性の評価と運営上の事実がありうる |
| ja | `牽引` | 3 | **常に序列** | 分野を率いた中心的功績を称える表現 |
| ja | `大家` | 3 | **常に序列** | 卓越した権威として位置づける称号 |
| ja | `第一線` | 3 | **常に序列** | 最前線で活躍する上位性を示す表現 |
| en | `pioneer` | 3 | **常に序列** | 分野の先駆者という優先評価を示す |
| en | `forefront` | 3 | **常に序列** | 分野の最前線にいるとの評価を示す |
| fr | `représentatif` | 3 | **常に序列** | 時代を代表する作家という評価である |
| es | `encabezó` | 3 | **文脈次第** | 「encabezó un movimiento de renacimiento del yamato-e」＝運動を主導した。序列の用法が実在する |
| es | `guió` | 3 | **文脈次第** | 具体的指導にも分野を導いた評価にもなる |
| es | `sentó las bases` | 3 | **常に序列** | 分野の基礎を築いた先駆性の評価 |
| de | `maßgeblich` | 3 | **常に序列** | 貢献が決定的に重要だったと評価する表現 |
| ja | `重鎮` | 2 | **常に序列** | 分野で重きをなす権威者という評価 |
| ja | `名家` | 2 | **常に序列** | 家系や窯を高く位置づける評価表現 |
| ja | `導き` | 2 | **常に事実** | 指導や設計上の過程を述べる用例のみ |
| ja | `基礎を築` | 2 | **文脈次第** | 功績評価にも制度整備の事実にもなる |
| en | `foremost` | 2 | **文脈次第** | 現在の2件は「foremost among them＝なかでも」で据え置き。ただし「foremost figure」なら序列 |
| en | `representative of` | 2 | **常に序列** | 時代や分野を代表する作家との評価である |
| zh_cn | `中心人物` | 2 | **常に序列** | 分野の中心的存在と位置づける |
| zh_cn | `重镇` | 2 | **常に序列** | 分野で重きをなす権威者と評価する |
| zh_cn | `引导` | 2 | **常に事実** | 後進の指導や視線誘導を述べている |
| zh_tw | `中心人物` | 2 | **常に序列** | 分野の中心に位置するという評価を示す |
| zh_tw | `重鎮` | 2 | **常に序列** | 分野で特に重要な人物という評価を示す |
| zh_tw | `引導` | 2 | **常に事実** | 後進の指導や視線誘導という事実を表す |
| ko | `주도` | 2 | **常に序列** | 分野を主導した中心性の評価 |
| ko | `길을 열` | 2 | **常に序列** | 後進への道を開いた先駆性の評価 |
| fr | `figure de proue` | 2 | **常に序列** | 分野の先頭に立つ人物という評価である |
| ja | `第一人者` | 1 | **常に序列** | 分野で最上位の人物と位置づける語 |
| ja | `中心となった` | 1 | **文脈次第** | 「一陽会の結成に加わり中心となった」＝結成時の役割の事実だが、中心性の評価にもなり得る。1件ずつ判断する |
| ja | `先駆的` | 1 | **文脈次第** | 先行性の評価と年代的事実を区別すべき |
| ja | `主導し` | 1 | **文脈次第** | 評価にも教育や運営の実績にもなりうる |
| ja | `旗手` | 1 | **常に序列** | 運動を代表し先導する人物という評価 |
| ja | `正統` | 1 | **常に事実** | 団体の固有名称の一部としての用例 |
| ja | `中心的存在` | 1 | **常に序列** | 分野の中心に位置づける評価表現 |
| en | `pioneering` | 1 | **常に序列** | 先駆的な人物という優先評価を示す |
| en | `guided the` | 1 | **常に序列** | 「guided the postwar calligraphy world」＝戦後の書道界を導いた。ja『導いた』はB判定であり扱いを揃える |
| en | `laid the foundation` | 1 | **常に序列** | ja『基礎を築』はB判定であり扱いを揃える |
| en | `father of` | 1 | **常に序列** | 分野の始祖と位置づける評価的呼称である |
| zh_cn | `领袖` | 1 | **文脈次第** | 権威評価にも団体指導者の事実にもなる |
| zh_cn | `第一人` | 1 | **文脈次第** | 最高評価にも事実上の最初にもなり得る |
| zh_tw | `領袖` | 1 | **常に事実** | 書道団体で担った役割を述べている |
| zh_tw | `第一人` | 1 | **常に序列** | その分野で第一とする明確な順位評価である |
| ko | `대표적` | 1 | **常に序列** | 代表的存在という中心性の評価 |
| ko | `선구적` | 1 | **常に序列** | 先駆的という最初性の評価 |
| ko | `일인자` | 1 | **常に序列** | 第一人者という明確な首位評価 |
| ko | `핵심 인물` | 1 | **常に序列** | 中心人物という重要度の序列評価 |
| fr | `pionnière` | 1 | **文脈次第** | 事実上の先駆者を示す場合もある |
| fr | `posa les bases` | 1 | **文脈次第** | 基盤整備という具体的事実にも使える |
| fr | `père de` | 1 | **常に序列** | 分野の始祖と位置づける評価である |
| es | `padre de` | 1 | **常に序列** | 分野の創始者という最初性の評価 |
| de | `zentrale Figur` | 1 | **常に序列** | 集団や分野の中心人物と評価する表現 |
| de | `Vater der` | 1 | **常に序列** | 分野の創始者・祖として特別視する表現 |

## ② Codexの追加語：ライブに出現する語（70語）＝判定が結果を左右するもの

| 言語 | 語 | 出現 | 最終判定 | 理由 |
|---|---|---|---|---|
| es | `dominó` | 62 | **不採用** | 絵画理論を深く修めた事実 |
| fr | `maître` | 55 | **不採用** | 「狩野派最後の師」という職名 |
| es | `representó` | 46 | **不採用** | 歴史を描いたという制作内容 |
| es | `representa` | 44 | **不採用** | 水滴の生涯を表すという内容 |
| fr | `le premier` | 28 | **不採用** | 文化勲章の順位を示す事実 |
| de | `Meister` | 26 | **不採用** | 親方・師匠という職名 |
| fr | `la première` | 20 | **不採用** | 時期や順序を示す事実 |
| es | `abrió camino` | 14 | **文脈次第** | 「se abrió camino gracias a su destreza」＝世に出た、という事実の用法が実在する |
| en | `pioneered` | 10 | **採用** | 新分野を先駆けたという評価を表す |
| en | `championed` | 9 | **採用** | 芸術運動を牽引したという評価を表す |
| en | `central figures` | 8 | **採用** | 中心人物として位置づける評価を表す |
| fr | `figures centrales` | 8 | **採用** | 日本画を支えた中心人物との評価 |
| es | `figuras centrales` | 8 | **採用** | 日本画を支えた中心人物という評価 |
| en | `pioneers` | 6 | **採用** | 先駆者として位置づける評価を表す |
| fr | `de premier plan` | 6 | **採用** | 第一人者になったとの明示的評価 |
| ko | `중심 인물` | 5 | **採用** | 作家を近代日本画の中心的人物と評価している |
| fr | `pionniers` | 5 | **採用** | 抽象彫刻の先駆者との明示的評価 |
| fr | `les premiers` | 5 | **不採用** | 最初期の任命という事実 |
| es | `pioneros` | 5 | **採用** | 戦後抽象彫刻の先駆者という評価 |
| es | `impulsó` | 5 | **採用** | 近代日本画の刷新を牽引したとの評価 |
| es | `dominaba` | 5 | **不採用** | 三つの書体を習得していた事実 |
| fr | `maîtres` | 4 | **文脈次第** | 「anciennes lames de maîtres」＝古名刀の意味が実在する |
| fr | `pionnières` | 4 | **文脈次第** | 「des années pionnières」＝黎明期という時期の記述がある |
| fr | `fondateur` | 4 | **不採用** | 創設者という役割・事実 |
| fr | `les premières` | 4 | **不採用** | 初期作品という年代上の事実 |
| es | `fundador` | 4 | **不採用** | 創設者を示す事実的な肩書き |
| es | `promovió` | 4 | **採用** | 近代詩文書を推進したとの評価 |
| es | `transformó` | 4 | **不採用** | 自然を抽象表現に変えた制作内容 |
| es | `encarnó` | 4 | **不採用** | 「体現した」。ja側に対応する序列語が無く、esだけ外すと8言語で内容が食い違う |
| es | `representaba` | 4 | **不採用** | 物語や歴史人物を描いた制作内容 |
| fr | `dirige` | 3 | **不採用** | 事務所を運営したという業務動詞 |
| es | `figuras destacadas` | 3 | **採用** | 書道界の傑出した人物という評価 |
| de | `Meisterin` | 3 | **不採用** | 切金職人という職名 |
| en | `old master` | 2 | **不採用** | 「old master blades」＝古名刀。作家の序列ではない |
| en | `Old Master` | 2 | **不採用** | 同上（大文字表記） |
| en | `championing` | 2 | **採用** | 芸術表現を牽引したという評価を表す |
| fr | `figures majeures` | 2 | **採用** | 具象彫刻の主要人物との評価 |
| fr | `figures de proue` | 2 | **採用** | 仮名書道界の第一人者との評価 |
| es | `pioneras` | 2 | **採用** | 女性人形作家の先駆者という評価 |
| es | `fundadores` | 2 | **文脈次第** | 「具体美術協会の創立会員」＝事実／「近代竹工芸の創始者の一人」＝評価。両方ある |
| es | `dirigiendo` | 2 | **不採用** | 研究会を率いた通常の活動事実 |
| es | `inició` | 2 | **不採用** | 彫刻を学び始めたという事実 |
| de | `Leitfigur` | 2 | **採用** | 現代仮名書道の中心人物という評価 |
| de | `Leitfigur der` | 2 | **重複** | `Leitfigur` に包含される。検出は `Leitfigur` だけでよい |
| ko | `길을 연` | 1 | **採用** | 新表現への道を開いた先駆性を評価している |
| fr | `figures emblématiques` | 1 | **採用** | 後期具体の象徴的人物との評価 |
| fr | `artiste emblématique` | 1 | **採用** | もの派を象徴する作家との評価 |
| fr | `fondatrice` | 1 | **不採用** | 創設時の会長という役職 |
| fr | `fondateurs` | 1 | **不採用** | 団体の創設メンバーという事実 |
| fr | `fondatrices` | 1 | **不採用** | 組織創設に関する役割・事実 |
| fr | `anima` | 1 | **不採用** | 団体を主導したという活動事実 |
| fr | `conduit` | 1 | **不採用** | 視線の動きを述べる通常の動詞 |
| fr | `conduisit` | 1 | **採用** | 友禅を頂点へ導いたとの評価 |
| fr | `a ouvert la voie` | 1 | **採用** | 研究分野を切り開いたとの評価 |
| es | `precursoras` | 1 | **採用** | 女性書家の先駆者という評価 |
| es | `fundadora` | 1 | **不採用** | 創設時の会長という事実的肩書き |
| es | `impulsores de` | 1 | **採用** | 初期前衛写真の推進者という評価 |
| es | `liderando` | 1 | **文脈次第** | 「率いた」。組織の運営という事実の用法があり得る |
| es | `dirigía` | 1 | **不採用** | 対象へ視線を向けたという描写 |
| es | `impulsando` | 1 | **不採用** | 語だけでは評価か動作か決まらない |
| es | `transformando` | 1 | **不採用** | 変化の過程を表す通常の動作 |
| es | `consagrado` | 1 | **不採用** | 山岳風景に専念したという事実 |
| es | `consagrada` | 1 | **不採用** | 回顧展が作家に捧げられた事実 |
| es | `las mejores` | 1 | **不採用** | 「en las mejores condiciones posibles」＝撮影条件の話。作家の序列ではない |
| es | `culminación de` | 1 | **不採用** | 「la culminación de su arte」＝本人の画業の到達点。他者との序列ではない |
| de | `zentralen Figur` | 1 | **採用** | 関西デザイン界の中心人物という評価 |
| de | `Begründer` | 1 | **不採用** | 用例から評価表現と確認できない |
| de | `zählt zu den führenden` | 1 | **採用** | 主要人物の一人とする評価 |
| ja | `パイオニア` | 1 | **採用** | 先駆者として他より先んじた評価を表す |
| ja | `土台を築いた` | 1 | **採用** | 分野の基礎を築いた功績への評価を表す |

## ③ Codexの追加語：ライブに出現0件の語（618語）

★これらは**採用しても不採用にしても、現在の残存件数は1件も変わらない**（ライブの本文に1件も出てこないため）。
将来、本文を書き換えたときに拾えるよう、採用と判定したものは検出リストに入れてある。

| 言語 | 語 | 判定 | 理由 |
|---|---|---|---|
| de | `Altmeister` | 採用 | 熟達した大家という評価を表す |
| de | `Altmeister der` | 採用 | 特定分野の大家という評価を表す |
| de | `Altmeisterin` | 採用 | 熟達した女性大家という評価を表す |
| de | `Altmeisterin der` | 採用 | 特定分野の女性大家という評価を表す |
| de | `Ausnahmekünstler` | 採用 | 並外れた特別な作家と位置づける評価 |
| de | `Ausnahmekünstlerin` | 採用 | 並外れた特別な女性作家と位置づける評価 |
| de | `Ausnahmekünstlern` | 採用 | 並外れた作家群と位置づける評価 |
| de | `bedeutende Vertreterin` | 採用 | 重要な女性代表者と位置づける評価 |
| de | `bedeutenden Vertreter` | 採用 | 重要な代表者と位置づける評価 |
| de | `bedeutender Vertreter` | 採用 | 重要な代表者と位置づける評価 |
| de | `beeinflusste Generationen von Künstlern` | 採用 | 複数世代への広範な影響を称える評価 |
| de | `Begründerin` | 不採用 | 創設者という事実上の役割 |
| de | `begründete die Bewegung` | 不採用 | 運動を創始したという事実の記述 |
| de | `begründete eine neue Tradition` | 不採用 | 新たな伝統を築いた事実にも使える |
| de | `beherrschte die Kunstszene` | 採用 | 美術界の中心的地位を示す評価 |
| de | `der bedeutendste Künstler` | 採用 | 最も重要な作家とする最上級の評価 |
| de | `der wichtigste Vertreter` | 採用 | 最重要の代表者とする最上級の評価 |
| de | `die bedeutendste Künstlerin` | 採用 | 最も重要な女性作家とする最上級の評価 |
| de | `die Entwicklung vorantrieb` | 採用 | 発展を牽引した功績を示す評価 |
| de | `die von ihm angeführte` | 不採用 | 率いた対象を修飾する事実表現 |
| de | `die von ihr angeführte` | 不採用 | 率いた対象を修飾する事実表現 |
| de | `die wichtigste Vertreterin` | 採用 | 最重要の女性代表者とする最上級の評価 |
| de | `dominierte die Kunstszene` | 採用 | 美術界を主導した地位への評価 |
| de | `dominierte die Malerei seiner Zeit` | 採用 | 同時代の絵画を主導したとの評価 |
| de | `Doyen` | 採用 | 分野の長老的第一人者を表す |
| de | `Doyen der` | 採用 | 特定分野の長老的第一人者を表す |
| de | `Doyenne` | 採用 | 女性の長老的第一人者を表す |
| de | `Doyenne der` | 採用 | 特定分野の女性第一人者を表す |
| de | `eine der bedeutendsten Künstlerinnen` | 採用 | 最も重要な女性作家の一人とする比較評価 |
| de | `eine der bedeutendsten Vertreterinnen` | 採用 | 最も重要な女性代表者の一人とする比較評価 |
| de | `eine der einflussreichsten Künstlerinnen` | 採用 | 最も影響力ある女性作家の一人とする比較評価 |
| de | `eine der wichtigsten Künstlerinnen` | 採用 | 最重要級の女性作家の一人とする比較評価 |
| de | `eine der wichtigsten Vertreterinnen` | 採用 | 最重要級の女性代表者の一人とする比較評価 |
| de | `einer der bedeutendsten Künstler` | 採用 | 最も重要な作家の一人とする比較評価 |
| de | `einer der bedeutendsten Vertreter` | 採用 | 最も重要な代表者の一人とする比較評価 |
| de | `einer der einflussreichsten Künstler` | 採用 | 最も影響力ある作家の一人とする比較評価 |
| de | `einer der wichtigsten Künstler` | 採用 | 最重要級の作家の一人とする比較評価 |
| de | `einer der wichtigsten Vertreter` | 採用 | 最重要級の代表者の一人とする比較評価 |
| de | `erneuerte die Malerei` | 採用 | 絵画を刷新した先駆性への評価 |
| de | `führende Künstler` | 採用 | 先導的な作家たちと位置づける評価 |
| de | `führende Künstlerin` | 採用 | 先導的な女性作家と位置づける評価 |
| de | `führende Vertreter` | 採用 | 中心的な代表者たちと位置づける評価 |
| de | `führende Vertreterin` | 採用 | 中心的な女性代表者と位置づける評価 |
| de | `führenden Künstlern` | 採用 | 先導的な作家たちと位置づける評価 |
| de | `führenden Vertretern` | 採用 | 中心的な代表者たちと位置づける評価 |
| de | `führender Künstler` | 採用 | 先導的な作家と位置づける評価 |
| de | `führender Vertreter` | 採用 | 中心的な代表者と位置づける評価 |
| de | `führte die Bewegung an` | 採用 | 運動を牽引した中心人物との評価 |
| de | `führte die Gruppe an` | 不採用 | 集団を率いたという業務上の事実 |
| de | `gab entscheidende Impulse` | 採用 | 決定的な影響を与えたとの評価 |
| de | `gab wichtige Impulse` | 採用 | 重要な影響を与えたとの評価 |
| de | `gehört zu den bedeutendsten` | 採用 | 最重要級に位置づける評価 |
| de | `gehört zu den führenden` | 採用 | 指導的な上位群に位置づける評価 |
| de | `gehört zur ersten Reihe` | 採用 | 第一線に属するとする序列評価 |
| de | `gehörte zu den bedeutendsten` | 採用 | 最重要級に位置づける評価 |
| de | `gehörte zu den führenden` | 採用 | 指導的な上位群に位置づける評価 |
| de | `gehörte zur ersten Reihe` | 採用 | 第一線に属するとする序列評価 |
| de | `große Meisterin` | 採用 | 偉大な巨匠とする明確な序列評価 |
| de | `großen Meister` | 採用 | 偉大な巨匠とする明確な序列評価 |
| de | `großer Meister` | 採用 | 偉大な巨匠とする明確な序列評価 |
| de | `Großmeister` | 採用 | 最高位級の巨匠と位置づける評価 |
| de | `Großmeister der` | 採用 | 分野を代表する巨匠と位置づける評価 |
| de | `Großmeisterin` | 採用 | 最高位級の巨匠と位置づける評価 |
| de | `Großmeisterin der` | 採用 | 分野を代表する巨匠と位置づける評価 |
| de | `Gründermutter` | 採用 | 分野の母として特別視する表現 |
| de | `Gründervater` | 採用 | 分野の父として特別視する表現 |
| de | `hat angeführt` | 不採用 | 何を率いたかで評価性が変わる |
| de | `hat den Umbruch eingeleitet` | 採用 | 変革を先導した先駆性への評価 |
| de | `hat den Weg geebnet` | 採用 | 後進への道を開いた先駆者との評価 |
| de | `hat eine ganze Generation geprägt` | 採用 | 一世代全体を形作ったという強い評価 |
| de | `hat eine neue Tradition begründet` | 不採用 | 新たな伝統を築いた事実にも使える |
| de | `hat entscheidende Impulse gegeben` | 採用 | 決定的な影響を与えたとの評価 |
| de | `hat Kunstgeschichte geschrieben` | 採用 | 美術史に残る重要性への評価 |
| de | `hat Maßstäbe gesetzt` | 採用 | 他者の基準となる業績を示す評価 |
| de | `hat Pionierarbeit geleistet` | 採用 | 先駆的な功績を示す評価 |
| de | `hat revolutioniert` | 採用 | 根本的変革を成し遂げたとの評価 |
| de | `hat vorangetrieben` | 採用 | 物事を前進させた功績を示す評価 |
| de | `Hauptprotagonist` | 採用 | 最も中心的な担い手を表す |
| de | `Hauptprotagonistin` | 採用 | 最も中心的な女性の担い手を表す |
| de | `Hauptvertreter` | 採用 | 主要な代表者と位置づける評価 |
| de | `Hauptvertreter des` | 採用 | ある分野の主要な代表者と位置づける評価 |
| de | `Hauptvertreterin` | 採用 | 主要な女性代表者と位置づける評価 |
| de | `Hauptvertreterin der` | 採用 | ある分野の主要な女性代表者とする評価 |
| de | `herausragende Vertreterin` | 採用 | 傑出した女性代表者と位置づける評価 |
| de | `herausragenden Vertreter` | 採用 | 傑出した代表者と位置づける評価 |
| de | `herausragender Vertreter` | 採用 | 傑出した代表者と位置づける評価 |
| de | `Ikone der Kunst` | 採用 | 芸術の象徴という評価を表す |
| de | `Ikone der Moderne` | 採用 | 近代の象徴という評価を表す |
| de | `in der ersten Reihe der` | 採用 | 第一級に位置づける明示的評価 |
| de | `initiierte den Umbruch` | 採用 | 変革を始動した先駆性への評価 |
| de | `international renommierte Künstler` | 採用 | 国際的に名高い作家たちとする評価 |
| de | `international renommierte Künstlerin` | 採用 | 国際的に名高い女性作家とする評価 |
| de | `international renommierter Künstler` | 採用 | 国際的に名高い作家とする評価 |
| de | `ist federführend` | 不採用 | 主導担当であるという業務上の事実 |
| de | `Kunstikone` | 採用 | 芸術界の象徴という評価を表す |
| de | `Künstlerikone` | 採用 | 象徴的な重要作家とする評価 |
| de | `leistet Pionierarbeit` | 採用 | 先駆的な仕事を行うとの評価 |
| de | `leistete Pionierarbeit` | 採用 | 先駆的な功績を示す評価 |
| de | `Leitfigur des` | 採用 | 分野を牽引する中心人物を表す |
| de | `maßstabsetzend` | 採用 | 基準を打ち立てる存在との評価 |
| de | `Mitbegründer` | 不採用 | 共同創設者という事実上の役割 |
| de | `Mitbegründerin` | 不採用 | 共同創設者という事実上の役割 |
| de | `Mutter der` | 不採用 | 母または始祖かは文脈で変わる |
| de | `nahm eine führende Rolle ein` | 採用 | 中心的な地位にあったとの評価 |
| de | `nahm eine Schlüsselrolle ein` | 採用 | 重要な中心的役割を示す評価 |
| de | `Pionierin` | 採用 | 女性の先駆者という評価を表す |
| de | `Pionierin der` | 採用 | 特定分野の女性先駆者を表す |
| de | `prägte eine ganze Generation` | 採用 | 一世代全体を形作ったという強い評価 |
| de | `Protagonist` | 採用 | 中心的な担い手という評価を表す |
| de | `Protagonistin` | 採用 | 女性の中心的な担い手を表す |
| de | `renommierteste Künstlerin` | 採用 | 最も名高い女性作家とする最上級の評価 |
| de | `renommiertesten Künstler` | 採用 | 最も名高い作家とする最上級の評価 |
| de | `renommiertester Künstler` | 採用 | 最も名高い作家とする最上級の評価 |
| de | `revolutioniert die Kunst` | 採用 | 芸術を根本から変える存在との評価 |
| de | `revolutionierte` | 採用 | 根本的変革を成し遂げたとの評価 |
| de | `revolutionierte die Malerei` | 採用 | 絵画を根本から変えたとの評価 |
| de | `schrieb Geschichte` | 採用 | 歴史に残る重要性への評価 |
| de | `schrieb Kunstgeschichte` | 採用 | 美術史に残る重要性への評価 |
| de | `setzt Maßstäbe` | 採用 | 他者の基準となる存在との評価 |
| de | `setzte Maßstäbe` | 採用 | 他者の基準となる業績を示す評価 |
| de | `spielt eine führende Rolle` | 採用 | 中心的な役割を担うとの評価 |
| de | `spielt eine Schlüsselrolle` | 採用 | 不可欠な中心人物であるとの評価 |
| de | `spielte eine führende Rolle` | 採用 | 中心的な役割を担ったとの評価 |
| de | `spielte eine Schlüsselrolle` | 採用 | 不可欠な中心人物だったとの評価 |
| de | `stand wie kaum ein anderer für` | 採用 | 他にほぼ例がない代表性を示す評価 |
| de | `steht wie kaum ein anderer für` | 採用 | 他者に比肩しない代表性を示す評価 |
| de | `steht wie kaum eine andere für` | 採用 | 他にほぼ例がない代表性を示す評価 |
| de | `treibt voran` | 採用 | 物事を前進させる存在との評価 |
| de | `trieb voran` | 採用 | 発展を牽引したことを示す評価 |
| de | `unter ihrer Federführung` | 不採用 | 彼女の指揮下だったという事実表現 |
| de | `unter seiner Federführung` | 不採用 | 彼の指揮下だったという事実表現 |
| de | `verkörpert wie kaum ein anderer` | 採用 | 他者をしのぐ代表性を示す評価 |
| de | `verkörpert wie kaum eine andere` | 採用 | 他者をしのぐ代表性を示す評価 |
| de | `verkörperte wie kaum ein anderer` | 採用 | 他者をしのぐ代表性を示す評価 |
| de | `Vorreiterin` | 採用 | 先頭に立った女性先駆者を表す |
| de | `Vorreiterin der` | 採用 | 特定分野の女性先駆者を表す |
| de | `war federführend` | 不採用 | 主導担当だったという業務上の事実 |
| de | `Weg für die moderne Kunst geebnet` | 採用 | 現代美術への道を開いたとの評価 |
| de | `Wegbereiterin` | 採用 | 道を開いた女性先駆者を表す |
| de | `Wegbereiterin der` | 採用 | 特定分野を開拓した女性を表す |
| de | `zählt zu den bedeutendsten` | 採用 | 最重要級に位置づける評価 |
| de | `zählte zu den bedeutendsten` | 採用 | 最重要級に位置づける評価 |
| de | `zählte zu den führenden` | 採用 | 指導的な上位群に位置づける評価 |
| de | `zentrale Persönlichkeit` | 採用 | 中心人物と位置づける評価 |
| de | `zentralen Persönlichkeit` | 採用 | 中心人物と位置づける評価 |
| en | `among the greatest` | 採用 | 最も偉大な作家群に属するという評価 |
| en | `among the most important` | 採用 | 最も重要な作家群に属するという評価 |
| en | `among the most influential` | 採用 | 最も影響力ある作家群に属するという評価 |
| en | `artistic giant` | 採用 | 芸術界の巨人という高い評価を表す |
| en | `artistic giants` | 採用 | 芸術界の巨人という高い評価を表す |
| en | `canonical artist` | 採用 | 規範的な作家として位置づける表現 |
| en | `canonical artists` | 採用 | 規範的な作家として位置づける表現 |
| en | `canonical figure` | 採用 | 規範的人物として位置づける表現 |
| en | `canonical figures` | 採用 | 規範的人物として位置づける表現 |
| en | `celebrated artist` | 採用 | 高く称賛された作家と評価する表現 |
| en | `celebrated artists` | 採用 | 高く称賛された作家と評価する表現 |
| en | `celebrated painter` | 採用 | 高く称賛された画家と評価する表現 |
| en | `celebrated painters` | 採用 | 高く称賛された画家と評価する表現 |
| en | `defined a generation` | 採用 | 一世代を象徴し方向づけたという評価 |
| en | `defines a generation` | 採用 | 一世代を象徴し方向づけるという評価 |
| en | `defining a generation` | 採用 | 一世代を象徴し方向づけるという評価 |
| en | `defining figure` | 採用 | 時代を代表する人物という評価 |
| en | `defining figures` | 採用 | 時代を代表する人物たちという評価 |
| en | `defining voice` | 採用 | 時代を代表する表現者という評価 |
| en | `defining voices` | 採用 | 時代を代表する表現者たちという評価 |
| en | `dominant figure` | 採用 | 支配的な中心人物という評価を表す |
| en | `dominant figures` | 採用 | 支配的な中心人物という評価を表す |
| en | `driving forces` | 採用 | 発展を牽引する中心的存在との評価を表す |
| en | `giant of` | 採用 | 分野の巨人という高い評価を表す |
| en | `giants of` | 採用 | 分野の巨人という高い評価を表す |
| en | `grand master` | 採用 | 最高位級の巨匠という評価を表す |
| en | `grand masters` | 採用 | 最高位級の巨匠という評価を表す |
| en | `greatest artist` | 採用 | 他の作家より最も偉大だと評価する表現 |
| en | `greatest artists` | 採用 | 他の作家より最も偉大だと評価する表現 |
| en | `guiding force` | 採用 | 中心的に導いた人物という評価 |
| en | `guiding forces` | 採用 | 中心的に導いた人々という評価 |
| en | `help shape` | 採用 | 形成に重要な役割を果たすという評価 |
| en | `helped shape` | 採用 | 形成に重要な役割を果たしたという評価 |
| en | `helping shape` | 採用 | 形成に重要な役割を果たすという評価 |
| en | `helps shape` | 採用 | 形成に重要な役割を果たすという評価 |
| en | `instrumental in` | 採用 | 実現に不可欠だったという評価 |
| en | `key figures` | 採用 | 中心的な重要人物という評価を表す |
| en | `lead the movement` | 採用 | 運動を牽引する中心人物との評価を表す |
| en | `lead the way` | 採用 | 先駆けて道を示すという評価を表す |
| en | `leads the movement` | 採用 | 運動を牽引する中心人物との評価を表す |
| en | `leads the way` | 採用 | 先駆けて道を示すという評価を表す |
| en | `legendary artist` | 採用 | 伝説的な作家だと称揚する表現 |
| en | `legendary artists` | 採用 | 伝説的な作家だと称揚する表現 |
| en | `legendary painter` | 採用 | 伝説的な画家だと称揚する表現 |
| en | `legendary painters` | 採用 | 伝説的な画家だと称揚する表現 |
| en | `luminaries` | 採用 | 傑出した著名人という評価を表す |
| en | `major artist` | 採用 | 重要で主要な作家という評価を表す |
| en | `major artists` | 採用 | 重要で主要な作家という評価を表す |
| en | `major figures` | 採用 | 主要人物という評価を表す |
| en | `master painter` | 採用 | 卓越した画家という評価を表す |
| en | `master painters` | 採用 | 卓越した画家という評価を表す |
| en | `modern master` | 採用 | 近現代の巨匠という評価を表す |
| en | `modern masters` | 採用 | 近現代の巨匠という評価を表す |
| en | `old masters` | 採用 | 歴史的な巨匠という評価を含む |
| en | `Old Masters` | 採用 | 歴史的な巨匠という評価を含む |
| en | `one of the greatest` | 採用 | 最も偉大な作家の一人という評価 |
| en | `one of the most important` | 採用 | 最も重要な作家の一人という評価 |
| en | `one of the most influential` | 採用 | 最も影響力ある作家の一人という評価 |
| en | `one of the most significant` | 採用 | 最も意義深い作家の一人という評価 |
| en | `peerless` | 採用 | 比肩する者がいないと評価する表現 |
| en | `pivotal figure` | 採用 | 中心的役割を担う人物という評価を表す |
| en | `pivotal figures` | 採用 | 中心的役割を担う人物という評価を表す |
| en | `pre-eminent artist` | 採用 | 他より卓越した作家という評価を表す |
| en | `pre-eminent artists` | 採用 | 他より卓越した作家という評価を表す |
| en | `premier artist` | 採用 | 第一級の作家という評価を表す |
| en | `premier artists` | 採用 | 第一級の作家という評価を表す |
| en | `redefine` | 採用 | 従来の定義を刷新するという評価 |
| en | `redefined` | 採用 | 従来の定義を刷新したという評価 |
| en | `redefines` | 採用 | 従来の定義を刷新するという評価 |
| en | `redefining` | 採用 | 従来の定義を刷新しているという評価 |
| en | `renowned artist` | 採用 | 高名な作家だと評価する表現 |
| en | `renowned artists` | 採用 | 高名な作家だと評価する表現 |
| en | `renowned painter` | 採用 | 高名な画家だと評価する表現 |
| en | `renowned painters` | 採用 | 高名な画家だと評価する表現 |
| en | `revolutionise` | 採用 | 分野を革命的に変えるという評価 |
| en | `revolutionised` | 採用 | 分野を革命的に変えたという評価 |
| en | `revolutionises` | 採用 | 分野を革命的に変えるという評価 |
| en | `revolutionising` | 採用 | 分野を革命的に変えているという評価 |
| en | `revolutionize` | 採用 | 分野を革命的に変えるという評価 |
| en | `revolutionized` | 採用 | 分野を革命的に変えたという評価 |
| en | `revolutionizes` | 採用 | 分野を革命的に変えるという評価 |
| en | `revolutionizing` | 採用 | 分野を革命的に変えているという評価 |
| en | `seminal artist` | 採用 | 後世への影響が大きい作家と評価する表現 |
| en | `seminal artists` | 採用 | 後世への影響が大きい作家と評価する表現 |
| en | `seminal figure` | 採用 | 後世への影響が大きい人物と評価する表現 |
| en | `seminal figures` | 採用 | 後世への影響が大きい人物と評価する表現 |
| en | `shaped the course of` | 採用 | 歴史の流れを形作ったという評価 |
| en | `shapes the course of` | 採用 | 歴史の流れを形作るという評価 |
| en | `shaping the course of` | 採用 | 歴史の流れを形作るという評価 |
| en | `spearheaded` | 採用 | 先頭に立って牽引したとの評価を表す |
| en | `spearheading` | 採用 | 先頭に立って牽引するとの評価を表す |
| en | `spearheads` | 採用 | 先頭に立って牽引するとの評価を表す |
| en | `take the lead in` | 採用 | 先頭に立ち牽引するという評価を表す |
| en | `takes the lead in` | 採用 | 先頭に立ち牽引するという評価を表す |
| en | `taking the lead in` | 採用 | 先頭に立ち牽引するという評価を表す |
| en | `the first truly` | 採用 | 真に最初だと先駆性を評価する表現 |
| en | `the greatest` | 採用 | 最も偉大であるという最高評価 |
| en | `the most important artist` | 採用 | 最も重要な作家だと序列化する表現 |
| en | `the most important artists` | 採用 | 最も重要な作家だと序列化する表現 |
| en | `the most influential artist` | 採用 | 最も影響力があると序列化する表現 |
| en | `the most influential artists` | 採用 | 最も影響力があると序列化する表現 |
| en | `took the lead in` | 採用 | 先頭に立ち牽引したという評価を表す |
| en | `trailblazer` | 採用 | 先駆者という評価を表す |
| en | `trailblazers` | 採用 | 先駆者という評価を表す |
| en | `trailblazing` | 採用 | 先駆的であるという評価を表す |
| en | `transformed the course of` | 採用 | 歴史の流れを一変させたという評価 |
| en | `transforming the course of` | 採用 | 歴史の流れを一変させるという評価 |
| en | `transforms the course of` | 採用 | 歴史の流れを一変させるという評価 |
| en | `unrivaled` | 採用 | 競う者がいないと評価する表現 |
| en | `unrivalled` | 採用 | 競う者がいないと評価する表現 |
| en | `unsurpassed` | 採用 | 超える者がいないと評価する表現 |
| en | `without peer` | 採用 | 比肩する者がいないと評価する表現 |
| es | `abre camino` | 採用 | 道を切り開く先駆性の評価 |
| es | `abre el camino` | 採用 | 道を切り開く先駆者という評価 |
| es | `artífice de` | 不採用 | 企画者・立役者という役割表現 |
| es | `artífices de` | 不採用 | 企画者・立役者という役割表現 |
| es | `artista de primer orden` | 採用 | 第一級の芸術家という明示的評価 |
| es | `artista de primera línea` | 採用 | 第一線級という明確な序列評価 |
| es | `artistas de primer orden` | 採用 | 第一級の芸術家という明示的評価 |
| es | `artistas de primera línea` | 採用 | 第一線級という明確な序列評価 |
| es | `consagradas` | 採用 | 確立された高い評価を示す |
| es | `consagrados` | 採用 | 確立された高い評価を示す |
| es | `cumbre de` | 採用 | 頂点という明示的な評価表現 |
| es | `da inicio a` | 不採用 | 開始するという事実の記述 |
| es | `dio inicio a` | 不採用 | 開始したという事実の記述 |
| es | `dirige` | 不採用 | 運営や指揮という通常業務を表す |
| es | `domina` | 不採用 | 技法などの習熟を述べる表現 |
| es | `el más importante` | 採用 | 最重要とする明確な最上級評価 |
| es | `el más influyente` | 採用 | 最も影響力があるとする最上級評価 |
| es | `el mayor artista` | 採用 | 最大級の芸術家という評価 |
| es | `el mejor` | 採用 | 最良という明示的な最上級評価 |
| es | `en la vanguardia de` | 採用 | 最前線にいるという先進性評価 |
| es | `encabeza` | 不採用 | 組織の長を務める意味にもなり得る |
| es | `encabezaba` | 不採用 | 組織の長だった事実にもなり得る |
| es | `encabezando` | 不採用 | 先頭で行動中という事実にも使う |
| es | `encarna` | 不採用 | 「体現する」の意で、文脈により評価か決まらない |
| es | `encarnaba` | 不採用 | 「体現していた」の意で、文脈により評価か決まらない |
| es | `figura capital` | 採用 | 極めて重要な人物という評価を表す |
| es | `figura fundamental` | 採用 | 不可欠な中心人物という評価を表す |
| es | `figura señera` | 採用 | 傑出した代表的人物という評価を表す |
| es | `figuras capitales` | 採用 | 極めて重要な人物たちという評価を表す |
| es | `figuras clave` | 採用 | 中心的な重要人物という評価を表す |
| es | `figuras fundamentales` | 採用 | 不可欠な中心人物たちという評価を表す |
| es | `figuras señeras` | 採用 | 傑出した代表的人物たちという評価を表す |
| es | `fundadoras` | 不採用 | 創設者という事実上の役割名 |
| es | `gran maestra` | 採用 | 偉大な巨匠という評価を表す |
| es | `gran maestro` | 採用 | 偉大な巨匠という評価を表す |
| es | `gran renovador` | 採用 | 偉大な革新者という明示的評価 |
| es | `gran renovadora` | 採用 | 偉大な革新者という明示的評価 |
| es | `grandes maestras` | 採用 | 偉大な巨匠たちという評価を表す |
| es | `grandes maestros` | 採用 | 偉大な巨匠たちという評価を表す |
| es | `grandes renovadoras` | 採用 | 偉大な革新者たちという評価 |
| es | `grandes renovadores` | 採用 | 偉大な革新者たちという評価 |
| es | `ha dirigido` | 不採用 | 運営や指揮をした事実を表す |
| es | `ha encabezado` | 不採用 | 先頭に立った対象なしでは評価不能 |
| es | `ha impulsado` | 不採用 | 推進したという事実だけでは評価不能 |
| es | `ha liderado` | 不採用 | 指導したという事実だけでは評価不能 |
| es | `ha promovido` | 不採用 | 促進したという事実だけでは評価不能 |
| es | `había liderado` | 不採用 | 組織などを率いたという業務上の事実 |
| es | `había sentado las bases` | 不採用 | 基礎を築いたという事実にも使える |
| es | `impulsa` | 不採用 | 活動を推進する通常行為を表す |
| es | `impulsaba` | 不採用 | 活動を推進した事実を表す |
| es | `impulsor de` | 採用 | 発展を牽引した中心人物という評価 |
| es | `impulsora de` | 採用 | 発展を牽引した中心人物という評価 |
| es | `impulsoras de` | 採用 | 発展を牽引した中心人物たちという評価 |
| es | `inicia` | 不採用 | 開始するという事実の記述 |
| es | `la más importante` | 採用 | 最重要とする明確な最上級評価 |
| es | `la más influyente` | 採用 | 最も影響力があるとする最上級評価 |
| es | `la mayor artista` | 採用 | 最大級の芸術家という評価 |
| es | `la mejor` | 採用 | 最良という明示的な最上級評価 |
| es | `las más importantes` | 採用 | 最重要群とする明確な序列評価 |
| es | `las más influyentes` | 採用 | 最大の影響力を持つ群とする評価 |
| es | `lidera` | 不採用 | 組織などを率いる通常業務にも使う |
| es | `lideraba` | 不採用 | 組織などを率いた事実にも使う |
| es | `los más importantes` | 採用 | 最重要群とする明確な序列評価 |
| es | `los más influyentes` | 採用 | 最大の影響力を持つ群とする評価 |
| es | `los mejores` | 採用 | 最良という明示的な最上級評価 |
| es | `madre de` | 採用 | 分野の生みの親という先駆性評価 |
| es | `maestra indiscutible` | 採用 | 疑いない巨匠という評価を表す |
| es | `maestras indiscutibles` | 採用 | 疑いない巨匠たちという評価を表す |
| es | `maestro indiscutible` | 採用 | 疑いない巨匠という評価を表す |
| es | `maestros indiscutibles` | 採用 | 疑いない巨匠たちという評価を表す |
| es | `marca el camino` | 採用 | 後進に道を示す先導者という評価 |
| es | `marca la pauta` | 採用 | 先導し基準を定める評価表現 |
| es | `marcó el camino` | 採用 | 先駆者として道を示したとの評価 |
| es | `marcó la pauta` | 採用 | 基準や潮流を定めた中心性の評価 |
| es | `máxima exponente` | 採用 | 最上位の代表的人物という評価を表す |
| es | `máxima representante` | 採用 | 最高の代表者という評価を表す |
| es | `máximas exponentes` | 採用 | 最上位の代表者たちという評価を表す |
| es | `máximas representantes` | 採用 | 最高の代表者たちという評価を表す |
| es | `máximo representante` | 採用 | 最高の代表者という評価を表す |
| es | `máximos exponentes` | 採用 | 最上位の代表者たちという評価を表す |
| es | `máximos representantes` | 採用 | 最高の代表者たちという評価を表す |
| es | `personalidad clave` | 採用 | 中心的な重要人物という評価を表す |
| es | `personalidades clave` | 採用 | 中心的な重要人物たちという評価を表す |
| es | `precursor` | 採用 | 先駆者であるという評価を表す |
| es | `precursora` | 採用 | 先駆者であるという評価を表す |
| es | `precursores` | 採用 | 先駆者たちであるという評価を表す |
| es | `principal exponente` | 採用 | 第一の代表的人物という評価を表す |
| es | `principal impulsor` | 採用 | 最も主要な牽引者という評価 |
| es | `principal impulsora` | 採用 | 最も主要な牽引者という評価 |
| es | `principal representante` | 採用 | 第一の代表者という評価を表す |
| es | `principales exponentes` | 採用 | 主要な代表者たちという評価を表す |
| es | `principales impulsoras` | 採用 | 主要な牽引者たちという評価 |
| es | `principales impulsores` | 採用 | 主要な牽引者たちという評価 |
| es | `principales representantes` | 採用 | 主要な代表者たちという評価を表す |
| es | `promovía` | 不採用 | 推進・奨励を表す通常の動詞 |
| es | `promoviendo` | 不採用 | 促進中という通常行為を表す |
| es | `promueve` | 不採用 | 普及や促進という通常行為を表す |
| es | `punto culminante de` | 採用 | 最高到達点という明示的評価 |
| es | `referentes` | 採用 | 模範となる代表的人物という評価を表す |
| es | `referentes fundamentales` | 採用 | 中心的な模範的人物という評価を表す |
| es | `referentes indiscutibles` | 採用 | 疑いない模範的人物という評価を表す |
| es | `revoluciona` | 採用 | 革新性を明示する評価表現 |
| es | `revolucionando` | 採用 | 革新性を明示する評価表現 |
| es | `revolucionó` | 採用 | 分野を一変させたという強い評価 |
| es | `sienta las bases` | 採用 | 後世の基盤を築く先駆性を示す |
| es | `transforma` | 不採用 | 変化させるという事実の記述 |
| es | `una de las artistas más importantes` | 採用 | 最重要級の作家と位置づける評価 |
| es | `una de las artistas más influyentes` | 採用 | 最も影響力ある作家群に置く評価 |
| es | `una de las figuras más importantes` | 採用 | 最重要人物群に位置づける評価 |
| es | `una de las grandes renovadoras` | 採用 | 偉大な革新者の一人という評価 |
| es | `una de las grandes representantes` | 採用 | 偉大な代表者の一人という評価を表す |
| es | `una de las máximas exponentes` | 採用 | 最上位の代表者の一人という評価を表す |
| es | `una de las mayores artistas` | 採用 | 最大級の芸術家の一人という評価 |
| es | `una de las principales exponentes` | 採用 | 主要な代表者の一人という評価を表す |
| es | `uno de los artistas más importantes` | 採用 | 最重要級の作家と位置づける評価 |
| es | `uno de los artistas más influyentes` | 採用 | 最も影響力ある作家群に置く評価 |
| es | `uno de los grandes renovadores` | 採用 | 偉大な革新者の一人という評価 |
| es | `uno de los grandes representantes` | 採用 | 偉大な代表者の一人という評価を表す |
| es | `uno de los máximos exponentes` | 採用 | 最上位の代表者の一人という評価を表す |
| es | `uno de los mayores artistas` | 採用 | 最大級の芸術家の一人という評価 |
| es | `uno de los nombres más importantes` | 採用 | 最重要人物群に位置づける評価 |
| es | `uno de los principales exponentes` | 採用 | 主要な代表者の一人という評価を表す |
| fr | `a animé` | 不採用 | 活動などを活気づけた通常の動詞 |
| fr | `a conduit` | 不採用 | 組織や活動を率いた通常の業務動詞 |
| fr | `a dirigé` | 不採用 | 組織などを運営した通常の業務動詞 |
| fr | `a dominé` | 不採用 | 支配や習熟など文脈で意味が変わる |
| fr | `a exercé une influence majeure` | 採用 | 重大な影響力を示す評価表現 |
| fr | `a incarné` | 不採用 | 体現した事実で序列を必ずしも示さない |
| fr | `a joué un rôle déterminant` | 採用 | 決定的な役割という書き手の評価 |
| fr | `a joué un rôle majeur` | 採用 | 重要な役割を担ったとする評価 |
| fr | `à l’avant-garde` | 不採用 | 運動や作風の事実を表す場合がある |
| fr | `a mené` | 不採用 | 組織などを率いた通常の業務動詞 |
| fr | `a profondément marqué` | 採用 | 深い影響を与えたという評価表現 |
| fr | `a profondément renouvelé` | 採用 | 根本的に刷新したという評価表現 |
| fr | `a révolutionné` | 採用 | 革命的に変えたという評価表現 |
| fr | `animait` | 不採用 | 活動などを活気づけた通常の動詞 |
| fr | `anime` | 不採用 | 活動などを活気づける通常の動詞 |
| fr | `artiste incontournable` | 採用 | 不可欠な芸術家という高評価 |
| fr | `artiste majeur` | 採用 | 主要芸術家という高評価 |
| fr | `artiste majeure` | 採用 | 主要芸術家という高評価 |
| fr | `artistes emblématiques` | 採用 | 象徴的な重要作家たちという評価 |
| fr | `artistes incontournables` | 採用 | 不可欠な芸術家という高評価 |
| fr | `artistes majeures` | 採用 | 主要芸術家という高評価 |
| fr | `artistes majeurs` | 採用 | 主要芸術家という高評価 |
| fr | `au premier plan` | 採用 | 第一線にあるという高評価 |
| fr | `cheffe de file` | 採用 | 第一人者という指導的地位の明示 |
| fr | `chefs de file` | 採用 | 第一人者という指導的地位の明示 |
| fr | `conduisait` | 不採用 | 組織や活動を率いる通常の業務動詞 |
| fr | `de tout premier plan` | 採用 | 最重要級という明示的高評価 |
| fr | `dirigeait` | 不採用 | 組織などを運営する通常の業務動詞 |
| fr | `domina` | 不採用 | 支配や習熟など文脈で意味が変わる |
| fr | `dominait` | 不採用 | 支配や習熟など文脈で意味が変わる |
| fr | `domine` | 不採用 | 支配や習熟など文脈で意味が変わる |
| fr | `exerça une influence majeure` | 採用 | 重大な影響力を示す評価表現 |
| fr | `exerçait une influence majeure` | 採用 | 重大な影響力を示す評価表現 |
| fr | `exerce une influence majeure` | 採用 | 重大な影響力を示す評価表現 |
| fr | `fers de lance` | 採用 | 先頭を担う人物という中心性の明示 |
| fr | `figure emblématique` | 採用 | 象徴的な重要人物という評価 |
| fr | `figure incontournable` | 採用 | 不可欠な人物という高評価 |
| fr | `figures clés` | 採用 | 中心的な人物という書き手の評価 |
| fr | `figures incontournables` | 採用 | 不可欠な人物という高評価 |
| fr | `grand maître` | 採用 | 偉大な巨匠という序列的評価 |
| fr | `grands maîtres` | 採用 | 偉大な巨匠たちという序列的評価 |
| fr | `incarnait` | 不採用 | 体現した事実で序列を必ずしも示さない |
| fr | `incarne` | 不採用 | 体現する意で序列を必ずしも示さない |
| fr | `incarnent` | 不採用 | 体現する意で序列を必ずしも示さない |
| fr | `initiateur` | 不採用 | 開始した人物を示す事実的役割 |
| fr | `initiateurs` | 不採用 | 開始した人物を示す事実的役割 |
| fr | `initiatrice` | 不採用 | 開始した人物を示す事実的役割 |
| fr | `initiatrices` | 不採用 | 開始した人物を示す事実的役割 |
| fr | `joua un rôle déterminant` | 採用 | 決定的な役割という書き手の評価 |
| fr | `joua un rôle majeur` | 採用 | 重要な役割を担ったとする評価 |
| fr | `jouait un rôle déterminant` | 採用 | 決定的な役割という書き手の評価 |
| fr | `jouait un rôle majeur` | 採用 | 重要な役割を担ったとする評価 |
| fr | `joue un rôle déterminant` | 採用 | 決定的な役割を担うとする評価 |
| fr | `joue un rôle majeur` | 採用 | 重要な役割を担うとする評価 |
| fr | `l'un des plus grands` | 採用 | 最も偉大な作家群に位置づける評価 |
| fr | `l’un des plus grands` | 採用 | 最上位の一人とする明確な序列評価 |
| fr | `l’un des principaux représentants` | 採用 | 主要な代表者群に位置づける評価 |
| fr | `l'une des plus grandes` | 採用 | 最も偉大な作家群に位置づける評価 |
| fr | `l’une des plus grandes` | 採用 | 最も偉大な作家群に位置づける評価 |
| fr | `l'une des principales représentantes` | 採用 | 主要な代表者群に位置づける評価 |
| fr | `la plus grande` | 採用 | 最も偉大だと序列化する評価 |
| fr | `la principale représentante` | 採用 | 最重要の代表者と位置づける評価 |
| fr | `le plus grand` | 採用 | 最も偉大だと序列化する評価 |
| fr | `le principal représentant` | 採用 | 最重要の代表者と位置づける評価 |
| fr | `les plus grandes` | 採用 | 最も偉大な作家群とする評価 |
| fr | `les plus grands` | 採用 | 最も偉大な作家群とする評価 |
| fr | `maître absolu` | 採用 | 絶対的な巨匠という強い序列評価 |
| fr | `maître incontesté` | 採用 | 異論のない巨匠という強い評価 |
| fr | `maîtres absolus` | 採用 | 絶対的な巨匠たちという強い序列評価 |
| fr | `maîtres incontestés` | 採用 | 異論のない巨匠たちという強い評価 |
| fr | `maîtresse absolue` | 採用 | 絶対的な巨匠という強い序列評価 |
| fr | `maîtresse incontestée` | 採用 | 異論のない巨匠という強い評価 |
| fr | `maîtresses absolues` | 採用 | 絶対的な巨匠たちという強い序列評価 |
| fr | `maîtresses incontestées` | 採用 | 異論のない巨匠たちという強い評価 |
| fr | `marqua profondément` | 採用 | 深い影響を与えたという評価表現 |
| fr | `marquait profondément` | 採用 | 深い影響を与えたという評価表現 |
| fr | `marque profondément` | 採用 | 深い影響を与えるという評価表現 |
| fr | `menait` | 不採用 | 組織などを率いる通常の業務動詞 |
| fr | `ouvrait la voie` | 採用 | 先駆者として道を開いたとの評価 |
| fr | `ouvre la voie` | 採用 | 先駆者として道を開くとの評価 |
| fr | `parmi les plus grandes` | 採用 | 最も偉大な者の一群という最高評価 |
| fr | `parmi les plus grands` | 採用 | 最も偉大な者の一群という最高評価 |
| fr | `personnalité majeure` | 採用 | 特に重要な人物という評価 |
| fr | `personnalités majeures` | 採用 | 特に重要な人物たちという評価 |
| fr | `précurseur` | 不採用 | 先駆者である事実を表す場合がある |
| fr | `précurseure` | 不採用 | 先駆者である事実を表す場合がある |
| fr | `précurseures` | 不採用 | 先駆者である事実を表す場合がある |
| fr | `précurseurs` | 不採用 | 先駆者である事実を表す場合がある |
| fr | `renouvela profondément` | 採用 | 根本的に刷新したという評価表現 |
| fr | `renouvelait profondément` | 採用 | 根本的に刷新したという評価表現 |
| fr | `renouvelle profondément` | 採用 | 根本的に刷新するという評価表現 |
| fr | `révolutionna` | 採用 | 革命的に変えたという評価表現 |
| fr | `révolutionnait` | 採用 | 革命的に変えたという評価表現 |
| fr | `révolutionne` | 採用 | 革命的に変えたという評価表現 |
| fr | `s'est imposé comme` | 不採用 | 何として認められたかは文脈次第 |
| fr | `s’est imposé comme` | 不採用 | 何として認められたかは文脈次第 |
| fr | `s’imposa comme` | 不採用 | 何として認められたかは文脈次第 |
| fr | `s'impose comme` | 不採用 | 何として認められるかは文脈次第 |
| fr | `s’impose comme` | 不採用 | 何として認められるかは文脈次第 |
| ja | `〜の代表作家` | 採用 | 分野の代表格と評価する表現 |
| ja | `〜をリードした` | 不採用 | 業務上の指導にも使われ文脈次第 |
| ja | `〜をリードしている` | 不採用 | 業務上の指導にも使われ文脈次第 |
| ja | `〜をリードしてきた` | 不採用 | 業務上の指導にも使われ文脈次第 |
| ja | `〜をリードする` | 不採用 | 業務上の指導にも使われ文脈次第 |
| ja | `〜を先導した` | 不採用 | 事実的な誘導にも使われ文脈次第 |
| ja | `〜を先導して` | 不採用 | 事実的な誘導にも使われ文脈次第 |
| ja | `〜を先導してきた` | 不採用 | 事実的な誘導にも使われ文脈次第 |
| ja | `〜を先導する` | 不採用 | 事実的な誘導にも使われ文脈次第 |
| ja | `〜を代表した` | 採用 | 作家を代表格と評価する表現 |
| ja | `〜を率いてきた` | 不採用 | 組織運営の事実にも使われる動詞 |
| ja | `〜有数の作家` | 採用 | 上位に数えられる作家と評価する表現 |
| ja | `パイオニアである` | 採用 | 先駆的地位を評価する表現 |
| ja | `パイオニアとして` | 採用 | 先駆的地位を評価する表現 |
| ja | `もっとも重要な作家の一人` | 採用 | 重要性を明示的に順位づける表現 |
| ja | `リーダーである` | 不採用 | 役職か評価か文脈次第 |
| ja | `リーダーとして` | 不採用 | 役職か評価か文脈次第 |
| ja | `開拓者である` | 採用 | 分野を切り開いた人物と評価する表現 |
| ja | `開拓者として` | 採用 | 分野を切り開いた人物と評価する表現 |
| ja | `傑出した作家` | 採用 | 他より抜きん出た作家という評価 |
| ja | `傑出した存在` | 採用 | 他より抜きん出た存在という評価 |
| ja | `傑出している` | 採用 | 他より抜きん出ているという評価 |
| ja | `時代を切り開く` | 採用 | 時代の先駆者と評価する表現 |
| ja | `主要人物である` | 採用 | 中心的人物と評価する表現 |
| ja | `主要人物の一人` | 採用 | 中心的人物の一人と評価する表現 |
| ja | `先鞭をつけた` | 採用 | 他に先んじたことを評価する表現 |
| ja | `先鞭をつけて` | 採用 | 他に先んじたことを評価する表現 |
| ja | `先鞭をつける` | 採用 | 他に先んじたことを評価する表現 |
| ja | `創始者である` | 不採用 | 創始した事実を示す呼称 |
| ja | `創始者として` | 不採用 | 創始した事実を示す呼称 |
| ja | `他の追随を許さない` | 採用 | 他より圧倒的に優れるという評価 |
| ja | `他の追随を許さぬ` | 採用 | 他より圧倒的に優れるという評価 |
| ja | `卓越した才能` | 採用 | 才能が他より優れるという評価 |
| ja | `卓越した作家` | 採用 | 他より優れた作家という評価 |
| ja | `卓越している` | 採用 | 他より優れているという評価 |
| ja | `道を切り開いてきた` | 採用 | 新領域の先駆者と評価する表現 |
| ja | `道を切り開く` | 採用 | 新領域の先駆者と評価する表現 |
| ja | `比類のない` | 採用 | 比較対象がないほど優れるという評価 |
| ja | `比類のない作家` | 採用 | 比較対象がないほど優れた作家という評価 |
| ja | `名実ともに` | 不採用 | 何を評価するか語だけでは決まらない |
| ko | `가장 영향력 있는 작가` | 採用 | 最も影響力がある作家という序列評価 |
| ko | `가장 중요한 예술가` | 採用 | 最も重要な芸術家という明確な序列評価 |
| ko | `가장 중요한 작가` | 採用 | 最も重要な作家という明確な序列評価 |
| ko | `당대의 대표 작가` | 採用 | 同時代を代表するという評価 |
| ko | `대표 작가로 손꼽히는` | 採用 | 代表的作家に数えるという評価 |
| ko | `독보적 위치` | 採用 | 比類のない地位にあるという評価 |
| ko | `독보적 작가` | 採用 | 他に並ぶ者がない作家という評価 |
| ko | `독보적인 위치` | 採用 | 比類のない地位にあるという評価 |
| ko | `독보적인 입지` | 採用 | 比類のない地位を築いたという評価 |
| ko | `독보적인 작가` | 採用 | 他に並ぶ者がない作家という評価 |
| ko | `독보적인 작품 세계` | 採用 | 作品世界が比類ないという評価 |
| ko | `독보적인 존재` | 採用 | 他に並ぶ者がない存在という評価 |
| ko | `독자적인 작품 세계를 구축한` | 不採用 | 独自の作品世界を築いたという事実記述 |
| ko | `미술계의 거목` | 採用 | 美術界の巨匠を意味する評価 |
| ko | `미술계의 원로` | 不採用 | 長老という地位の記述にもなり得る |
| ko | `미술계의 중진` | 不採用 | 地位や経歴の記述にもなり得る |
| ko | `새 지평을 열었다` | 採用 | 新境地を開いた先駆性の評価 |
| ko | `새로운 미술의 기수` | 採用 | 新美術を牽引する先駆者の評価 |
| ko | `새로운 지평을 연` | 採用 | 新境地を開いた先駆性の評価 |
| ko | `새로운 지평을 열어 온` | 採用 | 新境地を開き続けた先駆性の評価 |
| ko | `선도하고 있는` | 採用 | 先導しているという評価 |
| ko | `선도해 온` | 採用 | 先導し続けたという評価 |
| ko | `세계적 작가` | 採用 | 世界的水準の作家という評価 |
| ko | `세계적인 작가` | 採用 | 世界的水準の作家という評価 |
| ko | `손꼽히는 작가` | 採用 | 有数の作家に数えるという評価 |
| ko | `앞장서 온` | 採用 | 先頭に立ち続けたという評価 |
| ko | `앞장서고 있는` | 採用 | 先頭に立っているという評価 |
| ko | `영향력이 가장 큰 작가` | 採用 | 影響力が最大の作家という序列評価 |
| ko | `원로 미술가` | 不採用 | 年齢や経歴上の区分にもなり得る |
| ko | `원로 작가` | 不採用 | 年齢や経歴上の区分にもなり得る |
| ko | `전위미술의 기수` | 採用 | 前衛美術を牽引する先駆者の評価 |
| ko | `정상급 예술가` | 採用 | 最上位級の芸術家という評価 |
| ko | `정상급 작가` | 採用 | 最上位級の作家という評価 |
| ko | `주역으로 활동한` | 採用 | 中心的な担い手だったという評価 |
| ko | `주역을 맡은` | 不採用 | 担当した役割の事実にもなり得る |
| ko | `중견 미술가` | 不採用 | 中堅という経歴区分を表す |
| ko | `중견 작가` | 不採用 | 中堅という経歴区分を表す |
| ko | `중심에 서 있다` | 採用 | 中心人物であるという評価 |
| ko | `중심에 선` | 採用 | 中心人物となったという評価 |
| ko | `중심에 섰다` | 採用 | 中心人物となったという評価 |
| ko | `중진 미술가` | 不採用 | 経歴段階を示す呼称にもなり得る |
| ko | `중진 작가` | 不採用 | 経歴段階を示す呼称にもなり得る |
| ko | `중추적 역할을 한` | 採用 | 中枢的役割を果たしたという評価 |
| ko | `중추적 역할을 해 온` | 採用 | 中心的な役割を担ってきたという評価 |
| ko | `중추적인 역할을 했다` | 採用 | 中心的な役割を果たしたという評価 |
| ko | `초석을 놓았다` | 採用 | 礎を築いた先駆者としての評価 |
| ko | `초석을 놓은` | 採用 | 礎を築いた先駆者としての評価 |
| ko | `최고의 예술가` | 採用 | 「最高の芸術家」という明確な評価 |
| ko | `최고의 작가` | 採用 | 「最高の作家」という明確な評価 |
| ko | `토대를 마련한` | 採用 | 基盤を築いた先駆性の評価 |
| ko | `한 세대를 대표한 작가` | 採用 | 一世代を代表するという評価 |
| ko | `한국 미술의 거목` | 採用 | 韓国美術の巨匠を意味する評価 |
| ko | `한국 미술의 대표 작가` | 採用 | 韓国美術を代表するという評価 |
| ko | `한국미술의 대표작가` | 採用 | 韓国美術を代表するという評価 |
| ko | `한국을 대표한 작가` | 採用 | 韓国を代表する作家という評価 |
| ko | `한국을 대표해 온 작가` | 採用 | 韓国を代表し続けたという評価 |
| ko | `핵심 역할을 해 온` | 採用 | 中心的な役割を担ってきたという評価 |
| ko | `핵심 역할을 했다` | 採用 | 中心となる役割を果たしたという評価 |
| ko | `핵심적인 역할을 한` | 採用 | 不可欠で中心的な役割を示す評価 |
| zh_cn | `一流艺术家` | 採用 | 一流という序列評価 |
| zh_cn | `核心艺术家` | 採用 | 中心的存在に位置づける評価 |
| zh_cn | `活跃在第一线` | 採用 | 第一線に位置づける評価 |
| zh_cn | `具有重要影响力` | 採用 | 影響力の重要性を示す評価 |
| zh_cn | `具有奠基性贡献` | 採用 | 基礎を築いた重要性の評価 |
| zh_cn | `最具影响力的艺术家` | 採用 | 影響力を最上位とする評価 |
| zh_cn | `最重要的艺术家之一` | 採用 | 最重要層に位置づける評価 |
| zh_cn | `最有影响力的艺术家` | 採用 | 影響力を最上位とする評価 |
| zh_cn | `作出了奠基性贡献` | 採用 | 基礎を築いた貢献への評価 |
| zh_cn | `重要艺术家之一` | 採用 | 重要な作家群に位置づける評価 |
| zh_cn | `先锋艺术家` | 採用 | 先駆者に位置づける評価 |
| zh_cn | `占据重要地位` | 採用 | 重要な地位に置く序列評価 |
| zh_cn | `占有重要地位` | 採用 | 重要な地位に置く序列評価 |
| zh_cn | `卓越艺术家` | 採用 | 卓越性を示す書き手の評価 |
| zh_cn | `知名艺术家` | 採用 | 高い知名度を示す評価 |
| zh_cn | `著名艺术家` | 採用 | 名声の高さを示す評価 |
| zh_cn | `里程碑式人物` | 採用 | 画期的人物に位置づける評価 |
| zh_cn | `里程碑式艺术家` | 採用 | 画期的作家に位置づける評価 |
| zh_cn | `奠定了……地位` | 不採用 | 地位の内容により評価が変わる |
| zh_cn | `杰出艺术家` | 採用 | 他より傑出しているとの評価 |
| zh_cn | `举足轻重的人物` | 採用 | 極めて重要な人物との評価 |
| zh_cn | `划时代人物` | 採用 | 時代を画した人物との評価 |
| zh_cn | `划时代的艺术家` | 採用 | 時代を画した作家との評価 |
| zh_cn | `处于艺术创作第一线` | 採用 | 創作の第一線に位置づける評価 |
| zh_cn | `极具影响力的艺术家` | 採用 | 影響力が極めて高いとの評価 |
| zh_cn | `标志性人物` | 採用 | 象徴的人物に位置づける評価 |
| zh_cn | `标志性艺术家` | 採用 | 象徴的作家に位置づける評価 |
| zh_cn | `确立了……地位` | 不採用 | 地位の内容により評価が変わる |
| zh_cn | `顶尖艺术家` | 採用 | 最高水準に位置づける評価 |
| zh_cn | `顶级艺术家` | 採用 | 最上位に位置づける評価 |
| zh_tw | `活躍於第一線` | 採用 | 第一線にいるという上位評価を示す |
| zh_tw | `最具影響力的藝術家之一` | 採用 | 影響力が最大級という評価を示す |
| zh_tw | `最重要的藝術家之一` | 採用 | 最重要な作家群に位置づけている |
| zh_tw | `在藝術史上佔有重要地位` | 採用 | 美術史上の重要性を評価している |
| zh_tw | `在藝壇佔有重要地位` | 採用 | 芸術界で重要という地位評価を示す |
| zh_tw | `樹立了典範` | 採用 | 他の模範となったという評価を示す |
| zh_tw | `殿堂級藝術家` | 採用 | 殿堂入り級という高い評価を示す |
| zh_tw | `國寶級藝術家` | 採用 | 国宝級という卓越性の評価を示す |
| zh_tw | `奠定了地位` | 不採用 | 地位の内容がなく文脈で意味が変わる |
| zh_tw | `當代最重要的藝術家` | 採用 | 同時代で最重要という序列評価を示す |
| zh_tw | `躋身國際藝壇` | 不採用 | 国際芸術界への進出という事実を示す |
