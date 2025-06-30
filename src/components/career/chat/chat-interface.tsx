"use client"

import { observer } from "mobx-react"
import { Send, Square, BotMessageSquare } from "lucide-react"
import { BlocklyJson, ChallengeData } from "@bluedotrobots/common-ts"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import SingleMessage from "./single-message"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"
import { Textarea } from "../../shadcn/ui/textarea"
import chatsClass from "../../../classes/chat-class"
import { Avatar, AvatarFallback } from "../../shadcn/ui/avatar"
import stopChatStream from "../../../utils/chat/stop-chat-stream"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"
import sendCareerQuestMessage from "../../../utils/chat/send-career-quest-message"
import retrieveCareerQuestChat from "../../../utils/chat/retrieve-career-quest-chat"

interface ChatInterfaceProps {
	blocklyJson: BlocklyJson
	challengeData: ChallengeData
}

// eslint-disable-next-line max-lines-per-function, complexity
function ChatInterface({ blocklyJson, challengeData }: ChatInterfaceProps) {
	const [inputValue, setInputValue] = useState("")
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// Generate current C++ code from Blockly
	const cppCode = useMemo(() => generateCppFromJson(blocklyJson), [blocklyJson])

	// Get messages directly from chats class
	const messages = chatsClass.getMessages(challengeData.id)
	const isStreaming = chatsClass.isStreaming(challengeData.id)
	const isRetrievingMessages = chatsClass.isRetrievingMessages(challengeData.id)
	const hasRetrievedMessages = chatsClass.hasRetrievedMessages(challengeData.id)

	// Retrieve chat messages when component mounts
	useEffect(() => {
		if (!hasRetrievedMessages && !isRetrievingMessages) {
			retrieveCareerQuestChat(challengeData.id)
		}
	}, [challengeData.id, hasRetrievedMessages, isRetrievingMessages])

	// Check if we're waiting for a response (streaming message with no content yet)
	const isWaitingForResponse = useMemo(() => {
		if (!isStreaming) return false
		const streamingMessage = messages.find(msg => msg.isStreaming)
		return streamingMessage ? streamingMessage.content.length === 0 : false
	}, [isStreaming, messages])

	// Check if there have been user messages
	const hasUserMessages = messages.some(message => message.role === "user")
	const hasAnyMessages = messages.length > 0

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [messages])

	const handleSendMessage = useCallback(async () => {
		if (!inputValue.trim() || isStreaming) return

		setInputValue("")

		// Add user message to chats
		chatsClass.addUserMessage(challengeData.id, inputValue)

		// Keep focus on input after sending
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)

		await sendCareerQuestMessage(challengeData.id, cppCode, inputValue)
	}, [challengeData, cppCode, inputValue, isStreaming])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
		// Allow Shift+Enter for new lines
	}

	const onClickAction = useCallback(async () => {
		if (isStreaming) {
			return await stopChatStream(challengeData.id)
		}
		await handleSendMessage()
	}, [challengeData.id, handleSendMessage, isStreaming])

	// Show loading state while retrieving messages
	if (isRetrievingMessages) {
		return (
			<div className="flex flex-col h-full max-h-full bg-standardBackground rounded-lg border-2 border-swan overflow-hidden">
				<div className="flex-1 flex items-center justify-center">
					<div className="text-center">
						<div className="flex space-x-1 justify-center mb-4">
							<div className="w-2 h-2 bg-macaw rounded-full animate-bounce"></div>
							<div className="w-2 h-2 bg-macaw rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}/>
							<div className="w-2 h-2 bg-macaw rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}/>
						</div>
						<p className="text-sm text-gray-500 dark:text-gray-400">Loading conversation...</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-full max-h-full bg-standardBackground rounded-lg border-2 border-swan overflow-hidden">
			{/* Chat Messages - Scrollable with fixed height */}
			<div
				className={cn(
					"flex-1 min-h-0 max-h-full w-full overflow-x-hidden",
					hasAnyMessages ? "overflow-y-auto p-4 space-y-4" : "overflow-hidden flex items-center justify-center"
				)}
			>
				{/* Empty state when no messages */}
				{!hasAnyMessages && (
					<div className="text-center">
						<BotMessageSquare className="w-12 h-12 mx-auto mb-4 text-macaw" />
						<h3 className="text-lg font-semibold text-questionText mb-2">What can I help with?</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400">Ask questions about the code or robotics concepts</p>
					</div>
				)}

				{/* Messages when they exist */}
				{hasAnyMessages && (
					<>
						{messages.map((message) => (
							<SingleMessage
								key={message.id}
								message={message}
							/>
						))}

						{/* Loading indicator when waiting for response to start */}
						{isWaitingForResponse && (
							<div className="flex gap-3 justify-start">
								<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
									<AvatarFallback className="bg-macaw text-white">
										<BotMessageSquare className="w-4 h-4" />
									</AvatarFallback>
								</Avatar>
								<div className="bg-wan rounded-lg px-3 py-2">
									<div className="flex space-x-1">
										<div className="w-2 h-2 bg-swan rounded-full animate-bounce"></div>
										<div className="w-2 h-2 bg-swan rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}/>
										<div className="w-2 h-2 bg-swan rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}/>
									</div>
								</div>
							</div>
						)}

						{/* Invisible div to scroll to */}
						<div ref={messagesEndRef} />
					</>
				)}
			</div>

			{/* Input Area with inline send button */}
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
		</div>
	)
}

export default observer(ChatInterface)
