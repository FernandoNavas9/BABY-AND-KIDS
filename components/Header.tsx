
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-brand-blue">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center space-x-3">
          <Logo />
          <div className="hidden sm:block">
             <h1 className="text-xl font-bold text-brand-pink">BABY & KIDS</h1>
             <p className="text-sm text-brand-blue">clothing</p>
          </div>
        </div>
      </div>
      <Link to="/admin" className="text-sm font-medium text-brand-blue hover:text-brand-pink transition-colors px-4 py-2 rounded-md bg-brand-blue-light hover:bg-brand-pink-light">
        Admin Panel
      </Link>
    </header>
  );
};

export default Header;
