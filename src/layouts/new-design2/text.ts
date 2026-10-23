/** Inline emphasis for the new-design2 pages' copy (HTML strings): the key phrase in cyan, a second one in violet, a UI name in white. */
export const b = (t: string): string => `<b class="text-cyan-200">${t}</b>`;
export const v = (t: string): string => `<b class="text-violet-200">${t}</b>`;
export const w = (t: string): string => `<b class="font-semibold text-white">${t}</b>`;
/** A link to the editor manual, labelled "<topic> in the manual". */
export const manual = (label: string, href: string): { label: string; href: string } => ({ label: `${label} in the manual`, href });
