
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="relative w-16 h-8">
      {/* Clouds */}
      <div className="absolute bottom-0 left-[-10px] w-8 h-5 bg-brand-cream rounded-full"></div>
      <div className="absolute bottom-0 left-[-5px] w-6 h-4 bg-brand-cream rounded-full"></div>
      <div className="absolute bottom-0 right-[-10px] w-8 h-5 bg-brand-cream rounded-full"></div>
      <div className="absolute bottom-0 right-[-5px] w-6 h-4 bg-brand-cream rounded-full"></div>

      {/* Rainbow Arcs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-7 rounded-t-full border-t-8 border-brand-pink"></div>
      <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[44px] h-[22px] rounded-t-full border-t-8 border-brand-yellow"></div>
      <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[28px] h-[14px] rounded-t-full border-t-8 border-brand-green"></div>
      
      {/* Face */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-6 bg-brand-bg rounded-t-full">
         <div className="absolute top-2 left-2 w-1 h-1 bg-brand-blue rounded-full"></div>
         <div className="absolute top-2 right-2 w-1 h-1 bg-brand-blue rounded-full"></div>
         <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-3 h-2 border-b-2 border-brand-blue rounded-b-full"></div>
      </div>
    </div>
  );
};

export default Logo;
