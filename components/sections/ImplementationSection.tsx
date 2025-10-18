import React from 'react';
import { ShoppingBag, Users, Bot } from 'lucide-react';

const Card: React.FC<{ title: string, children: React.ReactNode, icon: React.ComponentType<any> }> = ({ title, children, icon: Icon }) => (
    <div className="bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg reveal group hover:border-white/25 transition-all">
        <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-br from-[--a]/20 to-[--c]/20 rounded-lg">
                <Icon size={20} className="text-[--a]" />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-lg mt-0 mb-2 text-[--ink]">{title}</h3>
                <p className="text-[--muted] mb-0 text-sm">{children}</p>
            </div>
        </div>
    </div>
);

const PhotoCard: React.FC<{ caption: string, image: string }> = ({ caption, image }) => (
    <figure className="p-3 bg-white/10 border border-white/15 backdrop-saturate-150 backdrop-blur-lg rounded-xl group hover:border-white/25 transition-all">
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-[--bg-1] to-black/20">
            <img src={image} alt={caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        <figcaption className="text-[--muted] text-sm mt-2 text-center">{caption}</figcaption>
    </figure>
);

const ImplementationSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,4vw,3.5rem)_0] bg-gradient-to-b from-[--a]/5 to-[--c]/5">
            <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-2 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Built for your business</h2>
                <p className="text-center text-lg text-[--muted] max-w-3xl mx-auto mb-12">
                LumiGrid is engineered for seamless integration into your existing business operations, providing a robust and scalable solution for your lighting needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <Card title="Retail" icon={ShoppingBag}>
                        Create dynamic and inviting storefronts that attract customers and highlight your products.
                    </Card>
                    <Card title="Events" icon={Users}>
                        Engage your audience with interactive lighting that adapts to the mood and energy of your event.
                    </Card>
                    <Card title="Automation" icon={Bot}>
                        Integrate with your existing systems to automate lighting changes based on time, weather, or other triggers.
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 reveal max-w-5xl mx-auto">
                    <PhotoCard caption="Backlit letters with halo" image="/images/Asset-1-1.webp" />
                    <PhotoCard caption="Window strip install" image="/images/Untitled-7-01.webp" />
                    <PhotoCard caption="Façade lighting" image="/images/242193487_1740105769520457_5649896811511033318_n-1.png" />
                </div>
            </div>
        </section>
    );
};

export default ImplementationSection;
