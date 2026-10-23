/**
 * A video's article data (kf tests/video/video-article.mjs → src/data/video-articles/<name>.json): the transcript as paragraphs
 * (`t` = where it starts in the video, seconds) and screenshots where the screen changed (in public/videos/articles/<name>/).
 * A video without data has no article page and no link to one.
 */
export enum ArticleBlockKind { text = "text", shot = "shot" }
export interface ArticleText { kind: ArticleBlockKind.text; t: number; text: string }
export interface ArticleShot { kind: ArticleBlockKind.shot; t: number; src: string; alt: string }
export type ArticleBlock = ArticleText | ArticleShot;
export interface VideoArticle { name: string; blocks: Array<ArticleBlock> }

const DIR = "../../data/video-articles/";
const FILES = import.meta.glob<VideoArticle>("../../data/video-articles/*.json", { eager: true, import: "default" });

export const videoArticle = (name: string): VideoArticle | undefined => FILES[`${DIR}${name}.json`];
export const hasArticle = (name: string): boolean => videoArticle(name) !== undefined;
/** "m:ss" of a moment in the video. */
export const clock = (t: number): string => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
/** The screenshots' size (kf video-article.mjs SHOT_WIDTH; the takes are 1440 × 900). */
export const SHOT_SIZE = { w: 960, h: 600 };
