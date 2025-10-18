
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,5vw,4.5rem)_0] bg-gradient-to-b from-[--a]/15 to-[--b]/15">
            <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto text-center">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="m-0 mb-2 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Bring your light to life</h2>
                <p className="lead reveal text-[clamp(1.05rem,2.1vw,1.2rem)] text-[--muted] max-w-2xl mx-auto">Tell us what you’re building. We’ll help plan the zones, the looks, and the show.</p>
                <a className="inline-block mt-4 no-underline text-center font-semibold rounded-[0.95rem] py-4 px-5 text-[1.05rem] border-2 border-transparent bg-gradient-to-tr from-[--a] via-[--b] to-[--c] text-[#09101a]" href="https://reclamefabriek.eu" target="_blank" rel="noopener">Contact Reclame Fabriek</a>
            </div>
        </section>
    );
};

export default CTASection;
