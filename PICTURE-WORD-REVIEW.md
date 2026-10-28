# Picture Word Explorer — adult review and testing

**URL after deployment:** https://rahman1388.github.io/Little-learners-review-staging/picture-word-explorer.html

This is an **independent, supplementary Grade 2 adult-review pilot**, **not** a Qatar Ministry-approved product, a child-ready game or verified curriculum alignment. It reuses the existing draft phonics word families in `grade2-phonics-pathway.js`, without importing copyrighted textbook pages. All imagery consists of **emoji placeholders**; some represent actions or related objects rather than literal photographs. Arabic wording is provisional.

## Eight families in the existing pilot
| Module | Family | English example pair | Arabic draft words |
| --- | --- | --- | --- |
| 2 | -ing | ring, sing | خاتم، يغنّي |
| 2 | -and | hand, sand | يد، رمل |
| 3 | -all | ball, wall | كرة، جدار |
| 3 | -ack | black, snack | أسود، وجبة خفيفة |
| 4 | -ain | rain, train | مطر، قطار |
| 4 | -ink | pink, sink | وردي، حوض غسيل |
| 5 | -ay | day, play | يوم، يلعب |
| 5 | -ick | sick, kick | مريض، يركل |

## Owner / teacher functional test (all eight families)
1. Open the page from the new **Picture Word Explorer** link on the review hub; confirm large picture cues and both languages.
2. Pick a family using the selector. **Step 1 See:** verify its two examples and colored onset and ending. Note the first *part* may be a blend of two letters (bl, sn, tr, pl).
3. Press **Next**. **Step 2 Match:** select the wrong word first and confirm **Next** stays disabled, then choose the correct word for the second picture.
4. **Step 3 Build:** choose the wrong ending first; then select the correct ending. Confirm the correct ending moves to **Step 4 Celebrate**.
5. Press **Previous** to re-enter the quiz, and **Restart** to return to Step 1 without retaining the prior answer.
6. Switch to a different family; previous answer feedback must not carry over. Repeat for all eight families.
7. Try **Word 1 normal**, **Word 2 slow**, and **Arabic labels**. The voices are browser/device synthesized and may be missing. There is no installed child voice, microphone, speech recognition or pronunciation assessment.
8. Test laptop keyboard (Tab, Shift+Tab, Enter/Space), iPhone Safari layout and VoiceOver reading order/quiz announcement on a physical device.

## Expert approval gates
- **Grade 2 educator:** check appropriateness of word selection, pictures, phonetic blending, directions and distractors. Inspect the semantic gap between object/action and emoji (e.g., singing microphone, snack apple, sink tap and kick football).
- **Fluent Arabic educator:** approve all Arabic terms and instruction grammar, and right-to-left presentation. Correct any unnatural translation before student-facing release.
- **Accessibility:** actual mobile VoiceOver, focus, color independence and tap targets must be verified. Automated and simulated DOM checks are not certification.
- **Child safeguarding/privacy:** no accounts, analytics, cookies, server posting, student data entry, stored scores or recordings in this pilot. Use only adult synthetic examples for review.
- **Release:** preserve the original Academy main; only change production with explicit owner agreement and completed sign-offs.

## Technical check recorded on 28 October 2026
The prototype's script was parsed and all eight family journeys were executed with a simulated DOM: first render, wrong/correct Match, wrong/correct Build, completion, Previous and Restart. Three voice buttons were invoked with mocked English/Arabic voice data. **These tests do not establish that actual device audio played or that a teacher approved the content.**


## 28 October 2026 — Word Family Garden and quiz integrity review
- **Eight interactive flower buttons:** choose any family without having to use only the dropdown. Selected family has an accessible pressed state. After completing Step 4, a check mark marks the family as **practised during this visit**, not mastered.
- **Temporary practice count:** shows how many of the eight families were tried. No local storage, cookies, accounts, server data or score. Reopening/reloading resets the flower marks; restarting the *current family* leaves already-tried flowers marked during that visit.
- **No answer leakage in quiz prompts:** Match no longer displays the correct English label in its question. Build prompts show the initial letters and picture/Arabic meaning but no complete English answer.
- **Varied answer positions:** correct buttons appear in first, middle or third positions across families rather than always in the same position. The order is deterministic and repeated within a family, so it is practice rather than a robust assessment.
- **Accessible progress:** the existing four-step progress bar and family badge are now connected to the activity code. The existing "Try another family" completion button now works.

### Manual checks to repeat on real devices
1. Pick `-and` from the flower button; confirm dropdown, family badge, step progress and two pictures all change to hand/sand.
2. Proceed to Match: confirm the question does **not** say "sand" in English; a wrong choice disables Next and the correct choice enables it.
3. Proceed to Build: the instructions must **not** display the entire English word "hand" as the answer. Wrong ending blocked, "and" accepted.
4. Finish and check the flower now has a check mark and the progress count increased to "1 of 8".
5. Use "Try another family" to select the next not-yet-practised flower. Complete all eight and verify "8 of 8" (this is **not** a mastery score).
6. Reload: confirm check marks reset. Try keyboard/VoiceOver family buttons, quiz feedback, audio and movement between sections on a real iPhone.
7. Verify natural Arabic translations, spoken words, and appropriateness with qualified reviewers; emoji are temporary placeholders.

### Automated-style simulation result (not browser certification)
All eight families passed repeated wrong/right Match and Build checks, flower navigation, practise-only marks, a full eight-flower count, a next-family wrap, restart, all linked HTML IDs, and simulated English/Arabic speech button calls. Correct-option positions were spread across all three positions in both quizzes. **Actual Safari, VoiceOver, native Arabic educator approval and live voice quality remain untested.**
