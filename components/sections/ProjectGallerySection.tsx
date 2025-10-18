
import React from 'react';
import { Building, Hotel, ShoppingCart, Briefcase, Palette, Utensils } from 'lucide-react';

const galleryItems = [
    { title: 'City Square', description: 'Dynamic facade lighting for a public space.', image: '/images/329097335_1799601813748930_5439712915188964678_n.jpg', icon: Building },
    { title: 'Boutique Hotel', description: 'Warm, inviting entrance and window accents.', image: '/images/342056334_539843445015464_754610997571639058_n-1.jpg', icon: Hotel },
    { title: 'Retail Flagship', description: 'Brand colors synchronized across the entire storefront.', image: '/images/Profile-NEON-NG-scaled.jpg', icon: ShoppingCart },
    { title: 'Corporate HQ', description: 'Subtle logo halo with scheduled color shifts.', image: '/images/433120922_940810311383809_3480163619584564884_n-2.jpg', icon: Briefcase },
    { title: 'Art Installation', description: 'Interactive light display reacting to ambient sound.', image: '/images/20231220-1208-bilde3.png', icon: Palette },
    { title: 'Restaurant Chain', description: 'Consistent and recognizable lighting signature.', image: '/images/Tanq-8-rotated.jpeg', icon: Utensils },
];

const GalleryItem: React.FC<{ title: string, description: string, image: string, icon: React.ComponentType<any>, index: number }> = ({ title, description, image, icon: Icon, index }) => (
    <figure className="group relative overflow-hidden rounded-xl shadow-lg reveal border border-white/10 hover:border-white/20 transition-all" style={{ transitionDelay: `${index * 80}ms` }}>
        <div className="w-full aspect-square bg-gradient-to-br from-[--bg-1] to-black/20 flex items-center justify-center relative overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        </div>
        <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[--bg-1]/90 via-[--bg-1]/70 to-transparent">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg border border-white/20 group-hover:bg-[--a] transition-colors">
                    <Icon size={20} className="text-[--ink] group-hover:animate-pulse" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-[--ink] mb-0">{title}</h3>
                </div>
            </div>
        </figcaption>
    </figure>
);


const ProjectGallerySection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,4vw,3.5rem)_0] bg-gradient-to-b from-[--b]/8 to-[--a]/8">
             <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--b),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--a),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-2 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text flowing-gradient">From subtle to stunning</h2>
                <p className="text-center text-lg text-[--muted] max-w-3xl mx-auto mb-12">
                    Our clients have used LumiGrid to create a wide variety of lighting solutions, from subtle accents to stunning centerpieces.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryItems.map((item, index) => (
                        <GalleryItem key={item.title} {...item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectGallerySection;
