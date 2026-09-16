---
title: "SVG Features Not Supported by Lottie"
description: "High-level list of SVG features that have no equivalent in the Lottie format."
slug: "docs/svga/editor/svg-vs-lottie"
draft: true
sidebar:
  order: 30
---

Features available in SVG that have no equivalent in the Lottie format. Grouped at the same level as the Airbnb Lottie [supported-features.md](https://github.com/airbnb/lottie/blob/master/supported-features.md) reference. Bold rows mark category sections.

| **SVG Features Not Supported by Lottie** |
| :-- |
| **Patterns** |
| Pattern fill |
| Pattern stroke |
| **Graphic Markers** |
| Marker definition |
| Marker start |
| Marker mid |
| Marker end |
| **Advanced Filters** |
| Turbulence (Perlin noise) |
| Displacement Map |
| Morphology (erode / dilate) |
| Convolve Matrix |
| Diffuse Lighting |
| Specular Lighting |
| Light sources (Distant / Point / Spot) |
| Color Matrix (arbitrary) |
| Component Transfer |
| Composite (advanced operators) |
| Flood |
| Image input |
| Tile |
| **Foreign / Embedded Content** |
| Foreign Object (HTML / MathML inside SVG) |
| Hyperlinks |
| Inline Scripts |
| Inline CSS |
| **Reuse & Instancing** |
| Symbol definitions |
| External Use references |
| **Animation Methods** |
| SMIL declarative animation |
| CSS Animations (@keyframes) |
| CSS Transitions |
| Web Animations API |
| requestAnimationFrame |
| Direct DOM mutation |
| **Animation Triggers** |
| Click |
| Hover |
| Focus |
| Custom event |
| Syncbase (start when another animation ends) |
| Indefinite begin / end |
| **Native Interactivity** |
| :hover state |
| :focus state |
| :active state |
| :visited state |
| **Typography** |
| HTML-style text (via Foreign Object) |
| @font-face web fonts |
| Variable fonts |
| CSS font-feature-settings (ligatures, alternates) |
| **Accessibility** |
| `<title>` element |
| `<desc>` element |
| ARIA attributes per element |
| Keyboard focus order |
| **Runtime** |
| No player library required |
| Native browser rendering |

## Sources

- [Airbnb Lottie supported-features](https://github.com/airbnb/lottie/blob/master/supported-features.md) — for the Lottie capability baseline
- [W3C SVG 2 Specification](https://www.w3.org/TR/SVG2/) — for the SVG capability baseline
- [MDN SVG reference](https://developer.mozilla.org/en-US/docs/Web/SVG)
