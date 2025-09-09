"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
import CustomTooltip from "../custom-tooltip"
import getToastClass from "../../classes/toast-class"

function ContactItemInCard({ email }: { email: string }): React.ReactNode {
	const copyToClipboard = useCallback(async (): Promise<void> => {
		try {
			await navigator.clipboard.writeText(email)
			return getToastClass().neutral({
				title: `${email} copied to clipboard`
			})
		} catch (error) {
			console.error(error)
			return getToastClass().neutral({
				title: "Unable to copy email to clipboard at this time",
				description: "Please reload the page and try again"
			})
		}
	}, [email])

	return (
		<CustomTooltip
			tooltipTrigger={
				<div className="w-full px-0.5">
					<Button
						variant="ghost"
						onClick={copyToClipboard}
						className="w-full flex items-center py-2 rounded-lg hover:bg-polar"
					>
						<span className="text-right font-semibold">{email}</span>
					</Button>
				</div>
			}
			tooltipContent="COPY"
		/>
	)
}

export default observer(ContactItemInCard)
