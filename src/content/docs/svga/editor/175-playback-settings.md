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
| **Duration** | `timeline.outTime` − `timeline.inTime` (ms) | the length of the content window — one pass plays from In to Out; keyframe times are absolute |
| **In/Out Time** | `timeline.inTime` / `timeline.outTime` (ms) | the window's start and end; each moves only its own end and Duration follows (typing Duration moves Out); the window is never shorter than 1 ms |
| **Playback Duration** | `timeline.playbackSpeed` (a factor, 1 = normal) | how long one pass plays, with the speed beside it (2 = twice as fast); typing a duration writes the speed as `duration / ms` — the keyframe times stay as authored |
| **Delay** | `timeline.delay` (ms) | wait before the first iteration starts |
| **Loop** · **Iterations** | `timeline.iterations` | a number, or “infinite” — in the **Playback Loop** section |
| **Direction** | `timeline.iterationDirection` | “normal”, “reverse”, “alternate” (ping-pong), “alternateReverse” — in the **Playback Loop** section |
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

Where it sits: for a Pixodesk JSON file, **Engine** is a section of its own, the dropdown in its title
row. For a pre-rendered SVG with embedded JS it is a dropdown in the **Runtime** section, and each
choice shows the size of the player it embeds in the file.

**Loop**, **Iterations** and **Direction** have their own **Playback Loop** section: the Loop checkbox
sits in its title row, and the section opens only while Loop is ticked.

## Playback preset

The **Playback Preset** dropdown sets the trigger lists, the actions, At end and Loop in one pick. Open it
to see each preset playing in a small example, with what it does and where it is typically used.

| Preset | Sets | Typical use |
|---|---|---|
| **Loop when seen** | Start playback on *Load* · Loop · Out-of-View *Pause* | loaders, spinners, backgrounds |
| **Play once when seen** | Start playback on *Load* · one iteration · At end *Hold* · Out-of-View *Pause* | intros, counters, charts |
| **Replay each time seen** | as above, but Out-of-View *Jump to start* | illustrations down a long page |
| **Run always** | Start playback on *Load* · Loop · Out-of-View *Continue* | clocks and tickers |
| **Hover: play / pause** | Start playback on *Hover in* · Pause playback on *Hover out* · Loop · Out-of-View *Continue* | cards and links |
| **Hover: there and back** | Start playback on *Hover in* · one iteration · At end *Animate to start* · Out-of-View *Continue* | icons that move and settle back |
| **Hover: one nudge** | Start playback on *Hover in* · Start playback *Jump to start* · one iteration · At end *Jump to start* · Out-of-View *Continue* | playful icons |
| **Click: play / pause** | Start playback on *Click* · Pause playback on *Click* · Loop | play / pause toggles |
| **Manual: loop** | nothing in Start playback on · Loop | background jobs, the current step of a progress list |
| **Manual: once** | nothing in Start playback on · one iteration · At end *Hold* | success and error ticks |

A preset is not saved in the file — the dropdown recognises it from those settings, and shows
**Custom** as soon as one of them no longer matches (a loop count such as 3× is Custom too). Settings a
preset doesn't name go back to their defaults; Direction, Duration, Delay and the in-view numbers are
left as they are. In a **CSS keyframes (no JS)** file each preset is marked (CSS) or (JS), and picking a (JS) one
switches the file type to **CSS keyframes (JS-triggers)**.

## Action triggers

A trigger lists **which events start, stop and pause a playback** of the animation (a playback is one go of it, from a
start until it is stopped or has ended), and the editor works out what resumes it. The **Action Triggers** section
writes `timeline.actionTriggers`:

| Control | Writes | Offers | Acts while the animation is… |
|---|---|---|---|
| **Start playback on** | `actionTriggers["playback.start"]` | Load · Hover in · Click | off or finished — starts a playback, per *Start playback* below |
| **Stop playback on** | `actionTriggers["playback.stop"]` | Hover out · Click | playing, paused or finished — stops the playback, per *Stop playback* below |
| **Pause playback on** | `actionTriggers["playback.pause"]` | Hover in · Hover out · Click | playing — freezes the current frame |
| **Resume playback on** | nothing — worked out (`actionTriggers["playback.resume"]` when a file names it) | shown, not edited | paused — continues |

Each list offers only the events that make sense for it — nothing starts on *Hover out* or stops on
*Load*. **Resume playback on** follows the other lists: *Hover out* resumes what *Hover in* paused (and the
other way round), a click resumes what a click paused, and the *Start playback on* events that do not also
stop it resume it too. A new document plays on load. Ticking *Hover in* under *Start playback on* adds
*Hover out* under *Pause playback on* for you — the usual pair, and yours to change. *Click* under both
*Start playback on* and *Pause playback on* makes every click play or pause. *Start playback on* shows every choice; the other
lists are dropdowns, and the **×** next to one empties it. Choose **None (manual)** under *Start playback on*
and nothing starts the animation until your code calls `playback.start()`.

Two lists that react to the same event at the same moment are marked in red: *Stop playback on* and
*Pause playback on* both on *Hover out* (the pause wins), or *Stop playback on* on the event that resumes a pause
(the resume wins).

**To play an animation when it scrolls into view**, leave *Start playback on* at “Load” and **Out-of-View Action**
on “pause” (both are the defaults). The animation then waits until enough of it is on screen,
plays, pauses when it scrolls away, and carries on when it comes back.

**Out-of-View Action** writes `timeline.actions.outOfView` — what happens while none of it is on screen:
“pause” (the default; it resumes where it left off), “continue” (keep running, and start without
waiting to be seen) or “jump to start” (back to the start, so it replays on the next entry).

**In-View Threshold** writes `timeline.inViewThreshold` — how much must be on screen before it may
run, from `0` (any part) to `1` (all of it), `0.5` by default. **In-View Delay** writes
`timeline.inViewDebounce` — how long that must hold, in milliseconds, so scrolling straight past
starts nothing.

## Actions

How a start, a stop and the end look. The **Actions** section writes the two playback actions into `timeline.actions`,
beside the triggers — each the word of its choice (`"playback.stop": "animateToStart"`) — and **At end** as the timeline
key `atEnd`. The same words apply whoever asks for the start or the stop: the trigger, a component's `playback`
property, or `playback.start()` / `playback.stop()` from code.

Every choice names **where** it goes — the start or the end — and **how**: *jump* (at once) or *animate* (playing
there). Arriving at the end, by itself or by a stop that goes there, runs **At end**. "The end" is the end of
the current pass, so on a looping animation **Stop playback** *Animate to end* means "stop after this pass" — and the
At end choice then shows for it too.

| Control | Writes | Choices |
|---|---|---|
| **Start playback** | `actions["playback.start"]` | **Continue** (default — plays on from where it is; at the start or the end, a fresh playback) · **Jump to start** (from the beginning every time) · **Jump to end** (shows the end, no motion, then At end) |
| **Stop playback** | `actions["playback.stop"]` | **Jump to start** (default — straight back) · **Animate to start** (plays back to it) · **Jump to end** (straight to the end of the pass) · **Animate to end** (plays on to the end of the pass — a heartbeat does not die mid-beat) |
| **At end** | `timeline.atEnd` | **Hold** (default — keeps the last frame) · **Jump to start** · **Animate to start** |

The *SVG + CSS animation* export comes in two flavours — the **File Type** choice in the **Runtime** section (and on
the welcome screen and in the Export dialog): **CSS keyframes (no JS)** or **CSS keyframes (JS-triggers)**. It decides
how the trigger is implemented in the file:

- With **CSS keyframes (no JS)**, the file contains no script at all — *pure CSS*. “Load” works, and
  “Hover in” / “Hover out” work through CSS `:hover` (a hover out may pause or stop, not both, and only
  when “Hover in” plays it). “Click” and waiting until the animation is on screen cannot be done in pure
  CSS; a class cannot restart keyframes or play them backwards. In this mode the playback sections show
  **what the file will actually do**: every choice is marked *(CSS)* or *(JS)*, and a setting pure CSS
  cannot honour is shown at the value the file falls back to. Picking a *(JS)* choice switches the file
  type to *CSS keyframes (JS-triggers)* for you — a message says so and the panel scrolls to the flashing
  choice — and the marks go away, everything works.
- With **CSS keyframes (JS-triggers)**, the export adds a few lines of inline script (no library),
  and the file behaves exactly as this panel says: every list, every action and the gate.

The JSON format and the *SVG + JS animation* export always honour the full setting. The **Export** dialog
offers the same three *File Type* flavours, with the same marks and the same rule.

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

