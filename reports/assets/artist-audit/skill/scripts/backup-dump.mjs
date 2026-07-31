import fs from "fs";
const b = JSON.parse(fs.readFileSync(process.argv[2],"utf8"));
const out = {};
for (const a of b.artists) {
  const o = JSON.parse(a.fields.artist_i18n);
  out[a.fields.name_ja] = { handle: a.handle, collection: o.collection, masterworks: o.masterworks, masterworks_text: a.fields.masterworks_text };
}
fs.writeFileSync(process.argv[3], JSON.stringify(out,null,1),"utf8");
console.log("names=" + Object.keys(out).join(" / "));
