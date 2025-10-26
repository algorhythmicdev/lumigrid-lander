import { writable } from 'svelte/store';

export type Caps = {
  device: string;
  maker: string;
  fw: string;
  features: {
    zones: boolean;
    scenes: boolean;
    schedule: boolean;
    sync: boolean;
    pixels: boolean;
    white_pwm: boolean;
    blend_control: boolean;
    web_app: boolean;
    failsafe_resume: boolean;
  };
};

export const caps = writable<Caps | null>(null);
export const capsError = writable<string | null>(null);

export async function loadCaps(url = '/api/capabilities') {
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const data: Caps = await response.json();
    caps.set(data);
    capsError.set(null);
  } catch (error: any) {
    caps.set(null);
    capsError.set(`Capabilities unavailable: ${error.message}`);
  }
}
