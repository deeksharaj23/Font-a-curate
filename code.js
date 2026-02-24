"use strict";
(() => {
  // fontCatalog.ts
  var OS = true;
  var FONT_CATALOG = {
    // Body-safe, neutral sans (UI/SaaS defaults)
    Inter: {
      family: "Inter",
      category: "sans",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      tone: "neutral",
      bodyReadability: "high",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    "Source Sans 3": {
      family: "Source Sans 3",
      category: "sans",
      weights: [200, 300, 400, 500, 600, 700, 800, 900],
      tone: "neutral",
      bodyReadability: "high",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    Roboto: {
      family: "Roboto",
      category: "sans",
      weights: [100, 300, 400, 500, 700, 900],
      tone: "neutral",
      bodyReadability: "high",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    "IBM Plex Sans": {
      family: "IBM Plex Sans",
      category: "sans",
      weights: [100, 200, 300, 400, 500, 600, 700],
      tone: "neutral",
      bodyReadability: "high",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    "Work Sans": {
      family: "Work Sans",
      category: "sans",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      tone: "neutral",
      bodyReadability: "high",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    "Noto Sans": {
      family: "Noto Sans",
      category: "sans",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      tone: "neutral",
      bodyReadability: "high",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    // Serif body (editorial/luxury only)
    "Source Serif 4": {
      family: "Source Serif 4",
      category: "serif",
      weights: [200, 300, 400, 500, 600, 700, 800, 900],
      tone: "neutral",
      bodyReadability: "high",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    // Title fonts (expressive / hierarchy defining)
    "Playfair Display": {
      family: "Playfair Display",
      category: "serif",
      weights: [400, 500, 600, 700, 800, 900],
      tone: "expressive",
      bodyReadability: "low",
      numerals: "stylized",
      spacing: "variable",
      openSource: OS
    },
    "DM Serif Display": {
      family: "DM Serif Display",
      category: "serif",
      weights: [400],
      tone: "expressive",
      bodyReadability: "low",
      numerals: "stylized",
      spacing: "variable",
      openSource: OS
    },
    Fraunces: {
      family: "Fraunces",
      category: "serif",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      tone: "expressive",
      bodyReadability: "medium",
      numerals: "stylized",
      spacing: "variable",
      openSource: OS
    },
    "Space Grotesk": {
      family: "Space Grotesk",
      category: "sans",
      weights: [300, 400, 500, 600, 700],
      tone: "expressive",
      bodyReadability: "medium",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    "DM Sans": {
      family: "DM Sans",
      category: "sans",
      weights: [400, 500, 600, 700],
      tone: "neutral",
      bodyReadability: "high",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    "Montserrat": {
      family: "Montserrat",
      category: "sans",
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      tone: "expressive",
      bodyReadability: "medium",
      numerals: "clean",
      spacing: "stable",
      openSource: OS
    },
    "Bebas Neue": {
      family: "Bebas Neue",
      category: "display",
      weights: [400],
      tone: "expressive",
      bodyReadability: "low",
      numerals: "stylized",
      spacing: "variable",
      openSource: OS
    },
    "Oswald": {
      family: "Oswald",
      category: "display",
      weights: [200, 300, 400, 500, 600, 700],
      tone: "expressive",
      bodyReadability: "low",
      numerals: "clean",
      spacing: "variable",
      openSource: OS
    }
  };
  function getFontMeta(family) {
    return FONT_CATALOG[family];
  }

  // pairs.ts
  var FONT_PAIRS = [
    {
      id: "ui-inter-spacegrotesk",
      titleFont: "Space Grotesk",
      bodyFont: "Inter",
      structure: "sans-sans",
      useCase: "ui",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "ui-inter-montserrat",
      titleFont: "Montserrat",
      bodyFont: "Inter",
      structure: "sans-sans",
      useCase: "ui",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "saas-ibmplexsans-spacegrotesk",
      titleFont: "Space Grotesk",
      bodyFont: "IBM Plex Sans",
      structure: "sans-sans",
      useCase: "saas",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "saas-sourcesans3-dmsans",
      titleFont: "DM Sans",
      bodyFont: "Source Sans 3",
      structure: "sans-sans",
      useCase: "saas",
      readability: "high",
      contrast: "low"
    },
    {
      id: "saas-worksans-spacegrotesk",
      titleFont: "Space Grotesk",
      bodyFont: "Work Sans",
      structure: "sans-sans",
      useCase: "saas",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "branding-playfair-inter",
      titleFont: "Playfair Display",
      bodyFont: "Inter",
      structure: "serif-sans",
      useCase: "branding",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "branding-fraunces-inter",
      titleFont: "Fraunces",
      bodyFont: "Inter",
      structure: "serif-sans",
      useCase: "branding",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "branding-dmserifdisplay-sourcesans3",
      titleFont: "DM Serif Display",
      bodyFont: "Source Sans 3",
      structure: "serif-sans",
      useCase: "branding",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "marketing-bebasneue-inter",
      titleFont: "Bebas Neue",
      bodyFont: "Inter",
      structure: "display-sans",
      useCase: "marketing",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "marketing-oswald-roboto",
      titleFont: "Oswald",
      bodyFont: "Roboto",
      structure: "display-sans",
      useCase: "marketing",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "marketing-montserrat-inter",
      titleFont: "Montserrat",
      bodyFont: "Inter",
      structure: "sans-sans",
      useCase: "marketing",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "luxury-playfair-sourceserif4",
      titleFont: "Playfair Display",
      bodyFont: "Source Serif 4",
      structure: "serif-serif",
      useCase: "luxury",
      readability: "medium",
      contrast: "medium"
    },
    {
      id: "luxury-dmserifdisplay-sourceserif4",
      titleFont: "DM Serif Display",
      bodyFont: "Source Serif 4",
      structure: "serif-serif",
      useCase: "luxury",
      readability: "medium",
      contrast: "medium"
    },
    {
      id: "editorial-fraunces-sourceserif4",
      titleFont: "Fraunces",
      bodyFont: "Source Serif 4",
      structure: "serif-serif",
      useCase: "editorial",
      readability: "medium",
      contrast: "medium"
    },
    {
      id: "editorial-playfair-sourcesans3",
      titleFont: "Playfair Display",
      bodyFont: "Source Sans 3",
      structure: "serif-sans",
      useCase: "editorial",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "ui-notosans-spacegrotesk",
      titleFont: "Space Grotesk",
      bodyFont: "Noto Sans",
      structure: "sans-sans",
      useCase: "ui",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "saas-notosans-dmsans",
      titleFont: "DM Sans",
      bodyFont: "Noto Sans",
      structure: "sans-sans",
      useCase: "saas",
      readability: "high",
      contrast: "low"
    },
    {
      id: "ui-inter-dmsans",
      titleFont: "DM Sans",
      bodyFont: "Inter",
      structure: "sans-sans",
      useCase: "ui",
      readability: "high",
      contrast: "low"
    },
    {
      id: "ui-sourcesans3-spacegrotesk",
      titleFont: "Space Grotesk",
      bodyFont: "Source Sans 3",
      structure: "sans-sans",
      useCase: "ui",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "ui-ibmplexsans-dmsans",
      titleFont: "DM Sans",
      bodyFont: "IBM Plex Sans",
      structure: "sans-sans",
      useCase: "ui",
      readability: "high",
      contrast: "low"
    },
    {
      id: "ui-worksans-montserrat",
      titleFont: "Montserrat",
      bodyFont: "Work Sans",
      structure: "sans-sans",
      useCase: "ui",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "ui-roboto-spacegrotesk",
      titleFont: "Space Grotesk",
      bodyFont: "Roboto",
      structure: "sans-sans",
      useCase: "ui",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "saas-inter-dmsans",
      titleFont: "DM Sans",
      bodyFont: "Inter",
      structure: "sans-sans",
      useCase: "saas",
      readability: "high",
      contrast: "low"
    },
    {
      id: "saas-sourcesans3-montserrat",
      titleFont: "Montserrat",
      bodyFont: "Source Sans 3",
      structure: "sans-sans",
      useCase: "saas",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "saas-ibmplexsans-montserrat",
      titleFont: "Montserrat",
      bodyFont: "IBM Plex Sans",
      structure: "sans-sans",
      useCase: "saas",
      readability: "high",
      contrast: "medium"
    },
    {
      id: "saas-dmsans-worksans",
      titleFont: "Work Sans",
      bodyFont: "DM Sans",
      structure: "sans-sans",
      useCase: "saas",
      readability: "high",
      contrast: "low"
    },
    {
      id: "branding-dmserifdisplay-inter",
      titleFont: "DM Serif Display",
      bodyFont: "Inter",
      structure: "serif-sans",
      useCase: "branding",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "branding-playfair-ibmplexsans",
      titleFont: "Playfair Display",
      bodyFont: "IBM Plex Sans",
      structure: "serif-sans",
      useCase: "branding",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "branding-fraunces-sourcesans3",
      titleFont: "Fraunces",
      bodyFont: "Source Sans 3",
      structure: "serif-sans",
      useCase: "branding",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "branding-playfair-worksans",
      titleFont: "Playfair Display",
      bodyFont: "Work Sans",
      structure: "serif-sans",
      useCase: "branding",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "editorial-playfair-sourceserif4",
      titleFont: "Playfair Display",
      bodyFont: "Source Serif 4",
      structure: "serif-serif",
      useCase: "editorial",
      readability: "medium",
      contrast: "medium"
    },
    {
      id: "editorial-dmserifdisplay-sourceserif4",
      titleFont: "DM Serif Display",
      bodyFont: "Source Serif 4",
      structure: "serif-serif",
      useCase: "editorial",
      readability: "medium",
      contrast: "medium"
    },
    {
      id: "editorial-fraunces-inter",
      titleFont: "Fraunces",
      bodyFont: "Inter",
      structure: "serif-sans",
      useCase: "editorial",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "marketing-oswald-inter",
      titleFont: "Oswald",
      bodyFont: "Inter",
      structure: "display-sans",
      useCase: "marketing",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "marketing-bebasneue-worksans",
      titleFont: "Bebas Neue",
      bodyFont: "Work Sans",
      structure: "display-sans",
      useCase: "marketing",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "marketing-oswald-sourcesans3",
      titleFont: "Oswald",
      bodyFont: "Source Sans 3",
      structure: "display-sans",
      useCase: "marketing",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "marketing-bebasneue-ibmplexsans",
      titleFont: "Bebas Neue",
      bodyFont: "IBM Plex Sans",
      structure: "display-sans",
      useCase: "marketing",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "luxury-playfair-inter",
      titleFont: "Playfair Display",
      bodyFont: "Inter",
      structure: "serif-sans",
      useCase: "luxury",
      readability: "medium",
      contrast: "high"
    },
    {
      id: "luxury-fraunces-sourceserif4",
      titleFont: "Fraunces",
      bodyFont: "Source Serif 4",
      structure: "serif-serif",
      useCase: "luxury",
      readability: "medium",
      contrast: "medium"
    }
  ];

  // code.ts
  function structureMatches(pair) {
    const titleMeta = getFontMeta(pair.titleFont);
    const bodyMeta = getFontMeta(pair.bodyFont);
    if (!titleMeta || !bodyMeta) return false;
    const titleCat = titleMeta.category;
    const bodyCat = bodyMeta.category;
    const expected = {
      "serif-sans": { title: "serif", body: "sans" },
      "sans-sans": { title: "sans", body: "sans" },
      "serif-serif": { title: "serif", body: "serif" },
      "display-sans": { title: "display", body: "sans" }
    };
    return titleCat === expected[pair.structure].title && bodyCat === expected[pair.structure].body;
  }
  function bodyFontMeetsStrictRequirements(pair) {
    const bodyMeta = getFontMeta(pair.bodyFont);
    if (!bodyMeta) return false;
    const hasRequiredWeights = bodyMeta.weights.includes(400) && bodyMeta.weights.includes(500) && (bodyMeta.weights.includes(600) || bodyMeta.weights.includes(700));
    const toneOk = pair.useCase === "editorial" ? true : bodyMeta.tone === "neutral";
    return bodyMeta.openSource === true && bodyMeta.category !== "display" && bodyMeta.bodyReadability === "high" && hasRequiredWeights && toneOk && bodyMeta.spacing === "stable" && bodyMeta.numerals === "clean";
  }
  function useCaseConstraintsOk(pair) {
    const titleMeta = getFontMeta(pair.titleFont);
    const bodyMeta = getFontMeta(pair.bodyFont);
    if (!titleMeta || !bodyMeta) return false;
    if (pair.useCase === "ui" || pair.useCase === "saas") {
      return pair.contrast !== "high" && titleMeta.category !== "display" && bodyMeta.tone === "neutral";
    }
    if (pair.useCase === "marketing") {
      return pair.contrast !== "low";
    }
    return true;
  }
  function validatePair(pair) {
    if (!pair.id) return { ok: false, reason: "Missing id" };
    if (pair.titleFont === pair.bodyFont) return { ok: false, reason: "Title/body identical" };
    if (!getFontMeta(pair.titleFont)) return { ok: false, reason: `Unknown title font: ${pair.titleFont}` };
    if (!getFontMeta(pair.bodyFont)) return { ok: false, reason: `Unknown body font: ${pair.bodyFont}` };
    if (!structureMatches(pair)) return { ok: false, reason: "Structure tag mismatch" };
    if (!bodyFontMeetsStrictRequirements(pair)) return { ok: false, reason: "Body font fails strict requirements" };
    if (!useCaseConstraintsOk(pair)) return { ok: false, reason: "Use-case constraint mismatch" };
    return { ok: true };
  }
  function getCuratedPairs() {
    const seen = /* @__PURE__ */ new Set();
    const curated = [];
    for (const p of FONT_PAIRS) {
      const v = validatePair(p);
      if (!v.ok) continue;
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      curated.push(p);
    }
    return curated;
  }
  async function applyPairToCanvas(opts) {
    if (figma.editorType !== "figma") {
      figma.notify("This plugin v1 applies pairings in Figma files only.");
      return;
    }
    const { titleFont, bodyFont } = opts;
    const titleText = String(opts.titleText || "").trim() || `${titleFont} & ${bodyFont}`;
    const bodyText = String(opts.bodyText || "").trim() || "The perfect title and body font pair is when two fonts work together to create clear hierarchy, balance, and visual harmony in a design.";
    try {
      await figma.loadFontAsync({ family: titleFont, style: "Regular" });
      await figma.loadFontAsync({ family: bodyFont, style: "Regular" });
    } catch (e) {
      figma.notify("Failed to load one of the fonts (Regular). Make sure it\u2019s available in Figma.");
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
  function collectTextNodes(nodes) {
    const out = [];
    const stack = [...nodes];
    while (stack.length) {
      const n = stack.pop();
      if (!n) continue;
      if (n.type === "TEXT") {
        out.push(n);
        continue;
      }
      if ("children" in n) {
        const children = n.children;
        if (children && children.length) stack.push(...children);
      }
    }
    return out;
  }
  function representativeFontSize(node) {
    if (typeof node.fontSize === "number") return node.fontSize;
    const len = node.characters.length;
    if (len === 0) return 0;
    const samples = Math.min(24, len);
    let max = 0;
    for (let s = 0; s < samples; s++) {
      const idx = Math.floor(s / (samples - 1 || 1) * (len - 1));
      const size = node.getRangeFontSize(idx, idx + 1);
      if (typeof size === "number" && size > max) max = size;
    }
    return max;
  }
  async function applyFontToEntireNode(node, family) {
    const len = node.characters.length;
    if (len === 0) return;
    node.setRangeFontName(0, len, { family, style: "Regular" });
  }
  async function applyPairToSelectedText(opts) {
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
      figma.notify("Failed to load one of the fonts (Regular). Make sure it\u2019s available in Figma.");
      return;
    }
    const sizes = textNodes.map((t) => representativeFontSize(t));
    const maxSize = sizes.reduce((m, v) => v > m ? v : m, 0);
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
  figma.showUI(__html__, { width: 460, height: 680, themeColors: true });
  var curatedPairs = getCuratedPairs();
  figma.ui.postMessage({ type: "PAIRS", pairs: curatedPairs });
  figma.ui.onmessage = async (msg) => {
    if (msg.type === "REQUEST_PAIRS") {
      figma.ui.postMessage({ type: "PAIRS", pairs: curatedPairs });
      return;
    }
    if (msg.type === "ADD_TO_CANVAS") {
      await applyPairToCanvas({
        titleFont: msg.titleFont,
        bodyFont: msg.bodyFont,
        titleText: msg.titleText,
        bodyText: msg.bodyText
      });
      return;
    }
    if (msg.type === "APPLY_TO_TEXT") {
      await applyPairToSelectedText({ titleFont: msg.titleFont, bodyFont: msg.bodyFont });
    }
  };
})();
