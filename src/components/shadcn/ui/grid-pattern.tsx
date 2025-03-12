import { cn } from "@/lib/shadcn/utils";

export default function GridPattern() {
  // Hardcoded values from your usage example
  const dashSize = 4;
  const dashPattern = `${dashSize},${dashSize}`;
  const marginLeft = 230;
  const marginRight = 230;
  const columnCount = 7;

  // Calculate column width
  const columnWidth = `calc((100% - ${marginLeft + marginRight}px) / ${columnCount + 1})`;

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
          strokeWidth="1"
          strokeDasharray={dashPattern}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
