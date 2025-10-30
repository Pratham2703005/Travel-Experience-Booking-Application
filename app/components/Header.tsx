'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export default function Header({ onSearch, showSearch = true }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="w-full h-[87px] px-[124px] py-4 bg-[#F9F9F9] shadow-[0_2px_16px_0_rgba(0,0,0,0.1)]">
      
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/HDlogo.png"
              alt="Highway Delite"
              width={100}
              height={55}
              priority
            />
          </Link>

          {/* Search Bar */}
          {showSearch && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search experiences"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-[340px] px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-transparent text-gray-700"
              />
              <button
                onClick={handleSearch}
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1.5 rounded-md transition-colors"
                aria-label="Search"
              >
                <span className="font-medium text-sm">Search</span>
              </button>
            </div>
          )}
        </div>
      
    </header>
  );
}
