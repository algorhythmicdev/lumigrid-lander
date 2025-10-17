import React from 'react';

const PhilosophyCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="reveal">
        <h4 className="font-semibold text-[--ink] text-lg">{title}</h4>
        <p className="text-[--muted] mt-1">{children}</p>
    </div>
);

const Section: React.FC<{ id: string, children: React.ReactNode, className?: string }> = ({ id, children, className }) => (
    <section id={id} className={`relative overflow-hidden p-[clamp(2rem,5vw,4.5rem)_0] ${className}`}>
         <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-20 blur-2xl"></div>
        <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-20 blur-2xl"></div>
        <div className="w-[min(1200px,92vw)] mx-auto">
            {children}
        </div>
    </section>
);

const WhatIsLumiGridSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <Section id={id}>
            <div className="text-center max-w-4xl mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">The LumiGrid System</h2>
                <p className="text-[clamp(1.1rem,2.2vw,1.3rem)] text-[--ink] mt-2 font-semibold reveal">A living network of light</p>
                <div className="prose mx-auto mt-4 reveal">
                    <p>LumiGrid turns light into a networked medium. Compact nodes drive LEDs, motors, and sensors—each thinking for itself, yet synchronized in perfect rhythm over Wi-Fi or Ethernet.</p>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="sub-heading text-center reveal">Design Philosophy</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 max-w-6xl mx-auto">
                    <PhilosophyCard title="Distributed intelligence">Computation sits next to the hardware it controls.</PhilosophyCard>
                    <PhilosophyCard title="Deterministic sync">Every node follows the same timeline across wireless networks.</PhilosophyCard>
                    <PhilosophyCard title="Open & accessible">Control from any browser—no proprietary app required.</PhilosophyCard>
                </div>
            </div>
        </Section>
    );
};

export default WhatIsLumiGridSection;
