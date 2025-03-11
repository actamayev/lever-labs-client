import { useId } from "react";
import { cn } from "@/lib/shadcn/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: string;
  className?: string;
  isDashed?: boolean;
  dashSize?: number;
  orientation?: "both" | "vertical" | "horizontal";
  borderOnly?: boolean; // New prop to control if we want only borders
  columnCount?: number; // Number of internal columns
  marginLeft?: number; // Left margin (px-60 equivalent)
  marginRight?: number; // Right margin
  [key: string]: unknown;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  isDashed = false,
  dashSize = 4,
  orientation = "both",
  borderOnly = false, // Default to normal grid
  columnCount = 3, // Default to 3 columns between borders
  marginLeft = 240, // px-60 (60 * 4px)
  marginRight = 240, // Same as left by default
  ...props
}: GridPatternProps) {
  const id = useId();
  const dashPattern = isDashed ? `${dashSize},${dashSize}` : strokeDasharray;

  // Calculate total width of the content area (viewport width - margins)
  const viewportWidth = "calc(100% - " + (marginLeft + marginRight) + "px)";
  
  // Calculate column width based on number of columns
  const columnWidth = `calc((${viewportWidth}) / ${columnCount + 1})`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-200 stroke-gray-200 dark:fill-gray-800 dark:stroke-gray-800",
        className,
      )}
      {...props}
    >
      <defs>
        {/* Pattern for middle columns */}
        {!borderOnly && (
          <pattern
            id={`${id}-columns`}
            width={columnWidth}
            height={height}
            patternUnits="userSpaceOnUse"
            x={marginLeft}
            y={y}
            patternContentUnits="userSpaceOnUse"
          >
            {orientation !== "horizontal" && (
              <line 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="100%" 
                strokeDasharray={dashPattern}
                vectorEffect="non-scaling-stroke"
              />
            )}
            {orientation !== "vertical" && (
              <line 
                x1="0" 
                y1="0" 
                x2={columnWidth} 
                y2="0" 
                strokeDasharray={dashPattern}
                vectorEffect="non-scaling-stroke"
              />
            )}
          </pattern>
        )}
      </defs>

      {/* Fill pattern for middle columns */}
      {!borderOnly && (
        <rect 
          x={marginLeft} 
          y="0" 
          width={`calc(100% - ${marginLeft + marginRight}px)`} 
          height="100%" 
          fill={`url(#${id}-columns)`} 
          strokeWidth="0"
        />
      )}

      {/* Left border line */}
      {orientation !== "horizontal" && (
        <line 
          x1={marginLeft} 
          y1="0" 
          x2={marginLeft} 
          y2="100%" 
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* Right border line */}
      {orientation !== "horizontal" && (
        <line 
          x1={`calc(100% - ${marginRight}px)`} 
          y1="0" 
          x2={`calc(100% - ${marginRight}px)`} 
          y2="100%" 
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* Column lines between borders */}
      {!borderOnly && orientation !== "horizontal" && Array.from({ length: columnCount - 1 }).map((_, index) => (
        <line 
          key={`column-${index}`}
          x1={`calc(${marginLeft}px + ${columnWidth} * ${index + 1})`}
          y1="0" 
          x2={`calc(${marginLeft}px + ${columnWidth} * ${index + 1})`}
          y2="100%" 
          strokeDasharray={dashPattern}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {squares && (
        <svg x={marginLeft} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY]) => (
            <rect
              strokeWidth="0"
              key={`${squareX}-${squareY}`}
              width={width - 1}
              height={height - 1}
              x={squareX * width + 1}
              y={squareY * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

export default GridPattern;
