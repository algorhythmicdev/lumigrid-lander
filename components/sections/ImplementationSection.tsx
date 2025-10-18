import React from 'react';
import { ShoppingBag, Users, Bot } from 'lucide-react';
import Section from '../Section';

const Card: React.FC<{ title: string, children: React.ReactNode, icon: React.ComponentType<any> }> = ({ title, children, icon: Icon }) => (
    <div className="card reveal group hover:border-white/25 transition-all">
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
    <figure className="glass p-3 group hover:border-white/25 transition-all">
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-[--bg-1] to-black/20">
            <img src={image} alt={caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        <figcaption className="text-[--muted] text-sm mt-2 text-center">{caption}</figcaption>
    </figure>
);

const ImplementationSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <Section id={id} className="soft">
            <h2 ref={el => addParallaxRef(el, 0.12)} className="center h2 gradient-text flowing-gradient" data-parallax="0.12">Built for your business</h2>
            <p className="center lead max-w-3xl mx-auto mb-12">
                LumiGrid is engineered for seamless integration into your existing business operations, providing a robust and scalable solution for your lighting needs.
            </p>
            <div className="grid grid-2 lg:grid-3 gap-6 max-w-5xl mx-auto">
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
            <div className="grid grid-2 lg:grid-3 gap-6 mt-8 reveal max-w-5xl mx-auto">
                <PhotoCard caption="Backlit letters with halo" image="/images/Asset-1-1.webp" />
                <PhotoCard caption="Window strip install" image="/images/Untitled-7-01.webp" />
                <PhotoCard caption="Façade lighting" image="/images/242193487_1740105769520457_5649896811511033318_n-1.png" />
            </div>
        </Section>
    );
};

export default ImplementationSection;
