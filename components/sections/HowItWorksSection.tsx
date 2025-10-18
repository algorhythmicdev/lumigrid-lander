import React from 'react';
import { Radio, Cpu, Globe } from 'lucide-react';

const Card: React.FC<{ title: string, children: React.ReactNode, icon: React.ComponentType<any> }> = ({ title, children, icon: Icon }) => (
    <div className="bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg reveal h-full group hover:border-white/25 transition-all">
        <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[--b]/20 to-[--a]/20 rounded-lg group-hover:scale-110 transition-transform">
                <Icon size={22} className="text-[--b]" />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-lg mt-0 mb-2 text-[--ink]">{title}</h3>
                <p className="text-[--muted] mb-0 text-sm leading-relaxed">{children}</p>
            </div>
        </div>
    </div>
);

const HowItWorksSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,4vw,3.5rem)_0] bg-gradient-to-b from-[--a]/5 to-[--c]/5">
            <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-10 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">System Architecture</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <Card title="Sync Protocol" icon={Radio}>
                        Millisecond-accurate synchronization across all nodes via UDP multicast.
                    </Card>
                    <Card title="Effect Engine" icon={Cpu}>
                        Real-time rendering with power-aware control and smooth transitions.
                    </Card>
                    <Card title="Web Control" icon={Globe}>
                        Browser-based interface for setup, monitoring, and live control.
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
