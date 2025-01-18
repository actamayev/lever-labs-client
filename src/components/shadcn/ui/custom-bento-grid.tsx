import { ReactNode } from "react";
import { cn } from "@/lib/shadcn/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { BentoGrid };
