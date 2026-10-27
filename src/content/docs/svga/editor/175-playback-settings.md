---
title: "Set Default Playback Settings & Triggers"
slug: "docs/svga/editor/playback-settings"
sidebar:
  order: 175
draft: false
description: "Set how long, how many times and what starts it once, in the editor, and forget about it: the settings travel inside the file, every player reads them, and\u2026"
---

Set *how long*, *how many times* and *what starts it* once, in the editor, and forget about
it: the settings travel inside the file, every player reads them, and the animation plays
correctly with no configuration on the page.

This page is the **editor** side: which control writes which value. To change any of it at
runtime, from component props or the player API, see
[Playback settings & triggers](/docs/svga/player-library/playback-and-triggers). For the editor itself —
every panel, tool and dialog — see the **[full editor manual](https://pixodesk.com/docs)**.

These are settings of the whole document, not of an element, so the panel shows them when
**nothing is selected** — deselect everything (click an empty part of the canvas), or select
the root `<svg>` element. Everything here is written into the document's `animator` block on
save.

## Timing

| Control | Writes | Notes |
|---|---|---|
| **Duration** | `timeline.outTime` (ms) | the end of the content window — one pass plays from 0 to it; keyframe times are absolute |
| **In Time** / **Play Duration** | `timeline.inTime` / `timeline.playDuration` (ms) | the window's start, and the window remapped to wall time (slower or faster) |
| **Delay** | `timeline.delay` (ms) | wait before the first iteration starts |
| **Loop** · **Iterations** | `timeline.iterations` | a number, or “infinite” |
| **Direction** | `timeline.iterationDirection` | “normal”, “reverse”, “alternate” (ping-pong), “alternateReverse” |
| **Frame rate** | `timeline.frameRate` | a target rate for the frame-loop engine only; leave it unset to run uncapped |

## Engine

**Engine** writes `timeline.engine`, and decides how the animated attributes actually get
updated in a browser:

- **Auto** (default) — the browser's own machinery (the Web Animations API; for a
  scroll-driven animation also its scroll timeline), falling back to the player's frame loop by
  itself when the document animates something the browser cannot express.
- **Native** — the browser only: Web Animations API, and the browser's scroll timeline for a
  scroll-driven animation.
- **JS** — the player's own `requestAnimationFrame` loop (and its own scroll measurement);
  identical in every browser, honours *frame rate*.

Leave it on **auto** unless you need a guarantee. React Native ignores it — playback there is
always native-driven.

## Playback triggers

A trigger lists **which events play, stop, pause and resume** the animation — four lists over
the same four events. The **Playback Triggers** section writes `timeline.trigger`:

| Control | Writes | Acts while the animation is… |
|---|---|---|
| **Plays on** | `trigger.playStart` | stopped — a play, per *When played* below |
| **Stops on** | `trigger.playStop` | playing or paused — a stop, per *When stopped* below |
| **Pauses on** | `trigger.pauseStart` | playing — freezes the current frame |
| **Resumes on** | `trigger.pauseStop` | paused — continues; left empty, the *Plays on* events resume it |

Each list ticks any of **Load**, **Hover in**, **Hover out** and **Click**. A new document plays on
load. Ticking *Hover in* under *Plays on* adds *Hover out* under *Pauses on* for you — the usual
pair, and yours to change. *Click* under both *Plays on* and *Pauses on* makes every click play or
pause. Untick everything and nothing starts the animation until your code calls `play()`.

**To play an animation when it scrolls into view**, leave *Plays on* at “Load” and **Out of View**
on “pause” (both are the defaults). The animation then waits until enough of it is on screen,
plays, pauses when it scrolls away, and carries on when it comes back.

**Out of View** writes `timeline.outOfViewAction` — what happens while none of it is on screen:
“pause” (the default; it resumes where it left off), “continue” (keep running, and start without
waiting to be seen) or “reset” (back to the start, so it replays on the next entry).

**In-View Threshold** writes `timeline.inViewThreshold` — how much must be on screen before it may
run, from `0` (any part) to `1` (all of it), `0.5` by default. **In-View Delay** writes
`timeline.inViewDebounce` — how long that must hold, in milliseconds, so scrolling straight past
starts nothing.

## Playback behaviour

How a play, a stop and the natural end look. The **Playback Behaviour** section writes these
beside the trigger, and the same words apply whoever asks for the play or the stop — the trigger,
a component's `play` property, or `play()` / `stop()` from code:

| Control | Writes | Choices |
|---|---|---|
| **When played** | `timeline.playStartAction` | **Resume** (default — continues from where it is; at the start or the end, a fresh run) · **Restart** (from the beginning every time) · **Jump to end** (shows the end, no motion) |
| **When stopped** | `timeline.playStopAction` | **Reset** (default — jumps back to the start state) · **Rewind** (plays back to it) |
| **Complete iteration on stop** | `timeline.completeIterationOnPlayStop` | a stop waits for the current iteration to finish first — a heartbeat should not die mid-beat |
| **When it ends** | `timeline.playFinishAction` | **Hold** (default — keeps the last frame) · **Reset** · **Rewind** |

**Use JS Triggers** only matters for the pre-rendered *SVG + CSS animation* export, and decides
how the trigger is implemented in that file:

- With **Use JS Triggers** switched **off**, the file contains no script at all. “Load” works, and
  “Hover in” / “Hover out” work through CSS `:hover` (a hover out may pause or stop, not both).
  “Click” and waiting until the animation is on screen cannot be done in pure CSS, so the export
  **starts it as soon as it is shown**; the play actions keep their defaults (a class cannot
  restart keyframes or play them backwards). Every choice in the panel is marked *(CSS)* or
  *(JS)*, and picking a *(JS)* one switches *Use JS Triggers* on for you.
- With **Use JS Triggers** switched **on**, the export adds a few lines of inline script (no library),
  and the file behaves exactly as this panel says: every list, every action and the gate.

The JSON format and the *SVG + JS animation* export always honour the full setting, whatever
*Use JS Triggers* says.

## Timeline — clock or scroll

**Timeline** chooses what the playhead follows — it writes `timeline.type`:

- **Time** (default) — the clock. The animation plays on its own once triggered.
- **Scroll** *(in development)* — the page's scroll position drives the playhead: scrolling
  down plays the animation forward, scrolling back up rewinds it, and it stays at whatever
  frame you stop on. Pinning and range options choose which part of the page's scroll maps to
  the animation. The “Scroll” option is still in development: expect gaps and changes.

## Which export formats keep the playback settings and triggers

Not every export can carry every setting from this page. What each one keeps:

| Export | Kept in the file |
|---|---|
| **Pixodesk JSON** | everything |
| **SVG + CSS animation** | timing; “Load”, and “Hover in” / “Hover out” via CSS `:hover`. “Click” and the visibility gate fall back to “Load”; the play actions keep their defaults |
| **SVG + CSS + JS triggers** | timing, every list, every action and the gate — through a few inline lines of script (added by the editor app), no library |
| **SVG + JS animation** | everything |

[Choosing a format](/docs/svga/editor/choosing-a-format) has the full comparison.

---

