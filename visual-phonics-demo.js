"use strict";
/* Adult staging proof-of-concept. No pupil data, storage, analytics, recording, or scoring. */
(() => {
  const entries = Object.freeze({
    ring: Object.freeze({ word:"ring", first:"r", ending:"ing", icon:"💍", label:"a ring", arabic:"خاتم",
      distractors:["hand","ball"], match:"sing",
      startAr:"انظر إلى صورة الخاتم. اطلب من شخص بالغ قراءة الكلمة الإنجليزية.",
      blendAr:"الحرف الأول r، والنهاية ing. اجمع الجزأين لتقرأ ring.",
      quizAr:"اختر كلمة تنتهي بالأحرف ing." }),
    sing: Object.freeze({ word:"sing", first:"s", ending:"ing", icon:"🎤", label:"sing", arabic:"يغني",
      distractors:["sand","wall"], match:"ring",
      startAr:"انظر إلى رمز الغناء. اطلب من شخص بالغ قراءة الكلمة الإنجليزية.",
      blendAr:"الحرف الأول s، والنهاية ing. اجمع الجزأين لتقرأ sing.",
      quizAr:"اختر كلمة تنتهي بالأحرف ing." }),
    hand: Object.freeze({ word:"hand", first:"h", ending:"and", icon:"✋", label:"a hand", arabic:"يد",
      distractors:["sing","ball"], match:"sand",
      startAr:"انظر إلى صورة اليد. اطلب من شخص بالغ قراءة الكلمة الإنجليزية.",
      blendAr:"الحرف الأول h، والنهاية and. اجمع الجزأين لتقرأ hand.",
      quizAr:"اختر كلمة تنتهي بالأحرف and." })
  });
  const $ = id => document.getElementById(id);
  const elements = {
    sample:$("sampleWord"),progress:$("progress"),icon:$("pictureIcon"),
    iconLabel:$("pictureLabel"),wordDisplay:$("wordDisplay"),
    title:$("stageTitle"),en:$("stageEn"),ar:$("stageAr"),
    quiz:$("quizWrap"),choices:$("quizChoices"),feedback:$("quizFeedback"),
    complete:$("completeMessage"),previous:$("prevStep"),next:$("nextStep"),
    reset:$("restart"),normal:$("speakNormal"),slow:$("speakSlow"),
    arabic:$("speakArabic"),voiceStatus:$("voiceStatus")
  };
  if (Object.values(elements).some(x => !x)) return;
  let step = 0;
  let correct = false;
  function item() { return entries[elements.sample.value] || entries.ring; }
  function clearVoices() {
    try { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); } catch (_) { /* optional enhancement */ }
  }
  function setWordVisual(entry) {
    elements.icon.textContent = entry.icon;
    elements.iconLabel.textContent = entry.label + " — " + entry.arabic;
    elements.wordDisplay.setAttribute("aria-label",entry.word);
    elements.wordDisplay.replaceChildren();
    const start=document.createElement("span");
    start.className="startSound";
    start.textContent=entry.first;
    const ending=document.createElement("span");
    ending.className="wordFamily";
    ending.textContent=entry.ending;
    elements.wordDisplay.append(start,ending);
  }
  function createChoices(entry) {
    elements.choices.replaceChildren();
    const choices=[entry.match,...entry.distractors];
    for (const word of choices) {
      const button=document.createElement("button");
      button.type="button";
      button.textContent=word;
      button.setAttribute("aria-pressed","false");
      button.addEventListener("click",()=>{
        if(step!==2) return;
        elements.choices.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
        correct=(word===entry.match);
        elements.feedback.textContent=correct?"Correct word family! / إجابة صحيحة!":"Try again. Look at the blue ending. / حاول مرة أخرى. انظر إلى نهاية الكلمة باللون الأزرق.";
        elements.next.disabled=!correct;
      });
      elements.choices.appendChild(button);
    }
  }
  function render(focus) {
    const entry=item();
    setWordVisual(entry);
    elements.progress.textContent="Step "+(step+1)+" of 4 / الخطوة "+(step+1)+" من 4";
    const descriptions=[
      ["1. Look and name / انظر وسمِّ","Look at the picture. Ask an adult to read '"+entry.word+"' aloud.",entry.startAr],
      ["2. Blend the parts / اجمع أجزاء الكلمة","Notice the first letter '"+entry.first+"' and the blue ending '"+entry.ending+"'. Join them to read '"+entry.word+"'.",entry.blendAr],
      ["3. Find a word family / اختر كلمة من المجموعة","Which word ends with '"+entry.ending+"' just like '"+entry.word+"'?",entry.quizAr],
      ["4. Celebrate learning / أحسنت","You noticed a word-family pattern! Try another sample word or restart.","أحسنت! تعرّفت على مجموعة من الأحرف المشتركة. جرّب كلمة أخرى."]
    ];
    elements.title.textContent=descriptions[step][0];
    elements.en.textContent=descriptions[step][1];
    elements.ar.textContent=descriptions[step][2];
    elements.quiz.hidden=(step!==2);
    elements.complete.hidden=(step!==3);
    if(step===2){createChoices(entry);elements.feedback.textContent="Choose one answer. / اختر إجابة واحدة.";correct=false;}
    elements.previous.disabled=step===0;
    elements.next.disabled=(step===3 || step===2);
    elements.next.textContent=step===2?"Finish / إنهاء →":"Next / التالي →";
    if(focus) elements.title.focus({preventScroll:true});
  }
  elements.sample.addEventListener("change",()=>{clearVoices();step=0;render(false);elements.voiceStatus.textContent="Word changed. Choose an optional voice button or ask an adult to read.";});
  elements.previous.addEventListener("click",()=>{if(step>0){clearVoices();step--;render(true);}});
  elements.next.addEventListener("click",()=>{if(step<3 && (step!==2 || correct)){clearVoices();step++;render(true);}});
  elements.reset.addEventListener("click",()=>{clearVoices();step=0;render(true);elements.voiceStatus.textContent="Ready. / جاهز";});
  function speak(message,lang,rate) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      elements.voiceStatus.textContent="This browser has no speech synthesis. Ask an adult to read the words aloud.";
      return;
    }
    const engine=window.speechSynthesis;
    engine.cancel();
    const all=engine.getVoices();
    const voice=all.find(v=>v.lang.toLowerCase().startsWith(lang==="ar-QA"?"ar":"en"));
    if(lang==="ar-QA" && !voice) {
      elements.voiceStatus.textContent="Arabic device voice unavailable. / الصوت العربي غير متاح. Please read the on-screen Arabic text.";
      return;
    }
    const utterance=new SpeechSynthesisUtterance(message);
    utterance.lang=voice?voice.lang:lang;
    if(voice) utterance.voice=voice;
    utterance.rate=rate;
    utterance.pitch=1;
    utterance.onerror=()=>{elements.voiceStatus.textContent="Audio did not play. Please use adult-read guidance.";};
    engine.speak(utterance);
    elements.voiceStatus.textContent="Requested "+(lang==="ar-QA"?"Arabic instruction":"English word")+" in a device-generated voice (not a child's recording).";
  }
  elements.normal.addEventListener("click",()=>speak(item().word,"en-GB",1));
  elements.slow.addEventListener("click",()=>speak(item().word,"en-GB",0.72));
  elements.arabic.addEventListener("click",()=>speak(step===0?item().startAr:step===1?item().blendAr:step===2?item().quizAr:"أحسنت!","ar-QA",0.85));
  render(false);
})();