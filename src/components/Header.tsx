'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  cities: string[];
  universities: string[];
}

export default function Header({ cities, universities }: HeaderProps) {
  const [showCitiesDropdown, setShowCitiesDropdown] = useState(false);
  const [showUniversitiesDropdown, setShowUniversitiesDropdown] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-[rgba(250,250,250,0.85)] backdrop-blur-[10px] border-b border-border">
      <div className="max-w-[1120px] mx-auto px-[18px]">
        <div className="flex items-center justify-between gap-3 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-text tracking-[-0.02em]">RM</span>
            <span className="w-2 h-2 rounded-full bg-red shadow-[0_0_12px_var(--redGlow),0_0_24px_var(--redGlow)] relative top-[-2px]" style={{ animation: 'pulse 2s ease-in-out infinite' }}></span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-[14px] text-muted font-medium text-sm tracking-[-0.01em]">
            <Link href="/" className="text-inherit no-underline px-[10px] py-2 rounded-[10px] hover:bg-[rgba(15,23,42,0.04)] hover:text-text transition-colors">
              Discover
            </Link>
            <button
              onClick={() => {
                setShowCitiesDropdown(!showCitiesDropdown);
                setShowUniversitiesDropdown(false);
              }}
              className="text-inherit px-[10px] py-2 rounded-[10px] hover:bg-[rgba(15,23,42,0.04)] hover:text-text transition-colors relative bg-transparent border-none cursor-pointer"
            >
              Cities
              {showCitiesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-md py-2 z-50">
                  {cities.map(city => (
                    <Link
                      key={city}
                      href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-sm text-text hover:bg-bg transition-colors"
                      onClick={() => setShowCitiesDropdown(false)}
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              )}
            </button>
            <button
              onClick={() => {
                setShowUniversitiesDropdown(!showUniversitiesDropdown);
                setShowCitiesDropdown(false);
              }}
              className="text-inherit px-[10px] py-2 rounded-[10px] hover:bg-[rgba(15,23,42,0.04)] hover:text-text transition-colors relative bg-transparent border-none cursor-pointer"
            >
              Universities
              {showUniversitiesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-md py-2 z-50 max-h-96 overflow-y-auto">
                  {universities.map(uni => (
                    <Link
                      key={uni}
                      href={`/universities/${uni.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-sm text-text hover:bg-bg transition-colors"
                      onClick={() => setShowUniversitiesDropdown(false)}
                    >
                      {uni}
                    </Link>
                  ))}
                </div>
              )}
            </button>
          </nav>

          {/* Actions */}
          <div className="flex gap-[10px] items-center">
            <Link
              href="/about"
              className="px-4 py-[10px] text-sm font-medium text-text border border-border rounded-lg bg-transparent hover:bg-[rgba(15,23,42,0.04)] hover:border-text transition-all"
            >
              Get the App
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
