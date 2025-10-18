import React from 'react';
import { Network, Zap, Globe } from 'lucide-react';

const PhilosophyCard: React.FC<{ title: string, children: React.ReactNode, icon: React.ComponentType<any> }> = ({ title, children, icon: Icon }) => (
    <div className="reveal p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl backdrop-blur-sm">
        <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-br from-[--a]/20 to-[--c]/20 rounded-lg">
                <Icon size={20} className="text-[--c]" />
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-[--ink] text-lg mb-1">{title}</h4>
                <p className="text-[--muted] text-sm">{children}</p>
            </div>
        </div>
    </div>
);

const Section: React.FC<{ id: string, children: React.ReactNode, className?: string }> = ({ id, children, className }) => (
    <section id={id} className={`relative overflow-hidden p-[clamp(2rem,4vw,3.5rem)_0] ${className}`}>
         <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-15 blur-3xl"></div>
        <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-15 blur-3xl"></div>
        <div className="w-[min(1200px,92vw)] mx-auto">
            {children}
        </div>
    </section>
);

const WhatIsLumiGridSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <Section id={id}>
            <div className="text-center max-w-3xl mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-3xl md:text-4xl font-bold [will-change:transform] gradient-text flowing-gradient">A living network of light</h2>
                <p className="text-[--muted] mt-3 text-lg reveal max-w-2xl mx-auto">
                    LumiGrid is a distributed control architecture for modular, intelligent lighting and kinetic systems. At its core it turns light into a networked medium—each node thinking for itself, yet synchronized in a collective rhythm.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
                <PhilosophyCard title="Distributed Intelligence" icon={Network}>
                    Computation sits next to the hardware it controls, enabling fast and responsive performance.
                </PhilosophyCard>
                <PhilosophyCard title="Deterministic Sync" icon={Zap}>
                    Every node follows the same timeline, even across wireless networks, for perfectly synchronized effects.
                </PhilosophyCard>
                <PhilosophyCard title="Openness" icon={Globe}>
                    Each module exposes its state through open REST / MQTT APIs and serves its own web UI.
                </PhilosophyCard>
                <PhilosophyCard title="Human-Centered UX" icon={Network}>
                    Installation, mapping, and show control happen from any browser—no proprietary app required.
                </PhilosophyCard>
            </div>
        </Section>
    );
};

export default WhatIsLumiGridSection;
