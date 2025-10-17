
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/20 p-8 bg-white/10 backdrop-saturate-150 backdrop-blur-lg" role="contentinfo">
            <div className="container mx-auto w-[min(1200px,92vw)] grid grid-cols-1 md:grid-cols-3 gap-4 items-start text-center md:text-left">
                <div>
                    <strong className="text-lg">LumiGrid</strong><br />
                    <small className="text-[--muted]">© Reclame Fabriek — R&amp;D</small>
                </div>
                <nav aria-label="Footer" className="flex flex-col space-y-1 md:space-y-0 md:flex-row md:space-x-4 justify-center">
                    <a href="#system" className="text-[--muted] hover:text-[--ink]">How it works</a>
                    <a href="#led-node" className="text-[--muted] hover:text-[--ink]">LED control</a>
                    <a href="#implement" className="text-[--muted] hover:text-[--ink]">Examples</a>
                    <a href="#faq" className="text-[--muted] hover:text-[--ink]">FAQ</a>
                    <a href="#cta" className="text-[--muted] hover:text-[--ink]">Contact</a>
                </nav>
                <div className="legal text-center md:text-right">
                    <a href="https://reclamefabriek.eu" target="_blank" rel="noopener" className="text-[--muted] hover:text-[--ink]">reclamefabriek.eu</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
