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
  previous:$("previous"),next:$("next"),restart:$("restart")
 };
 if(Object.values(E).some(v=>!v))return;
 const progress=[0,1,2,3].map(i=>$("stepLabel"+i));
 if(progress.some(x=>!x))return;
 let stage=0,passed=false,quizTarget=0;
 const family=()=>FAMILIES[E.family.value]||FAMILIES.ing;
 function cancelSpeech(){try{if("speechSynthesis" in window)window.speechSynthesis.cancel()}catch(_){/*voice optional*/}}
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
  progress.forEach((v,i)=>{if(i===stage)v.setAttribute("aria-current","step");else v.removeAttribute("aria-current")});
  E.see.hidden=stage!==0;E.quiz.hidden=!(stage===1||stage===2);E.complete.hidden=stage!==3;
  if(stage===0){
   E.heading.textContent="1. Look at two words / انظر إلى كلمتين";
   E.instructionEn.textContent="Ask an adult to read '"+a.word+"' and '"+b.word+"'. Both have the written ending -"+f.end+".";
   E.instructionAr.textContent="انظر إلى الكلمتين واستمع إلى قراءتهما من شخص بالغ. تنتهيان بالحروف نفسها: "+f.end+".";
   for(const [i,w] of f.words.entries()){E["emoji"+i].textContent=w.icon;E["label"+i].textContent=w.ar+" — "+w.label;parts(E["split"+i],w)}
  } else if(stage===1){
   // Rotate the target within families for meaningful testing of both examples.
   quizTarget=1;const chosen=f.words[quizTarget];
   E.heading.textContent="2. Match the picture / طابق الصورة";
   E.instructionEn.textContent="Which English word matches the picture and Arabic meaning?";
   E.instructionAr.textContent="أي كلمة إنجليزية تناسب الصورة والمعنى العربي؟";
   E.icon.textContent=chosen.icon;
   E.prompt.textContent="Choose the word that means: "+chosen.label;
   E.quizAr.textContent="المعنى بالعربية: "+chosen.ar;
   makeAnswers([f.words[0].word,f.wrong,f.words[1].word],chosen.word);
  } else if(stage===2){
   const chosen=f.words[0];
   E.heading.textContent="3. Build the word / ركّب الكلمة";
   E.instructionEn.textContent="Complete '"+chosen.start+" + ___' to build '"+chosen.word+"'. Find the matching word-family ending.";
   E.instructionAr.textContent="اختر الحروف الناقصة لإكمال الكلمة: "+chosen.word+".";
   E.icon.textContent=chosen.icon;
   E.prompt.textContent="Choose the ending for: "+chosen.start+" + ____";
   E.quizAr.textContent=chosen.ar+" — نهاية الكلمة";
   makeAnswers([f.otherEnd[0],f.end,f.otherEnd[1]],f.end);
  } else {
   E.heading.textContent="4. Celebrate your practice / أحسنت";
   E.instructionEn.textContent="You practised two words ending in -"+f.end+".";
   E.instructionAr.textContent="تدرّبت على كلمتين تنتهيان بالحروف: "+f.end+".";
   E.completeText.textContent="You practised '"+a.word+"' and '"+b.word+"'. Choose another word family to keep exploring.";
  }
  E.previous.disabled=stage===0;
  E.next.disabled=stage===3||(stage===1||stage===2)&&!passed;
  E.next.textContent=stage===2?"Finish / إنهاء →":"Next / التالي →";
  if(shouldFocus)E.heading.focus({preventScroll:true});
 }
 E.family.addEventListener("change",()=>{cancelSpeech();stage=0;passed=false;render(false);E.soundStatus.textContent="New word family selected. / تم اختيار مجموعة كلمات جديدة."});
 E.previous.addEventListener("click",()=>{if(stage>0){cancelSpeech();stage--;render(true)}});
 E.next.addEventListener("click",()=>{if(stage<3&&(stage===0||passed)){cancelSpeech();stage++;passed=false;render(true)}});
 E.restart.addEventListener("click",()=>{cancelSpeech();stage=0;passed=false;render(true);E.soundStatus.textContent="Ready to practice again. / جاهز للتدريب مرة أخرى."});
 function speak(text,lang,rate){
  if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window)){E.soundStatus.textContent="Audio is not supported. Ask an adult to read the labels.";return}
  try{
   const engine=window.speechSynthesis;engine.cancel();
   const voices=engine.getVoices();
   const prefix=lang.startsWith("ar")?"ar":"en";
   const compatible=voices.filter(x=>typeof x.lang==="string"&&x.lang.toLowerCase().startsWith(prefix));
   const selected=compatible.find(x=>x.lang.toLowerCase()===lang.toLowerCase())||compatible[0];
   if(prefix==="ar"&&!selected){
    E.soundStatus.textContent="No Arabic voice is currently listed. / لا يتوفر صوت عربي الآن. Try again later or have an adult read the text.";
    return;
   }
   const utterance=new SpeechSynthesisUtterance(text);utterance.lang=selected?selected.lang:lang;if(selected)utterance.voice=selected;utterance.rate=rate;utterance.pitch=1;
   utterance.onstart=()=>{E.soundStatus.textContent="Device voice playing; it is not a recorded child voice.";};
   utterance.onend=()=>{E.soundStatus.textContent="Audio ended. Check pronunciation with an adult teacher.";};
   utterance.onerror=()=>{E.soundStatus.textContent="Could not play audio on this device. Please use adult reading.";};
   E.soundStatus.textContent="Requested audio; playback depends on device settings.";engine.speak(utterance);
  }catch(_){E.soundStatus.textContent="Audio is unavailable. Please ask an adult to read the words."}
 }
 E.sayFirst.addEventListener("click",()=>speak(family().words[0].word,"en-GB",1));
 E.saySecond.addEventListener("click",()=>speak(family().words[1].word,"en-GB",.72));
 E.sayArabic.addEventListener("click",()=>speak(family().words.map(w=>w.ar).join(". "),"ar-QA",.88));
 render(false);
})();