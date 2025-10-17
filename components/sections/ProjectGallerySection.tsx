
import React from 'react';

const galleryItems = [
    { title: 'City Square', description: 'Dynamic facade lighting for a public space.' },
    { title: 'Boutique Hotel', description: 'Warm, inviting entrance and window accents.' },
    { title: 'Retail Flagship', description: 'Brand colors synchronized across the entire storefront.' },
    { title: 'Corporate HQ', description: 'Subtle logo halo with scheduled color shifts.' },
    { title: 'Art Installation', description: 'Interactive light display reacting to ambient sound.' },
    { title: 'Restaurant Chain', description: 'Consistent and recognizable lighting signature.' },
];

const GalleryItem: React.FC<{ title: string, description: string, index: number }> = ({ title, description, index }) => (
    <figure className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-black/30 reveal" style={{ transitionDelay: `${index * 100}ms` }}>
        <div className="w-full aspect-square bg-gradient-to-br from-[--bg-1] to-color-mix(in srgb, var(--bg-1) 80%, black) border border-white/10 flex items-center justify-center relative overflow-hidden transition-transform duration-500 ease-in-out group-hover:scale-105" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:text-white/30">
                <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
            </svg>
        </div>
        <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <h3 className="font-bold text-lg text-white">{title}</h3>
            <p className="text-[--muted] text-sm">{description}</p>
        </figcaption>
    </figure>
);


const ProjectGallerySection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,5vw,4.5rem)_0] bg-gradient-to-b from-[--b]/10 to-[--a]/10">
             <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--b),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--a),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-6 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2.5vw,2rem)]">
                    {galleryItems.map((item, index) => (
                        <GalleryItem key={item.title} title={item.title} description={item.description} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectGallerySection;
