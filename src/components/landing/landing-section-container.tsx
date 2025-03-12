import { cn } from "../../lib/shadcn/utils"

export default function LandingSectionContainer({ children, extraClasses = "" } : { children: React.ReactNode, extraClasses?: string }) {
	return (
		<div className="relative z-10">
			<div className={cn("px-4 sm:px-8 md:px-16 lg:px-60 mt-36", extraClasses)}>
				{children}
			</div>
		</div>
	)
}
