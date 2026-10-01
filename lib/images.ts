/**
 * Several photographs that ship with the Grad School template assets were
 * exported with a heavy dark blue wash baked in. This helper lifts those
 * specific files back to a natural exposure so cards and thumbnails read
 * consistently next to the brighter photographs.
 */
const DARK_ASSETS = /(main-thumb|video-bg|video-thumb-0\d|main-slider-0\d|coming-soon-bg|contact-bg|choosing-bg|courses-bg)/;

export function liftClass(src: string, strong = false) {
  if (!DARK_ASSETS.test(src)) return '';
  return strong ? 'brightness-[1.55] saturate-[1.12]' : 'brightness-[1.3] saturate-[1.08]';
}
