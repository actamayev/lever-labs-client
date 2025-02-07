import { Link } from "react-router"
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from "./shadcn/ui/tooltip"

interface Props {
	linkTo: PageNames
	children: React.ReactNode
	noSpaceBefore?: boolean
	noSpaceAfter?: boolean
}

export default function DottedUnderlineText(props: Props) {
	const {
		linkTo,
		children,
		noSpaceBefore = false,
		noSpaceAfter = false
	} = props

	return (
		<>
			{!noSpaceBefore && <>&nbsp;</>}
			<span className="hover:underline hover:decoration-dotted">
				<Link to={linkTo}>
					{children}
				</Link>
			</span>
			{!noSpaceAfter && <>&nbsp;</>}
		</>
	)
}

interface TooltipProps {
	children: React.ReactNode
	tooltipMessage: string
	noSpaceBefore?: boolean
	noSpaceAfter?: boolean
}

export function DottedTextTooltip(props: TooltipProps) {
	const {
		children,
		tooltipMessage,
		noSpaceBefore = false,
		noSpaceAfter = false
	} = props

	return (
		<>
			{!noSpaceBefore && <>&nbsp;</>}
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger className="cursor-help">
						<span className="border-b border-dotted border-neutral-400 cursor-pointer">
							{children}
						</span>
					</TooltipTrigger>
					<TooltipContent
						className="px-3 py-1.5 text-sm z-50"
						sideOffset={5}
					>
						<p>
							{tooltipMessage}
						</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			{!noSpaceAfter && <>&nbsp;</>}
		</>
	)
}
