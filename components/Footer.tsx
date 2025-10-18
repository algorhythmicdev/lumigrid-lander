
import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/20 p-8 bg-white/10 backdrop-saturate-150 backdrop-blur-lg" role="contentinfo">
            <div className="container mx-auto w-[min(1200px,92vw)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="flex-shrink-0">
                    <a href="#top" className="text-xl font-bold gradient-text">LumiGrid</a>
                    <p className="text-sm text-[--muted] mt-1">© Reclame Fabriek — R&D</p>
                </div>
                <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-4">
                    <a href="#system" className="text-[--muted] hover:text-[--ink] transition-colors">How it works</a>
                    <a href="#led-node" className="text-[--muted] hover:text-[--ink] transition-colors">LED control</a>
                    <a href="#implement" className="text-[--muted] hover:text-[--ink] transition-colors">Examples</a>
                    <a href="#faq" className="text-[--muted] hover:text-[--ink] transition-colors">FAQ</a>
                    <a href="#cta" className="text-[--muted] hover:text-[--ink] transition-colors">Contact</a>
                </nav>
                <div className="flex items-center gap-4">
                    <a href="#" className="text-[--muted] hover:text-[--ink] transition-colors"><Twitter size={20} /></a>
                    <a href="#" className="text-[--muted] hover:text-[--ink] transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="text-[--muted] hover:text-[--ink] transition-colors"><Linkedin size={20} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
