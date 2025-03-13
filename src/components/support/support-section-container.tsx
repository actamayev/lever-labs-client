import { cn } from "../../lib/shadcn/utils"

export default function SupportSectionContainer({ children } : { children: React.ReactNode }) {
	return (
		<div className="relative">
			<div className={cn("px-4 sm:px-8 md:px-16 lg:px-60 mt-12")}>
				{children}
			</div>
		</div>
	)
}
