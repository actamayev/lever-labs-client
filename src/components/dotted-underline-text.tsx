import { Link } from "react-router"
import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from "./shadcn/ui/tooltip"

interface Props {
	linkTo: StaticPageNames
	children: React.ReactNode
}

export default function DottedUnderlineText(props: Props) {
	const { linkTo, children } = props

	return (
		<span className="hover:underline hover:decoration-dotted">
			<Link to={linkTo}>
				{children}
			</Link>
		</span>
	)
}

interface TooltipProps {
	children: React.ReactNode
	tooltipMessage: string
}

export function DottedTextTooltip(props: TooltipProps) {
	const { children, tooltipMessage } = props

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger className="cursor-help">
					<span className="border-b border-dotted border-neutral-400 cursor-pointer">
						{children}
					</span>
				</TooltipTrigger>
				<TooltipContent
					side="top"
					className="bg-zinc-700 text-zinc-100 px-3 py-1.5 text-sm z-50"
					sideOffset={5}
				>
					<p>
						{tooltipMessage}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
