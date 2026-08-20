# 翻訳Tへの申し送り：訳が必要な欄×対象作家（2026-08-20・言語別フィールド根治便）

作成＝あつぺくと制作T（Fable 5）。データ＝ライブ627名を2026-08-20 15時台に取り直した実測。

**背景**＝テーマ161の表示を「その言語→en（作品名は→romaji）→欄ごと非表示」に統一し、非日本語ページで日本語flat値へ落ちる経路を廃止した（2026-08-20反映済み）。**下記の作家は artist_i18n にその欄のラテン値が無いため、非日本語ページで当該欄が非表示になっている。訳が artist_i18n に入り次第、テーマ改修なしで自動的に欄が復活する。**

★**訂正の記録**＝本便の初版一覧は masterworks を26名としていたが誤り。`artist_i18n.masterworks` には「作品ごとの配列」（581名）と「言語別オブジェクト」（建築家ら21名・enあり）の2形式があり、当初は配列しか数えていなかった。**実DOM検証（丹下健三さまenが英語表示）で発覚し、両形式を数えて5名に訂正**（識別子でなく実物を数え直した）。

値の書式＝既存の確立済みの型に従ってください（収蔵先＝裁定D2「公式ラテン名（＋括弧内原語併記可）」／団体＝既訳の型〔Nika Association等〕／代表作＝既存の2形式のいずれか）。

## 1. collection_places（収蔵先・記念館）＝30名

| handle | 作家 | 現行の日本語値 |
|---|---|---|
| futagawa-yukio | 二川 幸夫 | 東京都写真美術館、GA gallery |
| hanamori-yasuji | 花森 安治 | 世田谷美術館、暮しの手帖社資料室、東京国立近代美術館 |
| uchida-shigeru | 内田 繁 | メトロポリタン美術館、サンフランシスコ近代美術館、モントリオール美術館 |
| sugimoto-takashi | 杉本 貴志 | 東京国立近代美術館、杉本貴志資料、スーパーポテト資料 |
| mori-hanae | 森 英恵 | 島根県立石見美術館、京都服飾文化研究財団、森英恵ファッション文化財団 |
| takada-kenzo | 高田 賢三 | 京都服飾文化研究財団、姫路文学館、パリ装飾芸術美術館 |
| yamamoto-kansai | 山本 寛斎 | 京都服飾文化研究財団、ヴィクトリア・アンド・アルバート博物館、山本寛斎事務所資料 |
| ashida-jun | 芦田 淳 | 京都服飾文化研究財団、文化学園服飾博物館、ジュンアシダ資料 |
| katsura-yumi | 桂 由美 | 文化学園服飾博物館、桂由美ブライダルハウス資料 |
| koshino-ayako | 小篠 綾子 | 岸和田だんじり会館、文化学園服飾博物館、小篠家資料 |
| nakahara-junichi | 中原 淳一 | 弥生美術館、中原淳一記念館、世田谷文学館 |
| kuwasawa-yoko | 桑沢 洋子 | 桑沢デザイン研究所資料、文化学園服飾博物館 |
| tanaka-chiyo | 田中 千代 | 田中千代学園資料、文化学園服飾博物館 |
| yozo-ukita | 浮田 要三 | 芦屋市立美術博物館、大阪中之島美術館 |
| katsuhiko-narita | 成田 克彦 | 東京国立近代美術館、国立国際美術館、埼玉県立近代美術館 |
| yasunao-tone | 刀根 康尚 | ニューヨーク近代美術館、ポンピドゥー・センター、国立国際美術館 |
| minoru-niizuma | 新妻 實 | 東京都現代美術館、ニューヨーク近代美術館、ストームキング・アートセンター |
| yoshida-minoru | ヨシダ ミノル | 大阪中之島美術館、京都国立近代美術館、国立国際美術館 |
| fukayama-ryudo | 深山 龍洞 | 東京国立博物館（紫式部集抄） |
| wada-makoto | 和田 誠 | 東京国立近代美術館・たばこと塩の博物館 |
| nagatomo-keisuke | 長友 啓典 | ギンザ・グラフィック・ギャラリー |
| nadamoto-tadahito | 灘本 唯人 | ギンザ・グラフィック・ギャラリー |
| toda-tsutomu | 戸田 ツトム | 武蔵野美術大学美術館・図書館 |
| naito-rune | 内藤 ルネ | 岡崎市美術博物館 |
| kobayashi-kaichi | 小林 かいち | 京都国立近代美術館・細見美術館 |
| ochi-hiroshi | 大智 浩 | 東京国立近代美術館 |
| nakamura-nobuo | 中村 乃武夫 | 文化学園服飾博物館 |
| ito-mohei | 伊東 茂平 | 文化学園服飾博物館 |
| koike-iwataro | 小池 岩太郎 | 東京国立近代美術館 |
| harada-osamu | 原田 治 | 世田谷文学館・弥生美術館 |

## 2. groups（所属していた美術団体）＝74名

| handle | 作家 | 現行の日本語値 |
|---|---|---|
| shima-seien | 島 成園 | 文展・帝展に出品 |
| ueno-tameji | 上野 為二 | 日本工芸会 |
| kagoshima-juzo | 鹿児島 寿蔵 | アララギ派 |
| kagami-kozo | 各務 鑛三 | 皐陶会、工芸作家協会硝子部東京会 |
| hamaya-hiroshi | 濱谷 浩 | マグナム・フォト、日本写真家協会 |
| hayashi-tadahiko | 林 忠彦 | 日本写真家協会、二科会写真部 |
| ueda-shoji | 植田 正治 | 日本写真家協会 |
| irie-taikichi | 入江 泰吉 | 日本写真家協会 |
| kuwabara-kineo | 桑原 甲子雄 | 日本写真家協会 |
| fukase-masahisa | 深瀬 昌久 | 日本写真家協会 |
| ishimoto-yasuhiro | 石元 泰博 | 日本写真家協会 |
| tabuchi-yukio | 田淵 行男 | 日本写真家協会 |
| maeda-shinzo | 前田 真三 | 日本写真家協会 |
| nagano-shigeichi | 長野 重一 | 日本写真家協会 |
| sawada-kyoichi | 沢田 教一 | UPI通信 |
| shinoyama-kishin | 篠山 紀信 | 日本写真家協会 |
| otake-shoji | 大竹 省二 | 日本写真家協会、二科会写真部 |
| haga-hideo | 芳賀 日出男 | 日本写真家協会 |
| yamazawa-eiko | 山沢 栄子 | 日本写真家協会 |
| tokiwa-toyoko | 常盤 とよ子 | 日本写真家協会 |
| hoshino-michio | 星野 道夫 | 日本写真家協会 |
| sugiura-hisui | 杉浦 非水 | 七人社、全日本商業美術連盟 |
| yamana-ayao | 山名 文夫 | 日本宣伝美術会、東京広告美術協会 |
| awazu-kiyoshi | 粟津 潔 | 日本宣伝美術会、環境芸術研究所 |
| ishioka-eiko | 石岡 瑛子 | 石岡瑛子デザイン室 |
| manabe-hiroshi | 真鍋 博 | 日本宣伝美術会 |
| hanamori-yasuji | 花森 安治 | 暮しの手帖社 |
| ohashi-tadashi | 大橋 正 | 日本宣伝美術会、日本グラフィックデザイナー協会 |
| ekuan-kenji | 榮久庵 憲司 | GKデザイングループ、日本インダストリアルデザイナー協会 |
| mori-masahiro | 森 正洋 | 日本クラフトデザイン協会 |
| kuramata-shiro | 倉俣 史朗 | クラマタデザイン事務所、メンフィス |
| cho-daisaku | 長 大作 | 坂倉準三建築研究所 |
| uchida-shigeru | 内田 繁 | スタジオ80 |
| sugimoto-takashi | 杉本 貴志 | スーパーポテト |
| mori-hanae | 森 英恵 | 森英恵ファッション文化財団、オートクチュール組合 |
| takada-kenzo | 高田 賢三 | KENZO |
| miyake-issey | 三宅 一生 | 三宅デザイン事務所、リアリティ・ラボ |
| yamamoto-kansai | 山本 寛斎 | 株式会社寛斎スーパースタジオ |
| ashida-jun | 芦田 淳 | ジュンアシダ |
| katsura-yumi | 桂 由美 | 全日本ブライダル協会、ユミカツラインターナショナル |
| koshino-ayako | 小篠 綾子 | コシノ洋装店 |
| yunoki-samiro | 柚木 沙弥郎 | 日本民藝協会、女子美術大学 |
| nakahara-junichi | 中原 淳一 | ひまわり社 |
| kuwasawa-yoko | 桑沢 洋子 | 桑沢デザイン研究所 |
| tanaka-chiyo | 田中 千代 | 田中千代学園 |
| taro-okamoto | 岡本 太郎 | 二科会、夜の会 |
| tetsumi-kudo | 工藤 哲巳 | 読売アンデパンダン展関連 |
| yoshishige-saito | 斎藤 義重 | 九室会、多摩美術大学関係 |
| tomio-miki | 三木 富雄 | 読売アンデパンダン展関連 |
| yuki-katsura | 桂 ゆき | 女流画家協会、九室会 |
| toshinobu-onosato | オノサト・トシノブ | 自由美術家協会 |
| toshimitsu-imai | 今井 俊満 | 具体美術協会周辺、アンフォルメル関連 |
| kokuta-suda | 須田 剋太 | 国画会 |
| tatsuo-ikeda | 池田 龍雄 | 読売アンデパンダン展関連 |
| shusaku-arakawa | 荒川 修作 | ネオ・ダダイズム・オルガナイザーズ |
| minoru-niizuma | 新妻 實 | 棕櫚会 |
| kansuke-yamamoto | 山本 悍右 | 前衛写真グループ、ナゴヤ・フォトアヴァンギャルド |
| kajima-seibei | 鹿島 清兵衛 | 日本写真会 |
| kanamaru-shigene | 金丸 重嶺 | 金鈴社、七人社、日本写真協会 |
| tamura-shigeru | 田村 茂 | 日本リアリズム写真集団 |
| sonobe-kiyoshi | 薗部 澄 | 東方社 |
| komai-tetsuro | 駒井 哲郎 | 春陽会 |
| tateishi-tiger | 立石 大河亞 | ネオ・ダダ周辺 |
| tanaka-shintaro | 田中 信太郎 | ネオ・ダダイズム・オルガナイザーズ |
| fukayama-ryudo | 深山 龍洞 | 一東書道会、日展 |
| aida-mitsuo | 相田 みつを | 毎日書道展に入選 |
| wada-makoto | 和田 誠 | 東京アートディレクターズクラブ |
| nagatomo-keisuke | 長友 啓典 | 日本グラフィックデザイナー協会 |
| toda-tsutomu | 戸田 ツトム | 日本グラフィックデザイナー協会 |
| sano-shigejiro | 佐野 繁次郎 | 二紀会 |
| ochi-hiroshi | 大智 浩 | 海外デザイン交流協会、AGI（国際グラフィック連盟）日本代表 |
| nakamura-nobuo | 中村 乃武夫 | 日本ファッション協会 |
| ito-mohei | 伊東 茂平 | 日本デザイナークラブ |
| anzai-mizumaru | 安西 水丸 | 東京イラストレーターズ・ソサエティ |

## 3. masterworks（代表作）＝5名（建築4・書1）

建築は建物名・竣工年・文化財指定の長文＝英語の建物公式名が確立しているものが多い。他の建築家21名は言語別オブジェクト形式のenが既に入っている（その形式に合わせるのが速い）。

| handle | 作家 | 現行の日本語値 |
|---|---|---|
| fukayama-ryudo | 深山 龍洞（書） | 紫式部集抄（東京国立博物館蔵） |
| yoshizaka-takamasa | 吉阪隆正（建築） | 大学セミナー・ハウス本館（東京都八王子市・1965年竣工・現存・東京都選定歴史的建造物〔2016年度選定〕）、アテネ・フランセ校舎（東京都千代田区・1962年竣工、のち増築・現存）、旧江津市役所本庁舎（島根県江津市・1962年竣工・現存・2021年閉庁、民間譲渡による保存活用を模索中） |
| imai-kenji | 今井兼次（建築） | 早稲田大学2号館〔現・會津八一記念博物館〕（東京都新宿区・1925年竣工・桐山均一・内藤多仲と共同設計・現存〔1998年に會津八一記念博物館として開館〕・東京都選定歴史的建造物〔1999年度選定〕）、大多喜町役場中庁舎（千葉県夷隅郡大多喜町・1959年竣工・現存〔2012年改修〕・国登録有形文化財2015年登録）、大隈重信記念館（佐賀県佐賀市・1966年竣工・現存・国登録有形文化財2017年登録） |
| azuma-takamitsu | 東孝光（建築） | 塔の家（東京都渋谷区・1966年竣工・文化財指定なし／東京都選定歴史的建造物〔2017年度選定〕）、阿佐ヶ谷の家（東京都杉並区・1993年竣工） |
| tsuchiura-kameki | 土浦亀城（建築） | 土浦亀城邸〔第2自邸・文化財名称は土浦家住宅・土浦亀城/土浦信子設計〕（旧所在地：東京都品川区上大崎／現所在地：東京都港区南青山・1935年竣工・2024年移築復原・東京都指定有形文化財〔1995年3月27日指定〕） |

## 4. book_history → publications 構造へ＝1名

| handle | 作家 | 現行の日本語値 |
|---|---|---|
| nishikawa-yasushi | 西川 寧 | 『書の変相』<br>『六朝の書道』 |

## 5. （参考）i18n訳値そのものに日本語の字を含むもの＝判読候補 153件

★**当たり＝誤り件数ではない。** 判読した範囲では大半が正当（deの「公式名（原語併記）」型＝裁定D2、zhの誌名原題《みづゑ》等、koの漢字併記〔院展〕、建築のオブジェクト形式enに含まれる日本語の固有名詞併記）。**是正すべきかは1件ずつ文脈の判読が必要**＝翻訳Tの判断に委ねる。

| handle | 欄 | 言語 | 値 |
|---|---|---|---|
| nakamura-gakuryo | statement | ko | 인텐(院展)에서 닛텐(日展)으로 활동을 넓힌 니혼가 화가 |
| nakamura-gakuryo | groups | ko | 일본미술원, 닛텐(日展) |
| fukuzawa-ichiro | collection | zh_cn | 富冈市立美术博物馆・福泽一郎纪念美术馆 |
| fukuzawa-ichiro | collection | zh_tw | 富岡市立美術博物館・福澤一郎紀念美術館 |
| oshita-tojiro | statement | zh_cn | 推广水彩画并创办杂志《みづゑ》的画家 |
| oshita-tojiro | statement | zh_tw | 推廣水彩畫並創辦雜誌《みづゑ》的畫家 |
| hidai-tenrai | collection | de | Städtisches Tenrai-Gedächtnismuseum Saku (佐久市立天来記念館; Saku Shiritsu Tenrai Kinenkan); Narit |
| hidai-tenrai | groups | de | Shogakuin (書学院) |
| bundo-shunkai | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| bundo-shunkai | groups | de | Zuiun-Kalligrafie-Gesellschaft (瑞雲書道会); Taitō-Kalligrafie-Institut (泰東書道院); Japanisches In |
| tsujimoto-shiyu | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| tsujimoto-shiyu | groups | de | Nitten (日展); Nihon Shogeiin (日本書芸院) |
| suzuki-suiken | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| suzuki-suiken | groups | de | Nitten (日展) |
| nishikawa-yasushi | collection | de | Tokyo National Museum (東京国立博物館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō  |
| nishikawa-yasushi | groups | de | Nitten (日展); Kenshin-Kalligrafie-Gesellschaft (謙慎書道会; Kenshin Shodōkai) |
| teshima-yukei | collection | de | Kunstmuseum der Präfektur Kōchi (高知県立美術館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita- |
| teshima-yukei | groups | de | Dokuritsu Shojin Dan (独立書人団; Vereinigung unabhängiger Kalligrafen) |
| hibino-goho | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| hibino-goho | groups | de | Nitten (日展); Nihon Shogeiin (日本書芸院) |
| aoyama-san-u | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan); Kalligrafiemuseum de |
| aoyama-san-u | groups | de | Nitten (日展); Kenshin-Kalligrafie-Gesellschaft (謙慎書道会; Kenshin Shodōkai) |
| ueda-sokyu | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| ueda-sokyu | groups | de | Keiseikai (奎星会) |
| kaneko-otei | collection | de | Kunstmuseum Hakodate, Hokkaidō (北海道立函館美術館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita |
| kaneko-otei | groups | de | Sogen-Kalligrafie-Gesellschaft (創玄書道会; Sōgen Shodōkai); Mainichi-Kalligrafie-Gesellschaft  |
| ando-seiku | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| ando-seiku | groups | de | Nitten (日展); Shohitsukai (正筆会) |
| matsumoto-hosui | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| matsumoto-hosui | groups | de | Nitten (日展); Shokaisha (書海社) |
| kuwahara-suiho | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| kuwahara-suiho | groups | de | Shogakuin (書学院) |
| hidai-nankoku | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| hidai-nankoku | groups | de | Shogakuin (書学院) |
| aizu-yaichi | collection | de | Aizu-Yaichi-Gedächtnismuseum der Stadt Niigata (新潟市會津八一記念館) |
| kawamura-kizan | collection | de | Kawamura-Kizan-Gedächtnisraum, Heidenji (平田寺川村驥山記念室); Narita-san Kalligrafiemuseum (成田山書道美 |
| kawamura-kizan | groups | de | Nitten (日展) |
| osawa-gakyu | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| osawa-gakyu | groups | de | Shogakuin (書学院) |
| uno-setsuson | collection | de | Kunstmuseum der Präfektur Hyōgo (兵庫県立美術館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita- |
| uno-setsuson | groups | de | Keiseikai (奎星会) |
| sumiyama-nanboku | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| sumiyama-nanboku | groups | de | Nitten (日展) |
| tonomura-randen | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| tonomura-randen | groups | de | Nitten (日展); Kenshin-Kalligrafie-Gesellschaft (謙慎書道会; Kenshin Shodōkai) |
| murakami-santo | collection | de | Historisch-volkskundliches Museum Kamiura (Murakami-Santo-Gedächtnismuseum) (上浦歴史民俗資料館・村上三 |
| murakami-santo | groups | de | Nitten (日展); Nihon Shogei-in (日本書芸院) |
| kosaka-kiseki | collection | de | Museum für Literatur und Kalligrafie der Präfektur Tokushima (徳島県立文学書道館); Narita-san Kalli |
| kosaka-kiseki | groups | de | Nitten (日展); Nihon Shogei-in (日本書芸院) |
| hirotsu-unsen | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| hirotsu-unsen | groups | de | Nitten (日展); Nihon Shogei-in (日本書芸院) |
| kobayashi-toan | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan); Nationalmuseum Tokio |
| kobayashi-toan | groups | de | Nitten (日展); Gesamtjapanischer Verband für Siegelschneidekunst (全日本篆刻連盟; Zen Nihon Tenkoku |
| sugioka-kason | collection | de | Kunstmuseum der Präfektur Nara (奈良県立美術館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-s |
| sugioka-kason | groups | de | Nitten (日展); Nihon Shogei-in (日本書芸院) |
| onoe-saishu | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| onoe-saishu | groups | de | Shodō Geijutsu-in (書道芸術院) |
| ono-gado | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| ono-gado | groups | de | Shikakai (斯華会) |
| iijima-shunkei | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| iijima-shunkei | groups | de | Nitten (日展) |
| kumagai-tsuneko | collection | de | Kumagai-Tsuneko-Gedächtnismuseum (熊谷恒子記念館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita |
| kumagai-tsuneko | groups | de | Nitten (日展) |
| kuwata-sasafune | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| kuwata-sasafune | groups | de | Sasanami-kai (笹波会) |
| tanaka-kaido | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| tanaka-kaido | groups | de | Nitten (日展) |
| nakabayashi-gochiku | collection | de | Präfekturmuseum Saga (佐賀県立博物館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō B |
| kusakabe-meikaku | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| kusakabe-meikaku | groups | de | Nihon Shodōkai (日本書道会; Japanische Kalligrafie-Gesellschaft) |
| soejima-taneomi | collection | de | Präfekturmuseum Saga (佐賀県立博物館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō B |
| yamaoka-tesshu | collection | de | Tempel Zenshōan (全生庵); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan |
| kamijo-shinzan | collection | de | Kunstmuseum Shinshū Takatō (信州高遠美術館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san S |
| kamijo-shinzan | groups | de | Nitten (日展) |
| sakaki-bakuzan | collection | de | Kunstmuseum der Präfektur Mie (三重県立美術館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-sa |
| sakaki-bakuzan | groups | de | Nihon Shogeiin (日本書芸院; Japanische Akademie für Kalligrafiekunst) |
| imai-ryosetsu | collection | de | Kunstmuseum der Präfektur Nara (奈良県立美術館); Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-s |
| imai-ryosetsu | groups | de | Nitten (日展); Nihon Shogeiin (日本書芸院; Japanische Akademie für Kalligrafiekunst) |
| inoue-yuichi | collection | de | Nationalmuseum für moderne Kunst, Tokio (東京国立近代美術館); Nationalmuseum für moderne Kunst, Kyo |
| inoue-yuichi | groups | de | Bokujinkai (墨人会; Gesellschaft der Menschen der Tusche) |
| miwa-kyuwa | collection | zh_tw | 山口縣立萩美術館・浦上記念館 |
| miwa-jusetsu | collection | zh_tw | 山口縣立萩美術館・浦上記念館 |
| ogawa-kazumasa | groups | ko | 일본사진회(日本寫眞會) |
| fukuhara-shinzo | groups | ko | 일본사진회(日本寫眞會) |
| nojima-yasuzo | groups | de | Tokioter Gesellschaft für fotografische Forschung (東京写真研究会); Kokugakai |
| horino-masao | groups | ko | 신흥사진연구회(新興写真研究会) |
| ichinose-taizo | collection | zh_tw | 武雄市圖書館・歷史資料館 |
| hanamori-yasuji | statement | zh_cn | 引领《暮しの手帖》的编辑与设计师 |
| hanamori-yasuji | statement | zh_tw | 引領《暮しの手帖》的編輯與設計師 |
| kito-nabesaburo | groups | ko | 고후회, 닛텐(日展) |
| okuda-genso | groups | ko | 닛텐(日展) |
| sato-taisei | groups | ko | 닛텐(日展) |
| taira-toshiko | collection | zh_tw | 沖繩縣立博物館・美術館 |
| yonamine-sada | collection | zh_tw | 沖繩縣立博物館・美術館 |
| amata-akitsugu | collection | zh_cn | 刀剑传承馆・天田昭次纪念馆 |
| amata-akitsugu | collection | zh_tw | 刀劍傳承館・天田昭次紀念館 |
| nishikawa-shundo | collection | de | Kalligrafiemuseum des Bezirks Taitō (台東区立書道博物館; Taitō Kuritsu Shodō Hakubutsukan) |
| nishikawa-shundo | groups | de | Meiji Shodōkai (明治書道会; Meiji-Kalligrafie-Gesellschaft) |
| niwa-kaikaku | groups | de | Schule von Kusakabe Meikaku (日下部鳴鶴門) |
| kondo-sechiku | collection | de | Kunstmuseum der Präfektur Shizuoka (静岡県立美術館) |
| kondo-sechiku | groups | de | Danshokai (談書会); Nihon Shodōkai (日本書道会; Japanische Kalligrafie-Gesellschaft) |
| takeda-kado | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| takeda-kado | groups | de | Taitō Shodōin (泰東書道院) |
| watanabe-sao | groups | de | Nihon Shodōkai (日本書道会; Japanische Kalligrafie-Gesellschaft) |
| matsui-joryu | collection | de | Narita-san Kalligrafiemuseum (成田山書道美術館; Narita-san Shodō Bijutsukan) |
| matsui-joryu | groups | de | Gesamtjapanischer Kalligrafenverband (全日本書道連盟; Zen Nihon Shodō Renmei); Nihon Shodō Bijuts |
| miyamoto-chikkei | collection | de | Nationalmuseum Tokio (東京国立博物館); British Museum |
| miyamoto-chikkei | groups | de | Nihon Shogeiin (日本書芸院; Japanische Kalligrafie-Akademie); Kangyoku-Kalligrafie-Gesellschaft |
| osawa-chikutai | groups | de | Shodō Geijutsu-in (書道芸術院); Nihon Hangain (日本板画院; Japanische Akademie für Holzschnitt) |
| nakamura-sodo | collection | de | Edo-Tokyo-Museum (江戸東京博物館); Puschkin-Museum, Moskau (モスクワ国立美術館) |
| nakamura-sodo | groups | de | Teikōkai (貞香会); Nihon Shodō Bijutsuin (日本書道美術院; Japanische Akademie für Kalligrafiekunst); |
| hidai-shokin | collection | de | Städtisches Tenrai-Gedächtnismuseum Saku (佐久市立天来記念館; Saku Shiritsu Tenrai Kinenkan) |
| hidai-shokin | groups | de | Shogakuin (書学院) |
| namai-shika | collection | de | Städtisches Museum für Siegelschneidekunst Koga (古河市篆刻美術館; Koga-shi Tenkoku Bijutsukan) |
| namai-shika | groups | de | Nitten (日展); Gesamtjapanischer Kalligrafenverband (全日本書道連盟; Zen Nihon Shodō Renmei) |
| kurihara-rosui | collection | de | Kalligrafiemuseum Fukuyama (ふくやま書道美術館; Fukuyama Shodō Bijutsukan) |
| kurihara-rosui | groups | de | Nitten (日展); Nihon Shogeiin (日本書芸院; Japanische Kalligrafie-Akademie); Yomiuri-Shohō-Verban |
| takagi-seikaku | collection | de | Kunstmuseum der Präfektur Okayama (岡山県立美術館) |
| takagi-seikaku | groups | de | Chōyō-Kalligrafie-Gesellschaft (朝陽書道会; Chōyō Shodōkai); Nitten (日展); Yomiuri-Shohō-Verband |
| morita-shiryu | collection | de | Nationalmuseum für Kunst, Osaka (国立国際美術館) |
| morita-shiryu | groups | de | Bokujinkai (墨人会) |
| shinoda-toko | collection | de | Nationalmuseum für moderne Kunst, Tokio (東京国立近代美術館); Metropolitan Museum of Art |
| shinoda-toko | groups | de | Shodō Geijutsu-in (書道芸術院) |
| eguchi-sogen | collection | de | Kunstmuseum für moderne Kunst der Präfektur Niigata (新潟県立近代美術館) |
| eguchi-sogen | groups | de | Bokujinkai (墨人会) |
| aida-mitsuo | collection | de | Mitsuo-Aida-Museum (相田みつを美術館; 2024 geschlossen) |
| tange-kenzo | groups | zh_tw | 設計事務所：丹下健三・都市・建築設計研究所（1961年成立）／大學：東京大學教授（1963-1974年）／新日本建築家協會（現日本建築家協會）成立時會長 |
| seike-kiyoshi | collection | ko | 등록유형문화재 1건(私の家(나의 집), 2017년 등록). |
| kikutake-kiyonori | masterworks | zh_cn | 天空之家〔旧菊竹清训自宅〕（东京都文京区・1958年竣工・现存・2025年8月27日被指定为重要文化财），出云大社厅舍（岛根县出云市・1963年竣工・因2016年起的改建工程而拆除 |
| kikutake-kiyonori | masterworks | zh_tw | 天空之家〔舊菊竹清訓自宅〕（東京都文京區・1958年竣工・現存・2025年8月27日被指定為重要文化財），出雲大社廳舍（島根縣出雲市・1963年竣工・因2016年起的改建工程而拆除 |
| kikutake-kiyonori | masterworks | ko | 스카이하우스〔구 기쿠타케 기요노리 자택〕(도쿄도 분쿄구・1958년 준공・현존・2025년 8월 27일 중요문화재 지정), 이즈모타이샤 청사(시마네현 이즈모시・196 |
| otaka-masato | masterworks | zh_cn | 坂出人工土地（香川县坂出市・第1期1968年竣工，整体1986年竣工・现存），千叶县文化会馆（千叶县千叶市中央区・1967年竣工・现存），广岛市营基町高层公寓（广岛县广岛市中区・高 |
| otaka-masato | masterworks | zh_tw | 坂出人工土地（香川縣坂出市・第1期1968年竣工，整體1986年竣工・現存），千葉縣文化會館（千葉縣千葉市中央區・1967年竣工・現存），廣島市營基町高層公寓（廣島縣廣島市中區・高 |
| otaka-masato | masterworks | ko | 사카이데 인공토지（가가와현 사카이데시・제1기 1968년 완공, 전체 1986년 완공・현존）, 지바현 문화회관（지바현 지바시 주오구・1967년 준공・현존）, 히로시 |
| sakakura-junzo | masterworks | zh_cn | 原神奈川县立近代美术馆〔现・镰仓文华馆鹤冈美术馆〕（神奈川县镰仓市・1951年竣工・现存・2020年被指定为重要文化财），原上野市厅舍（三重县伊贺市・1964年竣工・现存〔2025 |
| sakakura-junzo | masterworks | zh_tw | 舊神奈川縣立近代美術館〔現・鎌倉文華館鶴岡美術館〕（神奈川縣鎌倉市・1951年竣工・現存・2020年指定為重要文化財），舊上野市廳舍（三重縣伊賀市・1964年竣工・現存〔2025年 |
| sakakura-junzo | masterworks | ko | 구 가나가와현립근대미술관〔현 가마쿠라 분카칸 쓰루가오카 뮤지엄〕（가나가와현 가마쿠라시・1951년 준공・현존・2020년 중요문화재 지정）, 구 우에노 시청사（미에현 |
| kurokawa-kisho | masterworks | zh_cn | 寒河江市政厅（山形县寒河江市・1967年竣工・现存・2017年被登录为国家登录有形文化财）、中银胶囊塔（东京都中央区・1972年竣工・2022年拆除〔部分胶囊已保存〕）、国立民族学 |
| kurokawa-kisho | masterworks | zh_tw | 寒河江市公所（山形縣寒河江市・1967年竣工・現存・2017年登錄為國家登錄有形文化財）、中銀膠囊大樓（東京都中央區・1972年竣工・2022年拆除〔部分膠囊已保存〕）、國立民族學 |
| shinohara-kazuo | masterworks | zh_cn | 白之家（东京都杉并区・1966年竣工・2008年迁建）、上原通之家（东京都・1976年竣工）、东京工业大学百年纪念馆（东京都目黑区・1987年竣工） |
| shinohara-kazuo | masterworks | zh_tw | 白之家（東京都杉並區・1966年竣工・2008年遷建）、上原通之家（東京都・1976年竣工）、東京工業大學百年紀念館（東京都目黑區・1987年竣工） |
| kishida-hideto | masterworks | zh_cn | 东京大学大讲堂〔安田讲堂〕（东京都文京区本乡7-3-1・1925年竣工・现存・据东京大学校史资料记载，基本设计由内田祥三完成，采用了岸田日出刀的实施方案〔国家登录有形文化财数据库的 |
| kishida-hideto | masterworks | zh_tw | 東京大學大講堂〔安田講堂〕（東京都文京區本鄉7-3-1・1925年竣工・現存・據東京大學校史資料記載，基本設計由內田祥三完成，採用了岸田日出刀的實施方案〔國家登錄有形文化財資料庫的 |
| kishida-hideto | masterworks | ko | 도쿄대학 대강당〔야스다 강당〕(도쿄도 분쿄구 혼고 7-3-1・1925년 준공・현존・도쿄대학 대학사 자료에 따르면 우치다 요시카즈가 기본설계를 하고 기시다 히데토의 |
| shirai-seiichi | masterworks | zh_cn | 旧亲和银行总店本馆（长崎县佐世保市・1967年竣工，1969年扩建・建筑现存・国家登录有形文化财〔预计2025年度内经文化审议会答复并登录〕），旧亲和银行总店怀霄馆（长崎县佐世保市 |
| shirai-seiichi | masterworks | zh_tw | 舊親和銀行總店本館（長崎縣佐世保市・1967年竣工，1969年增建・建築現存・國家登錄有形文化財〔預計2025年度內經文化審議會答覆並登錄〕），舊親和銀行總店懷霄館（長崎縣佐世保市 |
| shirai-seiichi | masterworks | ko | 구 신와은행 본점 본관（나가사키현 사세보시・1967년 준공, 1969년 증축・건물 현존・국가등록유형문화재〔2025년도 중 문화심의회 답신・등록 예정〕）, 구 신와 |
| yamaguchi-bunzo | masterworks | zh_cn | 清洲桥（东京都中央区日本桥中洲・江东区清澄・1928年3月竣工・现存・2007年6月18日被指定为重要文化财〔与永代桥、胜鬨桥同时指定〕・有记录称其参与了设计。但文化厅国指定文化财 |
| yamaguchi-bunzo | masterworks | zh_tw | 清洲橋（東京都中央區日本橋中洲・江東區清澄・1928年3月竣工・現存・2007年6月18日被指定為重要文化財〔與永代橋、勝鬨橋同時指定〕・有記錄稱其參與了設計。但文化廳國指定文化財 |
| yamaguchi-bunzo | masterworks | ko | 기요스바시(清洲橋)（도쿄도 주오구 니혼바시나카스・고토구 기요스미・1928년 3월 준공・현존・2007년 6월 18일 중요문화재로 지정〔에이타이바시・가치도키바시와 동 |
| ikebe-kiyoshi | masterworks | zh_cn | 住宅No.32〔立体最小限住宅No.32〕（大阪府大阪市东住吉区・1955年竣工・设计：池边阳・负责：西泽文隆・现存・DOCOMOMO Japan入选〔2024年度入选，2025年 |
| ikebe-kiyoshi | masterworks | zh_tw | 住宅No.32〔立體最小限住宅No.32〕（大阪府大阪市東住吉區・1955年竣工・設計：池邊陽・負責：西澤文隆・現存・DOCOMOMO Japan入選〔2024年度入選，2025年 |
| nishizawa-fumitaka | masterworks | ko | 마에바시 시청사（일본 군마현 마에바시시・1981년 준공・현존하며 시청 본청사로 사용 중） |
