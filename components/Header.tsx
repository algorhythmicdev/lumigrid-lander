import React, { useRef } from 'react';
import { Volume2, VolumeX, Moon, Sun, Mail } from 'lucide-react';
import { BrandTheme } from '../App';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'normal' | 'big';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'normal', className = '', ...props }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
        const t = buttonRef.current;
        if (!t) return;
        const r = t.getBoundingClientRect();
        t.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        t.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    const sizeClass = size === 'big' ? 'big' : '';
    const btnClass = `btn ${variant} ${sizeClass} ${className}`.trim();

    return (
        <button ref={buttonRef} className={btnClass} onPointerMove={handlePointerMove} {...props}>
            {children}
        </button>
    );
};

interface HeaderProps {
    brandTheme: BrandTheme;
    setBrandTheme: (theme: BrandTheme) => void;
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
    isTtsOn: boolean;
    setIsTtsOn: (isOn: boolean) => void;
    addParallaxRef: (el: HTMLElement | null, amt: number) => void;
}

const Header: React.FC<HeaderProps> = ({ brandTheme, setBrandTheme, isDarkMode, setIsDarkMode, isTtsOn, setIsTtsOn, addParallaxRef }) => {
    return (
        <header className="relative min-h-[78vh] grid place-items-center overflow-hidden" role="banner" aria-label="Header">
            <nav className="glass grid grid-cols-[1fr,auto,auto] md:grid-cols-[1fr,auto,auto,auto] gap-3 items-center container p-3 my-2" aria-label="Primary">
                <a className="font-extrabold tracking-wider text-[--ink] no-underline" href="#top" aria-label="LumiGrid Home">LumiGrid</a>
                <div className="flex gap-2 items-center" role="group" aria-label="Theme and accessibility">
                    <label className="relative" title="Brand theme">
                        <span className="sr-only">Brand theme</span>
                        <select
                            id="brandTheme"
                            value={brandTheme}
                            onChange={(e) => setBrandTheme(e.target.value as BrandTheme)}
                            className="appearance-none bg-white/10 text-[--ink] border border-white/20 rounded-lg py-2 px-4 hover:bg-white/15 transition-colors"
                        >
                            <option value={BrandTheme.RF}>RF Default</option>
                            <option value={BrandTheme.Contrast}>High-Contrast Cyan</option>
                            <option value={BrandTheme.Warm}>Warm Magenta</option>
                        </select>
                    </label>
                    <Button variant="ghost" onClick={() => setIsTtsOn(!isTtsOn)} aria-pressed={isTtsOn} aria-label="Read text aloud">
                        {isTtsOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </Button>
                    <Button variant="ghost" onClick={() => setIsDarkMode(!isDarkMode)} aria-pressed={isDarkMode} aria-label="Toggle dark/light">
                        {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                    </Button>
                </div>
                <a className="btn primary hidden md:flex items-center gap-2" href="#cta">
                    <Mail size={18} />
                    Contact
                </a>
            </nav>

            <div className="relative max-w-4xl center p-[clamp(1rem,3vw,2rem)] my-8 mx-auto">
                <h1 ref={el => addParallaxRef(el, 0.18)} className="h1 gradient-text flowing-gradient hero-anim hero-anim-1" data-parallax="0.18">
                    Light that tells your story.
                </h1>
                <p className="lead hero-anim hero-anim-2">Create dynamic lighting experiences with intelligent control.</p>
                <div className="flex gap-4 justify-center flex-wrap mt-3 hero-anim hero-anim-3">
                    <a className="btn primary" href="#system">See how it works</a>
                    <a className="btn outline" href="#deep-dive">Try LED control</a>
                </div>
                <p className="text-[--muted] mt-2 hero-anim hero-anim-4">Developed by <a href="https://reclamefabriek.eu" target="_blank" rel="noopener" className="text-[--warm]">Reclame Fabriek R&amp;D</a></p>
            </div>
        </header>
    );
};

export default Header;
