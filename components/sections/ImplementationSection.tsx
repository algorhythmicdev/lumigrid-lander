
import React from 'react';

const Card: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/5 border border-white/20 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/20 reveal">
        <h3 className="font-semibold text-lg mt-0">{title}</h3>
        <p className="text-[--muted] mb-0">{children}</p>
    </div>
);

const PhotoPlaceholder: React.FC<{ caption: string }> = ({ caption }) => (
    <figure className="p-3 bg-white/10 border border-white/20 backdrop-saturate-150 backdrop-blur-lg rounded-2xl">
        <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-[--bg-1] to-color-mix(in srgb, var(--bg-1) 80%, black) border border-white/10 flex items-center justify-center relative overflow-hidden group" aria-hidden="true">
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 transition-colors group-hover:text-white/40">
                <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-[--a] via-[--c] to-[--b] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
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
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-6 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Where it fits (quick examples)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,2.5vw,2rem)]">
                    <Card title="Window displays">Two colour zones left/right + a soft white backlight. Daytime: gentle flow. Evening: warm halo. Marketing: a short sweep every 10 minutes.</Card>
                    <Card title="Logo letters">Clean white on brand 24/7. Add a soft halo on weekends. Trigger a sparkle when a new product is announced.</Card>
                    <Card title="Façade moments">Multiple strips along the building line act as one. Start the event look with one tap, then fade back to calm.</Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,2.5vw,2rem)] mt-8 reveal">
                    <PhotoPlaceholder caption="Photo: Backlit letters with halo" />
                    <PhotoPlaceholder caption="Photo: Window strip install" />
                    <PhotoPlaceholder caption="Photo: Façade sweep" />
                </div>
            </div>
        </section>
    );
};

export default ImplementationSection;
