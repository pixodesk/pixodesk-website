---
title: "Get Started"
description: "Pixodesk SVG Animator in four steps: get the editor, make an animation, choose how it will play, play it — with the player library in your code, or as a pre-rendered SVG with no code at all."
slug: "docs/svga/get-started"
sidebar:
  order: 1
draft: false
---

Pixodesk SVG Animator is an **editor** that makes SVG animations, a set of **players** that run
them, and the **file format** that connects the two. Four steps take you from nothing to an
animation playing in your page or app; each step links to the page that has the details, for
when you want them.

## 1. Get the editor

Download Pixodesk SVG Animator for Mac or Windows from the
[download page](https://pixodesk.com/svg-animator/download). It is also part of Pixodesk
Animator Studio, the edition that adds Pixodesk Lottie Animator; these docs apply to both.

## 2. Make an animation

Draw shapes, paths and text on the canvas — or import an SVG from Figma, Illustrator or
Inkscape — and animate them on the timeline. The [Quick Start](/docs/svga/editor/quick-start)
does this once, end to end, in ten minutes: a bouncing ball. The [Editor](/docs/svga) manual
has everything else, when you need it.

## 3. Choose how it will play

The editor saves the same animation in two shapes, and you can switch between them at any time
([Choosing a format](/docs/svga/editor/choosing-a-format)):

- **JSON, played by the player library** — for a React, Vue, Next.js, Nuxt, plain HTML or
  React Native project. You install one package and write a few lines; in return you can start,
  pause and control the animation from code.
- **Pre-rendered SVG** — a finished `.svg` file you drop into any page, CMS or static site. No
  code, no library.

The editor also exports **Lottie**, video, GIF and images — [Export](/docs/svga/editor/export).

## 4. Play it

- **In your code:** [Get Started with Player Library](/docs/svga/player-library/get-started) —
  save as JSON, put the file next to your component, install the package, render the file. One
  page, with a complete example project for every stack. Everything the players can do is in
  [Player Library](/docs/svga/player-library).
- **Without code:** [Pre-rendered SVG File](/docs/svga/prerendered-svg) — save as SVG and embed
  or inline it; [static sites and CMS](/docs/svga/prerendered-svg/static-sites-and-cms) covers
  Astro, Jekyll, WordPress, Shopify and Webflow.

## When you need more

- How the animation starts and loops is saved in the file —
  [playback settings and triggers](/docs/svga/editor/playback-settings) in the editor,
  [overridden from code](/docs/svga/player-library/playback-and-triggers) if you want.
- What is inside the JSON file: [Player JSON Format](/docs/svga/format).
- What a player's warning or error means: [Player Diagnostic Codes](/docs/svga/diagnostics).
- Something does not play: [Troubleshooting](/docs/svga/player-library/troubleshooting).
