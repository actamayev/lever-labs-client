"use client"

import { observer } from "mobx-react"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import { useState, useRef, useEffect, useCallback } from "react"
import ChatTextArea from "../../chat/chat-text-area"
import sandboxClass from "../../../classes/sandbox-class"
import stopChatStream from "../../../utils/chat/stop-chat-stream"
import ChatParentComponent from "../../chat/chat-parent-component"
import SingleSandboxMessage from "../../chat/single-sandbox-message"
import ChatMessagesFramework from "../../chat/chat-messages-framework"
import sendSandboxMessage from "../../../utils/chat/send-sandbox-message"
import deleteSandboxChat from "../../../utils/chat/delete-sandbox-chat"
import ClearChatHistoryHeader from "../../chat/clear-chat-history-header"

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
	const isWaitingForResponse = sandboxClass.isWaitingForResponse(projectUUID)

	// Check if there have been user messages
	const hasUserMessages = messages.some(message => message.role === "user")
	const hasAnyMessages = messages.length > 0

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

	return (
		<ChatParentComponent>
			{/* Chat Header with Delete Button */}
			{hasAnyMessages && (
				<ClearChatHistoryHeader
					showDeleteConfirmation={showDeleteConfirmation}
					handleDeleteClick={handleDeleteClick}
					handleConfirmDelete={handleConfirmDelete}
					handleCancelDelete={handleCancelDelete}
					isStreaming={isStreaming}
				/>
			)}

			{/* Chat Messages - Scrollable with fixed height */}
			<ChatMessagesFramework
				hasAnyMessages={hasAnyMessages}
				isWaitingForResponse={isWaitingForResponse}
				messagesEndRef={messagesEndRef}
				isStreaming={isStreaming}
				messageLength={messages.length}
			>
				{messages.map((message, index) => (
					<SingleSandboxMessage
						key={`${projectUUID}-${index}`}
						message={message}
						isStreaming={isStreaming && index === messages.length - 1}
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
