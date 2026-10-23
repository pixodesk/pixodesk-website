/** Marked words in a diagram's small lines (Marked.astro renders them): file extensions, mechanisms, package names. */
export enum MarkKind { ext = "ext", tech = "tech", pkg = "pkg" }
/** `block`: on a line of its own */
export interface Mark { text: string; kind: MarkKind; block?: boolean }
/** A small line: plain text, or text with marked words in it. */
export type Text = string | Array<string | Mark>;

/** The file extensions and mechanisms the pages name (one spelling each). */
export enum FileExt { svg = ".svg", json = ".json", lottie = ".lottie", png = ".png", jpeg = ".jpeg", webp = ".webp", gif = ".gif", mp4 = ".mp4", webm = ".webm", ttf = ".ttf" }
export enum Mechanism { css = "CSS", js = "JS" }

export const ext = (text: string): Mark => ({ text, kind: MarkKind.ext });
export const tech = (text: string): Mark => ({ text, kind: MarkKind.tech });
export const pkg = (text: string): Mark => ({ text, kind: MarkKind.pkg });
/** Marks one per line */
export const stacked = (marks: Array<Mark>): Array<Mark> => marks.map((m) => ({ ...m, block: true }));
/** Marks in a row: .json · .lottie */
export const joined = (marks: Array<Mark>, sep = " · "): Array<string | Mark> => marks.flatMap((m, i) => (i ? [sep, m] : [m]));
