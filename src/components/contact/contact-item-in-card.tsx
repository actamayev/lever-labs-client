import { useCallback } from "react"
import { observer } from "mobx-react"
import { Button } from "../shadcn/ui/button"
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
		}
	}, [email, toast])

	return (
		<div className="w-full px-0.5">
			<Button
				variant="ghost"
				onClick={copyToClipboard}
				className="w-full flex justify-between items-center py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg"
			>
				<span className="text-left">{name}</span>
				<span className="text-right font-semibold">{email}</span>
			</Button>
		</div>
	)
}

export default observer(ContactItemInCard)
