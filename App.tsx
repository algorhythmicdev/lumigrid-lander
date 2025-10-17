import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import MiniTimeline from './components/MiniTimeline';
import WhatIsLumiGridSection from './components/sections/WhatIsLumiGridSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import LEDControlSection from './components/sections/LEDControlSection';
import ImplementationSection from './components/sections/ImplementationSection';
import ProjectGallerySection from './components/sections/ProjectGallerySection';
import ReliabilitySection from './components/sections/ReliabilitySection';
import FAQSection from './components/sections/FAQSection';
import CTASection from './components/sections/CTASection';
import Footer from './components/Footer';
import BackgroundFX from './components/BackgroundFX';

// Define brand themes
export enum BrandTheme {
  RF = 'rf',
  Contrast = 'contrast',
  Warm = 'warm',
}

// Define section IDs for scroll spying
const SECTION_IDS = ['system', 'architecture', 'deep-dive', 'ecosystem', 'gallery', 'reliability', 'faq', 'cta'];

const App: React.FC = () => {
  const [brandTheme, setBrandTheme] = useState<BrandTheme>(BrandTheme.RF);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTtsOn, setIsTtsOn] = useState(false);
  const parallaxRefs = useRef<Map<HTMLElement, number>>(new Map());

  // Effect to manage theme attributes on the HTML element
  useEffect(() => {
    const root = document.documentElement;
    root.style.colorScheme = isDarkMode ? 'dark' : 'light';
    root.setAttribute('data-theme', brandTheme);
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode, brandTheme]);

  // Effect for global CSS styles and keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* WCAG Compliant Color Palettes & Gradients */
      :root { --bg-0:#07080E; --bg-1:#0E1220; --ink:#FBFBFF; --muted:#A0AEC0; --a:#E73BA3; --b:#6C2BD9; --c:#1CC5DC; --warm:#FFD166; --ring: var(--warm); --shadow: 0 10px 30px rgba(0,0,0,.35); }
      :root[data-theme="contrast"] { --bg-0:#05070B; --bg-1:#0B111A; --ink:#FFFFFF; --muted:#A0B3D1; --a:#00D4FF; --b:#7AA2FF; --c:#00FFA3; --warm:#FFE29A; }
      :root[data-theme="warm"] { --bg-0:#0B0910; --bg-1:#110C1A; --ink:#FFF9FD; --muted:#E0CDE1; --a:#FF4DB3; --b:#B66DFF; --c:#FFB86C; --warm:#FFE29A; }
      html:not(.dark) { --bg-0:#F7F8FC; --bg-1:#FFFFFF; --ink:#1A202C; --muted:#4A5568; }

      body { background-color: var(--bg-0); color: var(--ink); font-family: 'Inter', sans-serif; line-height: 1.6; }
      html:focus-within { scroll-behavior: smooth; }
      :focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }

      @keyframes move { 
        from { background-position: 0% center; }
        to { background-position: -200% center; }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.7; transform: scale(0.95); }
        50% { opacity: 1; transform: scale(1.05); }
      }
      .reveal { opacity: 0; transform: translateY(12px); transition: opacity .6s ease, transform .6s ease; }
      .reveal.in { opacity: 1; transform: translateY(0); }
      
      /* Staggered Hero Animation */
      @keyframes fade-slide-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .hero-anim {
        animation: fade-slide-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        opacity: 0;
      }
      .hero-anim-1 { animation-delay: 0.2s; }
      .hero-anim-2 { animation-delay: 0.4s; }
      .hero-anim-3 { animation-delay: 0.6s; }
      .hero-anim-4 { animation-delay: 0.7s; }

      .gradient-text {
        background-image: linear-gradient(90deg, var(--a), var(--b), var(--c));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      /* New styles for technical content */
      .sub-heading {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--c);
        margin-top: 2.5rem;
        margin-bottom: 1rem;
      }
      .prose {
        color: var(--muted);
        max-width: 80ch;
      }
      .prose p, .prose ul, .prose ol {
        margin-bottom: 1em;
      }
      .prose strong {
        color: var(--ink);
        font-weight: 600;
      }
      .prose code {
        background-color: color-mix(in srgb, var(--ink) 10%, transparent);
        padding: 0.2em 0.4em;
        margin: 0;
        font-size: 85%;
        border-radius: 6px;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      }
      .prose pre {
        background-color: var(--bg-1);
        border: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
        border-radius: 0.75rem;
        padding: 1rem;
        overflow-x: auto;
        font-size: 0.9rem;
      }
      .prose pre code {
        background-color: transparent;
        padding: 0;
        margin: 0;
        font-size: 100%;
      }
      .prose table {
        width: 100%;
        border-collapse: collapse;
        margin: 2rem 0;
      }
      .prose th, .prose td {
        text-align: left;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid color-mix(in srgb, var(--ink) 10%, transparent);
      }
      .prose th {
        color: var(--ink);
        font-weight: 600;
        background-color: color-mix(in srgb, var(--ink) 5%, transparent);
      }
      .prose tbody tr:last-child td {
        border-bottom: none;
      }

      @media (prefers-reduced-motion: reduce){ * { animation: none !important; transition: none !important; } .hero-anim { opacity: 1; } }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Effect for parallax scrolling
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      parallaxRefs.current.forEach((amt, el) => {
        if (el) {
          el.style.transform = `translateY(${y * amt * -0.1}px)`;
        }
      });
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  // Effect for reveal-on-scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  
  // Effect for Text-to-Speech functionality
  useEffect(() => {
    const handleDoubleClick = (e: MouseEvent) => {
      if (!isTtsOn) return;
      const target = e.target as HTMLElement;
      const p = target.closest('p, h1, h2, h3, li, summary, figcaption, th, td');
      if (!p || !p.textContent) return;
      const utter = new SpeechSynthesisUtterance(p.textContent);
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
    };

    document.addEventListener('dblclick', handleDoubleClick);
    return () => {
      document.removeEventListener('dblclick', handleDoubleClick);
      speechSynthesis.cancel();
    };
  }, [isTtsOn]);

  const addParallaxRef = useCallback((el: HTMLElement | null, amt: number) => {
    if (el) {
      parallaxRefs.current.set(el, amt);
    }
  }, []);

  return (
    <>
      <a className="skip-link absolute left-0 top-[-40px] bg-[#111] text-white p-2 px-3 z-[1000] focus:top-2" href="#main">
        Skip to content
      </a>
      <BackgroundFX brandTheme={brandTheme} />

      <Header 
        brandTheme={brandTheme}
        setBrandTheme={setBrandTheme}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isTtsOn={isTtsOn}
        setIsTtsOn={setIsTtsOn}
        addParallaxRef={addParallaxRef}
      />

      <main id="main" tabIndex={-1} className="relative lg:mr-48">
        <MiniTimeline sectionIds={SECTION_IDS} />
        <WhatIsLumiGridSection id={SECTION_IDS[0]} addParallaxRef={addParallaxRef} />
        <HowItWorksSection id={SECTION_IDS[1]} addParallaxRef={addParallaxRef} />
        <LEDControlSection id={SECTION_IDS[2]} addParallaxRef={addParallaxRef} />
        <ImplementationSection id={SECTION_IDS[3]} addParallaxRef={addParallaxRef} />
        <ProjectGallerySection id={SECTION_IDS[4]} addParallaxRef={addParallaxRef} />
        <ReliabilitySection id={SECTION_IDS[5]} addParallaxRef={addParallaxRef} />
        <FAQSection id={SECTION_IDS[6]} addParallaxRef={addParallaxRef} />
        <CTASection id={SECTION_IDS[7]} addParallaxRef={addParallaxRef} />
      </main>

      <Footer />
    </>
  );
};

export default App;
