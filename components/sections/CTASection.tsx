
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Section from '../Section';

const partnerLogos = [
    { src: '/images/Clients-2.png', alt: 'Collage of LumiGrid client installations' },
    { src: '/images/LIAA_logo_ansamblis-1.png', alt: 'LIAA logo' },
    { src: '/images/Reclame-Fabriek-Cube.png', alt: 'Reclame Fabriek cube logo' },
];

const CTASection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <Section id={id} className="soft">
            <div className="center">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="h2 gradient-text flowing-gradient" data-parallax="0.12">Ready to get started?</h2>
                <p className="lead reveal max-w-2xl mx-auto">
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
                <a className="btn primary big inline-flex items-center gap-2 mt-6 rounded-full" href="https://reclamefabriek.eu" target="_blank" rel="noopener">
                    Contact Us
                    <ArrowRight size={20} />
                </a>
            </div>
        </Section>
    );
};

export default CTASection;
