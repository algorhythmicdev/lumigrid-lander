
import React from 'react';

const Card: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/5 border border-white/20 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/20 reveal">
        <h3 className="font-semibold text-lg mt-0">{title}</h3>
        <p className="text-[--muted] mb-0">{children}</p>
    </div>
);

const ReliabilitySection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,5vw,4.5rem)_0]">
             <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-6 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Reliable by design</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(1rem,2.5vw,2rem)] max-w-4xl mx-auto">
                    <Card title="Keeps running">Scenes continue even if your phone is offline. Power returns? It remembers what to play.</Card>
                    <Card title="Private control">You control your own lights. The web app talks directly on your local network.</Card>
                </div>
            </div>
        </section>
    );
};

export default ReliabilitySection;
