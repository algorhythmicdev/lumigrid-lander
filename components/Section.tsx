import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'soft' | 'focus' | 'halo';
}

const Section: React.FC<SectionProps> = ({ id, children, className = '', variant = 'halo' }) => {
  const variantClass = variant !== 'default' ? variant : '';
  
  return (
    <section id={id} className={`section ${variantClass} ${className}`.trim()}>
      <div className="container">
        {children}
      </div>
    </section>
  );
};

export default Section;
