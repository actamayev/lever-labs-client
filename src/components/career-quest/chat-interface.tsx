/* eslint-disable max-len */
"use client"

import Image from "next/image"
import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import { Send, Bot } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import { ScrollArea } from "../shadcn/ui/scroll-area"
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
	const scrollAreaRef = useRef<HTMLDivElement>(null)

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		if (scrollAreaRef.current) {
			const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
			if (scrollContainer) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight
			}
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

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	return (
		<div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg border-2 border-swan">
			{/* Chat Header */}
			<div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-600">
				<Avatar className="w-8 h-8">
					<AvatarFallback className="bg-blue-500 text-white">
						<Bot className="w-4 h-4" />
					</AvatarFallback>
				</Avatar>
				<div>
					<h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400">Ask me about the code!</p>
				</div>
			</div>

			{/* Chat Messages */}
			<ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
				<div className="space-y-4">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
						>
							{message.sender === "ai" && (
								<Avatar className="w-8 h-8 mt-1">
									<AvatarFallback className="bg-blue-500 text-white">
										<Bot className="w-4 h-4" />
									</AvatarFallback>
								</Avatar>
							)}

							<div
								className={`max-w-[80%] rounded-lg px-3 py-2 ${
									message.sender === "user"
										? "bg-blue-500 text-white ml-auto"
										: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
								}`}
							>
								<p className="text-sm">{message.content}</p>
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
								<Avatar className="w-8 h-8 mt-1">
									{!isNull(personalInfoClass.profilePictureUrl) ? (
										<Image
											src={personalInfoClass.profilePictureUrl}
											alt="Your profile"
											width={32}
											height={32}
											className="rounded-full object-cover w-full h-full"
										/>
									) : (
										<AvatarFallback className="bg-gray-500 text-white">
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
							<Avatar className="w-8 h-8 mt-1">
								<AvatarFallback className="bg-blue-500 text-white">
									<Bot className="w-4 h-4" />
								</AvatarFallback>
							</Avatar>
							<div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
								<div className="flex space-x-1">
									<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
									<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
									<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
								</div>
							</div>
						</div>
					)}
				</div>
			</ScrollArea>

			{/* Chat Input */}
			<div className="p-4 border-t border-gray-200 dark:border-gray-600">
				<div className="flex gap-2">
					<Input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="Ask about the code..."
						className="flex-1"
						disabled={isLoading}
					/>
					<Button
						onClick={handleSendMessage}
						disabled={!inputValue.trim() || isLoading}
						size="icon"
						className="shrink-0"
					>
						<Send className="w-4 h-4" />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default observer(ChatInterface)
