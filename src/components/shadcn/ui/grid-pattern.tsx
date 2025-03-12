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
  columnCount = 3, // Default to 3 columns between borders
  marginLeft = 240, // px-60 (60 * 4px)
  marginRight = 240, // Same as left by default
  ...props
}: GridPatternProps) {
  const id = useId();
  const dashPattern = isDashed ? `${dashSize},${dashSize}` : strokeDasharray;

  // Calculate column width
  const columnWidth = `calc((100% - ${marginLeft + marginRight}px) / ${columnCount + 1})`;

  // Generate array for dynamic column lines
  const columnLines = Array.from({ length: columnCount }, (_, index) => index + 1);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-200 stroke-gray-200 dark:fill-gray-800 dark:stroke-gray-800",
        className,
      )}
      preserveAspectRatio="none"
      {...props}
    >
      {/* Left border line - solid */}
      <line 
        x1={marginLeft} 
        y1="0" 
        x2={marginLeft} 
        y2="100%" 
        strokeWidth="1"
        strokeDasharray="0"
        vectorEffect="non-scaling-stroke"
      />

      {/* Right border line - solid */}
      <line 
        x1={`calc(100% - ${marginRight}px)`} 
        y1="0" 
        x2={`calc(100% - ${marginRight}px)`} 
        y2="100%" 
        strokeWidth="1"
        strokeDasharray="0"
        vectorEffect="non-scaling-stroke"
      />

      {/* Dynamically generated column lines between borders - always dashed */}
      {columnLines.map((columnIndex) => (
        <line 
          key={`column-${columnIndex}`}
          x1={`calc(${marginLeft}px + ${columnWidth} * ${columnIndex})`}
          y1="0" 
          x2={`calc(${marginLeft}px + ${columnWidth} * ${columnIndex})`}
          y2="100%" 
          strokeDasharray={dashPattern}
          strokeWidth="1"
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
