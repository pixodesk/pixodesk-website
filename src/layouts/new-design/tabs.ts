import type { GlyphName } from "./glyphs";

/** One card-style tab (TabStrip): glyph tile, bold label, a short hint under it. */
export interface TabInfo { id: string; label: string; hint?: string; glyph?: GlyphName }
