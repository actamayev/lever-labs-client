import { useCallback } from "react"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import useToastOptions from "../toast-options"
import { cn } from "../../lib/shadcn/utils"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"

interface Props {
	name: string
	email: string
}

function ContactItemInCard(props: Props) {
	const { name, email } = props
	const toast = useToastOptions()

	const copyToClipboard = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(email)
			return toast.neutral({
				title: `${email} copied to clipboard`
			})
		} catch (error) {
			console.error(error)
			return toast.neutral({
				title: "Unable to copy email to clipboard at this time",
				description: "Please reload the page and try again"
			})
		}
	}, [email, toast])

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="w-full px-0.5">
						<Button
							variant="ghost"
							onClick={copyToClipboard}
							className="w-full flex justify-between items-center py-2 rounded-lg hover:bg-sidebarButtonHover"
						>
							<span className="text-left">{name}</span>
							<span className="text-right font-semibold">{email}</span>
						</Button>
					</div>
				</TooltipTrigger>

				<TooltipContent className="mb-1">
					Copy
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default observer(ContactItemInCard)
