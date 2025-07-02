import { observer } from "mobx-react"
import { Send, Square } from "lucide-react"
import { Dispatch, RefObject, SetStateAction } from "react"
import { Button } from "../../shadcn/ui/button"
import { Textarea } from "../../shadcn/ui/textarea"

interface Props {
	inputRef: RefObject<HTMLTextAreaElement>
	handleSendMessage: () => Promise<void>
	onClickAction: () => Promise<void>
	inputValue: string
	setInputValue: Dispatch<SetStateAction<string>>
	hasUserMessages: boolean
	isStreaming: boolean
}

function ChatTextArea(props: Props) {
	const { handleSendMessage, onClickAction, inputRef, inputValue, setInputValue, hasUserMessages, isStreaming } = props
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
		// Allow Shift+Enter for new lines
	}

	return (
		<div className="p-4 flex-shrink-0">
			<div className="relative">
				<Textarea
					ref={inputRef}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Ask about the code or concepts"
					className="pr-12 resize-none min-h-14 max-h-32 border-2 border-swan"
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
