"use client"

import { observer } from "mobx-react"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { Trash2, X } from "lucide-react"
import ChatTextArea from "../../chat/chat-text-area"
import SingleMessage from "../../chat/single-message"
import sandboxClass from "../../../classes/sandbox-class"
import stopChatStream from "../../../utils/chat/stop-chat-stream"
import ChatParentComponent from "../../chat/chat-parent-component"
import ChatMessagesFramework from "../../chat/chat-messages-framework"
import sendSandboxMessage from "../../../utils/chat/send-sandbox-message"
import deleteSandboxChat from "../../../utils/chat/delete-sandbox-chat"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { getDuolingoColors } from "../../../utils/duolingo-utils"
import { cn } from "../../../lib/shadcn/utils"

interface SandboxChatInterfaceProps {
	projectUUID: ProjectUUID
	cppCode: string
}

// eslint-disable-next-line max-lines-per-function
function SandboxChatInterface({ projectUUID, cppCode }: SandboxChatInterfaceProps) {
	const [inputValue, setInputValue] = useState("")
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// Get messages and streaming state from sandbox class
	const messages = sandboxClass.getChatMessages(projectUUID)
	const isStreaming = sandboxClass.isStreaming(projectUUID)

	// Check if we're waiting for a response (streaming message with no content yet)
	const isWaitingForResponse = useMemo(() => {
		if (!isStreaming) return false
		const lastMessage = messages[messages.length - 1]
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		return lastMessage && lastMessage.role === "assistant" && lastMessage.content.length === 0
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

	// Reset confirmation state when messages change (e.g., new message sent)
	useEffect(() => {
		setShowDeleteConfirmation(false)
	}, [messages.length])

	const handleSendMessage = useCallback(async () => {
		if (!inputValue.trim() || isStreaming) return

		setInputValue("")

		// Add user message to sandbox
		sandboxClass.addUserMessage(projectUUID, inputValue)

		// Keep focus on input after sending
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)

		// Send sandbox message
		await sendSandboxMessage(projectUUID, cppCode, inputValue)
	}, [projectUUID, cppCode, inputValue, isStreaming])

	const chatReset = useCallback((): string | null => {
		// Reset streaming state immediately for UI responsiveness
		const currentStreamId = sandboxClass.getCurrentStreamId(projectUUID)
		sandboxClass.resetChatStreamingState(projectUUID)

		// If you implement stream ID tracking in sandbox class, uncomment this:
		return currentStreamId
	}, [projectUUID])

	const onStopStreaming = useCallback(async () => {
		return await stopChatStream(chatReset)
	}, [chatReset])

	const handleDeleteClick = useCallback(() => {
		if (!hasAnyMessages || isStreaming) return
		setShowDeleteConfirmation(true)
	}, [hasAnyMessages, isStreaming])

	const handleCancelDelete = useCallback(() => {
		setShowDeleteConfirmation(false)
	}, [])

	const handleConfirmDelete = useCallback(async () => {
		if (!hasAnyMessages || isStreaming) return
		setShowDeleteConfirmation(false)
		await deleteSandboxChat(projectUUID)
	}, [projectUUID, hasAnyMessages, isStreaming])

	const redColors = getDuolingoColors("cardinal")
	const blueColors = getDuolingoColors("humpback")

	return (
		<ChatParentComponent>
			{/* Chat Header with Delete Button */}
			{hasAnyMessages && (
				<div className="flex justify-between items-center p-3 border-b-2 border-swan">
					<span className="text-sm font-medium text-eel">Chat History</span>

					{!showDeleteConfirmation ? (
						<TactileButton
							onClick={handleDeleteClick}
							disabled={isStreaming}
							className={cn("h-7 text-xs text-white", redColors.bg)}
							title="Delete chat history"
							shadowHeight={4}
							shadowClass={redColors.shadow}
						>
							<Trash2 className="h-4 w-4" />
							DELETE
						</TactileButton>
					) : (
						<div className="flex items-center gap-2">
							<TactileButton
								onClick={handleConfirmDelete}
								className={cn("h-7 px-2 text-xs", redColors.bg)}
								shadowHeight={4}
								shadowClass={redColors.shadow}
							>
								<Trash2 className="h-4 w-4" />
								DELETE
							</TactileButton>
							<TactileButton
								onClick={handleCancelDelete}
								className={cn("h-7 px-2 text-xs", blueColors.bg)}
								shadowHeight={4}
								shadowClass={blueColors.shadow}
							>
								<X className="h-4 w-4" />
								CANCEL
							</TactileButton>
						</div>
					)}
				</div>
			)}

			{/* Chat Messages - Scrollable with fixed height */}
			<ChatMessagesFramework
				hasAnyMessages={hasAnyMessages}
				isWaitingForResponse={isWaitingForResponse}
				messagesEndRef={messagesEndRef}
				isStreaming={isStreaming}
			>
				{messages.map((message, index) => (
					<SingleMessage
						key={`${projectUUID}-${index}`}
						message={{
							messageId: `${projectUUID}-${message.timestamp}`,
							role: message.role,
							content: message.content
						}}
					/>
				))}
			</ChatMessagesFramework>

			<ChatTextArea
				inputRef={inputRef}
				handleSendMessage={handleSendMessage}
				onStopStreaming={onStopStreaming}
				inputValue={inputValue}
				setInputValue={setInputValue}
				hasUserMessages={hasUserMessages}
				isStreaming={isStreaming}
			/>
		</ChatParentComponent>
	)
}

export default observer(SandboxChatInterface)
