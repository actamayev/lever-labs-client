/* eslint-disable complexity */
"use client"

import { observer } from "mobx-react"
import { Lightbulb, Send, Square } from "lucide-react"
import { Dispatch, RefObject, SetStateAction, useCallback } from "react"
import { Textarea } from "../ui/textarea"
import { TactileButton } from "../ui/tactile-button"
import { cn } from "../../lib/shadcn/utils"
import CustomTooltip from "../custom-tooltip"

interface Props {
	inputRef: RefObject<HTMLTextAreaElement | null>
	handleSendMessage: () => Promise<void>
	onStopStreaming: () => Promise<void>
	inputValue: string
	setInputValue: Dispatch<SetStateAction<string>>
	isStreaming: boolean
	handleHintClick?: () => Promise<void>
	isWaitingForCodeCheck?: boolean
}

function ChatTextArea(props: Props): React.ReactNode {
	const { handleSendMessage, onStopStreaming, inputRef, inputValue,
		setInputValue, isStreaming, handleHintClick, isWaitingForCodeCheck } = props

	// Create the conditional logic inside the component
	const onClickAction = useCallback(async (): Promise<void> => {
		if (isStreaming) {
			await onStopStreaming()
		} else {
			await handleSendMessage()
		}
	}, [isStreaming, onStopStreaming, handleSendMessage])

	const handleKeyDown = (e: React.KeyboardEvent): void => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}

		if (e.key === "Escape" && isStreaming) {
			e.preventDefault()
			onStopStreaming()
		}
	}

	return (
		<div className="px-4 pb-4 shrink-0">
			<div className="relative">
				<Textarea
					ref={inputRef}
					value={inputValue}
					onChange={(e): void => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Ask about the code or concepts"
					className="pr-12 resize-none min-h-14 max-h-32 border-2 border-swan rounded-xl"
				/>
				<CustomTooltip
					tooltipTrigger={
						<TactileButton
							onClick={onClickAction}
							disabled={!isStreaming && !inputValue.trim() || isWaitingForCodeCheck}
							shadowClass={cn((isStreaming && !isWaitingForCodeCheck) ? "shadow-cardinal-2" : undefined)}
							shadowHeight={4}
							className={cn("absolute right-2 bottom-4 h-8 w-8 shrink-0 text-white font-semibold",
								(isStreaming && !isWaitingForCodeCheck) ? "bg-cardinal" : "bg-i-message-blue"
							)}
						>
							{(isStreaming && !isWaitingForCodeCheck) ? (
								<Square className="w-4 h-4" />
							) : (
								<Send className="w-4 h-4" />
							)}
						</TactileButton>
					}
					tooltipContent={isStreaming ? "Stop" : "Send message"}
				/>
				{handleHintClick && (
					<CustomTooltip
						tooltipTrigger={
							<TactileButton
								onClick={handleHintClick}
								disabled={isStreaming}
								shadowColor="rgb(140, 80, 200)"
								shadowHeight={4}
								className="absolute right-12 bottom-4 h-8 w-8 shrink-0 bg-beetle-2 text-white font-semibold"
							>
								<Lightbulb className="w-4 h-4" />
							</TactileButton>
						}
						tooltipContent="Get a hint"
					/>
				)}
			</div>
		</div>
	)
}

export default observer(ChatTextArea)
