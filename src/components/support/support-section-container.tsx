import { cn } from "../../lib/shadcn/utils"

export default function SupportSectionContainer({ children } : { children: React.ReactNode }) {
	return (
		<div className="relative">
			<div className={cn("px-8 sm:px-8 md:px-16 lg:px-72 mt-12")}>
				<div className="font-medium text-3xl">
					About Us
				</div>
				{children}
			</div>
		</div>
	)
}
