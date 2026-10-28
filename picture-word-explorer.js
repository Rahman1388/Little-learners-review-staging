"use strict";
/* Adult-only, supplementary static review. Deliberately no storage, analytics,
 * recording, network requests, scores, uploads or user profile data.
 * Family order and first/second examples mirror the existing Grade 2 pilot.
 */
(() => {
 const FAMILIES=Object.freeze({
  ing: {module:2,end:"ing",words:[{word:"ring",start:"r",icon:"💍",ar:"خاتم",label:"a ring"},{word:"sing",start:"s",icon:"🎤",ar:"يغنّي",label:"sing"}],wrong:"ball",otherEnd:["and","ain"]},
  and: {module:2,end:"and",words:[{word:"hand",start:"h",icon:"✋",ar:"يد",label:"a hand"},{word:"sand",start:"s",icon:"🏖️",ar:"رمل",label:"sand"}],wrong:"ring",otherEnd:["ing","all"]},
  all: {module:3,end:"all",words:[{word:"ball",start:"b",icon:"⚽",ar:"كرة",label:"a ball"},{word:"wall",start:"w",icon:"🧱",ar:"جدار",label:"a wall"}],wrong:"hand",otherEnd:["and","ack"]},
  ack: {module:3,end:"ack",words:[{word:"black",start:"bl",icon:"⚫",ar:"أسود",label:"black"},{word:"snack",start:"sn",icon:"🍎",ar:"وجبة خفيفة",label:"a snack"}],wrong:"ball",otherEnd:["all","ick"]},
  ain: {module:4,end:"ain",words:[{word:"rain",start:"r",icon:"🌧️",ar:"مطر",label:"rain"},{word:"train",start:"tr",icon:"🚆",ar:"قطار",label:"a train"}],wrong:"wall",otherEnd:["ink","and"]},
  ink: {module:4,end:"ink",words:[{word:"pink",start:"p",icon:"🩷",ar:"وردي",label:"pink"},{word:"sink",start:"s",icon:"🚰",ar:"حوض غسيل",label:"a sink"}],wrong:"rain",otherEnd:["ing","ain"]},
  ay: {module:5,end:"ay",words:[{word:"day",start:"d",icon:"☀️",ar:"يوم",label:"day"},{word:"play",start:"pl",icon:"🛝",ar:"يلعب",label:"play"}],wrong:"sand",otherEnd:["all","ick"]},
  ick: {module:5,end:"ick",words:[{word:"sick",start:"s",icon:"🤒",ar:"مريض",label:"sick"},{word:"kick",start:"k",icon:"🦵⚽",ar:"يركل",label:"kick"}],wrong:"sing",otherEnd:["ack","ink"]}
 });
 const $=id=>document.getElementById(id);
 const E={
  family:$("family"),heading:$("stepHeading"),instructionEn:$("instructionEn"),instructionAr:$("instructionAr"),
  see:$("seeStage"),quiz:$("quizStage"),complete:$("completeStage"),
  emoji0:$("emoji0"),emoji1:$("emoji1"),split0:$("split0"),split1:$("split1"),label0:$("label0"),label1:$("label1"),
  icon:$("quizIcon"),prompt:$("quizPrompt"),quizAr:$("quizAr"),answers:$("answerChoices"),feedback:$("feedback"),
  completeText:$("completionText"),soundStatus:$("soundStatus"),
  sayFirst:$("sayFirst"),saySecond:$("saySecond"),sayArabic:$("sayArabic"),
  hearWord0:$("hearWord0"),hearWord1:$("hearWord1"),audioTest:$("audioTest"),topAudioStatus:$("topAudioStatus"),
  previous:$("previous"),next:$("next"),restart:$("restart"),
  gardenButtons:$("gardenButtons"),gardenStatus:$("gardenStatus"),gardenSelection:$("gardenSelection"),gardenAudioStatus:$("gardenAudioStatus"),gardenHear0:$("gardenHear0"),gardenHear1:$("gardenHear1"),familyBadge:$("familyBadge"),
  progressText:$("progressText"),progressBar:$("progressBar"),progressFill:$("progressFill"),nextFamily:$("nextFamily"),
 };
 if(Object.values(E).some(v=>!v))return;
 const progress=[0,1,2,3].map(i=>$("stepLabel"+i));
 if(progress.some(x=>!x))return;
 let stage=0,passed=false,unlocked=1;
 const familyIds=Object.keys(FAMILIES);
 const visited=new Set(); // Memory only: cleared on reload/closing page, never uploaded.
 const flowerIcons=["🌼","🌷","🌻","🌸","🍀","🌺","🌿","🌹"];
 const gardenBtns=new Map();
 const family=()=>FAMILIES[E.family.value]||FAMILIES.ing;
 function rotateAnswers(choices,offset){
  const n=offset%choices.length;
  return [...choices.slice(n),...choices.slice(0,n)];
 }
 function updateGarden(){
  for(const [id,button] of gardenBtns){
   const practised=visited.has(id);
   button.setAttribute("aria-pressed",String(id===E.family.value));
   button.setAttribute("data-practised",String(practised));
   button.setAttribute("aria-label","Family -"+id+(practised?", practised in this visit":"")+(id===E.family.value?", selected":""));
   button.textContent=flowerIcons[familyIds.indexOf(id)]+" -"+id+(practised?" ✓":"");
  }
  const pair=family().words;
  E.gardenSelection.textContent="Selected -"+E.family.value+": "+pair[0].word+" / "+pair[1].word+" • Grade 2 Module "+family().module+". The word lesson opens below. / المجموعة المختارة: -"+E.family.value;
  E.gardenHear0.textContent="🔊 Hear "+pair[0].word;
  E.gardenHear1.textContent="🔊 Hear "+pair[1].word;
  E.gardenStatus.textContent=visited.size+" of 8 families practised in this visit / تم التدرّب على "+visited.size+" من ٨ مجموعات خلال هذه الزيارة.";
 }
 function activateFamily(id,focus){
  if(!Object.prototype.hasOwnProperty.call(FAMILIES,id))return;
  cancelSpeech();
  E.family.value=id;stage=0;passed=false;unlocked=1;
  E.soundStatus.textContent="New family selected. / تم اختيار مجموعة جديدة.";
  render(focus);
  if(focus && typeof E.heading.scrollIntoView==="function"){
   try{E.heading.scrollIntoView({block:"start",behavior:"smooth"})}catch(_){E.heading.scrollIntoView()}
  }
 }
 for(const id of familyIds){
  const btn=document.createElement("button");btn.type="button";
  btn.addEventListener("click",()=>activateFamily(id,true));
  E.gardenButtons.appendChild(btn);
  gardenBtns.set(id,btn);
 }
 function cancelSpeech(){try{if(speechWatch!==null && typeof window.clearTimeout==="function")window.clearTimeout(speechWatch);speechWatch=null;activeSpeech=null;if("speechSynthesis" in window)window.speechSynthesis.cancel()}catch(_){/*voice optional*/}}
 function parts(el,entry){
  el.replaceChildren();
  el.setAttribute("aria-label",entry.word);
  const start=document.createElement("span");start.className="onset";start.textContent=entry.start;
  const end=document.createElement("span");end.className="ending";end.textContent=family().end;
  el.append(start,end);
 }
 function makeAnswers(choices,expected){
  E.answers.replaceChildren();passed=false;
  for(const choice of choices){
   const btn=document.createElement("button");btn.type="button";btn.textContent=choice;btn.setAttribute("aria-pressed","false");
   btn.addEventListener("click",()=>{
    if(stage!==1 && stage!==2)return;
    for(const node of E.answers.querySelectorAll("button"))node.setAttribute("aria-pressed",String(node===btn));
    passed=choice===expected;
    E.feedback.textContent=passed?"Excellent effort! Correct answer. / أحسنت! إجابة صحيحة.":"Try once more. Read the picture and the ending carefully. / حاول مجددًا. انظر إلى الصورة ونهاية الكلمة.";
    E.next.disabled=!passed;
   });
   E.answers.appendChild(btn);
  }
 }
 function render(shouldFocus){
  const f=family(),a=f.words[0],b=f.words[1];
  progress.forEach((v,i)=>{v.disabled=i>unlocked;if(i===stage)v.setAttribute("aria-current","step");else v.removeAttribute("aria-current")});
  updateGarden();
  E.familyBadge.textContent="🔎 -"+f.end+" · Grade 2 Module "+f.module+" / مجموعة الكلمات";
  E.progressText.textContent="Step "+(stage+1)+" of 4 / الخطوة "+(stage+1)+" من ٤";
  E.progressBar.setAttribute("aria-valuenow",String(stage+1));
  E.progressFill.style.width=((stage+1)*25)+"%";
  E.see.hidden=stage!==0;E.quiz.hidden=!(stage===1||stage===2);E.complete.hidden=stage!==3;
  if(stage===0){
   E.heading.textContent="1. Look at two words / انظر إلى كلمتين";
   E.instructionEn.textContent="Ask an adult to read '"+a.word+"' and '"+b.word+"'. Both have the written ending -"+f.end+".";
   E.instructionAr.textContent="انظر إلى الكلمتين واستمع إلى قراءتهما من شخص بالغ. تنتهيان بالحروف نفسها: "+f.end+".";
   for(const [i,w] of f.words.entries()){E["emoji"+i].textContent=w.icon;E["label"+i].textContent=w.ar;parts(E["split"+i],w)}
  } else if(stage===1){
   const chosen=f.words[1];
   E.heading.textContent="2. Match the picture / طابق الصورة";
   E.instructionEn.textContent="Which English word matches the picture and Arabic meaning?";
   E.instructionAr.textContent="أي كلمة إنجليزية تناسب الصورة والمعنى العربي؟";
   E.icon.textContent=chosen.icon;
   E.prompt.textContent="Look at the picture. Which English word matches it?";
   E.quizAr.textContent="المعنى بالعربية: "+chosen.ar;
   makeAnswers(rotateAnswers([f.words[0].word,f.wrong,f.words[1].word],familyIds.indexOf(E.family.value)%3),chosen.word);
  } else if(stage===2){
   const chosen=f.words[0];
   E.heading.textContent="3. Build the word / ركّب الكلمة";
   E.instructionEn.textContent="Look at the picture. Choose the ending that completes the word beginning with '"+chosen.start+"'. (The full answer is not displayed.)";
   E.instructionAr.textContent="انظر إلى الصورة. اختر نهاية الكلمة المناسبة بعد الحروف: "+chosen.start+"."; 
   E.icon.textContent=chosen.icon;
   E.prompt.textContent="Choose the ending for: "+chosen.start+" + ____";
   E.quizAr.textContent=chosen.ar+" — نهاية الكلمة";
   makeAnswers(rotateAnswers([f.otherEnd[0],f.end,f.otherEnd[1]],(familyIds.indexOf(E.family.value)+2)%3),f.end);
  } else {
   E.heading.textContent="4. Celebrate your practice / أحسنت";
   E.instructionEn.textContent="You practised two words ending in -"+f.end+".";
   E.instructionAr.textContent="تدرّبت على كلمتين تنتهيان بالحروف: "+f.end+".";
   E.completeText.textContent="You practised '"+a.word+"' and '"+b.word+"'. Your flower is marked as tried this visit. Choose another family to keep exploring.";
  }
  E.previous.disabled=stage===0;
  E.next.disabled=stage===3||(stage===1||stage===2)&&!passed;
  E.next.textContent=stage===2?"Finish / إنهاء →":"Next / التالي →";
  if(shouldFocus)E.heading.focus({preventScroll:true});
 }
 progress.forEach((v,i)=>v.addEventListener("click",()=>{
  if(i>unlocked)return;
  cancelSpeech();stage=i;passed=false;render(true);
 }));
 E.family.addEventListener("change",()=>activateFamily(E.family.value,true));
 E.previous.addEventListener("click",()=>{if(stage>0){cancelSpeech();stage--;render(true)}});
 E.next.addEventListener("click",()=>{if(stage<3&&(stage===0||passed)){cancelSpeech();stage++;unlocked=Math.max(unlocked,stage);if(stage===3)visited.add(E.family.value);passed=false;render(true)}});
 E.restart.addEventListener("click",()=>{cancelSpeech();stage=0;passed=false;render(true);E.soundStatus.textContent="Ready to practice again. / جاهز للتدريب مرة أخرى."});
 E.nextFamily.addEventListener("click",()=>{
  const current=familyIds.indexOf(E.family.value);
  const nextUntried=Array.from({length:familyIds.length},(_,i)=>familyIds[(current+i+1)%familyIds.length]).find(id=>!visited.has(id));
  activateFamily(nextUntried||familyIds[(current+1)%familyIds.length],true);
 });
 let activeSpeech=null, speechWatch=null;
 function updateAudioStatus(text){E.soundStatus.textContent=text;E.topAudioStatus.textContent=text;E.gardenAudioStatus.textContent=text;}
 function speak(text,lang,rate){
  if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window)){
   updateAudioStatus("This in-app browser cannot provide speech. Open the same page in Safari and tap Hear this word. / افتح الصفحة في سفاري ثم اضغط استمع.");
   return;
  }
  try{
   const engine=window.speechSynthesis;
   if(speechWatch!==null && typeof window.clearTimeout==="function")window.clearTimeout(speechWatch);
   speechWatch=null;
   engine.cancel();
   const voices=typeof engine.getVoices==="function"?engine.getVoices():[];
   const prefix=lang.startsWith("ar")?"ar":"en";
   const compatible=voices.filter(x=>typeof x.lang==="string"&&x.lang.toLowerCase().startsWith(prefix));
   const selected=compatible.find(x=>x.lang.toLowerCase()===lang.toLowerCase())||compatible[0];
   if(prefix==="ar" && !selected){
    updateAudioStatus("Arabic device voice is not available yet. / الصوت العربي غير متاح حاليًا. Use an adult reader or open in Safari.");
    return;
   }
   const utterance=new SpeechSynthesisUtterance(text);
   activeSpeech=utterance; // Keep utterance alive during playback on iOS.
   utterance.lang=selected?selected.lang:lang;
   if(selected)utterance.voice=selected;
   utterance.rate=rate;utterance.pitch=1;utterance.volume=1;
   let began=false;
   utterance.onstart=()=>{
    began=true;
    if(speechWatch!==null && typeof window.clearTimeout==="function")window.clearTimeout(speechWatch);
    speechWatch=null;
    updateAudioStatus("🔊 Playing: "+text+" • device-generated voice, not a recorded child voice.");
   };
   utterance.onend=()=>{
    if(speechWatch!==null && typeof window.clearTimeout==="function")window.clearTimeout(speechWatch);
    speechWatch=null;activeSpeech=null;
    updateAudioStatus("Playback finished: "+text+". If you heard nothing, try Safari and turn up media volume.");
   };
   utterance.onerror=()=>{
    if(speechWatch!==null && typeof window.clearTimeout==="function")window.clearTimeout(speechWatch);
    speechWatch=null;activeSpeech=null;
    updateAudioStatus("🔇 Speech did not play. Please open the link directly in Safari, increase media volume and tap the blue Hear button. You may ask an adult to read the word instead.");
   };
   updateAudioStatus("🔊 Trying to play: "+text+". If silent, use Safari instead of the app's web viewer.");
   // Direct button click calls engine.speak synchronously, which matters for iOS activation.
   if(engine.paused && typeof engine.resume==="function")engine.resume();
   engine.speak(utterance);
   // Some embedded iOS webviews expose speechSynthesis but never fire events.
   if(typeof window.setTimeout==="function"){
    speechWatch=window.setTimeout(()=>{
      if(!began && activeSpeech===utterance){
       updateAudioStatus("🔇 No playback was detected here. Open this page directly in Safari and try again. Check your phone's media volume.");
       speechWatch=null;
      }
    },3500);
   }
  }catch(_){
   updateAudioStatus("🔇 This browser couldn't start device speech. Copy the page link into Safari or ask an adult to read the word.");
  }
 }
 E.sayFirst.addEventListener("click",()=>speak(family().words[0].word,"en-GB",1));
 E.saySecond.addEventListener("click",()=>speak(family().words[1].word,"en-GB",.72));
 E.sayArabic.addEventListener("click",()=>speak(family().words.map(w=>w.ar).join(". "),"ar-QA",.88));
 E.hearWord0.addEventListener("click",()=>speak(family().words[0].word,"en-GB",.92));
 E.hearWord1.addEventListener("click",()=>speak(family().words[1].word,"en-GB",.92));
 E.audioTest.addEventListener("click",()=>speak("ring","en-GB",.92));
 E.gardenHear0.addEventListener("click",()=>speak(family().words[0].word,"en-GB",.9));
 E.gardenHear1.addEventListener("click",()=>speak(family().words[1].word,"en-GB",.9));
 render(false);
})();