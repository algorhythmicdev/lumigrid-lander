
import React from 'react';
import { ArrowRight } from 'lucide-react';

const partnerLogos = [
    { src: '/images/Clients-2.png', alt: 'Collage of LumiGrid client installations' },
    { src: '/images/LIAA_logo_ansamblis-1.png', alt: 'LIAA logo' },
    { src: '/images/Reclame-Fabriek-Cube.png', alt: 'Reclame Fabriek cube logo' },
];

const CTASection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,5vw,4.5rem)_0] bg-gradient-to-b from-[--a]/15 to-[--b]/15">
            <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto text-center">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="m-0 mb-2 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text flowing-gradient">Ready to get started?</h2>
                <p className="lead reveal text-[clamp(1.05rem,2.1vw,1.2rem)] text-[--muted] max-w-2xl mx-auto">
                    Let's talk about how LumiGrid can transform your space.
                </p>
                <div className="mt-10 flex flex-col items-center gap-6">
                    <span className="text-xs uppercase tracking-[0.35em] text-[--muted]/80">Trusted by creative teams</span>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {partnerLogos.map(logo => (
                            <img
                                key={logo.src}
                                src={logo.src}
                                alt={logo.alt}
                                className="h-12 w-auto opacity-80 transition-opacity hover:opacity-100"
                                loading="lazy"
                            />
                        ))}
                    </div>
                </div>
                <a className="inline-flex items-center gap-2 mt-6 no-underline text-center font-semibold rounded-full py-3 px-6 text-[1.05rem] border-2 border-transparent bg-gradient-to-tr from-[--a] via-[--b] to-[--c] text-white hover:opacity-90 transition-opacity" href="https://reclamefabriek.eu" target="_blank" rel="noopener">
                    Contact Us
                    <ArrowRight size={20} />
                </a>
            </div>
        </section>
    );
};

export default CTASection;
