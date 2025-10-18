
import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const QA: React.FC<{ question: string, children: React.ReactNode }> = ({ question, children }) => (
    <details className="group p-4 bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/15 backdrop-saturate-150 backdrop-blur-lg rounded-xl reveal hover:border-white/25 transition-all">
        <summary className="cursor-pointer font-semibold text-[--ink] flex items-center justify-between">
            <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-[--a]" />
                {question}
            </div>
            <ChevronDown size={20} className="text-[--muted] group-open:rotate-180 transition-transform" />
        </summary>
        <p className="mt-3 text-[--muted] text-sm leading-relaxed">{children}</p>
    </details>
);

const FAQSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,4vw,3.5rem)_0] bg-gradient-to-b from-[--a]/5 to-[--c]/5">
            <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto max-w-3xl">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-2 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text flowing-gradient">Frequently Asked Questions</h2>
                <p className="text-center text-lg text-[--muted] max-w-3xl mx-auto mb-12">
                    Here are some of the most common questions we get about LumiGrid.
                </p>
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
