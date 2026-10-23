/**
 * The files each editor opens and saves, imports and exports (owner, 2026-10-17) — kf-el-app *MainApi getAppFileDialogFilters (open) /
 * getImportDialogFilters (import), File › Import Font Files, kf app TExportConfig getExportTypesFor. Read by the File formats diagram
 * (sections/ExportGraph) and the Animator Studio page (studio/StudioToolbox).
 */
import { AppKey } from "./catalogue";
import { FileExt, type Text, ext, joined } from "./home/marks";

/** A file format: its title and one small line (`subIn`: the line where it comes in, if different). */
export interface Format { key: string; label: string; sub: Text; subIn?: Text }
const exts = (...e: Array<FileExt>) => joined(e.map(ext));
export const FORMATS = {
  pxJson: { key: "px-json", label: "Pixodesk JSON", sub: [...exts(FileExt.json), " — the source, for our player"] },
  animSvg: { key: "anim-svg", label: "Pre-rendered animated SVG", sub: [...exts(FileExt.svg), " — CSS or JS inside"] },
  svg: { key: "svg", label: "SVG", sub: [...exts(FileExt.svg), " — clean markup"], subIn: [...exts(FileExt.svg), " — yours, or Illustrator, Figma, Inkscape"] },
  design: { key: "design", label: "SVG", sub: [...exts(FileExt.svg), " — Illustrator, Figma, Inkscape"] },
  lottie: { key: "lottie", label: "Lottie", sub: exts(FileExt.json, FileExt.lottie), subIn: [...exts(FileExt.json, FileExt.lottie), " — LottieFiles, IconScout"] },
  svga: { key: "svga", label: "SVG Animator files", sub: exts(FileExt.svg, FileExt.json) },
  video: { key: "video", label: "Video", sub: exts(FileExt.mp4, FileExt.webm) },
  gif: { key: "gif", label: "GIF", sub: exts(FileExt.gif) },
  stills: { key: "stills", label: "Images", sub: [...exts(FileExt.png, FileExt.jpeg, FileExt.webp), " — stills"] },
  pictures: { key: "pictures", label: "Images", sub: [...exts(FileExt.png, FileExt.jpeg), " — pictures to place"] },
  fonts: { key: "fonts", label: "Fonts", sub: [...exts(FileExt.ttf), " — your typefaces"] },
} satisfies Record<string, Format>;
const F = FORMATS;
/** Per app: `own` = its own formats (open and save); `bringIn` / `sendOut` = what it imports / exports (not `imports` / `exports`:
 *  the Astro compiler hoists anything that reads like an import or export statement). */
export const FORMATS_PER_APP: Record<AppKey, { own: Array<Format>; bringIn: Array<Format>; sendOut: Array<Format> }> = {
  [AppKey.svgAnimator]: { own: [F.pxJson, F.animSvg], bringIn: [F.design, F.lottie, F.pictures, F.fonts], sendOut: [F.lottie, F.video, F.gif, F.stills] },
  [AppKey.animator2d]: { own: [F.lottie], bringIn: [F.design, F.pictures, F.fonts], sendOut: [F.svga, F.video, F.gif, F.stills] },
  [AppKey.svgEditor]: { own: [F.svg], bringIn: [F.lottie, F.pictures, F.fonts], sendOut: [F.stills, F.lottie] },
};
