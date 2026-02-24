import { getFontMeta } from "./fontCatalog";
import { FONT_PAIRS } from "./pairs";
import type { FontPair, Structure } from "./types";

type UiToPluginMessage =
  | { type: "REQUEST_PAIRS" }
  | { type: "ADD_TO_CANVAS"; titleFont: string; bodyFont: string; titleText?: string; bodyText?: string }
  | { type: "APPLY_TO_TEXT"; titleFont: string; bodyFont: string };

type PluginToUiMessage =
  | { type: "PAIRS"; pairs: FontPair[] }
  | { type: "NOTICE"; message: string };

function structureMatches(pair: FontPair): boolean {
  const titleMeta = getFontMeta(pair.titleFont);
  const bodyMeta = getFontMeta(pair.bodyFont);
  if (!titleMeta || !bodyMeta) return false;

  const titleCat = titleMeta.category;
  const bodyCat = bodyMeta.category;

  const expected: Record<Structure, { title: typeof titleCat; body: typeof bodyCat }> = {
    "serif-sans": { title: "serif", body: "sans" },
    "sans-sans": { title: "sans", body: "sans" },
    "serif-serif": { title: "serif", body: "serif" },
    "display-sans": { title: "display", body: "sans" },
  };

  return titleCat === expected[pair.structure].title && bodyCat === expected[pair.structure].body;
}

function bodyFontMeetsStrictRequirements(pair: FontPair): boolean {
  const bodyMeta = getFontMeta(pair.bodyFont);
  if (!bodyMeta) return false;

  const hasRequiredWeights =
    bodyMeta.weights.includes(400) &&
    bodyMeta.weights.includes(500) &&
    (bodyMeta.weights.includes(600) || bodyMeta.weights.includes(700));

  const toneOk = pair.useCase === "editorial" ? true : bodyMeta.tone === "neutral";

  return (
    bodyMeta.openSource === true &&
    bodyMeta.category !== "display" &&
    bodyMeta.bodyReadability === "high" &&
    hasRequiredWeights &&
    toneOk &&
    bodyMeta.spacing === "stable" &&
    bodyMeta.numerals === "clean"
  );
}

function useCaseConstraintsOk(pair: FontPair): boolean {
  const titleMeta = getFontMeta(pair.titleFont);
  const bodyMeta = getFontMeta(pair.bodyFont);
  if (!titleMeta || !bodyMeta) return false;

  if (pair.useCase === "ui" || pair.useCase === "saas") {
    // “Moderate contrast max” + no display titles for UI/SaaS.
    return pair.contrast !== "high" && titleMeta.category !== "display" && bodyMeta.tone === "neutral";
  }

  if (pair.useCase === "marketing") {
    // Display titles allowed; must still maintain hierarchy (avoid low contrast).
    return pair.contrast !== "low";
  }

  return true;
}

function validatePair(pair: FontPair): { ok: true } | { ok: false; reason: string } {
  if (!pair.id) return { ok: false, reason: "Missing id" };
  if (pair.titleFont === pair.bodyFont) return { ok: false, reason: "Title/body identical" };
  if (!getFontMeta(pair.titleFont)) return { ok: false, reason: `Unknown title font: ${pair.titleFont}` };
  if (!getFontMeta(pair.bodyFont)) return { ok: false, reason: `Unknown body font: ${pair.bodyFont}` };
  if (!structureMatches(pair)) return { ok: false, reason: "Structure tag mismatch" };
  if (!bodyFontMeetsStrictRequirements(pair)) return { ok: false, reason: "Body font fails strict requirements" };
  if (!useCaseConstraintsOk(pair)) return { ok: false, reason: "Use-case constraint mismatch" };
  return { ok: true };
}

function getCuratedPairs(): FontPair[] {
  const seen = new Set<string>();
  const curated: FontPair[] = [];

  for (const p of FONT_PAIRS) {
    const v = validatePair(p);
    if (!v.ok) continue;
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    curated.push(p);
  }

  return curated;
}

async function applyPairToCanvas(opts: { titleFont: string; bodyFont: string; titleText?: string; bodyText?: string }) {
  if (figma.editorType !== "figma") {
    figma.notify("This plugin v1 applies pairings in Figma files only.");
    return;
  }

  const { titleFont, bodyFont } = opts;
  const titleText = String(opts.titleText || "").trim() || `${titleFont} & ${bodyFont}`;
  const bodyText =
    String(opts.bodyText || "").trim() ||
    "The perfect title and body font pair is when two fonts work together to create clear hierarchy, balance, and visual harmony in a design.";

  try {
    await figma.loadFontAsync({ family: titleFont, style: "Regular" });
    await figma.loadFontAsync({ family: bodyFont, style: "Regular" });
  } catch (e) {
    figma.notify("Failed to load one of the fonts (Regular). Make sure it’s available in Figma.");
    return;
  }

  const title = figma.createText();
  title.fontName = { family: titleFont, style: "Regular" };
  title.fontSize = 40;
  title.characters = titleText;

  const body = figma.createText();
  body.fontName = { family: bodyFont, style: "Regular" };
  body.fontSize = 16;
  body.characters = bodyText;

  title.x = 0;
  title.y = 0;
  body.x = 0;
  body.y = title.y + title.height + 24;

  const group = figma.group([title, body], figma.currentPage);
  group.name = `${titleFont} / ${bodyFont}`;

  const { x, y } = figma.viewport.center;
  group.x = x;
  group.y = y;

  figma.currentPage.selection = [group];
  figma.viewport.scrollAndZoomIntoView([group]);
}

function collectTextNodes(nodes: readonly SceneNode[]): TextNode[] {
  const out: TextNode[] = [];
  const stack: SceneNode[] = [...nodes];

  while (stack.length) {
    const n = stack.pop();
    if (!n) continue;

    if (n.type === "TEXT") {
      out.push(n);
      continue;
    }

    if ("children" in n) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const children = (n as any).children as readonly SceneNode[] | undefined;
      if (children && children.length) stack.push(...children);
    }
  }

  return out;
}

function representativeFontSize(node: TextNode): number {
  if (typeof node.fontSize === "number") return node.fontSize;
  const len = node.characters.length;
  if (len === 0) return 0;

  // For mixed font sizes, sample a handful of characters to estimate max size.
  // Sampling keeps this fast even on long copy blocks.
  const samples = Math.min(24, len);
  let max = 0;

  for (let s = 0; s < samples; s++) {
    const idx = Math.floor((s / (samples - 1 || 1)) * (len - 1));
    const size = node.getRangeFontSize(idx, idx + 1);
    if (typeof size === "number" && size > max) max = size;
  }

  return max;
}

async function applyFontToEntireNode(node: TextNode, family: string) {
  const len = node.characters.length;
  if (len === 0) return;
  node.setRangeFontName(0, len, { family, style: "Regular" });
}

async function applyPairToSelectedText(opts: { titleFont: string; bodyFont: string }) {
  if (figma.editorType !== "figma") {
    figma.notify("This plugin v1 applies pairings in Figma files only.");
    return;
  }

  const selection = figma.currentPage.selection;
  const textNodes = collectTextNodes(selection);

  if (textNodes.length === 0) {
    figma.notify("Select one or more text layers to apply this pairing.");
    return;
  }

  const { titleFont, bodyFont } = opts;

  try {
    await figma.loadFontAsync({ family: titleFont, style: "Regular" });
    await figma.loadFontAsync({ family: bodyFont, style: "Regular" });
  } catch (_e) {
    figma.notify("Failed to load one of the fonts (Regular). Make sure it’s available in Figma.");
    return;
  }

  const sizes = textNodes.map((t) => representativeFontSize(t));
  const maxSize = sizes.reduce((m, v) => (v > m ? v : m), 0);
  const titleThreshold = maxSize > 0 ? maxSize * 0.9 : 24;

  let applied = 0;
  let skipped = 0;
  for (const t of textNodes) {
    try {
      const size = representativeFontSize(t);
      const family = size >= titleThreshold ? titleFont : bodyFont;
      await applyFontToEntireNode(t, family);
      applied += 1;
    } catch (_e) {
      // Skip non-editable text (e.g. inside certain instances).
      skipped += 1;
    }
  }

  if (applied === 0) {
    figma.notify("No selected text layers could be edited (try selecting direct text layers).");
  } else {
    figma.notify(
      `Applied pairing to ${applied} text layer${applied === 1 ? "" : "s"}${skipped ? ` (skipped ${skipped})` : ""}.`
    );
  }
}

// Show UI (do not close automatically).
figma.showUI(__html__, { width: 460, height: 680, themeColors: true });

const curatedPairs = getCuratedPairs();
figma.ui.postMessage({ type: "PAIRS", pairs: curatedPairs } satisfies PluginToUiMessage);

figma.ui.onmessage = async (msg: UiToPluginMessage) => {
  if (msg.type === "REQUEST_PAIRS") {
    figma.ui.postMessage({ type: "PAIRS", pairs: curatedPairs } satisfies PluginToUiMessage);
    return;
  }

  if (msg.type === "ADD_TO_CANVAS") {
    await applyPairToCanvas({
      titleFont: msg.titleFont,
      bodyFont: msg.bodyFont,
      titleText: msg.titleText,
      bodyText: msg.bodyText,
    });
    return;
  }

  if (msg.type === "APPLY_TO_TEXT") {
    await applyPairToSelectedText({ titleFont: msg.titleFont, bodyFont: msg.bodyFont });
  }
};
