# 文字種検査 結果（コーポサイト制作T・2026-07-29追加）

実行日時：2026-07-28T18:17:41.029Z

## ★この検査で何が見つけられて、何が見つけられないか（冒頭に明記）

**見つけられるもの**＝その言語のブロックに、その言語では本来出現しないはずの文字種（ひらがな・カタカナ・日本語の中黒・漢字・ハングルの取り違え）が混ざっている箇所。

**見つけられないもの**＝文字種としては正しい（例：フランス語ブロックにフランス語のアルファベットしか無い）が、訳の内容・自然さ・省略・追加に問題がある箇所。第1便で見つかった55件超のうち、**この検査方式で検出できるのは文字種の取り違え型に限られる**。実際に数えたところ、55件超のうち文字種検査で検出可能な型は**1件のみ**（韓国語の日本語中黒混入）だった。応答時期の約束の追加、内容の省略・追加、不自然な言い回し、肩書きの不一致等、残り全件は文字種としては正常なため、この検査では検出できない。「検出0件」は「その型の問題が無い」ことを意味するのみで、「翻訳に問題が無い」ことは意味しない。

## サマリ

「箇所数」＝どの要素/ブロックで見つかったか（行・要素単位）。「総出現数」＝同じ要素内の複数回出現も含めた実際の文字数ベースの件数（1箇所に同じ問題が何度も出ることがあるため、箇所数だけでは過小に見える）。

| 対象 | 違反：箇所数 | 違反：総出現数 | 除外(固有名詞等)：箇所数 | 除外：総出現数 |
|---|---|---|---|---|
| テーマ(sections/*.liquid) | 103 | 136 | 12 | 12 |
| index.html | 7 | 9 | 5 | 5 |
| 404.html | 0 | 0 | 0 | 0 |
| privacy.html | 1 | 1 | 0 | 0 |

## テーマ：文字種の違反

| file | line | base | lang | type | count | sample |
|---|---|---|---|---|---|---|
| sections/atspect-artist-plan.liquid | 29 | ap-l | ko | 日本語の中黒(U+30FB) | 1 | 8개 언어 프로필 페이지 제작・공개 |
| sections/atspect-artist-plan.liquid | 42 | ap-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 向全球藏家介绍作品・销售支持 |
| sections/atspect-artist-plan.liquid | 43 | ap-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 向全球藏家介紹作品・銷售支援 |
| sections/atspect-artist-plan.liquid | 44 | ap-l | ko | 日本語の中黒(U+30FB) | 1 | 세계 컬렉터에게 작품 소개・판매 지원 |
| sections/atspect-artist-plan.liquid | 59 | ap-l | ko | 日本語の中黒(U+30FB) | 1 | YouTube 다큐멘터리 제작・게재 |
| sections/atspect-artist-plan.liquid | 72 | ap-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 由专属工作人员进行数据管理・更新代理 |
| sections/atspect-artist-plan.liquid | 73 | ap-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 由專屬工作人員進行資料管理・更新代理 |
| sections/atspect-artist-plan.liquid | 74 | ap-l | ko | 日本語の中黒(U+30FB) | 1 | 전담 스태프에 의한 데이터 관리・업데이트 대행 |
| sections/atspect-artist-plan.liquid | 267 | ap-l | ko | 日本語の中黒(U+30FB) | 1 | 요금: 월 3,300엔(세금 포함)으로 매월 자동 갱신・결제됩니다(신용카드 등). |
| sections/atspect-artist-plan.liquid | 276 | ap-l | ko | 日本語の中黒(U+30FB) | 1 | …0일까지 신청하시면 해당 월분까지, 21일 이후에는 다음 달분까지 청구되며 이후 청구는 없습니다. 일할 계산・환불은 하지 않습니다. |
| sections/atspect-artist-plan.liquid | 277 | ap-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 详细合同条件规定于作家使用条款第8条（费用）、第10条（合同期限・解约）。 |
| sections/atspect-artist-plan.liquid | 277 | ap-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 詳細合約條件規定於作家使用條款第8條（費用）、第10條（合約期限・解約）。 |
| sections/atspect-artist-plan.liquid | 277 | ap-l | ko | 日本語の中黒(U+30FB) | 2 | 자세한 계약 조건은 작가 이용약관 제8조(요금)・제10조(계약 기간・해지)에 정하고 있습니다. （他1件同種） |
| sections/atspect-artwork-detail.liquid | 137 | aw-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 材料・技法 |
| sections/atspect-artwork-detail.liquid | 137 | aw-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 材料・技法 |
| sections/atspect-artwork-detail.liquid | 137 | aw-l | ko | 日本語の中黒(U+30FB) | 1 | 재료・기법 |
| sections/atspect-artwork-detail.liquid | 145 | aw-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 署名・印章 |
| sections/atspect-artwork-detail.liquid | 145 | aw-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 署名・印章 |
| sections/atspect-artwork-detail.liquid | 145 | aw-l | ko | 日本語の中黒(U+30FB) | 1 | 서명・낙관 |
| sections/atspect-artwork-detail.liquid | 250 | aw-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 预约・咨询 |
| sections/atspect-artwork-detail.liquid | 251 | aw-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 預約・諮詢 |
| sections/atspect-artwork-detail.liquid | 252 | aw-l | ko | 日本語の中黒(U+30FB) | 1 | 예약・문의하기 |
| sections/atspect-artwork-detail.liquid | 411 | aw-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 预约・咨询 |
| sections/atspect-artwork-detail.liquid | 412 | aw-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 預約・諮詢 |
| sections/atspect-artwork-detail.liquid | 413 | aw-l | ko | 日本語の中黒(U+30FB) | 1 | 예약・문의 |
| sections/atspect-artwork-detail.liquid | 527 | aw-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 配送目的地（国家/地区・城市） |
| sections/atspect-artwork-detail.liquid | 527 | aw-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 配送目的地（國家/地區・城市） |
| sections/atspect-artwork-detail.liquid | 527 | aw-l | ko | 日本語の中黒(U+30FB) | 1 | 배송지(국가/지역・도시) |
| sections/atspect-artwork-detail.liquid | 542 | aw-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 发送预约・咨询 |
| sections/atspect-artwork-detail.liquid | 542 | aw-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 發送預約・諮詢 |
| sections/atspect-artwork-detail.liquid | 542 | aw-l | ko | 日本語の中黒(U+30FB) | 1 | 예약・문의 보내기 |
| sections/atspect-artwork-detail.liquid | 561 | aw-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 专业包装・全球配送 |
| sections/atspect-artwork-detail.liquid | 562 | aw-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 專業包裝・全球配送 |
| sections/atspect-artwork-detail.liquid | 563 | aw-l | ko | 日本語の中黒(U+30FB) | 1 | 전문 포장・전 세계 배송 |
| sections/atspect-contact.liquid | 78 | ct-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 公司・团体名称 |
| sections/atspect-contact.liquid | 78 | ct-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 公司・團體名稱 |
| sections/atspect-contact.liquid | 78 | ct-l | ko | 日本語の中黒(U+30FB) | 1 | 회사・단체명 |
| sections/atspect-footer.liquid | 61 | footer-l | zh-tw | ひらがな/カタカナ | 1 | 基於特定商業交易法の標示 |
| sections/atspect-privacy.liquid | 49 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 公司名称・团体名称 |
| sections/atspect-privacy.liquid | 49 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 公司名稱・團體名稱 |
| sections/atspect-privacy.liquid | 58 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 联系方式（电话号码・电子邮箱地址） |
| sections/atspect-privacy.liquid | 58 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 聯絡方式（電話號碼・電子郵件地址） |
| sections/atspect-privacy.liquid | 61 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 下单・购买记录 |
| sections/atspect-privacy.liquid | 61 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 訂購・購買紀錄 |
| sections/atspect-privacy.liquid | 65 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 2 | 姓名・假名读法・雅号 （他1件同種） |
| sections/atspect-privacy.liquid | 65 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 2 | 姓名・讀音・雅號 （他1件同種） |
| sections/atspect-privacy.liquid | 65 | pv-l | ko | 漢字(CJK統合漢字) | 1 | 성명·읽는 법·아호(雅號) |
| sections/atspect-privacy.liquid | 66 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 出生年月日（用于年龄确认・身份确认） |
| sections/atspect-privacy.liquid | 66 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 出生年月日（為確認年齡・本人身分） |
| sections/atspect-privacy.liquid | 68 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 3 | 出身地・国籍・居住国・地址 （他2件同種） |
| sections/atspect-privacy.liquid | 68 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 3 | 出身・國籍・居住國・地址 （他2件同種） |
| sections/atspect-privacy.liquid | 69 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 电话号码・电子邮箱地址 |
| sections/atspect-privacy.liquid | 69 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 電話號碼・電子郵件地址 |
| sections/atspect-privacy.liquid | 70 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 4 | 活动经历・发表经历・获奖经历・作品相关信息・作品集等 （他3件同種） |
| sections/atspect-privacy.liquid | 70 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 4 | 活動經歷・發表經歷・獲獎經歷・作品相關資訊・作品集等 （他3件同種） |
| sections/atspect-privacy.liquid | 71 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 所提供的图像（面部照片（肖像）・作品图像等） |
| sections/atspect-privacy.liquid | 71 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 所提供的影像（臉部照片（肖像）・作品影像等） |
| sections/atspect-privacy.liquid | 72 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 3 | 通过代理人・支援者・法人／事务所申请的情形下，该代理人・法人的名称、负责人姓名、联系方式，以及与艺术家本人的关系 （他2件同種） |
| sections/atspect-privacy.liquid | 72 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 3 | 由代理人・支援者・法人／事務所提出申請時，該代理人・法人的名稱、承辦人姓名、聯絡方式，以及與藝術家本人的關係 （他2件同種） |
| sections/atspect-privacy.liquid | 77 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | Cookie、访问日志、IP地址、所使用的终端・浏览器相关信息等 |
| sections/atspect-privacy.liquid | 77 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | Cookie、存取紀錄、IP位址、所使用之裝置・瀏覽器相關資訊等 |
| sections/atspect-privacy.liquid | 88 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 用于回复・联络咨询，以及提供本公司服务的相关介绍 |
| sections/atspect-privacy.liquid | 88 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 為回覆・聯絡諮詢，以及提供本公司服務相關之資訊 |
| sections/atspect-privacy.liquid | 90 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 用于受理・审核艺术家注册及进行联络 |
| sections/atspect-privacy.liquid | 90 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 為受理・審查藝術家登錄並進行聯絡 |
| sections/atspect-privacy.liquid | 91 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 用于创建、编辑、登载艺术家简介・作品信息，以及以多语言进行发布 |
| sections/atspect-privacy.liquid | 91 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 為製作、編輯、刊載藝術家簡介・作品資訊，並以多語言發布 |
| sections/atspect-privacy.liquid | 92 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 4 | 在网站・媒体的编辑・制作（多语言翻译、图像修正・加工、介绍文・介绍视频的制作等）中运用AI工具 （他3件同種） |
| sections/atspect-privacy.liquid | 92 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 4 | 於網站・媒體的編輯・製作（多語言翻譯、影像的修正・加工、介紹文・介紹影片的製作等）中運用AI工具 （他3件同種） |
| sections/atspect-privacy.liquid | 93 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 用于将面部照片（肖像）及作品图像登载于网站・媒体，并向国内外进行介绍 |
| sections/atspect-privacy.liquid | 93 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 為將臉部照片（肖像）及作品影像刊載於網站・媒體，並向國內外進行介紹 |
| sections/atspect-privacy.liquid | 94 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 3 | 用于销售款项的汇付、收据・发票・付款明细的开具及其他会计・税务上的手续 （他2件同種） |
| sections/atspect-privacy.liquid | 94 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 3 | 為銷售款項的匯款、收據・請款書・付款明細的開立及其他會計・稅務上的手續 （他2件同種） |
| sections/atspect-privacy.liquid | 95 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 用于身份确认・年龄确认以及防止不正当使用 |
| sections/atspect-privacy.liquid | 95 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 為確認本人身分・年齡及防止不正當使用 |
| sections/atspect-privacy.liquid | 96 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 用于防止垃圾邮件・非法访问及其他服务的安全运营 |
| sections/atspect-privacy.liquid | 96 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 為防止垃圾郵件・不正當存取及其他服務的安全營運 |
| sections/atspect-privacy.liquid | 118 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 2 | 本公司可能在实现使用目的所必需的范围内，将个人信息的处理委托给外部。受托方包括配送公司、支付代理公司，以及网站・媒体制作业务（多语言翻译、图像编辑、介绍文・介绍视频的制作等，包括其中使用AI工具的情形）的受托方等。在此情形下，本公… （他1件同種） |
| sections/atspect-privacy.liquid | 118 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 2 | 本公司可能於達成使用目的所需範圍內，將個人資訊的處理委託予外部。受託方包含配送業者、付款代理公司，以及網站・媒體的製作業務（多語言翻譯、影像編輯、介紹文・介紹影片的製作等，包含於其中運用AI工具的情形）的受託方等。於此情形下，… （他1件同種） |
| sections/atspect-privacy.liquid | 132 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 本公司仅在实现使用目的所必需的期间，以及相关法令（税务・公司法等）所规定的强制保存期间内保有所收集的个人信息，之后将不迟延地予以删除或匿名化。身份确认所需信息，在达成确认目的… |
| sections/atspect-privacy.liquid | 132 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 本公司僅於達成使用目的所需期間，以及相關法令（稅務・公司法等）規定有保存義務的期間內，保有所收集的個人資訊，其後將立即予以刪除或匿名化。本人身分確認用資訊於達成確認目的後… |
| sections/atspect-privacy.liquid | 146 | pv-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 当发生个人信息泄露、灭失、毁损或其他事态，或本公司知悉其风险时，本公司将依照法令进行必要的调查・应对，并适当地向相关机构报告及向本人通知等。 |
| sections/atspect-privacy.liquid | 146 | pv-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 當發生個人資訊洩漏、滅失、毀損或其他事態，或本公司知悉其風險時，本公司將依照法令進行必要的調查・應對，並適當地向相關機構報告及向本人通知等。 |
| sections/atspect-privacy.liquid | 146 | pv-l | ko | 日本語の中黒(U+30FB) | 1 | …개인정보의 유출, 멸실, 훼손 그 밖의 사태가 발생하거나 그 우려를 파악한 경우, 법령에 따라 필요한 조사・대응을 실시하고, 관계 기관에 대한 보고 및 본인에 대한 통지 등을 적절히 실시합니다. |
| sections/atspect-privacy.liquid | 153 | pv-l | ko | 日本語の中黒(U+30FB) | 1 | …gle LLC가 제공하는 「reCAPTCHA」를 이용합니다. reCAPTCHA는 이용자의 IP 주소 및 조작・단말기에 관한 정보를 자동으 |
| sections/atspect-tokushoho.liquid | 28 | tok-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 销售主体・交易当事人 |
| sections/atspect-tokushoho.liquid | 28 | tok-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 銷售主體・交易當事人 |
| sections/atspect-tokushoho.liquid | 28 | tok-l | ko | 日本語の中黒(U+30FB) | 1 | 판매 주체・거래 당사자 |
| sections/atspect-tokushoho.liquid | 34 | tok-l | ko | 日本語の中黒(U+30FB) | 2 | …계약은 주식회사 ARTS RESPECT(판매업자)와 구매자 사이에 성립합니다. 주문 접수, 판매 가격의 결정・표시, 대금의 청구 및 수령, 작품의 발송, 반품・교환 및 그 밖의 모든 고객 대응은 모두 주식회사 ART… （他1件同種） |
| sections/atspect-tokushoho.liquid | 43 | tok-l | ko | 漢字(CJK統合漢字) | 2 | Atsuro Tagawa（田川 篤郎） （他1件同種） |
| sections/atspect-tokushoho.liquid | 57 | tok-l | ko | 日本語の中黒(U+30FB) | 1 | 접수 시간: 평일 10:00〜18:00(주말・공휴일 제외) |
| sections/atspect-tokushoho.liquid | 98 | tok-l | zh-cn | 日本語の中黒(U+30FB) | 1 | …本国内配送（含税。为自东京向东京都内及大阪发货时、含包装与运输的服务的公开运费示例。视送达地区不同，费用可能高于该示例）・小型作品 |
| sections/atspect-tokushoho.liquid | 99 | tok-l | zh-tw | 日本語の中黒(U+30FB) | 1 | …本國內配送（含稅。為自東京向東京都內及大阪發貨時、含包裝與運輸的服務的公開運費示例。視送達地區不同，費用可能高於該示例）・小型作品 |
| sections/atspect-tokushoho.liquid | 122 | tok-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 本服务采用预约・咨询制。自作品页面提出申请（临时申请）时，不会产生授权（预扣）及请求。申请后，本公司确认库存、作家的可售与否以及配送费… |
| sections/atspect-tokushoho.liquid | 123 | tok-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 本服務採用預約・諮詢制。自作品頁面提出申請（臨時申請）時，不會產生授權（預扣）及請求。申請後，本公司確認庫存、作家的可售與否以及配送費… |
| sections/atspect-tokushoho.liquid | 124 | tok-l | ko | 日本語の中黒(U+30FB) | 2 | 본 서비스는 예약・문의제입니다. 작품 페이지에서의 신청(임시 신청) 시점에는 승인(임시 보류) 및 청구가 발생하지 않습니다.… （他1件同種） |
| sections/atspect-tokushoho.liquid | 138 | tok-l | ko | 日本語の中黒(U+30FB) | 1 | …다.국내 배송은 결제 확정 후 대략 10일에서 2주 정도의 발송을 기준으로 합니다. 다만 작품의 소재, 작가・배송 업체의 사정, 당사의 확인, 포장 방법, 배송지의 상황 등에 따라 이를 초과할 수 있습니다.해외 배송… |
| sections/atspect-tokushoho.liquid | 146 | tok-l | ko | 日本語の中黒(U+30FB) | 1 | 반품・교환 |
| sections/atspect-tokushoho.liquid | 152 | tok-l | ko | 日本語の中黒(U+30FB) | 1 | 작품은 한 점씩 취급하므로 고객님의 단순 변심에 의한 반품・교환은 원칙적으로 받지 않습니다. 결제 확정 전 취소는 가능합니다. 만일 운송 중 손상 등 작품에 문제가… |
| sections/main-cart-footer.liquid | 112 | atspect-cart-l | ko | 日本語の中黒(U+30FB) | 1 | 표시 합계는 작품 본체 가격입니다. 배송료・운송 보험료, 해외 배송 시 관세 등은 별도이며 구매자 부담입니다(주문 후 견적을 안내드리며, 승인 후 별… |
| sections/main-cart-footer.liquid | 157 | atspect-cart-l | zh-cn | 日本語の中黒(U+30FB) | 1 | 作品的购藏采用预约・前金制。从作品页面预约后，我们将告知含运费及运输保险费的总额，并发送付款链接。 |
| sections/main-cart-footer.liquid | 158 | atspect-cart-l | zh-tw | 日本語の中黒(U+30FB) | 1 | 作品的購藏採用預約・前金制。從作品頁面預約後，我們將告知含運費及運輸保險費的總額，並發送付款連結。 |
| sections/main-cart-footer.liquid | 159 | atspect-cart-l | ko | 日本語の中黒(U+30FB) | 2 | 작품 구매는 예약・선불제입니다. 작품 페이지에서 예약하시면 배송료・운송 보험료를 포함한 총액을 안내드리고 결제 링크를 보내드… （他1件同種） |

## テーマ：除外（固有名詞等のallowlistで説明可・黙って捨てていない一覧）

| file | line | base | lang | type | count | sample | reason |
|---|---|---|---|---|---|---|---|
| sections/atspect-press-page.liquid | 21 | pl-l | zh-cn | ひらがな/カタカナ | 1 | あつぺくとは日本美术家及其作品信息的艺术平台。欢迎媒体朋友就作家介绍、采访协助等相关事宜与我们联系。 | allowlist(あつぺくと)で説明可 |
| sections/atspect-press-page.liquid | 22 | pl-l | zh-tw | ひらがな/カタカナ | 1 | あつぺくとは日本藝術家及其作品資訊的藝術平台。歡迎媒體朋友就作家介紹、採訪協助等相關事宜與我們聯繫。 | allowlist(あつぺくと)で説明可 |
| sections/atspect-press.liquid | 73 | pr-l | en | ひらがな/カタカナ | 1 | We are preparing a place to share あつぺくと's perspective and the stories of artists.We will publi… | allowlist(あつぺくと)で説明可 |
| sections/atspect-press.liquid | 74 | pr-l | zh-cn | ひらがな/カタカナ | 1 | 我们正在筹备一个分享あつぺくと的视角与作家故事的园地。将在 note（日文）与 Medium（英文）上发布文章。 | allowlist(あつぺくと)で説明可 |
| sections/atspect-press.liquid | 75 | pr-l | zh-tw | ひらがな/カタカナ | 1 | 我們正在籌備一個分享あつぺくと的視角與作家故事的園地。將在 note（日文）與 Medium（英文）上發布文章。 | allowlist(あつぺくと)で説明可 |
| sections/atspect-press.liquid | 76 | pr-l | ko | ひらがな/カタカナ | 1 | あつぺくと의 관점과 작가의 이야기를 전하는 장을 준비하고 있습니다.note(일본어)와 Medium(영어)에서… | allowlist(あつぺくと)で説明可 |
| sections/atspect-press.liquid | 77 | pr-l | fr | ひらがな/カタカナ | 1 | Nous préparons un espace pour partager le regard d'あつぺくと et les histoires des artistes.Nous publierons des arti… | allowlist(あつぺくと)で説明可 |
| sections/atspect-press.liquid | 78 | pr-l | es | ひらがな/カタカナ | 1 | Estamos preparando un espacio para compartir la mirada de あつぺくと y las historias de los artistas.Publicaremos artículos… | allowlist(あつぺくと)で説明可 |
| sections/atspect-press.liquid | 79 | pr-l | de | ひらがな/カタカナ | 1 | Wir bereiten einen Ort vor, um die Perspektive von あつぺくと und die Geschichten der Künstler zu teilen.Wir veröffe… | allowlist(あつぺくと)で説明可 |
| sections/atspect-tokushoho.liquid | 32 | tok-l | zh-cn | ひらがな/カタカナ | 1 | 本网站『あつぺくと（ATSPECT）』上作品的买卖合同，在株式会社ARTS RESPECT（销售业者）与购买者之间成立。订单受理… | allowlist(あつぺくと)で説明可 |
| sections/atspect-tokushoho.liquid | 33 | tok-l | zh-tw | ひらがな/カタカナ | 1 | 本網站『あつぺくと（ATSPECT）』上作品的買賣合約，於株式会社ARTS RESPECT（銷售業者）與購買者之間成立。訂單受理… | allowlist(あつぺくと)で説明可 |
| sections/atspect-tokushoho.liquid | 34 | tok-l | ko | ひらがな/カタカナ | 1 | 본 사이트 『あつぺくと(ATSPECT)』의 작품 매매 계약은 주식회사 ARTS RESPECT(판매업자)와 구매자 사이에… | allowlist(あつぺくと)で説明可 |

## index.html：文字種の違反

| base | line | lang | type | count | sample |
|---|---|---|---|---|---|
| data-lang:span | 360 | ko | 日本語の中黒(U+30FB) | 1 | 작가 지원・프로모션 사업 |
| data-lang:span | 378 | ko | 日本語の中黒(U+30FB) | 2 | 작가의 활동을 다각적으로 지원하는 정보 플랫폼입니다. 공식 프로필・동영상・SNS를 통해 전 세계로 작가와 작품의 매력을 발신하고, 신뢰할 수 있는 정보 기반으로 작가와 감상… （他1件同種） |
| data-lang:span | 420 | ko | 日本語の中黒(U+30FB) | 1 | 디지털 아카이브・출판 사업 |
| data-lang:span | 430 | ko | 日本語の中黒(U+30FB) | 1 | 작품에 새겨진 역사와 기록을 미래로 계승하기 위해, 디지털화・출판을 통한 체계적인 보존과 정리를 진행합니다. 작가가 걸어온 발자취를 확실한 형태로 남기고, 문화적 가치… |
| data-lang:span | 473 | ko | 日本語の中黒(U+30FB) | 1 | 고물영업법에 근거하여 미술품을 적절하게 취급하고, 신뢰를 최우선으로 한 매매・중개를 진행합니다. 작품의 적정한 유통을 지원하고, 안심하고 거래할 수 있는 환경 조성에 힘씁니다. |
| data-lang:span | 503 | ko | 日本語の中黒(U+30FB) | 1 | 아트 매니지먼트・컨설팅 사업 |
| data-lang:span | 513 | ko | 日本語の中黒(U+30FB) | 2 | 작가・미술 단체・기업이 안고 있는 과제에 대해, 실무적인 상담과 조언을 제공합니다. 활동 지원부터 권리 관계 정… （他1件同種） |

## index.html：除外（固有名詞等）

| base | line | lang | type | count | sample | reason |
|---|---|---|---|---|---|---|
| data-lang:p:biz-brand | 366 | en | ひらがな/カタカナ | 1 | あつぺくと / ATSPECT | allowlist(あつぺくと)で説明可 |
| data-lang:p:biz-brand | 369 | ko | ひらがな/カタカナ | 1 | あつぺくと / ATSPECT | allowlist(あつぺくと)で説明可 |
| data-lang:p:biz-brand | 370 | fr | ひらがな/カタカナ | 1 | あつぺくと / ATSPECT | allowlist(あつぺくと)で説明可 |
| data-lang:p:biz-brand | 371 | es | ひらがな/カタカナ | 1 | あつぺくと / ATSPECT | allowlist(あつぺくと)で説明可 |
| data-lang:p:biz-brand | 372 | de | ひらがな/カタカナ | 1 | あつぺくと / ATSPECT | allowlist(あつぺくと)で説明可 |

## 404.html：文字種の違反

該当なし。

## 404.html：除外（固有名詞等）

該当なし。

## privacy.html：文字種の違反

| base | line | lang | type | count | sample |
|---|---|---|---|---|---|
|  |  | ko | 漢字(CJK統合漢字) | 1 | …(3) 「ATSPECT」에 등록·신청하시는 작가로부터 성명·읽는 법·아호(雅號) 생년월일(연령 확인·본인 확인을 위해) 성별(소개 시 호칭 등의 판단을… |

## privacy.html：除外（固有名詞等）

該当なし。

## この検査の既知の限界（正直な記載）

- 固有名詞の除外リストは`あつぺくと`のみ（既存のALLOWLIST_SUBSTRINGSをそのまま再利用）。作家名・作品名・地名等の固有名詞で文字種混入が検出された場合、除外リストに載っていなければ違反として出る（誤検出の可能性）。除外した分・しなかった分の両方を必ず一覧に出している。
- **韓国語について、指示の対象は「ひらがな・カタカナ・中黒」のみだったが、同じ理屈で「漢字」混入も検出対象に加えた（指示より対象を広げた点）。ハングルはko以外の言語（cn/tw含む）ですべて禁止とした。この拡張は実際に1件のfalse positiveの疑いを生んだ**＝privacy.html韓国語版の「아호(雅號)」（雅号＝ペンネームの意）。これは漢字表記が意図的な語義明確化のグロス（韓国語の公式文書で人名・専門用語に漢字を併記する慣習）である可能性が高く、翻訳ミスとは言えない。除外リストには追加していない（1件の目視確認だけで恒久的なルールを作らないため）が、目視で「おそらく問題ではない」と判断した旨をここに記録する。**指示どおりの範囲（ひらがな・カタカナ・中黒のみ）に留めていればこのfalse positiveは発生しなかった**＝対象を広げる際のトレードオフの実例として記録する。
- corp.html系3ページはライブから取得している。実行タイミングにより結果が変わり得る（本レポートは実行日時のスナップショット）。
- 抽出はテーマ側と同じ`snippetAfter`（タグ直後から次の閉じタグ/Liquidタグ/次言語タグ/400文字のいずれか手前まで）の簡易ヒューリスティックを流用している。極端に長い一文では途中で打ち切られる場合がある（既存の限界と同じ）。
- 文字種は「その文字種が言語として妥当か」しか見ておらず、文法・語順・意味は一切評価しない。
