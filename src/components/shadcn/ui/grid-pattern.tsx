import { cn } from "@/lib/shadcn/utils";
import { useState, useEffect } from "react";

export default function GridPattern() {
  // State for responsive values
  const [columnCount, setColumnCount] = useState(7);
  const [margins, setMargins] = useState({ left: 230, right: 230 });

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Responsive column count
      if (width < 640) {
        // Mobile: no columns, just borders
        setColumnCount(0);
        setMargins({ left: 16, right: 16 });
      } else if (width < 768) {
        // Small screens: fewer columns
        setColumnCount(3);
        setMargins({ left: 32, right: 32 });
      } else if (width < 1024) {
        // Medium screens
        setColumnCount(5);
        setMargins({ left: 64, right: 64 });
      } else {
        // Large screens: original settings
        setColumnCount(7);
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

  const dashSize = 4;
  const dashPattern = `${dashSize},${dashSize}`;
  const columnWidth = columnCount > 0 
    ? `calc((100% - ${margins.left + margins.right}px) / ${columnCount + 1})` 
    : 0;
  
  // Generate array for dynamic column lines
  const columnLines = Array.from({ length: columnCount }, (_, index) => index + 1);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-200 stroke-gray-200 dark:fill-gray-800 dark:stroke-gray-800",
      )}
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
      />

      {/* Dynamically generated column lines between borders - always dashed */}
      {columnLines.map((columnIndex) => (
        <line 
          key={`column-${columnIndex}`}
          x1={`calc(${margins.left}px + ${columnWidth} * ${columnIndex})`}
          y1="0" 
          x2={`calc(${margins.left}px + ${columnWidth} * ${columnIndex})`}
          y2="100%" 
          strokeWidth="1"
          strokeDasharray={dashPattern}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
