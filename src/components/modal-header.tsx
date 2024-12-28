import { X } from "lucide-react"
import { observer } from "mobx-react"
import { Button } from "./shadcn/ui/button"

interface Props {
	modalTitle: string
	closeModal: () => void
}

function ModalHeader(props: Props) {
	const { modalTitle, closeModal } = props

	return (
		<div className="flex justify-between items-center px-3 pt-1.5 border-b border-zinc-200 dark:border-zinc-700">
			<div className="text-lg font-bold">
				{modalTitle}
			</div>
			<Button
				variant="ghost"
				size="sm"
				className="flex h-8 w-8 items-center justify-center p-0 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700
					transition-colors focus-visible:ring-1 focus-visible:ring-zinc-950
					dark:focus-visible:ring-zinc-300"
				onClick={closeModal}
			>
				<X className="h-4 w-4" />
				<span className="sr-only">Close</span>
			</Button>
		</div>
	)
}

export default observer(ModalHeader)
