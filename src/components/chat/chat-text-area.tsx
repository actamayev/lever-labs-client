"use client"

import { observer } from "mobx-react"
import { Lightbulb, Send, Square } from "lucide-react"
import { Dispatch, RefObject, SetStateAction, useCallback } from "react"
import { Textarea } from "../shadcn/ui/textarea"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { cn } from "../../lib/shadcn/utils"

interface Props {
	inputRef: RefObject<HTMLTextAreaElement>
	handleSendMessage: () => Promise<void>
	onStopStreaming: () => Promise<void>
	inputValue: string
	setInputValue: Dispatch<SetStateAction<string>>
	hasUserMessages: boolean
	isStreaming: boolean
	handleHintClick?: () => Promise<void>
}

function ChatTextArea(props: Props) {
	const { handleSendMessage, onStopStreaming, inputRef, inputValue,
		setInputValue, hasUserMessages, isStreaming, handleHintClick } = props

	// Create the conditional logic inside the component
	const onClickAction = useCallback(async () => {
		if (isStreaming) {
			await onStopStreaming()
		} else {
			await handleSendMessage()
		}
	}, [isStreaming, onStopStreaming, handleSendMessage])

	const handleKeyDown = (e: React.KeyboardEvent) => {
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
		<div className="px-4 pb-4 flex-shrink-0">
			<div className="relative">
				<Textarea
					ref={inputRef}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Ask about the code or concepts"
					className="pr-12 resize-none min-h-14 max-h-32 border-2 border-swan rounded-lg"
				/>
				{(inputValue.trim() || hasUserMessages) && (
					<TactileButton
						onClick={onClickAction}
						disabled={!isStreaming && !inputValue.trim()}
						shadowColor={cn(!isStreaming ? "rgb(0, 100, 200)" : undefined)}
						shadowClass={cn(isStreaming ? "shadow-cardinal-2" : undefined)}
						shadowHeight={4}
						className={cn("absolute right-2 bottom-2 h-8 w-8 shrink-0 text-white font-semibold",
							isStreaming ? "bg-cardinal" : "bg-iMessageBlue"
						)}
					>
						{isStreaming ? (
							<Square className="w-4 h-4" />
						) : (
							<Send className="w-4 h-4" />
						)}
					</TactileButton>
				)}
				{handleHintClick && (
					<TactileButton
						onClick={handleHintClick}
						disabled={isStreaming}
						shadowColor="rgb(140, 80, 200)"
						shadowHeight={4}
						className="absolute right-12 bottom-2 h-8 w-8 shrink-0 bg-beetle-2 text-white font-semibold"
					>
						<Lightbulb className="w-4 h-4" />
					</TactileButton>
				)}
			</div>
		</div>
	)
}

export default observer(ChatTextArea)
