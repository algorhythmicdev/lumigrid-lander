
import React from 'react';

const QA: React.FC<{ question: string, children: React.ReactNode }> = ({ question, children }) => (
    <details className="p-3 px-4 bg-white/10 border border-white/20 backdrop-saturate-150 backdrop-blur-lg rounded-2xl reveal">
        <summary className="cursor-pointer font-semibold">{question}</summary>
        <p className="mt-2 text-[--muted]">{children}</p>
    </details>
);

const FAQSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,5vw,4.5rem)_0] bg-gradient-to-b from-[--a]/10 to-[--c]/10">
            <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto max-w-3xl">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-6 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Common questions</h2>
                <div className="space-y-4">
                    <QA question="Can I use my existing LED strips?">Yes — most common addressable RGB/RGBW strips and standard white channels are supported.</QA>
                    <QA question="Do I need special software?">No. Open a browser on your phone or laptop. That’s it.</QA>
                    <QA question="Will it sync across a long shopfront?">Yes. Zones share timing so chases and sparkles line up from end to end.</QA>
                    <QA question="What happens after a power cut?">The system picks up the planned scene automatically when power returns.</QA>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
