import React from 'react';
import { Shield, Wifi, HardDrive, Wrench } from 'lucide-react';

const Card: React.FC<{ title: string, children: React.ReactNode, icon: React.ComponentType<any> }> = ({ title, children, icon: Icon }) => (
    <div className="bg-gradient-to-br from-white/8 to-white/[0.02] border border-white/15 backdrop-blur-md rounded-xl p-6 shadow-lg reveal group hover:border-white/25 transition-all">
        <div className="flex items-start gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[--c]/20 to-[--b]/20 rounded-lg">
                <Icon size={22} className="text-[--c]" />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-lg mt-0 mb-2 text-[--ink]">{title}</h3>
                <p className="text-[--muted] mb-0 text-sm leading-relaxed">{children}</p>
            </div>
        </div>
    </div>
);

const ReliabilitySection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,4vw,3.5rem)_0]">
             <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-15 blur-3xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-2 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Reliability you can trust</h2>
                <p className="text-center text-lg text-[--muted] max-w-3xl mx-auto mb-12">
                    LumiGrid is built on a foundation of robust hardware and intelligent software, ensuring your lighting works flawlessly, day in and day out.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <Card title="Fail-Safe Blackout" icon={Shield}>
                        PCA9685 OE pin cuts power on fault or command, ensuring safety at all times.
                    </Card>
                    <Card title="Thermal / Voltage Watch" icon={HardDrive}>
                        Automatic derate under stress to protect your hardware from damage.
                    </Card>
                    <Card title="Watchdog & Diagnostics" icon={Wifi}>
                        Continuous heap and task monitoring to ensure system stability.
                    </Card>
                    <Card title="Offline Autonomy" icon={Wrench}>
                        Local schedules run even without the master, ensuring your lighting is always on.
                    </Card>
                    <Card title="Developer & Maker Friendliness" icon={Shield}>
                        ESP-IDF v5 toolchain, CMake project structure, and firmware upgrades over USB or OTA.
                    </Card>
                    <Card title="Unit Tests" icon={HardDrive}>
                        Unit tests for every effect (CRC-checked frame outputs) to ensure reliability.
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ReliabilitySection;
