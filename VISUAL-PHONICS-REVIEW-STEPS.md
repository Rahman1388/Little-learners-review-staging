# Visual Phonics Mini-Lesson — Adult Review Plan

Page: `visual-phonics-demo.html`

## What this is
A **small interactive visual prototype**, not a recorded video or completed child-facing phonics product. It introduces the word family endings `-ing`, `-and`, `-all`, and `-ain` using a picture cue, contrasting letter colors, a four-step adult-guided sequence, optional browser-generated speech, and a one-answer matching activity. It does **not** assess pronunciation or store progress.

It is publicly viewable on the separately approved GitHub Pages **adult staging** site. No identifying child information should be entered or shared. Main Academy is unchanged.

## Owner / teacher smoke checks (laptop and iPhone Safari)
1. Open the page from the staging home navigation; confirm large picture and legible letters.
2. Select **ring**; progress starts at Step 1/4; blue `ing` contrasts with the first letter `r`.
3. Click Next through Step 2/4 (blend) then Step 3/4 (word family).
4. Choose **hand** on the word-family quiz; it must ask for another choice.
5. Choose **sing**; the quiz should accept it and allow Finish to Step 4/4.
6. Select **sing** sample, repeat; **ring** is the matching `-ing` answer.
7. Select **hand** sample; **sand** is the matching `-and` answer.
8. Select **ball**; choose **wall** from the `-all` family.
9. Select **rain**; choose **train** from the `-ain` family.
10. Use Previous and Restart; progress and answer state must reset, with no progress saved between page visits.
11. Try English **normal** and **slow** buttons. Evaluate on actual device; voices may vary, and real child voices are **not installed**.
12. Try Arabic device-voice instruction. If the device returns an empty voice list or no Arabic voice, the page should explain the limitation and leave readable Arabic instructions as fallback.
13. Test keyboard Tab, Enter/Space on controls; test a small mobile screen and reduced-motion preference.
14. On iPhone test actual VoiceOver headings, controls, focus, group names and feedback announcements. Do not mark accessibility approved from screenshots alone.

## Expert gates
- Grade 2 teacher: check `ring / sing / hand / sand` selections, word-family grouping, clarity, motivation and whether a picture + colors meaningfully aid teaching.
- Fluent Arabic educator: check all Arabic translations, instruction phrasing, dialect suitability for Qatar and right-to-left rendering.
- Speech specialist/educator: review sound/phoneme quality and accent; device TTS is not a replacement for an edited, licensed, appropriately reviewed voice dataset.
- Parent/adult: assess clarity, colors, and tapping on a phone, without identifying child details.

## Go/no-go
Owner smoke testing and one clean GitHub Pages deploy are **necessary but insufficient** for launch. Collect teacher/Arabic/iPhone findings, revise the staging page, then re-test. Do not merge into source app `main` or make Ministry/curriculum endorsement claims.

## 28 October follow-up
The pilot expanded from three to **five** original sample words (ring, sing, hand, ball, rain), with matches sing/ring, sand, wall and train. The word-family ending also appears in text to avoid reliance on color. The missing `sampleHelp` screen-reader description was added. Device voice status now distinguishes requested, started, completed and failed playback; lack of an Arabic voice remains a device limitation. These are static implementation improvements, **not** a recorded successful physical-device test. Reviewers should check all five words, the bilingual text, VoiceOver and device audio.
