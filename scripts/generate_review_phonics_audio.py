#!/usr/bin/env python3
"""Generate temporary adult-review English phonics audio from eSpeak.

NOT a child's voice; not educator-approved pronunciation. Requires local
`espeak` and `ffmpeg`; no third-party audio service or child data.
The text list is fixed, original to our staging prototype.
"""
from pathlib import Path
from tempfile import TemporaryDirectory
import subprocess

WORDS = (
    "ring", "sing", "hand", "sand", "ball", "wall", "black", "snack",
    "rain", "train", "pink", "sink", "day", "play", "sick", "kick",
)
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "audio" / "review-english"
OUT.mkdir(parents=True, exist_ok=True)

with TemporaryDirectory() as tmp:
    for word in WORDS:
        wav = Path(tmp) / (word + ".wav")
        mp3 = OUT / (word + ".mp3")
        subprocess.run(
            ["espeak", "-v", "en-gb", "-s", "155", "-p", "52", "-a", "170",
             "-w", str(wav), word],
            check=True,
        )
        subprocess.run(
            ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
             "-i", str(wav),
             "-af", "silenceremove=start_periods=1:start_threshold=-45dB:"
             "start_silence=0.04:stop_periods=1:stop_duration=0.12:"
             "stop_threshold=-45dB,apad=pad_dur=0.12",
             "-ac", "1", "-ar", "24000", "-codec:a", "libmp3lame",
             "-b:a", "24k", str(mp3)],
            check=True,
        )
        print(f"{word}: {mp3.stat().st_size} bytes")

print("Generated temporary synthetic pronunciation assets for adult QA.")
