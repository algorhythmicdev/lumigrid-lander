import { base } from '$app/paths';

/**
 * Load JSON content with base path support for GitHub Pages
 */
export async function loadJSON<T>(rel: string): Promise<T> {
  // rel e.g. '/content/site.json'
  const url = `${base}${rel}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return res.json() as Promise<T>;
}

export const about = {
  hero: {
    kicker: 'Reclame Fabriek R&D',
    title: 'LED Node',
    sub: 'A compact controller for LED signage. Choose colour, motion and brightness. Save scenes. Lights can run on a plan, and several runs can move together.'
  },
  features: [
    { t: 'Simple control', d: 'Open a web page. Choose colour, motion and brightness. Save favourites as scenes.', halo: 3 },
    { t: 'Plan the day',  d: 'Calm mornings, clean daytime, warm evenings.', halo: 2 },
    { t: 'Runs together', d: 'Several runs can move in step so long strips look like one.', halo: 2 },
    { t: 'Works anywhere',d: 'Shop windows, logo letters, façades, lightboxes.', halo: 1 }
  ],
  highlights: [
    { t:'Clean dimming', d:'Smooth, flicker-free white light.' },
    { t:'Colour motion', d:'Attention-getting effects when you need them.' },
    { t:'Simple setup',  d:'We install and support.' },
    { t:'Reliable',      d:'Resumes last scene after power returns.' }
  ],
  process: [
    { t:'Brief',   d:'Tell us about your sign and space.' },
    { t:'Plan',    d:'We suggest zones, looks and a simple day plan.' },
    { t:'Install', d:'We fit hardware, set scenes and test.' },
    { t:'Support', d:'We keep it running and help update looks.' }
  ]
};
