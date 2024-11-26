import { X } from "lucide-react"
import { Button } from "./shadcn/ui/button"

interface Props {
	modalTitle: string
	toggleModalOpen: () => void
}

export default function ModalHeader(props: Props) {
	const { modalTitle, toggleModalOpen } = props

	return (
		<div className="flex justify-between items-center px-3 pt-1.5 border-b border-zinc-200 dark:border-zinc-700">
			<div className="text-lg font-bold">
				{modalTitle}
			</div>
			<Button
				variant="ghost"
				size="sm"
				className="h-8 w-8 p-0 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800
					transition-colors focus-visible:ring-1 focus-visible:ring-zinc-950
					dark:focus-visible:ring-zinc-300"
				onClick={toggleModalOpen}
			>
				<X className="h-4 w-4" />
				<span className="sr-only">Close</span>
			</Button>
		</div>
	)
}
