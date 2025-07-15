import { Trash2, X } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { getDuolingoColors } from "../../utils/duolingo-utils"

interface DeleteChatHistoryHeaderProps {
	showDeleteConfirmation: boolean
	handleDeleteClick: () => void
	handleConfirmDelete: () => void
	handleCancelDelete: () => void
	isStreaming: boolean
}

export default function DeleteChatHistoryHeader({
	showDeleteConfirmation,
	handleDeleteClick,
	handleConfirmDelete,
	handleCancelDelete,
	isStreaming
}: DeleteChatHistoryHeaderProps) {
	const redColors = getDuolingoColors("cardinal")
	const blueColors = getDuolingoColors("humpback")

	return (
		<div className="flex justify-between items-center p-3 border-b-2 border-swan">
			<span className="text-sm font-medium text-eel">Chat History</span>

			{!showDeleteConfirmation ? (
				<TactileButton
					onClick={handleDeleteClick}
					disabled={isStreaming}
					className={cn("h-7 px-2 text-xs text-white", redColors.bg)}
					title="Delete chat history"
					shadowHeight={4}
					shadowClass={redColors.shadow}
				>
					<Trash2 className="h-4 w-4" />
					DELETE
				</TactileButton>
			) : (
				<div className="flex items-center gap-2">
					<TactileButton
						onClick={handleConfirmDelete}
						className={cn("h-7 px-2 text-xs text-white", redColors.bg)}
						shadowHeight={4}
						shadowClass={redColors.shadow}
					>
						<Trash2 className="h-4 w-4" />
						DELETE
					</TactileButton>
					<TactileButton
						onClick={handleCancelDelete}
						className={cn("h-7 px-2 text-xs text-white", blueColors.bg)}
						shadowHeight={4}
						shadowClass={blueColors.shadow}
					>
						<X className="h-4 w-4" />
						CANCEL
					</TactileButton>
				</div>
			)}
		</div>
	)
}
