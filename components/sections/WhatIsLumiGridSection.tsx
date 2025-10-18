import React from 'react';
import { Network, Zap, Globe } from 'lucide-react';
import Section from '../Section';

const PhilosophyCard: React.FC<{ title: string, children: React.ReactNode, icon: React.ComponentType<any> }> = ({ title, children, icon: Icon }) => (
    <div className="card reveal">
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

const WhatIsLumiGridSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <Section id={id}>
            <div className="center max-w-3xl mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="h2 gradient-text flowing-gradient" data-parallax="0.12">A living network of light</h2>
                <p className="lead reveal max-w-2xl mx-auto">
                    LumiGrid is a distributed control architecture for modular, intelligent lighting and kinetic systems. At its core it turns light into a networked medium—each node thinking for itself, yet synchronized in a collective rhythm.
                </p>
            </div>

            <div className="grid grid-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto">
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
