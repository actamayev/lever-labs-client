"use client"

import { useState, useEffect } from "react";

export default function GridPattern() {
  // State for responsive values
  const [margins, setMargins] = useState({ left: 230, right: 230 });
  const [showGrid, setShowGrid] = useState(true);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Responsive grid visibility and margins
      if (width < 640) {
        // Mobile: hide grid completely
        setShowGrid(false);
      } else if (width < 768) {
        // Small screens
        setShowGrid(true);
        setMargins({ left: 32, right: 32 });
      } else if (width < 1024) {
        // Medium screens
        setShowGrid(true);
        setMargins({ left: 64, right: 64 });
      } else {
        // Large screens: original settings
        setShowGrid(true);
        setMargins({ left: 230, right: 230 });
      }
    };

    // Initial call
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // If grid should be hidden (mobile), return empty SVG
  if (!showGrid) {
    return (
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      />
    );
  }

  const dashSize = 4;
  const dashPattern = `${dashSize},${dashSize}`;
  
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      {/* Left border line - solid */}
      <line 
        x1={margins.left} 
        y1="0" 
        x2={margins.left} 
        y2="100%" 
        strokeWidth="1"
        strokeDasharray="0"
        vectorEffect="non-scaling-stroke"
        className="stroke-landingOuterBorder"
      />

      {/* Right border line - solid */}
      <line 
        x1={`calc(100% - ${margins.right}px)`} 
        y1="0" 
        x2={`calc(100% - ${margins.right}px)`} 
        y2="100%" 
        strokeWidth="1"
        strokeDasharray="0"
        vectorEffect="non-scaling-stroke"
        className="stroke-landingOuterBorder"
      />

      {/* Middle dashed line */}
      <line 
        x1="50%" 
        y1="0" 
        x2="50%" 
        y2="100%" 
        strokeWidth="1"
        strokeDasharray={dashPattern}
        vectorEffect="non-scaling-stroke"
        className="stroke-landingDottedLine"
      />
    </svg>
  );
}
