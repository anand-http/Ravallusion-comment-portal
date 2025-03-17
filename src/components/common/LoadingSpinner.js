'use client'
import React from 'react';

const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={`inline-block ${className}`}>
      <svg
        className="animate-spin"
        viewBox="0 0 50 50"
      >
        {/* Outer circle */}
        {/* <circle
          className="stroke-current"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="80, 200"
        /> */}
        
        {/* Inner spinning elements */}
        <g className="origin-center">
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x="23.5"
              y="3"
              width="3"
              height="12"
              rx="1.5"
              fill="currentColor"
              className="origin-center opacity-25"
              style={{
                transform: `rotate(${i * 60}deg)`,
                animation: `pulse 1.5s ease-in-out ${i * 0.25}s infinite`
              }}
            />
          ))}
        </g>

        {/* Center dot */}
        <circle
          cx="25"
          cy="25"
          r="3"
          fill="currentColor"
          className="animate-pulse"
        />
      </svg>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};


export const SimpleLoader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-12 h-12 border-4 border-[var(--neon-purple)] border-t-black rounded-full animate-spin"></div>
    </div>
  );
};


export default LoadingSpinner;