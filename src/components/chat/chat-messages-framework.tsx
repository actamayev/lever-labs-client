import { RefObject, useEffect, useRef, useState, useCallback } from "react"
import { observer } from "mobx-react"
import { BotMessageSquare, ChevronDown } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"

interface Props {
	hasAnyMessages: boolean
	children: React.ReactNode
	isWaitingForResponse: boolean
	isStreaming: boolean
	messagesEndRef: RefObject<HTMLDivElement>
}

// eslint-disable-next-line max-lines-per-function
function ChatMessagesFramework(props: Props) {
	const { hasAnyMessages, children, isWaitingForResponse, isStreaming, messagesEndRef } = props

	const containerRef = useRef<HTMLDivElement>(null)
	const [isAtBottom, setIsAtBottom] = useState(true)
	const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
	const [showScrollButton, setShowScrollButton] = useState(false)
	const userScrolledDuringStream = useRef(false)
	const lastScrollTop = useRef(0)
	const scrollTimeoutRef = useRef<NodeJS.Timeout>()

	// Check if user is at bottom of chat
	const checkIfAtBottom = useCallback((container: HTMLDivElement) => {
		const threshold = 10 // pixels from bottom to consider "at bottom"
		const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - threshold
		setIsAtBottom(isBottom)
		setShowScrollButton(!isBottom && hasAnyMessages)
		return isBottom
	}, [hasAnyMessages])

	// Smooth scroll to bottom
	const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				top: containerRef.current.scrollHeight,
				behavior
			})
		}
	}, [])

	// Handle scroll events
	const handleScroll = useCallback(() => {
		if (!containerRef.current) return

		const container = containerRef.current
		const currentScrollTop = container.scrollTop
		const isAtBottomNow = checkIfAtBottom(container)

		// Detect if user manually scrolled during streaming
		if (isStreaming) {
			// If scroll position changed and it wasn't an auto-scroll to bottom
			if (Math.abs(currentScrollTop - lastScrollTop.current) > 5 && !isAtBottomNow) {
				userScrolledDuringStream.current = true
				setAutoScrollEnabled(false)
			}
		}

		lastScrollTop.current = currentScrollTop

		// Clear any pending scroll timeout
		if (scrollTimeoutRef.current) {
			clearTimeout(scrollTimeoutRef.current)
		}

		// Small delay to avoid excessive updates during scroll
		scrollTimeoutRef.current = setTimeout(() => {
			if (!isStreaming && isAtBottomNow) {
				setAutoScrollEnabled(true)
				userScrolledDuringStream.current = false
			}
		}, 150)
	}, [isStreaming, checkIfAtBottom])

	// Auto-scroll when new messages arrive
	useEffect(() => {
		if (!containerRef.current || !hasAnyMessages) return

		// Always scroll to bottom when sending a new message (when auto-scroll is enabled)
		// or when a streaming message starts
		if (autoScrollEnabled || (isStreaming && !userScrolledDuringStream.current)) {
			// Use smooth scrolling for new messages, instant for rapid updates during streaming
			const behavior = isStreaming ? "auto" : "smooth"
			scrollToBottom(behavior)
		}
	}, [children, autoScrollEnabled, isStreaming, scrollToBottom, hasAnyMessages])

	// Reset auto-scroll when streaming ends
	useEffect(() => {
		if (!isStreaming && userScrolledDuringStream.current) {
			// Reset for next message
			userScrolledDuringStream.current = false
			// Re-enable auto-scroll if user is at bottom
			if (containerRef.current && checkIfAtBottom(containerRef.current)) {
				setAutoScrollEnabled(true)
			}
		}
	}, [isStreaming, checkIfAtBottom])

	// Handle scroll to bottom button click
	const handleScrollToBottomClick = useCallback(() => {
		setAutoScrollEnabled(true)
		userScrolledDuringStream.current = false
		scrollToBottom("smooth")
	}, [scrollToBottom])

	// Initial scroll position check
	useEffect(() => {
		if (containerRef.current) {
			checkIfAtBottom(containerRef.current)
		}
	}, [checkIfAtBottom])

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current)
			}
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className={cn(
				"flex-1 min-h-0 max-h-full w-full overflow-x-hidden relative",
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

			{/* Scroll to bottom button */}
			{showScrollButton && (
				<button
					onClick={handleScrollToBottomClick}
					className="absolute bottom-6 right-6 bg-macaw hover:bg-macaw/90 text-white
					rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 z-10"
					aria-label="Scroll to bottom"
				>
					<ChevronDown className="w-5 h-5" />
				</button>
			)}
		</div>
	)
}

export default observer(ChatMessagesFramework)
