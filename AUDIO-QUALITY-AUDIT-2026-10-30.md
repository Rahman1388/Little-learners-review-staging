# 30 October 2026 — Full 16-word MP3 technical audit

## Result and release gate

**Status: HOLD for instructional pronunciation.** Every one of the sixteen staging MP3 files was fetched from the GitHub repository as base64 data and checked at the MPEG frame level. All exist and have parseable MP3 audio frames. **None has been independently certified for audible clarity or accurate phonics.** The owner has reported that the current samples sound unclear on an iPhone; that feedback is an open quality issue.

Each file has a 24 kHz mono-compatible MPEG-2 Layer III frame structure, and **the speech frames are encoded at just 24 kbps** (plus one initial 64 kbps metadata/frame header). This very low data rate can make consonants and word endings sound muddy. Durations are under one second for every word, which also leaves little space for deliberate word onset and offset padding. Whether any phoneme is actually cut off or mispronounced requires human listening and waveform review of the original sources; the bitstream does not prove that.

| Family | Word | File duration (approx.) | Existing MP3 review |
|---|---|---:|---|
| -ing | ring | 0.768 s | Present, decodable frame structure; pending human review |
| -ing | sing | 0.744 s | Present, decodable frame structure; pending human review |
| -and | hand | 0.768 s | Present, decodable frame structure; pending human review |
| -and | sand | 0.768 s | Present, decodable frame structure; pending human review |
| -all | ball | 0.720 s | Present, decodable frame structure; pending human review |
| -all | wall | 0.744 s | Present, decodable frame structure; pending human review |
| -ack | black | 0.672 s | Present, decodable frame structure; pending human review |
| -ack | snack | 0.768 s | Present, decodable frame structure; pending human review |
| -ain | rain | 0.768 s | Present, decodable frame structure; pending human review |
| -ain | train | 0.840 s | Present, decodable frame structure; pending human review |
| -ink | pink | 0.744 s | Present, decodable frame structure; pending human review |
| -ink | sink | 0.792 s | Present, decodable frame structure; pending human review |
| -ay | day | 0.648 s | Present, decodable frame structure; pending human review |
| -ay | play | 0.744 s | Present, decodable frame structure; pending human review |
| -ick | sick | 0.672 s | Present, decodable frame structure; pending human review |
| -ick | kick | 0.672 s | Present, decodable frame structure; pending human review |

**Scope:** These counts refer only to the 16 English whole-word audio clips at `audio/review-english/*.mp3` on the **separate adult staging site**. Arabic device speech is NOT among these MP3s and is unverified. Not all Academy recordings are included; the main educational app has a separate audio inventory. We did not replace or edit existing MP3s and did not promote staging to production.

## Listening and correction process

1. Adult reviewer starts at [16-word audio clarity review](./audio-clarity-review.html) (or [static iPhone test](./iphone-audio-check.html)); open in standalone Safari on iPhone.
2. Listen to every original word and rate **Clear / Unclear / Silent / Wrong sound / Unsure**; add exact issues such as trailing consonant lost or pronunciation not distinguishable from a similar word. Report an unexpected audio error separately. Use Copy report to paste notes into the private project conversation; page stores no ratings, identity or personal data.
3. **Record replacement audio from a capable source**, ideally a licensed, natural and unhurried native-speaking educator. Obtain permission/licensing for distribution. Record uncompressed clean source such as 44.1 kHz WAV, 16-bit PCM or better, with deliberate consonants and brief lead-in/out silence. Avoid excessive dynamic processing, reverb or music under words. When encoding final MP3, use a suitable high-quality output (for example 96–128 kbps mono or higher when appropriate), check actual bitrate and playback on Safari/iOS.
4. Auditory review must separately assess the correct word, consonant endings, accent and child intelligibility, and phonics blending suitability. A spoken whole word is **not** a separately validated isolated phoneme. Compare English pronunciations consistently using the selected pronunciation model.
5. Only after listener approval update named audio files and versioned URLs in a separate review branch, test all 16 words on desktop and physical iPhone Safari, check other UI actions, and obtain educational specialist review before publishing to children. If a candidate fails, keep it on HOLD.

**Do not re-encode the current 24 kbps MP3s at a higher bitrate and claim improved clarity.** Lost spectral detail cannot be recovered by transcoding. Do not substitute another unverified synthetic voice or represent adult synthetic speech as a real child voice. No Ministry, teacher or native-Arabic approval has been received for this batch.

## Staging updates in this checkpoint

- Added `audio-clarity-review.html` + `audio-clarity-review.js`: native MP3 players for all sixteen words, isolated clarity ratings, no browser storage/network submissions, copy-to-chat report and reset.
- Linked the new review from `index.html` and `iphone-audio-check.html`.
- Existing MP3s and all original Academy production files remain unchanged.
