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
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-2 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text flowing-gradient">The System in Motion</h2>
                <p className="text-center text-lg text-[--muted] max-w-3xl mx-auto mb-12">
                    Imagine a retail façade covered in addressable LED panels, a few kinetic logo elements, and a line of ambient wall-washers. A single LumiGrid master broadcasts the global clock and cues. Every LED Node interprets that timeline locally: gradients ripple in sync, servos swing at the beat, and PWM fixtures fade precisely on the downbeat. The choreography is data-light—just timestamps and preset names—yet the visual result is tightly unified.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <Card title="Sync Protocol" icon={Radio}>
                        UDP multicast “ticks” and “cues” keep all nodes aligned to the same millisecond grid.
                    </Card>
                    <Card title="Trigger Engine" icon={Cpu}>
                        Interprets incoming actions and routes them to the right subsystem.
                    </Card>
                    <Card title="Effect Engine" icon={Globe}>
                        Renders visual or kinetic effects in real time, respecting frame-rate, power, and timing constraints.
                    </Card>
                    <Card title="Scheduler" icon={Radio}>
                        Executes time-based scenes, daily schedules, or show playlists.
                    </Card>
                    <Card title="Networking & APIs" icon={Cpu}>
                        REST + MQTT endpoints expose every parameter to higher-level controllers or creative tools.
                    </Card>
                    <Card title="Web UI" icon={Globe}>
                        A self-hosted control panel served by each node for configuration, diagnostics, and live sequencing.
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
