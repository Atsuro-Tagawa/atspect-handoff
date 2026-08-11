// ATSPECT 作家アーカイブ用 artists.json 生成スクリプト（再生成可能・データ変更時に実行）
// 出力: assets/artists.json （軽量・全作家。検索キーは配列化し name_kana 後付けで壊れない構造）
// 使い方: node gen-artists-json.mjs  → その後 node _push-preview.mjs assets/artists.json でプレビュー反映
import { readFileSync, writeFileSync } from 'node:fs';

// 検索エイリアス（2026-07-25・国際定着名での検索対応・代表判断②）
// 姓→名の表示順に統一した44名のうち、旧表記（欧米順・国際的に定着した表記）で検索してもヒットするよう、
// handle（URLスラグ）をキーに旧値を保持する。表示・並び順は変更しない（name_enは既に姓→名で確定済み）。
// 出典：_fix_artist_data_result_20260725.json（当日実施した43件のname_en修正の実行ログ・before値）。
// 1件（toshinobu-onosato）は実行時点でbefore=afterの無変更だったため対象外＝42件。
const SEARCH_ALIASES = {
  'taro-okamoto': 'Taro Okamoto', 'jiro-yoshihara': 'Jiro Yoshihara', 'kazuo-shiraga': 'Kazuo Shiraga',
  'shozo-shimamoto': 'Shozo Shimamoto', 'atsuko-tanaka': 'Atsuko Tanaka', 'sadamasa-motonaga': 'Sadamasa Motonaga',
  'saburo-murakami': 'Saburo Murakami', 'akira-kanayama': 'Akira Kanayama', 'tsuruko-yamazaki': 'Tsuruko Yamazaki',
  'sadaharu-horio': 'Sadaharu Horio', 'yozo-ukita': 'Yozo Ukita', 'chiyu-uemae': 'Chiyu Uemae',
  'jiro-takamatsu': 'Jiro Takamatsu', 'natsuyuki-nakanishi': 'Natsuyuki Nakanishi', 'genpei-akasegawa': 'Genpei Akasegawa',
  'tetsumi-kudo': 'Tetsumi Kudo', 'on-kawara': 'On Kawara', 'yoshishige-saito': 'Yoshishige Saito',
  'katsuhiro-yamaguchi': 'Katsuhiro Yamaguchi', 'nobuo-sekine': 'Nobuo Sekine', 'katsuro-yoshida': 'Katsuro Yoshida',
  'katsuhiko-narita': 'Katsuhiko Narita', 'koji-enokura': 'Koji Enokura', 'noriyuki-haraguchi': 'Noriyuki Haraguchi',
  'tomio-miki': 'Tomio Miki', 'aiko-miyawaki': 'Aiko Miyawaki', 'yuki-katsura': 'Yuki Katsura',
  'kumi-sugai': 'Kumi Sugai', 'toshimitsu-imai': 'Toshimitsu Imai', 'hisao-domoto': 'Hisao Domoto',
  'kokuta-suda': 'Kokuta Suda', 'tatsuo-ikeda': 'Tatsuo Ikeda', 'shusaku-arakawa': 'Shusaku Arakawa',
  'shigeko-kubota': 'Shigeko Kubota', 'yasunao-tone': 'Yasunao Tone', 'keiichi-tanaami': 'Keiichi Tanaami',
  'masunobu-yoshimura': 'Masunobu Yoshimura', 'minoru-niizuma': 'Minoru Niizuma', 'taeko-tomiyama': 'Taeko Tomiyama',
  'kansuke-yamamoto': 'Kansuke Yamamoto', 'keiji-usami': 'Keiji Usami', 'yutaka-matsuzawa': 'Yutaka Matsuzawa',
};
const env={};
for(const l of readFileSync('.env','utf8').split(/\r?\n/)){const m=l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);if(m){let v=m[2].trim();if((v.startsWith('"')&&v.endsWith('"'))||(v.startsWith("'")&&v.endsWith("'")))v=v.slice(1,-1);env[m[1]]=v;}}
async function gql(q,vars){const r=await fetch('https://arts-respcet.myshopify.com/admin/api/2024-10/graphql.json',{method:'POST',headers:{'X-Shopify-Access-Token':env.SHOPIFY_ADMIN_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({query:q,variables:vars})});return await r.json();}
// name_kana は将来フィールド。存在しない環境でもエラーにしないため try で個別取得せず、汎用 fields で拾う。
const Q=`query($cur:String){metaobjects(type:"artist",first:200,after:$cur){pageInfo{hasNextPage endCursor} nodes{handle fields{key value}}}}`;
let cur=null,all=[];
while(true){const res=await gql(Q,{cur});if(res.errors){console.error(JSON.stringify(res.errors));process.exit(1);}const mo=res.data.metaobjects;all.push(...mo.nodes);if(!mo.pageInfo.hasNextPage)break;cur=mo.pageInfo.endCursor;}
const out=[];
const warnKana=[];   // ★かなが取れなかった作家（黙って空にしない・下で必ず出す）
for(const node of all){
  const f={};for(const x of node.fields){f[x.key]=x.value;}
  if(!(f.name_ja||'').trim())continue;
  if(f.is_listed==='false')continue; // ソフト公開(⑦校正)は一覧JSONに含めない＝直URLのみ
  let kana=f.name_kana||'';
  /* ★2026-08-11＝パース失敗を黙って握り潰さない（Codex指摘(d)）。
     壊れたJSONが1件あると、その作家だけ かな検索・五十音が効かなくなり、
     さらに kana_ready!==count になって画面全体のかな案内まで止まりうる。必ず画面に出す。 */
  if(!kana&&f.artist_i18n){try{const j=JSON.parse(f.artist_i18n);if(j&&j.name_kana)kana=j.name_kana;else warnKana.push(node.handle+'(name_kanaが無い)');}catch(e){warnKana.push(node.handle+'(artist_i18nが壊れている)');}}
  const alias=SEARCH_ALIASES[node.handle]||'';
  const rec={
    n:f.name_ja||'',            // 氏名(漢字)
    e:f.name_en||'',            // ローマ字
    k:kana,                     // 読み(ひらがな)＝name_kana or artist_i18n.name_kana
    g:f.genre||'',              // ジャンル表示(職能テキスト)
    c:f.category||'',           // 絞り込みカテゴリ(8分類: 絵画/彫刻/工芸/書/写真/デザイン/現代美術/建築 ※旧「立体」は彫刻の互換エイリアス)
    b:f.birth_year||'',         // 生年
    d:f.death_year||'',         // 没年(物故のみ)
    u:'/pages/artist/'+node.handle // 詳細URL(metaobject urlHandle=artist)
  };
  if(alias)rec.a=alias;         // 検索エイリアス(国際定着の旧表記・存在する場合のみ付与)
  out.push(rec);
}
const withKana=out.filter(a=>a.k).length;

/* ★★2026-08-11＝安全装置（Codexの独立レビューNO-GOを受けて追加）★★
   このスクリプトは索引を**丸ごと置き換える**。途中でAPIが一部しか返さなくても、
   エラーが出ないまま「少ない索引」で上書きしてしまい、作家が静かに検索から消える。
   ＝おかしいと分かる材料がある間は**書かずに止める**。止めた理由は必ず画面に出す。 */
const problems=[];

// (e-1) 取得できた metaobject の総数と、索引に入れた件数の関係を出す（黙って減らさない）
console.log('[調べた] metaobject 総数',all.length,'件 → 索引に入れる',out.length,'件（差',all.length-out.length,'件＝name_ja空 or is_listed=false）');

// (e-2) 前回の索引と比べて大きく減っていないか（10%以上 or 20件以上 減ったら止める）
let prevCount=null;
try{ const prev=JSON.parse(readFileSync('assets/artists.json','utf8')); prevCount=prev.artists?prev.artists.length:null; }catch(e){}
if(prevCount!==null){
  const diff=out.length-prevCount;
  console.log('[調べた] 前回の索引',prevCount,'件 → 今回',out.length,'件（',(diff>=0?'+':''),diff,'件 ）');
  if(diff<0 && (Math.abs(diff)>=20 || Math.abs(diff)/prevCount>=0.10)){
    problems.push('前回より '+Math.abs(diff)+' 件も減っている（'+prevCount+'→'+out.length+'）。APIが一部しか返さなかった可能性がある。');
  }
}

// (e-3) 同じURLの作家が2件以上ないか
const seen={},dups=[];
for(const r of out){ if(seen[r.u])dups.push(r.u); seen[r.u]=1; }
if(dups.length)problems.push('同じURLの作家が重複している: '+dups.slice(0,5).join(', '));

// (e-4) 必須項目（名前・URL）が欠けていないか
const broken=out.filter(r=>!r.n||!r.u||!r.u.startsWith('/pages/artist/'));
if(broken.length)problems.push('名前かURLが欠けている作家が '+broken.length+' 件ある');

// (c) 検索エイリアスの handle が実在するか（handleが変わると黙って消えるため）
const handles=new Set(all.map(n=>n.handle));
const lostAlias=Object.keys(SEARCH_ALIASES).filter(h=>!handles.has(h));
if(lostAlias.length)problems.push('検索エイリアスの handle が実在しない: '+lostAlias.join(', ')+'（作家のURLが変わった可能性。SEARCH_ALIASES を直すこと）');

// (d-2) ★2026-08-11 追加＝**経路を問わず**かなが空になった作家を必ず数える。
//   （warnKana は artist_i18n を読んだ場合しか拾えず、name_kana も artist_i18n も無い作家は
//     黙って k:'' のまま通っていた＝対照実験で見つけた穴）
const noKana=out.filter(r=>!r.k);
if(noKana.length){
  console.log('[注意] かなが空の作家',noKana.length,'件:',noKana.slice(0,10).map(r=>r.n).join(' / '));
}
// 前回よりかなの付与率が下がっていたら止める（かな検索・五十音・画面の案内が効かなくなるため）
try{
  const prev=JSON.parse(readFileSync('assets/artists.json','utf8'));
  if(prev && typeof prev.kana_ready==='number' && typeof prev.count==='number' && prev.count>0){
    const prevRate=prev.kana_ready/prev.count, nowRate=out.length?withKana/out.length:0;
    console.log('[調べた] かなの付与率 前回',(prevRate*100).toFixed(1)+'%','→ 今回',(nowRate*100).toFixed(1)+'%');
    if(nowRate<prevRate-0.001) problems.push('かなの付与率が下がっている（'+prev.kana_ready+'/'+prev.count+' → '+withKana+'/'+out.length+'）。かな検索・五十音が効かなくなる。');
  }
}catch(e){}

// (d) かなが取れなかった作家を必ず出す
if(warnKana.length){
  console.log('[注意] かなが取れなかった作家',warnKana.length,'件:',warnKana.slice(0,10).join(' / '));
  problems.push('かなが取れなかった作家が '+warnKana.length+' 件ある（かな検索・五十音が効かなくなる）');
}

if(problems.length){
  console.error('\n★止めました：索引を書き換えていません。次の点を確かめてください。');
  problems.forEach(x=>console.error('  ・'+x));
  console.error('\n（意図した変更であれば、確かめたうえで環境変数 ARTISTS_JSON_FORCE=1 を付けて実行してください）');
  if(process.env.ARTISTS_JSON_FORCE!=='1') process.exit(1);
  console.error('  → ARTISTS_JSON_FORCE=1 が指定されたため、上の点を承知のうえで書き込みます。\n');
}

const payload={generated:'(stamp at deploy)',count:out.length,kana_ready:withKana,artists:out};
if(payload.count!==payload.artists.length){ console.error('★止めました：count と artists の数が合っていません'); process.exit(1); }
writeFileSync('assets/artists.json',JSON.stringify(payload));
console.log('[OK] assets/artists.json  作家',out.length,'件 / name_kana付与',withKana,'件 / バイト',Buffer.byteLength(JSON.stringify(payload),'utf8'));
