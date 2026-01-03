
import React from 'react';

interface SaathiLogoProps {
  className?: string;
}

export const SaathiLogo: React.FC<SaathiLogoProps> = ({ className = "h-8 w-8" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-sm"
      >
        {/* Robot Head / Saathi Base */}
        <circle cx="50" cy="55" r="35" fill="url(#logoGradient)" />
        
        {/* Saathi Eyes */}
        <circle cx="38" cy="55" r="5" fill="white" />
        <circle cx="62" cy="55" r="5" fill="white" />
        
        {/* Friendly Smile */}
        <path
          d="M40 70C40 70 45 75 50 75C55 75 60 70 60 70"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Graduation Cap */}
        <path
          d="M20 35L50 20L80 35L50 50L20 35Z"
          fill="#2C3E50"
          className="dark:fill-slate-700"
        />
        <path
          d="M80 35V45"
          stroke="#2C3E50"
          strokeWidth="2"
          strokeLinecap="round"
          className="dark:stroke-slate-700"
        />
        <circle cx="80" cy="45" r="2" fill="#FF9F43" />

        {/* AI Sparkle */}
        <path
          d="M85 15L87 21L93 23L87 25L85 31L83 25L77 23L83 21L85 15Z"
          fill="#FF9F43"
          className="animate-pulse"
        />

        <defs>
          <linearGradient id="logoGradient" x1="15" y1="20" x2="85" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4A90E2" />
            <stop offset="1" stopColor="#9B59B6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
