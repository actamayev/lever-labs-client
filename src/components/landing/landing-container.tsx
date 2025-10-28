import { cn } from "../../lib/utils"

interface LandingContainerProps {
	children: React.ReactNode
	className?: string
	as?: "div" | "section" | "header" | "footer" | "nav"
}

/**
 * Standard container for all landing page sections
 * Provides consistent horizontal padding and max-width
 */
export default function LandingContainer({
	children,
	className,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	as: Component = "div"
}: LandingContainerProps): React.ReactNode {
	return (
		<Component
			className={cn(
				"px-8 md:px-20 xl:px-32 max-w-9xl mx-auto",
				className
			)}
		>
			{children}
		</Component>
	)
}
