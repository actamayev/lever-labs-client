"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import CustomTooltip from "../custom-tooltip"
import useToastOptions from "../toast-options"

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
		<CustomTooltip
			tooltipTrigger={
				<div className="w-full px-0.5">
					<Button
						variant="ghost"
						onClick={copyToClipboard}
						className="w-full flex justify-between items-center py-2 rounded-lg hover:bg-polar"
					>
						<span className="text-left">{name}</span>
						<span className="text-right font-semibold">{email}</span>
					</Button>
				</div>
			}
			tooltipContent="COPY"
		/>
	)
}

export default observer(ContactItemInCard)
