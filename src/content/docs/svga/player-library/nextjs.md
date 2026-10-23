---
title: "Next.js — @pixodesk/svg-animator-react"
slug: "docs/svga/player-library/nextjs"
description: "The React component in a Next.js app."
---

The [React component](./react.md) in a Next.js app.

The component renders real SVG markup on the server and starts the player in an effect on
the client, so it works in the App Router — mark the file that uses it as a client component:

```tsx
'use client';
import { SvgAnimationPlayer } from '@pixodesk/svg-animator-react';
import animation from './animation.json';

export default function Hero() {
  return <SvgAnimationPlayer doc={animation} playAsSaved />;
}
```

JSON imports work out of the box in Next.js; for a CSS-flavor SVG use `@svgr/webpack`.

