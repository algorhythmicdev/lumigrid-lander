import React, { useState, useEffect } from 'react';

interface MiniTimelineProps {
  sectionIds: string[];
}

const timelineItems = [
  { id: 'system', title: 'The LumiGrid System' },
  { id: 'architecture', title: 'Architecture & Stack' },
  { id: 'deep-dive', title: 'LED Node Deep Dive' },
  { id: 'ecosystem', title: 'Ecosystem' },
  { id: 'gallery', title: 'Gallery' },
  { id: 'reliability', title: 'Reliability' },
  { id: 'faq', title: 'FAQ' },
  { id: 'cta', title: 'Contact' },
];

const MiniTimeline: React.FC<MiniTimelineProps> = ({ sectionIds }) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const handleScroll = () => {
      const viewportMid = window.scrollY + window.innerHeight / 2;
      let currentActiveId = activeSection;

      for (const section of sections) {
        if (section) {
            const sectionTop = section.offsetTop;
            if (viewportMid >= sectionTop) {
              currentActiveId = section.id;
            }
        }
      }
      setActiveSection(currentActiveId);
      
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (docHeight > 0) ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
      setProgress(scrollPercent * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds]);

  return (
    <aside className="fixed top-1/2 -translate-y-1/2 right-8 z-40 hidden lg:flex flex-col items-end gap-6">
        <ol className="list-none m-0 p-0 flex flex-col gap-2 items-end">
            {timelineItems.map(item => (
                <li key={item.id}>
                    <a href={`#${item.id}`} className={`no-underline flex items-center gap-3 group flex-row-reverse transition-opacity ${activeSection === item.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                        <span className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === item.id ? 'bg-[--c] scale-150 shadow-[0_0_12px_3px_var(--c)]' : 'bg-white/40 group-hover:bg-white/80'}`}></span>
                        <span className="text-sm text-[--ink]">{item.title}</span>
                    </a>
                </li>
            ))}
        </ol>
        <div className="w-1 h-32 bg-white/10 rounded-full mr-0.5">
            <div style={{ height: `${progress}%` }} className="w-full bg-gradient-to-b from-[--a] via-[--b] to-[--c] transition-all duration-200 ease-linear rounded-full"></div>
        </div>
    </aside>
  );
};

export default MiniTimeline;
