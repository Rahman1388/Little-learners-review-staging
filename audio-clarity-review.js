"use strict";
(() => {
 const list=Array.from(document.querySelectorAll(".word[data-word]"));
 const scores=new Map();
 const names=["clear","unclear","silent","wrong","unsure"];
 const counts=() => Object.fromEntries(names.map(k=>[k,Array.from(scores.values()).filter(v=>v===k).length]));
 const preview=() => {
  const count=counts();
  const lines=["Little Learning Academy — 16-word audio clarity review","Device/browser (optional): __________________","Recordings: provisional synthetic English MP3, NOT educator approved",""];
  for(const card of list){
   const word=card.dataset.word;
   lines.push(word+" — "+(scores.get(word)||"Not checked"));
  }
  lines.push("","Rated "+scores.size+"/16; clear "+count.clear+", unclear "+count.unclear+", no sound "+count.silent+", wrong sound "+count.wrong+", unsure "+count.unsure);
  const notes=document.getElementById("notes").value.trim();
  if(notes)lines.push("Notes: "+notes);
  lines.push("Quality remains pending: listener feedback is not phonics certification.");
  return lines.join("\n");
 };
 function update(){
  const count=counts();
  document.getElementById("reviewStatus").textContent=scores.size+" of 16 words rated • "+(16-scores.size)+" awaiting review • "+count.unclear+" unclear • "+count.silent+" silent • "+count.wrong+" wrong sound";
  document.getElementById("report").textContent=preview();
 }
 let playing=null;
 for(const card of list){
  const word=card.dataset.word;
  const audio=card.querySelector("audio");
  audio.addEventListener("playing",()=>{if(playing&&playing!==audio)playing.pause();playing=audio;});
  card.querySelector(".tryDevice").addEventListener("click",()=>{
   const status=card.querySelector(".speechFeedback");
   if(!("speechSynthesis" in window)||typeof SpeechSynthesisUtterance!=="function"){
    status.textContent="Device speech is not available. Use Safari's native recording player.";return;
   }
   try{
    if(playing)playing.pause();
    window.speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(word);
    utterance.lang="en-GB";
    utterance.rate=0.82;
    utterance.volume=1;
    utterance.onstart=()=>{status.textContent="Playing device voice for "+word+" (experimental).";};
    utterance.onend=()=>{status.textContent="Device voice finished. Compare clarity with MP3 above.";};
    utterance.onerror=()=>{status.textContent="Device voice unavailable here. Try Safari.";};
    status.textContent="Trying local device voice (not pronunciation-approved).";
    window.speechSynthesis.speak(utterance);
   }catch(_){status.textContent="Device voice unavailable. Use the original audio player.";}
  });
  audio.addEventListener("error",()=>{document.getElementById("copyStatus").textContent="A clip failed to load. Mark that word Silent if appropriate, and mention the loading error in notes.";});
  card.querySelectorAll("button[data-rating]").forEach(btn=>btn.addEventListener("click",()=>{
   scores.set(word,btn.dataset.rating);
   card.querySelectorAll("button[data-rating]").forEach(other=>other.setAttribute("aria-pressed",String(other===btn)));
   update();
  }));
 }
 document.getElementById("notes").addEventListener("input",update);
 document.getElementById("copyReport").addEventListener("click",async()=>{
  const content=preview(),status=document.getElementById("copyStatus");
  try{await navigator.clipboard.writeText(content);status.textContent="✅ Copied. Paste the review into our conversation.";}
  catch{
   const node=document.getElementById("report");node.focus();
   const selection=window.getSelection(),range=document.createRange();range.selectNodeContents(node);selection.removeAllRanges();selection.addRange(range);
   status.textContent="Select Copy from your iPhone menu to copy the highlighted review.";
  }
 });
 document.getElementById("reset").addEventListener("click",()=>{
  scores.clear();document.getElementById("notes").value="";
  for(const card of list)card.querySelectorAll("button[data-rating]").forEach(b=>b.setAttribute("aria-pressed","false"));
  if(playing){playing.pause();playing=null;}
  document.getElementById("copyStatus").textContent="This page's review has been reset; no app progress changed.";
  update();
 });
 update();
})();