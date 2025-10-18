import React, { useState, useMemo } from 'react';
import { Play, Pause, Zap, Sparkles, Waves, Flame, Radio, Sunrise } from 'lucide-react';

type Effect = 'breathe' | 'rainbow' | 'sparkle' | 'chase' | 'wave' | 'fire' | 'pulse' | 'strobe';
type Palette = 'rf' | 'neon' | 'sunset' | 'mint' | 'ocean' | 'purple';

const PALETTES: Record<Palette, string> = {
  rf: 'linear-gradient(90deg, #1cc5dc, #e73ba3, #6c2bd9, #ffd166, #1cc5dc)',
  neon: 'linear-gradient(90deg, #00e5ff, #77f7cb, #c7f701, #00bfff, #00e5ff)',
  sunset: 'linear-gradient(90deg, #ff7b7b, #ffa24c, #ffd166, #ffd6e7, #ff7b7b)',
  mint: 'linear-gradient(90deg, #9fffd7, #76e7ff, #caa6ff, #d9fff7, #9fffd7)',
  ocean: 'linear-gradient(90deg, #006994, #0891b2, #06b6d4, #22d3ee, #006994)',
  purple: 'linear-gradient(90deg, #7c3aed, #a855f7, #c084fc, #e9d5ff, #7c3aed)'
};

const EFFECT_INFO: Record<Effect, { icon: React.ComponentType<any>, label: string }> = {
  breathe: { icon: Radio, label: 'Soft Breathe' },
  rainbow: { icon: Sunrise, label: 'Rainbow' },
  sparkle: { icon: Sparkles, label: 'Sparkle' },
  chase: { icon: Zap, label: 'Chase' },
  wave: { icon: Waves, label: 'Wave' },
  fire: { icon: Flame, label: 'Fire' },
  pulse: { icon: Radio, label: 'Pulse' },
  strobe: { icon: Zap, label: 'Strobe' }
};

const LEDControlSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
  const [effect, setEffect] = useState<Effect>('breathe');
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [palette, setPalette] = useState<Palette>('rf');

  const stripStyles = useMemo(() => {
    const speeds: Record<Effect, number> = { 
      breathe: 6, rainbow: 3, sparkle: 2.5, chase: 4,
      wave: 5, fire: 3.5, pulse: 4, strobe: 1 
    };
    const duration = `${speeds[effect] / speed}s`;

    const baseStyle = {
        '--led-grad': PALETTES[palette],
        animationPlayState: isPaused ? 'paused' : 'running',
        filter: `brightness(${intensity}) saturate(${0.8 + intensity * 0.5})`,
    } as React.CSSProperties;

    // Different animation styles for different effects
    switch(effect) {
      case 'sparkle':
        return {
          ...baseStyle,
          background: 'radial-gradient(circle, white, transparent 60%)',
          backgroundSize: '20px 100%',
          animation: `twinkle ${duration} ease-in-out infinite alternate`,
          backgroundRepeat: 'repeat-x',
        };
      case 'fire':
        return {
          ...baseStyle,
          background: 'linear-gradient(90deg, #ff4400, #ff8800, #ffaa00, #ff6600, #ff4400)',
          backgroundSize: '200% 100%',
          animation: `move ${duration} ease-in-out infinite`,
          filter: `brightness(${intensity}) saturate(${1.2 + intensity * 0.3}) blur(1px)`,
        };
      case 'wave':
        return {
          ...baseStyle,
          background: `var(--led-grad)`,
          backgroundSize: '300% 100%',
          animation: `move ${duration} ease-in-out infinite alternate`,
        };
      case 'pulse':
        return {
          ...baseStyle,
          background: `var(--led-grad)`,
          backgroundSize: '100% 100%',
          animation: `twinkle ${duration} ease-in-out infinite`,
        };
      case 'strobe':
        return {
          ...baseStyle,
          background: `var(--led-grad)`,
          backgroundSize: '100% 100%',
          animation: `twinkle ${duration} steps(2, end) infinite`,
        };
      default:
        return {
          ...baseStyle,
          background: `var(--led-grad)`,
          backgroundSize: '200% 100%',
          animation: `move ${duration} ${effect === 'breathe' ? 'ease-in-out' : 'linear'} infinite`,
        };
    }
  }, [effect, palette, isPaused, speed, intensity]);
  
  return (
    <section id={id} className="relative overflow-hidden p-[clamp(2rem,4vw,3.5rem)_0] bg-gradient-to-b from-[--b]/10 to-[--c]/5">
      <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-15 blur-3xl"></div>
      <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-15 blur-3xl"></div>
      
      <div className="w-[min(1200px,92vw)] mx-auto">
        <div className="text-center mb-8">
          <h2 ref={el => addParallaxRef(el, 0.12)} className="m-0 mb-3 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">
            LED Effects Demo
          </h2>
          <p className="text-[--muted] max-w-2xl mx-auto text-lg">
            Experience real-time lighting control
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Single LED Strip */}
          <div className="reveal p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="relative h-16 bg-slate-900/80 rounded-xl overflow-hidden border border-white/20 shadow-inner">
              <div className="absolute inset-0" style={stripStyles}></div>
            </div>

            {/* Effect Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6" role="group" aria-label="LED effects">
              {(Object.entries(EFFECT_INFO) as [Effect, typeof EFFECT_INFO[Effect]][]).map(([fx, { icon: Icon, label }]) => (
                <button
                  key={fx}
                  onClick={() => setEffect(fx)}
                  className={`flex items-center gap-2 justify-center p-3 rounded-lg border-2 transition-all ${
                    effect === fx
                      ? 'border-[--c] bg-[--c]/10 text-[--ink]'
                      : 'border-white/20 bg-white/5 text-[--muted] hover:bg-white/10 hover:border-white/30'
                  }`}
                  aria-pressed={effect === fx}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <label className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[--ink]">Speed</span>
                  <input 
                    type="range" 
                    min="0.2" 
                    max="3" 
                    step="0.1" 
                    value={speed} 
                    onChange={e => setSpeed(Number(e.target.value))} 
                    className="flex-1 max-w-[120px]"
                  />
                </label>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <label className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[--ink]">Brightness</span>
                  <input 
                    type="range" 
                    min="0.3" 
                    max="1.5" 
                    step="0.05" 
                    value={intensity} 
                    onChange={e => setIntensity(Number(e.target.value))} 
                    className="flex-1 max-w-[120px]"
                  />
                </label>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center justify-center gap-2 w-full h-full text-[--ink] hover:text-[--c] transition-colors"
                  aria-pressed={isPaused}
                >
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  <span className="text-sm font-medium">{isPaused ? 'Play' : 'Pause'}</span>
                </button>
              </div>
            </div>
            
            {/* Color Palettes */}
            <div className="flex items-center justify-center gap-3 mt-6" role="group" aria-label="Color palettes">
              <span className="text-sm font-medium text-[--muted]">Palette:</span>
              {(Object.entries(PALETTES) as [Palette, string][]).map(([pal, gradient]) => (
                <button 
                  key={pal} 
                  onClick={() => setPalette(pal)} 
                  className={`w-12 h-8 rounded-lg border-2 transition-all ${
                    palette === pal ? 'border-[--c] scale-110' : 'border-white/30 hover:border-white/50'
                  }`}
                  style={{ background: gradient }} 
                  aria-label={`${pal.charAt(0).toUpperCase() + pal.slice(1)} palette`}
                  aria-pressed={palette === pal}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 text-center reveal">
            <p className="text-[--muted] max-w-2xl mx-auto">
              The LED Node provides precise control over lighting effects with REST API integration. 
              Create custom sequences, sync multiple nodes, and adjust power budgets in real-time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LEDControlSection;
