/**
 * The "In real interfaces" cards, generated from the learn videos by kf `yarn website:real-ui` (never edited here):
 * markup, CSS scoped to the card, the code lines the video types, the files and their sizes, and what the card does.
 * Plan: site-sections.2026-10-16.md, step 4.
 */
import data from "../../data/real-ui/cards.json";

export interface RealUiFile { name: string; kbGz: number }
export interface RealUiToggle { player: string; pause: string; resume: string }
export interface RealUiCard {
  id: string;
  tab: string | null;
  video: string;
  title: string;
  line: string;
  intro: string;
  html: string;
  css: string;
  code: string;
  files: RealUiFile[];
  kbGz: number;
  stills: Record<string, number>;
  toggle: RealUiToggle | null;
  hover: boolean;
}

export const realUiCards: RealUiCard[] = data.cards;
export const realUiPlayerVersion: string = data.playerVersion;

export function realUiCard(id: string): RealUiCard {
  const card = realUiCards.find((c) => c.id === id);
  if (!card) throw new Error(`real-ui card "${id}" is not in src/data/real-ui/cards.json — run kf yarn website:real-ui`);
  return card;
}

/** What the client script needs to know about a card (data-rui-behaviour). */
export const behaviourOf = (card: RealUiCard) => JSON.stringify({ stills: card.stills, toggle: card.toggle, hover: card.hover });
