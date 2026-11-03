/* Repeatable NON-INSTRUCTIONAL gate for Little Learning Academy public ADULT staging.
 * A passing technical check NEVER approves speech quality, child use, Arabic
 * translations, teaching content, accessibility, official school notices or trademarks.
 */
"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"..");
const file=f=>path.join(root,f);
const exists=f=>fs.existsSync(file(f)) && fs.statSync(file(f)).isFile();
const required=[
 "index.html","picture-word-explorer.html","picture-word-explorer.js",
 "audio-clarity-review.html","audio-clarity-review.js",
 "iphone-audio-check.html","grade2-four-skills.html",
 "grade2-phonics-pathway.html","grade2-module-review-sheet.html",
 "grade2-educator-review.html","teacher-quality-checklist.html",
 "school-updates.html","academy-brand-review.html","project-roadmap.html",
 "AUDIO-QUALITY-AUDIT-2026-10-30.md",
 "AUDIO-REPLACEMENT-PROTOCOL-2026-10-30.md",
 "STAGING-MANIFEST.json","robots.txt",".nojekyll"
];
for(const name of required)assert.ok(exists(name),"Missing required staging asset: "+name);
const manifest=JSON.parse(fs.readFileSync(file("STAGING-MANIFEST.json"),"utf8"));
assert.equal(manifest.developmentOnly,true,"Staging must remain labeled development only");
assert.equal(manifest.ownerApprovedPublicStaging,true,"Public adult staging permission unexpectedly changed");
assert.equal(manifest.noStudentData,true,"No-student-data condition was removed");
const words=["ring","sing","hand","sand","ball","wall","black","snack","rain","train","pink","sink","day","play","sick","kick"];
for(const word of words){
 const name="audio/review-english/"+word+".mp3";
 assert.ok(exists(name),"Missing phonics review audio: "+name);
 const bytes=fs.readFileSync(file(name));
 assert.ok(bytes.length>700,"Audio is too small or empty: "+name);
 const id3=bytes.toString("ascii",0,3)==="ID3";
 const frame=bytes[0]===0xff&&(bytes[1]&0xe0)===0xe0;
 assert.ok(id3||frame,"Unexpected audio signature: "+name);
}
const htmlFiles=fs.readdirSync(root).filter(x=>x.endsWith(".html"));
let scriptRefs=0;
for(const name of htmlFiles){
 const html=fs.readFileSync(file(name),"utf8");
 const scriptPattern=/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
 for(const match of html.matchAll(scriptPattern)){
  const asset=match[1].split("?")[0].split("#")[0];
  assert.ok(asset&&!/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(asset),
   "External or invalid JS source on "+name+": "+match[1]);
  const target=path.normalize(path.join(path.dirname(name),decodeURIComponent(asset)));
  assert.ok(!target.startsWith("..")&&exists(target),"Missing local JS for "+name+": "+asset);
  scriptRefs++;
 }
}
const home=fs.readFileSync(file("index.html"),"utf8");
assert.ok(/adult|review|development/i.test(home),"Homepage needs prominent adult-review designation");
assert.ok(/noindex/i.test(home),"Public adult staging homepage is missing noindex hint");
const audit=fs.readFileSync(file("AUDIO-QUALITY-AUDIT-2026-10-30.md"),"utf8");
assert.ok(/HOLD/i.test(audit),"Human audio-approval hold was removed from audit");
const snapshot=JSON.parse(fs.readFileSync(file("school-live-news.json"),"utf8"));
const isCurrentNews=Boolean(snapshot.lastSuccessfulFetch);
console.log("PASS — "+htmlFiles.length+" HTML pages, "+scriptRefs+" local JS references, "+words.length+" phonics audio files, and public-staging safety markers.");
console.log("NOT CERTIFIED — audio word intelligibility, phoneme accuracy, Arabic language, educator approval, actual iPhone Safari/VoiceOver, child safety and trademark.");
console.log("NEWS STATUS — "+(isCurrentNews?"A saved snapshot exists; freshness and official provenance still need review.":"QNA snapshot uninitialized; no live school news or alert claims permitted."));
console.log("RELEASE DECISION — HOLD: educator and human listening sign-off required.");
