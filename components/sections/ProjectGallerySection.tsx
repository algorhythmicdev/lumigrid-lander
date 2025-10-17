
import React from 'react';

const galleryItems = [
    { title: 'City Square', description: 'Dynamic facade lighting for a public space.', image: '/images/329097335_1799601813748930_5439712915188964678_n.jpg' },
    { title: 'Boutique Hotel', description: 'Warm, inviting entrance and window accents.', image: '/images/342056334_539843445015464_754610997571639058_n-1.jpg' },
    { title: 'Retail Flagship', description: 'Brand colors synchronized across the entire storefront.', image: '/images/Profile-NEON-NG-scaled.jpg' },
    { title: 'Corporate HQ', description: 'Subtle logo halo with scheduled color shifts.', image: '/images/433120922_940810311383809_3480163619584564884_n-2.jpg' },
    { title: 'Art Installation', description: 'Interactive light display reacting to ambient sound.', image: '/images/20231220-1208-bilde3.png' },
    { title: 'Restaurant Chain', description: 'Consistent and recognizable lighting signature.', image: '/images/Tanq-8-rotated.jpeg' },
];

const GalleryItem: React.FC<{ title: string, description: string, image: string, index: number }> = ({ title, description, image, index }) => (
    <figure className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-black/30 reveal" style={{ transitionDelay: `${index * 100}ms` }}>
        <div className="w-full aspect-square bg-gradient-to-br from-[--bg-1] to-color-mix(in srgb, var(--bg-1) 80%, black) border border-white/10 flex items-center justify-center relative overflow-hidden transition-transform duration-500 ease-in-out group-hover:scale-105">
            <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
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
                        <GalleryItem key={item.title} title={item.title} description={item.description} image={item.image} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectGallerySection;
