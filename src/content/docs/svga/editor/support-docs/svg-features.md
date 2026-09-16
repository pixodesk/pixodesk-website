---
title: "SVG Supported Features"
description: "Reference list of features supported by the SVG file format and its animation methods."
slug: "docs/svga/editor/svg-features"
draft: true
sidebar:
  order: 20
---

Feature list compiled from the [W3C SVG 2 specification](https://www.w3.org/TR/SVG2/) and [MDN SVG reference](https://developer.mozilla.org/en-US/docs/Web/SVG). Bold rows mark category sections.

| **SVG Supported Features** |
| :-- |
| **Document** |
| `<svg>` |
| viewBox |
| preserveAspectRatio |
| `<g>` (group) |
| `<defs>` |
| `<symbol>` |
| `<use>` |
| `<switch>` |
| `<view>` |
| `<a>` (hyperlink) |
| `<title>` |
| `<desc>` |
| `<metadata>` |
| **Shapes** |
| `<rect>` |
| Rounded `<rect>` (rx / ry) |
| `<circle>` |
| `<ellipse>` |
| `<line>` |
| `<polyline>` |
| `<polygon>` |
| `<path>` |
| **Path Data** |
| MoveTo (M, m) |
| LineTo (L, l) |
| Horizontal LineTo (H, h) |
| Vertical LineTo (V, v) |
| Cubic Bezier (C, c) |
| Smooth Cubic Bezier (S, s) |
| Quadratic Bezier (Q, q) |
| Smooth Quadratic Bezier (T, t) |
| Elliptical Arc (A, a) |
| ClosePath (Z, z) |
| **Embedded Content** |
| `<image>` |
| `<foreignObject>` |
| `<text>` |
| `<tspan>` |
| `<textPath>` |
| **Paint Servers** |
| `<linearGradient>` |
| `<radialGradient>` |
| `<stop>` |
| `<pattern>` |
| Named color |
| Hex color |
| rgb() / rgba() |
| hsl() / hsla() |
| currentColor |
| **Fill** |
| fill |
| fill-opacity |
| fill-rule (nonzero) |
| fill-rule (evenodd) |
| **Stroke** |
| stroke |
| stroke-width |
| stroke-opacity |
| stroke-linecap (butt) |
| stroke-linecap (round) |
| stroke-linecap (square) |
| stroke-linejoin (miter) |
| stroke-linejoin (round) |
| stroke-linejoin (bevel) |
| stroke-linejoin (miter-clip) |
| stroke-linejoin (arcs) |
| stroke-miterlimit |
| stroke-dasharray |
| stroke-dashoffset |
| **Markers** |
| `<marker>` |
| marker-start |
| marker-mid |
| marker-end |
| **Clipping & Masking** |
| `<clipPath>` |
| `<mask>` |
| clip-path |
| mask |
| mask-type (alpha) |
| mask-type (luminance) |
| **Filters** |
| `<filter>` |
| `<feGaussianBlur>` |
| `<feOffset>` |
| `<feBlend>` |
| `<feComposite>` |
| `<feColorMatrix>` |
| `<feComponentTransfer>` |
| `<feFuncR>` / `<feFuncG>` / `<feFuncB>` / `<feFuncA>` |
| `<feFlood>` |
| `<feImage>` |
| `<feMerge>` |
| `<feMorphology>` |
| `<feTile>` |
| `<feTurbulence>` |
| `<feDisplacementMap>` |
| `<feConvolveMatrix>` |
| `<feDiffuseLighting>` |
| `<feSpecularLighting>` |
| `<feDropShadow>` |
| `<feDistantLight>` |
| `<fePointLight>` |
| `<feSpotLight>` |
| **Text** |
| font-family |
| font-size |
| font-weight |
| font-style |
| font-variant |
| text-anchor |
| letter-spacing |
| word-spacing |
| kerning |
| Text on path (`<textPath>`) |
| **Transforms (2D)** |
| translate |
| scale |
| rotate |
| skewX |
| skewY |
| matrix |
| **Transforms (3D, via CSS)** |
| rotateX / rotateY / rotateZ |
| translate3d |
| scale3d |
| perspective |
| **Styling & Scripting** |
| `<style>` |
| `<script>` |
| class attribute |
| style attribute |
| **Animation — SMIL Elements** |
| `<animate>` |
| `<animateTransform>` |
| `<animateMotion>` |
| `<set>` |
| `<mpath>` |
| **Animation — SMIL Attributes** |
| attributeName |
| from |
| to |
| by |
| values |
| begin |
| end |
| dur |
| min |
| max |
| repeatCount |
| repeatDur |
| fill (freeze / remove) |
| restart |
| calcMode (linear) |
| calcMode (discrete) |
| calcMode (paced) |
| calcMode (spline) |
| keyTimes |
| keySplines |
| additive |
| accumulate |
| path (motion) |
| keyPoints |
| rotate (motion) |
| **Animation — SMIL Triggers** |
| Time offset (e.g. 5s) |
| Event trigger (element.click) |
| Syncbase (anim1.end+1s) |
| Repeat (repeat(n)) |
| indefinite |
| **Animation — CSS** |
| @keyframes |
| animation-name |
| animation-duration |
| animation-timing-function |
| animation-delay |
| animation-iteration-count |
| animation-direction |
| animation-fill-mode |
| animation-play-state |
| transition-property |
| transition-duration |
| transition-timing-function |
| transition-delay |
| **CSS Timing Functions** |
| linear |
| ease |
| ease-in |
| ease-out |
| ease-in-out |
| cubic-bezier() |
| steps() |
| **Animation — JavaScript** |
| Web Animations API (element.animate()) |
| WAAPI control (play / pause / reverse / finish) |
| WAAPI properties (currentTime, playbackRate) |
| requestAnimationFrame |
| Direct DOM updates |
| svg.pauseAnimations() |
| svg.unpauseAnimations() |
| svg.getCurrentTime() |
| svg.setCurrentTime() |
| beginEvent / endEvent / repeatEvent (SMIL DOM events) |

## Sources

- [W3C SVG 2 Specification](https://www.w3.org/TR/SVG2/)
- [W3C SVG Animation (SVG 1.1)](https://www.w3.org/TR/SVG11/animate.html)
- [MDN SVG Element reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Element)
- [MDN SVG Attribute reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)
- [MDN SVG animation with SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL)
- [MDN Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
