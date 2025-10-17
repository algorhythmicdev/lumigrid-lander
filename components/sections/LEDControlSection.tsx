import React, { useState, useEffect, useMemo } from 'react';

type Effect = 'breathe' | 'rainbow' | 'sparkle' | 'chase';
type Palette = 'rf' | 'neon' | 'sunset' | 'mint';

const PALETTES: Record<Palette, string> = {
  rf: 'linear-gradient(90deg, #1cc5dc, #e73ba3, #6c2bd9, #ffd166, #1cc5dc)',
  neon: 'linear-gradient(90deg, #00e5ff, #77f7cb, #c7f701, #00bfff, #00e5ff)',
  sunset: 'linear-gradient(90deg, #ff7b7b, #ffa24c, #ffd166, #ffd6e7, #ff7b7b)',
  mint: 'linear-gradient(90deg, #9fffd7, #76e7ff, #caa6ff, #d9fff7, #9fffd7)'
};

const API_ENDPOINTS = `GET /api/status      Returns node info, health, and state
POST /api/config      Merge or overwrite configuration JSON
GET/POST /api/presets Manage stored presets (scenes)
POST /api/trigger     Execute actions: play_preset, blackout
GET /events           Server-Sent Events stream for live feedback`;

const LEDControlSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
  const [effect, setEffect] = useState<Effect>('breathe');
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [isNight, setIsNight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrubValue, setScrubValue] = useState(0);
  const [palette, setPalette] = useState<Palette>('rf');

  useEffect(() => {
    const v = Number(scrubValue);
    let newEffect: Effect;
    if (v < 25) newEffect = 'breathe';
    else if (v < 50) newEffect = 'chase';
    else if (v < 75) newEffect = 'rainbow';
    else newEffect = 'sparkle';
    setEffect(newEffect);
  }, [scrubValue]);

  const timelineNote = useMemo(() => {
    const v = Number(scrubValue);
    if (v < 25) return 'Scene: Morning Calm';
    if (v < 50) return 'Scene: Midday Clean';
    if (v < 75) return 'Scene: Evening Flow';
    return 'Scene: Promo Sparkle';
  }, [scrubValue]);

  const stripWrapperStyles = useMemo(() => ({
    filter: `brightness(${intensity}) saturate(${0.8 + intensity * 0.5})`,
    opacity: Math.min(1, 0.9 + (intensity - 1) * 0.2),
  }), [intensity]);
  
  const stripStyles = useMemo(() => {
    const baseSpeed = { breathe: 6, rainbow: 3, sparkle: 2.5, chase: 4 }[effect] || 3;
    const duration = `${baseSpeed / speed}s`;

    const baseStyle = {
        '--led-grad': PALETTES[palette],
        animationPlayState: isPaused ? 'paused' : 'running',
    } as React.CSSProperties;

    if (effect === 'sparkle') {
        return [0, 1, 2].map(i => ({
            ...baseStyle,
            background: 'radial-gradient(circle, white, transparent 60%)',
            backgroundSize: '16px 16px',
            animation: `twinkle ${duration} ease-in-out infinite alternate`,
            animationDelay: `${i * 0.25}s`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: `${i * 33}% 50%`
        }));
    }

    return [0, 1, 2].map(i => ({
        ...baseStyle,
        background: `var(--led-grad)`,
        backgroundSize: '200% 100%',
        animation: `move ${duration} ${effect === 'breathe' ? 'ease-in-out' : 'linear'} infinite`,
        animationDelay: `${i * -0.2}s`,
    }));
  }, [effect, palette, isPaused, speed]);
  
  return (
    <section id={id} className="relative overflow-hidden p-[clamp(2rem,5vw,4.5rem)_0] bg-gradient-to-b from-[--b]/15 to-[--c]/10">
        <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-20 blur-2xl"></div>
        <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-20 blur-2xl"></div>
      <div className="w-[min(1200px,92vw)] mx-auto">
        <div className="text-center">
            <h2 ref={el => addParallaxRef(el, 0.12)} className="m-0 mb-2 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Part II – The LumiGrid LED Node</h2>
            <p className="lead reveal text-[--muted] max-w-2xl mx-auto">The LED Node is the reference member of the LumiGrid family—the one that paints light.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(1rem,2.5vw,2rem)] mt-8">
          <div>
            <div className="p-4 rounded-2xl border border-white/20 shadow-2xl shadow-black/30 transition-colors duration-500 reveal bg-black/20"
                 style={{ background: isNight ? 'radial-gradient(800px 400px at 50% -30%, rgba(108,43,217,.22), transparent 60%), radial-gradient(800px 400px at 10% 130%, rgba(255,209,102,.18), transparent 60%), #060a16' : 'radial-gradient(800px 400px at 50% -30%, var(--c-trans), transparent 60%), radial-gradient(800px 400px at 10% 130%, var(--a-trans), transparent 60%), #0b1120' }}>
              {[0, 1, 2].map(i => (
                <div key={i} className="relative h-4 my-3 bg-slate-800 rounded-full overflow-hidden" style={effect === 'sparkle' ? stripWrapperStyles : {}}>
                    <div className="absolute inset-0" style={{ ...(effect !== 'sparkle' ? stripWrapperStyles : {}), ...stripStyles[i]}}></div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 items-center flex-wrap mt-4 reveal" role="group" aria-label="LED demo controls">
                <select value={effect} onChange={e => setEffect(e.target.value as Effect)} className="bg-slate-900/60 p-2 px-3 rounded-lg border border-white/20 text-[--ink]">
                  <option value="breathe">Soft breathe</option>
                  <option value="rainbow">Rainbow sweep</option>
                  <option value="sparkle">Twinkle</option>
                  <option value="chase">Clean chase</option>
                </select>
              <label className="flex gap-2 items-center bg-slate-900/60 p-2 px-3 rounded-lg border border-white/20">Speed
                <input type="range" min="0.2" max="3" step="0.1" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-24 md:w-32" />
              </label>
              <label className="flex gap-2 items-center bg-slate-900/60 p-2 px-3 rounded-lg border border-white/20">Intensity
                <input type="range" min="0.3" max="1.3" step="0.05" value={intensity} onChange={e => setIntensity(Number(e.target.value))} className="w-24 md:w-32" />
              </label>
            </div>
            
            <div className="flex items-center gap-2 mt-3 reveal" role="group" aria-label="Effect palette">
                <span className="font-mono text-sm text-[--muted]">Palette:</span>
                {Object.keys(PALETTES).map(pal => (
                    <button key={pal} onClick={() => setPalette(pal as Palette)} className={`w-8 h-6 rounded-md border border-white/25 cursor-pointer ring-2 ${palette === pal ? 'ring-[--c]' : 'ring-transparent'}`} style={{ background: PALETTES[pal as Palette] }} aria-label={`${pal.charAt(0).toUpperCase() + pal.slice(1)}`}></button>
                ))}
            </div>
          </div>
          <div className="prose reveal">
            <h3 className="sub-heading !mt-0">Purpose</h3>
            <p>The LED Node bridges two worlds: precise PWM control for high-power “dumb” LED channels, and smooth addressable LED animation for pixel-based fixtures. Each node can perform solo, join an ensemble, or lead as a sync master.</p>
            <h3 className="sub-heading">Hardware at a glance</h3>
            <ul>
                <li><strong>Controller:</strong> <code>ESP32-WROOM-32U</code></li>
                <li><strong>PWM driver:</strong> <code>PCA9685</code> (12-bit, 1 kHz) → 8 MOSFET channels</li>
                <li><strong>Addressable outputs:</strong> 8 × level-shifted 5 V via <code>SN74HCT245</code></li>
                <li><strong>Power:</strong> 5 V bus with fuse and thermal feedback</li>
            </ul>
          </div>
        </div>
        <div className="prose max-w-none mt-12 reveal">
            <h3 className="sub-heading">Visual Intelligence & APIs</h3>
            <p>The onboard Effect Engine hosts a library of real-time shaders written in C, from foundational effects like gradients and chases to procedural animations like fire and waves. A power-budget module estimates current draw and automatically scales brightness to stay within hardware limits. The node exposes its full state through human-friendly REST APIs.</p>
            <pre><code>{API_ENDPOINTS}</code></pre>
            <h3 className="sub-heading">Developer & Maker Friendliness</h3>
            <ul>
                <li>Firmware upgrades over USB or OTA.</li>
                <li>All endpoints documented; simulator for effect testing on desktop.</li>
                <li>Unit tests for every effect (CRC-checked frame outputs).</li>
                <li>Web UI open-source and editable in any HTML editor.</li>
            </ul>
        </div>
      </div>
    </section>
  );
};

export default LEDControlSection;
