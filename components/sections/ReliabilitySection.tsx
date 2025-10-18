import React from 'react';
import { Shield, Wifi, HardDrive, Wrench } from 'lucide-react';
import Section from '../Section';

const Card: React.FC<{ title: string, children: React.ReactNode, icon: React.ComponentType<any> }> = ({ title, children, icon: Icon }) => (
    <div className="card reveal group hover:border-white/25 transition-all">
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
        <Section id={id}>
            <h2 ref={el => addParallaxRef(el, 0.12)} className="center h2 gradient-text flowing-gradient" data-parallax="0.12">Reliability you can trust</h2>
            <p className="center lead max-w-3xl mx-auto mb-12">
                LumiGrid is built on a foundation of robust hardware and intelligent software, ensuring your lighting works flawlessly, day in and day out.
            </p>
            <div className="grid grid-2 lg:grid-3 gap-6 max-w-6xl mx-auto">
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
        </Section>
    );
};

export default ReliabilitySection;
