# Little Learning Academy — 16-word replacement voice recording protocol
**Created:** 30 October 2026  
**Scope:** Adult-only Grade 2 phonics staging preview. **Not approved for children.**

## Decision
The current 16 short synthetic English MP3 samples are all **ON HOLD** following owner feedback that they are unclear on iPhone. Frame-level checks found 24 kHz sampling and 24 kbps speech frames, which does not meet our preferred source quality. **Do not upsample or re-encode these low-bitrate files and call them repaired.** Replace from clean original source only, then verify individually.

The existing recorded samples and all production Academy assets must remain intact until a replacement set has passed listening, pedagogical, accessibility, and real-device checks. The public staging site is *not* the production children’s app.

## Pronunciation model
- Use **consistent, standard British English** for the first review batch, with an English-language educator reviewing every target. A US English version may be produced later with *separate* human evaluation; do not mix accent systems unpredictably.
- Suggested pronunciations below are **review guides**, not a substitute for native-speaker assessment. A native teacher must check accent, articulation, teaching appropriateness and word meaning. Whole-word recordings do **not** prove phoneme-by-phoneme blending.
- Adult narrator is acceptable and often clearer for instruction; only describe audio as a *child's voice* if a genuine, legally authorised child recording is used (not recommended as the first source, due to child safeguarding and consent requirements). No need for a child voice to deliver child-friendly teaching.

| Family | File | Approx. UK pronunciation | Listen closely for | Arabic meaning on staging (needs review) |
|---|---|---|---|---|
| -ing | `ring` | /rɪŋ/ | Initial /r/, clear final /ŋ/ (not `ring-guh`) | خاتم |
| -ing | `sing` | /sɪŋ/ | Audible /s/, /ŋ/ ending; do not add hard /g/ | يغنّي |
| -and | `hand` | /hænd/ | Initial /h/ and final /nd/ not clipped | يد |
| -and | `sand` | /sænd/ | Clear /s/, final /nd/ not clipped | رمل |
| -all | `ball` | /bɔːl/ | Clear initial /b/, long vowel + /l/; regional variation expected | كرة |
| -all | `wall` | /wɔːl/ | Clear initial /w/, distinct from `ball` | جدار |
| -ack | `black` | /blæk/ | Initial consonant cluster /bl/ and final /k/ | أسود |
| -ack | `snack` | /snæk/ | Initial /sn/ cluster and final /k/ | وجبة خفيفة |
| -ain | `rain` | /reɪn/ | Correct /r/ and vowel glide /eɪ/, final /n/ | مطر |
| -ain | `train` | /treɪn/ | Cluster /tr/ and vowel glide, final /n/ | قطار |
| -ink | `pink` | /pɪŋk/ | Crisp /p/, final /ŋk/ cluster not lost | وردي |
| -ink | `sink` | /sɪŋk/ | Clear /s/, final /ŋk/ cluster not lost | حوض غسيل |
| -ay | `day` | /deɪ/ | /d/ and full /eɪ/ glide | يوم |
| -ay | `play` | /pleɪ/ | /pl/ consonant cluster + vowel glide | يلعب |
| -ick | `sick` | /sɪk/ | Short /ɪ/, clear final /k/ | مريض |
| -ick | `kick` | /kɪk/ | Both /k/ releases audible, not clipped | يركل |

## How to make replacement source clips
1. **Obtain permission:** Use an adult fluent speaker/teacher who has agreed in writing that the recordings may be distributed in the app and reused in future updates. Record who granted rights privately; do not commit private identifying details to GitHub. Avoid using unlicensed third-party TTS or commercial course audio.
2. **Recording environment:** Quiet indoor room, no classroom noise, no music or effects. Consistent microphone position. Speak each word naturally and clearly, **once** in its own recording, without an artificial “uh” after final consonants or an exaggerated robotic pace. Keep word-end consonants audible.
3. **Source format:** Record or export **WAV PCM** at 44.1 or 48 kHz, 16- or 24-bit, mono preferred. Retain uncompressed masters privately, separate from the public staging repository. Leave brief leading/trailing padding (roughly 0.15–0.3 seconds) and avoid clicks, hard clipping, and excessive noise reduction.
4. **Distribution export:** Create MP3 at **at least 96–128 kbps** (mono recommended) from the *original* WAV for web compatibility. Confirm effective bitrate, no silence-only files, no tail cut-offs and reasonably consistent perceived loudness. The bitrate is a technical minimum, **not** an educational quality score.
5. **Review each word:** Compare with the phonetic guide and the pictured meaning, check initial/final consonants, distinguish words that sound alike, and reject missing or extra sounds. Teacher must judge normal and slow listening as intelligible **without relying on captions**.
6. **Review on real devices:** iPhone Safari with built-in speaker (not only ChatGPT's in-app browser), Android Chrome, and laptop. Verify native audio playback and flower-button audio separately. Check for audio-routing/Bluetooth problems and for tap controls being responsive.
7. **Privacy:** Do **not** collect, store, or publish child voice recordings or pupil information. Adult teacher approval should be documented anonymously with role/date and word-level decision.
8. **Release:** Only integrate replacements on a separate review branch after owner acceptance, repeat automated tests, compare with the old recordings, and confirm staging deployment. Roll back if any pronunciation is worse. Production release requires separate approval.

## Track the replacements
| Word | Clean source available? | Pronunciation reviewer | iPhone playback | Decision |
|---|---|---|---|---|
| ring | Pending | Pending | Pending | HOLD |
| sing | Pending | Pending | Pending | HOLD |
| hand | Pending | Pending | Pending | HOLD |
| sand | Pending | Pending | Pending | HOLD |
| ball | Pending | Pending | Pending | HOLD |
| wall | Pending | Pending | Pending | HOLD |
| black | Pending | Pending | Pending | HOLD |
| snack | Pending | Pending | Pending | HOLD |
| rain | Pending | Pending | Pending | HOLD |
| train | Pending | Pending | Pending | HOLD |
| pink | Pending | Pending | Pending | HOLD |
| sink | Pending | Pending | Pending | HOLD |
| day | Pending | Pending | Pending | HOLD |
| play | Pending | Pending | Pending | HOLD |
| sick | Pending | Pending | Pending | HOLD |
| kick | Pending | Pending | Pending | HOLD |

**Review categories:** Accept / Revise / Hold. Neither a successful code test nor “Clear” from one listener means independently verified phonics teaching quality.

## Useful links
- [16-word listener checklist](audio-clarity-review.html)
- [Current audio frames and duration audit](AUDIO-QUALITY-AUDIT-2026-10-30.md)
- [Simple iPhone native audio controls](iphone-audio-check.html)
