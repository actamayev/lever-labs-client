/* eslint-disable max-len */
"use client"

import Image from "next/image"
import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import { Send, Bot, Square } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"
import { CustomUserCircle } from "../icons/custom-user-circle"
import personalInfoClass from "../../classes/personal-info-class"

interface Message {
	id: string
	content: string
	sender: "user" | "ai"
	timestamp: Date
}

// eslint-disable-next-line max-lines-per-function
function ChatInterface() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content: "Hi! I'm here to help you understand the code and robotics. Ask me anything!",
			sender: "ai",
			timestamp: new Date()
		}
	])
	const [inputValue, setInputValue] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const messagesContainerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	// Check if there have been user messages (excluding the initial AI message)
	const hasUserMessages = messages.some(message => message.sender === "user")

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
			timestamp: new Date()
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
				timestamp: new Date()
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
	}

	// Determine if button should be shown
	const shouldShowButton = inputValue.trim() || hasUserMessages

	return (
		<div className="flex flex-col h-full max-h-full bg-standardBackground rounded-lg border-2 border-swan overflow-hidden">
			{/* Header - Fixed height */}
			<div className="flex items-center gap-3 p-4 border-b-2 border-swan flex-shrink-0">
				<Avatar className="w-8 h-8">
					<AvatarFallback className="bg-macaw text-white">
						<Bot className="w-4 h-4" />
					</AvatarFallback>
				</Avatar>
				<div>
					<h3 className="font-semibold text-questionText">AI Assistant</h3>
				</div>
			</div>

			{/* Chat Messages - Scrollable with fixed height */}
			<div
				ref={messagesContainerRef}
				className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-full"
				style={{ height: "calc(100% - 140px)" }}
			>
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
							<p className="text-sm break-words">{message.content}</p>
							<p className={`text-xs mt-1 ${
								message.sender === "user"
									? "text-blue-100"
									: "text-gray-500 dark:text-gray-400"
							}`}>
								{message.timestamp.toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit"
								})}
							</p>
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

			{/* Input Area - Fixed height */}
			<div className="p-4 border-t-2 border-swan flex-shrink-0">
				<div className="flex gap-2">
					<Input
						ref={inputRef}
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Ask about the code..."
						className="flex-1"
						autoFocus
					/>
					{shouldShowButton && (
						<Button
							onClick={isLoading ? handleStopGeneration : handleSendMessage}
							disabled={!isLoading && !inputValue.trim()}
							size="icon"
							className="shrink-0"
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
