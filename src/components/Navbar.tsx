import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

const Navbar = ({ title, showBack, onBack }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-10 bg-gray-100 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-14 flex items-center">
          <div className="w-10">
            {showBack && (
              <button
                onClick={onBack}
                className="h-10 w-10 flex items-center justify-center rounded-lg text-gray-600 
                  hover:text-gray-900 hover:bg-gray-200 transition-colors duration-200"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            )}
          </div>
          <h1 className="flex-1 text-xl font-semibold text-gray-900 text-center truncate">
            {title}
          </h1>
          <div className="w-10" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
