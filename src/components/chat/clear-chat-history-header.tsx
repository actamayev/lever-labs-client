"use client"

import { Trash2, X } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../buttons/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"

interface ClearChatHistoryHeaderProps {
	showDeleteConfirmation: boolean
	handleDeleteClick: () => void
	handleConfirmDelete: () => void
	handleCancelDelete: () => void
	isStreaming: boolean
}

export default function ClearChatHistoryHeader(props: ClearChatHistoryHeaderProps): React.ReactNode {
	const { showDeleteConfirmation, handleDeleteClick, handleConfirmDelete, handleCancelDelete, isStreaming } = props
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
					title="Clear chat history"
					shadowHeight={4}
					shadowClass={redColors.shadow2}
				>
					<Trash2 className="h-4 w-4" />
					CLEAR
				</TactileButton>
			) : (
				<div className="flex items-center gap-2">
					<TactileButton
						onClick={handleConfirmDelete}
						className={cn("h-7 px-2 text-xs text-white", redColors.bg)}
						shadowHeight={4}
						shadowClass={redColors.shadow2}
					>
						<Trash2 className="h-4 w-4" />
						CLEAR
					</TactileButton>
					<TactileButton
						onClick={handleCancelDelete}
						className={cn("h-7 px-2 text-xs text-white", blueColors.bg)}
						shadowHeight={4}
						shadowClass={blueColors.shadow2}
					>
						<X className="h-4 w-4" />
						CANCEL
					</TactileButton>
				</div>
			)}
		</div>
	)
}
