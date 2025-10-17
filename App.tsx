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
import './styles.css';

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
