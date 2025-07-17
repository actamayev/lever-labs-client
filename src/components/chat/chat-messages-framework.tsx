"use client"

import { observer } from "mobx-react"
import { ArrowDown, BotMessageSquare } from "lucide-react"
import { RefObject, useEffect, useRef, useState, useCallback } from "react"
import { cn } from "../../lib/shadcn/utils"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"

interface Props {
	hasAnyMessages: boolean
	children: React.ReactNode
	isWaitingForResponse: boolean
	isStreaming: boolean
	messagesEndRef: RefObject<HTMLDivElement>
	messageLength: number
}

// eslint-disable-next-line max-lines-per-function
function ChatMessagesFramework(props: Props) {
	const { hasAnyMessages, children, isWaitingForResponse, isStreaming, messagesEndRef, messageLength } = props
	const containerRef = useRef<HTMLDivElement>(null)
	const [isAtBottom, setIsAtBottom] = useState(true)
	const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
	const userScrolledDuringStream = useRef(false)
	const isScrollingProgrammatically = useRef(false)

	// Check if user is at bottom of chat
	const checkIfAtBottom = useCallback(() => {
		if (!containerRef.current) return false

		const container = containerRef.current
		const threshold = 10 // pixels from bottom to consider "at bottom"
		const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - threshold

		setIsAtBottom(atBottom)
		return atBottom
	}, [])

	// Smooth scroll to bottom
	const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
		if (!containerRef.current) return

		isScrollingProgrammatically.current = true
		containerRef.current.scrollTo({
			top: containerRef.current.scrollHeight,
			behavior
		})

		// Reset the flag after scroll completes
		setTimeout(() => {
			isScrollingProgrammatically.current = false
			checkIfAtBottom()
		}, behavior === "smooth" ? 300 : 50)
	}, [checkIfAtBottom])

	// Handle scroll events
	const handleScroll = useCallback(() => {
		if (!containerRef.current || isScrollingProgrammatically.current) return

		const atBottom = checkIfAtBottom()

		// If user manually scrolled during streaming and moved away from bottom
		if (isStreaming && !atBottom) {
			userScrolledDuringStream.current = true
			setAutoScrollEnabled(false)
		}

		// If user scrolled back to bottom during streaming, re-enable auto-scroll
		if (isStreaming && atBottom && userScrolledDuringStream.current) {
			setAutoScrollEnabled(true)
			userScrolledDuringStream.current = false
		}

		// If not streaming and user is at bottom, ensure auto-scroll is enabled
		if (!isStreaming && atBottom) {
			setAutoScrollEnabled(true)
			userScrolledDuringStream.current = false
		}
	}, [isStreaming, checkIfAtBottom])

	// Auto-scroll when new content arrives
	useEffect(() => {
		if (!containerRef.current || !hasAnyMessages) return

		// Only auto-scroll if enabled and either not streaming or user hasn't manually scrolled
		if (autoScrollEnabled && (!isStreaming || !userScrolledDuringStream.current)) {
			scrollToBottom("smooth")
		}
	}, [messageLength, autoScrollEnabled, isStreaming, scrollToBottom, hasAnyMessages])

	// Reset when streaming ends
	useEffect(() => {
		if (!isStreaming) {
			userScrolledDuringStream.current = false
			// If user is at bottom when streaming ends, ensure auto-scroll is enabled
			if (isAtBottom) {
				setAutoScrollEnabled(true)
			}
		}
	}, [isStreaming, isAtBottom])

	// Handle scroll to bottom button click
	const handleScrollToBottomClick = useCallback(() => {
		setAutoScrollEnabled(true)
		userScrolledDuringStream.current = false
		scrollToBottom("smooth")
	}, [scrollToBottom])

	// Check bottom position when messages change
	useEffect(() => {
		if (containerRef.current && hasAnyMessages) {
			// Small delay to ensure DOM has updated
			setTimeout(checkIfAtBottom, 10)
		}
	}, [hasAnyMessages, checkIfAtBottom])

	// Show scroll button when not at bottom and has messages
	const showScrollButton = !isAtBottom && hasAnyMessages

	return (
		<div className="relative flex-1 min-h-0 max-h-full w-full">
			<div
				ref={containerRef}
				className={cn(
					"h-full w-full overflow-x-hidden",
					hasAnyMessages ? "overflow-y-auto p-4 space-y-4" : "overflow-hidden flex items-center justify-center"
				)}
				onScroll={handleScroll}
			>
				{/* Empty state when no messages */}
				{!hasAnyMessages && (
					<div className="text-center">
						<BotMessageSquare className="w-12 h-12 mx-auto mb-4 text-macaw" />
						<h3 className="text-lg font-semibold text-questionText mb-2">What can I help with?</h3>
						<p className="text-sm text-wolf">Ask questions about your code or robotics concepts</p>
					</div>
				)}

				{/* Messages when they exist */}
				{hasAnyMessages && (
					<>
						{children}

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

			{/* Scroll to bottom button - centered horizontally with fade transition */}
			<button
				onClick={handleScrollToBottomClick}
				className={cn(
					"absolute bottom-6 left-1/2 -translate-x-1/2 bg-standardBackground",
					"text-questionText rounded-full z-50 flex items-center justify-center",
					"transition-all duration-300 ease-in-out size-8 p-0", // Removed padding so icon can overflow
					"!border-swan border",
					showScrollButton
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				)}
				aria-label="Scroll to bottom"
			>
				<ArrowDown className="size-5" /> {/* Larger icon that extends beyond button */}
			</button>
		</div>
	)
}

export default observer(ChatMessagesFramework)
