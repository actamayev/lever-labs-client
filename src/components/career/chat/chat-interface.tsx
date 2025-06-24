"use client"

import { observer } from "mobx-react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Send, Square, BotMessageSquare } from "lucide-react"
import { BlocklyJson, ChallengeData } from "@bluedotrobots/common-ts"
import SingleMessage from "./single-message"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"
import { Textarea } from "../../shadcn/ui/textarea"
import socketClass from "../../../classes/socket-class"
import chatsClass from "../../../classes/chat-class"
import { Avatar, AvatarFallback } from "../../shadcn/ui/avatar"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"

interface ChatInterfaceProps {
	blocklyJson: BlocklyJson
	challengeData: ChallengeData
}

// eslint-disable-next-line max-lines-per-function, complexity
function ChatInterface({ blocklyJson, challengeData }: ChatInterfaceProps) {
	const [inputValue, setInputValue] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const challengeId = challengeData.id

	// Generate current C++ code from Blockly
	const cppCode = useMemo(() => generateCppFromJson(blocklyJson), [blocklyJson])

	// Get messages directly from chats class
	const messages = chatsClass.getMessages(challengeId)
	const isStreaming = chatsClass.isStreaming(challengeId)
	const conversationHistory = chatsClass.getConversationHistory(challengeId)

	// Check if there have been user messages
	const hasUserMessages = messages.some(message => message.role === "user")
	const hasAnyMessages = messages.length > 0

	// Set challenge context when component mounts
	useEffect(() => {
		socketClass.setChallengeContext(challengeId)

		return () => {
			// Don't clear context on unmount as user might navigate back
			// socketClass.clearChallengeContext()
		}
	}, [challengeId])

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [messages])

	// Handle when streaming completes
	useEffect(() => {
		if (!isStreaming && isLoading) {
			setIsLoading(false)
		}
	}, [isStreaming, isLoading])

	const handleSendMessage = async () => {
		if (!inputValue.trim() || isLoading) return

		const messageToSend = inputValue
		setInputValue("")
		setIsLoading(true)

		// Add user message to chats
		chatsClass.addUserMessage(challengeId, messageToSend)

		// Keep focus on input after sending
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)

		try {
			// Reset chat state for new conversation
			chatsClass.resetChatState(challengeId)

			// Send request to backend
			await blueDotApiClientClass.careerQuestDataService.sendChatMessage({
				challengeData,
				userCode: cppCode,
				interactionType: "generalQuestion",
				message: messageToSend,
				conversationHistory
			})

		} catch (error) {
			console.error("Failed to send chat message:", error)
			setIsLoading(false)

			// Add error message to chats
			chatsClass.addErrorMessage(challengeId, "Sorry, I encountered an error. Please try again.")
		}
	}

	const handleStopGeneration = () => {
		setIsLoading(false)
		chatsClass.resetChatState(challengeId)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
		// Allow Shift+Enter for new lines
	}

	// Convert chat messages to display format
	const displayMessages = messages.map(msg => ({
		id: msg.id,
		content: msg.content,
		sender: msg.role
	}))

	return (
		<div className="flex flex-col h-full max-h-full bg-standardBackground rounded-lg border-2 border-swan overflow-hidden">
			{/* Chat Messages - Scrollable with fixed height */}
			<div
				ref={messagesContainerRef}
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
						{displayMessages.map((message) => (
							<SingleMessage
								key={message.id}
								message={message}
							/>
						))}

						{/* Loading indicator when waiting for stream to start */}
						{isLoading && !isStreaming && (
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
						disabled={isLoading}
					/>
					{(inputValue.trim() || hasUserMessages) && (
						<Button
							onClick={isLoading ? handleStopGeneration : handleSendMessage}
							disabled={!isLoading && !inputValue.trim()}
							size="icon"
							className="absolute right-2 bottom-2 h-8 w-8 shrink-0"
							variant={isLoading ? "destructive" : "default"}
						>
							{isLoading ? (
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
