import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Section from '../Section';

const QA: React.FC<{ question: string, children: React.ReactNode }> = ({ question, children }) => (
    <details className="glass group p-4 reveal hover:border-white/25 transition-all">
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
        <Section id={id} className="soft">
            <div className="max-w-3xl mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="center h2 gradient-text flowing-gradient" data-parallax="0.12">Frequently Asked Questions</h2>
                <p className="center lead mx-auto mb-12">
                    Here are some of the most common questions we get about LumiGrid.
                </p>
                <div className="space-y-4">
                    <QA question="Can I use my existing LED strips?">Yes — most common addressable RGB/RGBW strips and standard white channels are supported.</QA>
                    <QA question="Do I need special software?">No. Open a browser on your phone or laptop. That's it.</QA>
                    <QA question="Will it sync across a long shopfront?">Yes. Zones share timing so chases and sparkles line up from end to end.</QA>
                    <QA question="What happens after a power cut?">The system picks up the planned scene automatically when power returns.</QA>
                </div>
            </div>
        </Section>
    );
};

export default FAQSection;
