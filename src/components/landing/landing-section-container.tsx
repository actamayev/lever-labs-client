import { cn } from "../../lib/shadcn/utils"

export default function LandingSectionContainer({ children, extraClasses = "" } : { children: React.ReactNode, extraClasses?: string }) {
	return (
		<div className="relative">
			<div className={cn("px-20 sm:px-28 md:px-40 lg:px-64 mt-16 sm:mt-24 md:mt-36", extraClasses)}>
				{children}
			</div>
		</div>
	)
}
