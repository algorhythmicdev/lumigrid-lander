import React from 'react';

const Card: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/5 border border-white/20 backdrop-blur-md rounded-2xl p-5 shadow-2xl shadow-black/20 reveal h-full">
        <h3 className="font-semibold text-lg mt-0">{title}</h3>
        <p className="text-[--muted] mb-0">{children}</p>
    </div>
);

const nodeFamily = [
    { name: "LED Node", func: "Drives “dumb” PWM and addressable LEDs, effects engine, sync participant", hardware: "ESP32 + PCA9685 + SN74HCT245" },
    { name: "Kinetic Node", func: "Motor/servo driver with motion profiles synced to grid", hardware: "ESP32 + DRV8833 / servo expander" },
    { name: "Sensor Node", func: "Aggregates ambient, motion, or proximity sensors; publishes events", hardware: "ESP32 + I²C sensor hub" },
    { name: "Hub Node / Master", func: "Acts as time-base, playlist server, and cloud bridge", hardware: "ESP32-S3 / Raspberry Pi gateway" },
    { name: "Light Bar Module", func: "Linear LED Node variant for architectural strips", hardware: "Slim ESP32 + MOSFET array" },
    { name: "Logic Node", func: "Headless compute module running choreography or AI inference", hardware: "Jetson Nano / Pi 5 companion" }
];

const HowItWorksSection: React.FC<{ id: string, addParallaxRef: (el: HTMLElement | null, amt: number) => void }> = ({ id, addParallaxRef }) => {
    return (
        <section id={id} className="relative overflow-hidden p-[clamp(2rem,5vw,4.5rem)_0] bg-gradient-to-b from-[--a]/10 to-[--c]/10">
            <div className="absolute -z-10 pointer-events-none left-[-10%] top-[-20%] w-3/5 h-3/5 bg-[radial-gradient(closest-side_at_30%_40%,var(--a),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="absolute -z-10 pointer-events-none right-[-15%] bottom-[-30%] w-[70%] h-[70%] bg-[radial-gradient(closest-side_at_70%_60%,var(--c),transparent_70%)] opacity-20 blur-2xl"></div>
            <div className="w-[min(1200px,92vw)] mx-auto">
                <h2 ref={el => addParallaxRef(el, 0.12)} className="text-center m-0 mb-8 text-3xl md:text-4xl font-bold [will-change:transform] gradient-text">Architecture & Stack</h2>
                
                <h3 className="sub-heading reveal">Core Software & Interaction Layers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2.5vw,2rem)]">
                    <Card title="Sync Protocol">UDP multicast “ticks” and “cues” keep all nodes aligned to the same millisecond grid.</Card>
                    <Card title="Trigger Engine">Interprets incoming actions (“play preset”, “blackout”) and routes them to the right subsystem.</Card>
                    <Card title="Effect Engine">Renders visual or kinetic effects in real time, respecting frame-rate, power, and timing constraints.</Card>
                    <Card title="Scheduler">Executes time-based scenes, daily schedules, or show playlists.</Card>
                    <Card title="Networking & APIs">REST + MQTT endpoints expose every parameter to higher-level controllers or creative tools.</Card>
                    <Card title="Web UI">A self-hosted control panel served by each node for configuration, diagnostics, and live sequencing.</Card>
                </div>

                <div className="mt-12 reveal">
                    <h3 className="sub-heading">Planned family of nodes</h3>
                    <div className="prose">
                        <p>Each node shares the same firmware skeleton and API language; only the hardware profile and effect libraries differ. This modularity allows installations to scale from a single DIY sculpture to a building-wide lighting grid.</p>
                        <div className="overflow-x-auto bg-white/10 border border-white/20 backdrop-saturate-150 backdrop-blur-lg rounded-2xl p-2">
                        <table>
                            <thead>
                                <tr>
                                    <th>Node</th>
                                    <th>Core Function</th>
                                    <th>Typical Hardware</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nodeFamily.map(node => (
                                    <tr key={node.name}>
                                        <td><strong>{node.name}</strong></td>
                                        <td>{node.func}</td>
                                        <td><code>{node.hardware}</code></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>

                <div className="mt-12 reveal">
                    <h3 className="sub-heading">Technology stack in one breath</h3>
                    <div className="prose">
                        <pre><code>
{`ESP-IDF v5 + FreeRTOS, LittleFS, esp_http_server, LWIP UDP multicast,
RMT driver, I²C, MQTT client, cJSON, and a pure-HTML + vanilla JS UI
served directly from flash.`}
                        </code></pre>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
