
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { MainCategory } from '../types';

interface SidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CategoryItem: React.FC<{ name: string; isSelected: boolean; onClick: () => void; isSub?: boolean }> = ({ name, isSelected, onClick, isSub = false }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-md px-3 py-2 transition-all duration-200 ${
        isSub ? 'text-sm' : 'font-semibold'
      } ${
        isSelected
          ? 'bg-brand-pink text-white shadow-md'
          : 'text-brand-blue hover:bg-brand-pink-light hover:text-brand-pink'
      }`}
    >
      {name}
    </button>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory, isOpen, setIsOpen }) => {
    const [openMainCategory, setOpenMainCategory] = useState<MainCategory | null>(null);

    const handleCategoryClick = (category: string) => {
        onSelectCategory(category);
        if (window.innerWidth < 1024) {
            setIsOpen(false);
        }
    };
    
    const toggleMainCategory = (category: MainCategory) => {
        setOpenMainCategory(openMainCategory === category ? null : category);
    };

    const sidebarContent = (
         <aside className="w-64 bg-white p-4 space-y-4 shadow-lg lg:shadow-none overflow-y-auto h-full">
            <h2 className="text-xl font-bold text-brand-blue border-b-2 border-brand-pink-light pb-2">Categorías</h2>
            <CategoryItem 
                name="Todos" 
                isSelected={selectedCategory === 'Todos'}
                onClick={() => handleCategoryClick('Todos')}
            />
            {CATEGORIES.map((cat) => (
            <div key={cat.name}>
                <button
                onClick={() => toggleMainCategory(cat.name)}
                className="w-full text-left font-semibold text-brand-blue flex justify-between items-center px-3 py-2 rounded-md hover:bg-brand-pink-light"
                >
                {cat.name}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${openMainCategory === cat.name ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </button>
                {openMainCategory === cat.name && (
                <div className="pl-4 mt-2 space-y-1 border-l-2 border-brand-pink-light">
                    {cat.subcategories.map(sub => (
                    <CategoryItem
                        key={sub}
                        name={sub}
                        isSelected={selectedCategory === sub}
                        onClick={() => handleCategoryClick(sub)}
                        isSub={true}
                    />
                    ))}
                </div>
                )}
            </div>
            ))}
        </aside>
    );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}>
        <div className={`fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
            {sidebarContent}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-[81px] h-[calc(100vh-81px)]">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
