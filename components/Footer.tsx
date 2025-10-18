
import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="glass border-t border-white/20 p-8" role="contentinfo">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-6 center md:text-left">
                <div className="flex-shrink-0">
                    <a href="#top" className="text-xl font-bold gradient-text">LumiGrid</a>
                    <p className="text-sm text-[--muted] mt-1">© Reclame Fabriek — R&D</p>
                </div>
                <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-4">
                    <a href="#system" className="text-[--muted] hover:text-[--ink] transition-colors">How it works</a>
                    <a href="#deep-dive" className="text-[--muted] hover:text-[--ink] transition-colors">LED control</a>
                    <a href="#ecosystem" className="text-[--muted] hover:text-[--ink] transition-colors">Examples</a>
                    <a href="#faq" className="text-[--muted] hover:text-[--ink] transition-colors">FAQ</a>
                    <a href="#cta" className="text-[--muted] hover:text-[--ink] transition-colors">Contact</a>
                </nav>
                <div className="flex items-center gap-4">
                    <a href="#" className="text-[--muted] hover:text-[--ink] transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
                    <a href="#" className="text-[--muted] hover:text-[--ink] transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
                    <a href="#" className="text-[--muted] hover:text-[--ink] transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
