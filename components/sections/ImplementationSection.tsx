
import React from 'react';

const Card: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/5 border border-white/20 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/20 reveal">
        <h3 className="font-semibold text-lg mt-0">{title}</h3>
        <p className="text-[--muted] mb-0">{children}</p>
    </div>
);

const PhotoCard: React.FC<{ caption: string, image: string }> = ({ caption, image }) => (
    <figure className="p-3 bg-white/10 border border-white/20 backdrop-saturate-150 backdrop-blur-lg rounded-2xl">
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
            <img src={image} alt={caption} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <figcaption className="text-[--muted] text-sm mt-2">{caption}</figcaption>
    </figure>
);

const ImplementationSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,5vw,4.5rem)_0] bg-gradient-to-b from-[--a]/10 to-[--c]/10">
            <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-6 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Where it fits</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,2.5vw,2rem)]">
                    <Card title="Window displays">Colour zones with soft backlight. Gentle day flow, warm evening halo.</Card>
                    <Card title="Logo letters">Clean white 24/7. Add soft halos or sparkles on demand.</Card>
                    <Card title="Façade moments">Multiple strips act as one. Event looks with one tap.</Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,2.5vw,2rem)] mt-8 reveal">
                    <PhotoCard caption="Backlit letters with halo" image="/images/Asset-1-1.webp" />
                    <PhotoCard caption="Window strip install" image="/images/Untitled-7-01.webp" />
                    <PhotoCard caption="Façade lighting" image="/images/242193487_1740105769520457_5649896811511033318_n-1.png" />
                </div>
            </div>
        </section>
    );
};

export default ImplementationSection;
