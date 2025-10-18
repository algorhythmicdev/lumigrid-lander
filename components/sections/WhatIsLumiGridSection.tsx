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
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">The LumiGrid System</h2>
                <p className="text-[--muted] mt-3 text-lg reveal max-w-2xl mx-auto">
                    Networked LED control that synchronizes across nodes with precision timing and intelligent effects.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
                <PhilosophyCard title="Distributed" icon={Network}>
                    Each node handles its own control, working in sync with the network.
                </PhilosophyCard>
                <PhilosophyCard title="Synchronized" icon={Zap}>
                    Millisecond-precise timing across all connected devices.
                </PhilosophyCard>
                <PhilosophyCard title="Accessible" icon={Globe}>
                    Control from any browser—no proprietary app needed.
                </PhilosophyCard>
            </div>
        </Section>
    );
};

export default WhatIsLumiGridSection;
