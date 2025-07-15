"use client"

import { observer } from "mobx-react"
import { Send, Square } from "lucide-react"
import { Dispatch, RefObject, SetStateAction, useCallback } from "react"
import { Button } from "../shadcn/ui/button"
import { Textarea } from "../shadcn/ui/textarea"

interface Props {
	inputRef: RefObject<HTMLTextAreaElement>
	handleSendMessage: () => Promise<void>
	onStopStreaming: () => Promise<void>
	inputValue: string
	setInputValue: Dispatch<SetStateAction<string>>
	hasUserMessages: boolean
	isStreaming: boolean
}

function ChatTextArea(props: Props) {
	const { handleSendMessage, onStopStreaming, inputRef, inputValue, setInputValue, hasUserMessages, isStreaming } = props

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
					<Button
						onClick={onClickAction}
						disabled={!isStreaming && !inputValue.trim()}
						size="icon"
						className="absolute right-2 bottom-2 h-8 w-8 shrink-0"
						variant={isStreaming ? "destructive" : "default"}
					>
						{isStreaming ? (
							<Square className="w-4 h-4" />
						) : (
							<Send className="w-4 h-4" />
						)}
					</Button>
				)}
			</div>
		</div>
	)
}

export default observer(ChatTextArea)
