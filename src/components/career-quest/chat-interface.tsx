/* eslint-disable max-len */
"use client"

import Image from "next/image"
import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import { Send, Bot, Square } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Button } from "../shadcn/ui/button"
import { Textarea } from "../shadcn/ui/textarea"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"
import { CustomUserCircle } from "../icons/custom-user-circle"
import personalInfoClass from "../../classes/personal-info-class"

interface Message {
	id: string
	content: string
	sender: "user" | "ai"
}

// eslint-disable-next-line max-lines-per-function
function ChatInterface() {
	const [messages, setMessages] = useState<Message[]>([])
	const [inputValue, setInputValue] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// Check if there have been user messages
	const hasUserMessages = messages.some(message => message.sender === "user")
	const hasAnyMessages = messages.length > 0

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [messages])

	const handleSendMessage = () => {
		if (!inputValue.trim() || isLoading) return

		const userMessage: Message = {
			id: Date.now().toString(),
			content: inputValue,
			sender: "user",
		}

		setMessages(prev => [...prev, userMessage])
		setInputValue("")
		setIsLoading(true)

		// Keep focus on input after sending
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)

		// Simulate AI response (replace this with your actual API call)
		setTimeout(() => {
			const aiMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: "Thanks for your question! This is where I would respond with helpful information about the code or robotics concept.",
				sender: "ai",
			}
			setMessages(prev => [...prev, aiMessage])
			setIsLoading(false)
		}, 1000)
	}

	const handleStopGeneration = () => {
		setIsLoading(false)
		// Here you would also cancel any ongoing API requests
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
		// Allow Shift+Enter for new lines
	}

	return (
		<div className="flex flex-col h-full max-h-full bg-standardBackground rounded-lg border-2 border-swan overflow-hidden">
			{/* Chat Messages - Scrollable with fixed height */}
			<div
				ref={messagesContainerRef}
				className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-full"
			>
				{/* Empty state when no messages */}
				{!hasAnyMessages && (
					<div className="flex items-center justify-center h-full">
						<div className="text-center">
							<Bot className="w-12 h-12 mx-auto mb-4 text-macaw" />
							<h3 className="text-lg font-semibold text-questionText mb-2">What can I help with?</h3>
							<p className="text-sm text-gray-500 dark:text-gray-400">Ask questions about the code or robotics concepts</p>
						</div>
					</div>
				)}

				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
					>
						{message.sender === "ai" && (
							<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
								<AvatarFallback className="bg-macaw text-white">
									<Bot className="w-4 h-4" />
								</AvatarFallback>
							</Avatar>
						)}

						<div
							className={`max-w-[80%] rounded-lg px-3 py-2 ${
								message.sender === "user"
									? "bg-macaw text-white ml-auto"
									: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
							}`}
						>
							<p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
						</div>

						{message.sender === "user" && (
							<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
								{!isNull(personalInfoClass.profilePictureUrl) ? (
									<Image
										src={personalInfoClass.profilePictureUrl}
										alt="Your profile"
										width={32}
										height={32}
										className="rounded-full object-cover w-full h-full"
									/>
								) : (
									<AvatarFallback className="bg-questionText text-white">
										<CustomUserCircle className="w-4 h-4" />
									</AvatarFallback>
								)}
							</Avatar>
						)}
					</div>
				))}

				{/* Loading indicator */}
				{isLoading && (
					<div className="flex gap-3 justify-start">
						<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
							<AvatarFallback className="bg-macaw text-white">
								<Bot className="w-4 h-4" />
							</AvatarFallback>
						</Avatar>
						<div className="bg-wan rounded-lg px-3 py-2">
							<div className="flex space-x-1">
								<div className="w-2 h-2 bg-swan rounded-full animate-bounce"></div>
								<div className="w-2 h-2 bg-swan rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
								<div className="w-2 h-2 bg-swan rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
							</div>
						</div>
					</div>
				)}

				{/* Invisible div to scroll to */}
				<div ref={messagesEndRef} />
			</div>

			{/* Input Area with inline send button */}
			<div className="p-4 flex-shrink-0">
				<div className="relative">
					<Textarea
						ref={inputRef}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Ask about the code"
						className="pr-12 resize-none min-h-14 max-h-32 border-2 border-swan"
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
