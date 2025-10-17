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
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Part I – The LumiGrid System</h2>
                <p className="text-[clamp(1.1rem,2.2vw,1.3rem)] text-[--ink] mt-2 font-semibold reveal">A living network of light</p>
                <div className="prose mx-auto mt-4 reveal">
                    <p>LumiGrid is a distributed control architecture for modular, intelligent lighting and kinetic systems. At its core it turns light into a networked medium — each node thinking for itself, yet synchronized in a collective rhythm.</p>
                    <p>Instead of one controller fanning out to passive fixtures, LumiGrid builds a mesh of equal peers: compact nodes that can drive LEDs, motors, sensors, or mixed loads. Any node can become the master clock; others align automatically over Wi-Fi or Ethernet multicast. Together they behave like a single, tempo-synchronized organism—perfect for interactive signage, stage visuals, ambient architecture, or experimental robotics.</p>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="sub-heading text-center reveal">Design Philosophy</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 max-w-6xl mx-auto">
                    <PhilosophyCard title="Distributed intelligence">Computation sits next to the hardware it controls.</PhilosophyCard>
                    <PhilosophyCard title="Deterministic sync">Every node follows the same timeline, even across wireless networks.</PhilosophyCard>
                    <PhilosophyCard title="Openness">Each module exposes its state through open REST / MQTT APIs and serves its own web UI.</PhilosophyCard>
                    <PhilosophyCard title="Human-centered UX">Installation, mapping, and show control happen from any browser—no proprietary app required.</PhilosophyCard>
                    <PhilosophyCard title="Hardware pragmatism">Built around inexpensive, readily available ESP-class MCUs and a few precision analog helpers.</PhilosophyCard>
                </div>
            </div>
            
            <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
                <div className="reveal">
                    <h3 className="sub-heading">The system in motion</h3>
                    <div className="prose">
                        <p>Imagine a retail façade covered in addressable LED panels, a few kinetic logo elements, and a line of ambient wall-washers. A single LumiGrid master broadcasts the global clock and cues. Every LED Node interprets that timeline locally: gradients ripple in sync, servos swing at the beat, and PWM fixtures fade precisely on the downbeat. The choreography is data-light—just timestamps and preset names—yet the visual result is tightly unified.</p>
                    </div>
                </div>
                 <figure className="p-3 bg-white/10 border border-white/20 backdrop-saturate-150 backdrop-blur-lg rounded-2xl reveal">
                    <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-[--bg-1] to-color-mix(in srgb, var(--bg-1) 80%, black) border border-white/10 flex items-center justify-center relative overflow-hidden group" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 transition-colors group-hover:text-white/40">
                            <path d="M12 20v-4"/><path d="M12 14v-4"/><path d="M12 8V4"/><path d="M20 12h-4"/><path d="M14 12h-4"/><path d="M8 12H4"/>
                            <path d="M18 18l-2-2"/><path d="M14 14l-2-2"/><path d="M8 8 6 6"/>
                            <path d="m6 18 2-2"/><path d="M18 6l-2 2"/>
                            <circle cx="12" cy="12" r="8"/>
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-tr from-[--a] via-[--c] to-[--b] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    </div>
                    <figcaption className="text-[--muted] text-sm mt-2">Nodes work in a synchronized mesh, behaving as a single organism.</figcaption>
                </figure>
            </div>
        </Section>
    );
};

export default WhatIsLumiGridSection;
