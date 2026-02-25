export type Structure = "serif-sans" | "sans-sans" | "serif-serif" | "display-sans";
export type UseCase = "ui" | "saas" | "branding" | "editorial" | "marketing" | "luxury";
export type Readability = "high" | "medium" | "expressive";
export type Contrast = "low" | "medium" | "high";

export type Theme = "formal" | "elegant" | "friendly" | "playful" | "modern" | "classic" | "professional";
export type Accessibility = "none" | "long-form-text" | "dyslexic-friendly" | "monospaced";

export type FontPair = {
  id: string;
  titleFont: string;
  bodyFont: string;
  structure: Structure;
  useCase: UseCase;
  readability: Readability;
  contrast: Contrast;
  theme?: Theme;
  accessibility?: Accessibility;
};

