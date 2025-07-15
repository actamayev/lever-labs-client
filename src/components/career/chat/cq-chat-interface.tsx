"use client"

import { observer } from "mobx-react"
import { ChallengeData } from "@bluedotrobots/common-ts"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import ChatTextArea from "../../chat/chat-text-area"
import SingleMessage from "../../chat/single-message"
import careerQuestClass from "../../../classes/career-quest-class"
import DeleteChatHistoryHeader from "../../chat/delete-chat-history-header"
import ChatParentComponent from "../../chat/chat-parent-component"
import stopChatStream from "../../../utils/chat/stop-chat-stream"
import ChatMessagesFramework from "../../chat/chat-messages-framework"
import sendCareerQuestMessage from "../../../utils/chat/send-career-quest-message"
import deleteCareerQuestChat from "../../../utils/chat/delete-career-quest-chat"

interface ChatInterfaceProps {
	cppCode: string
	challengeData: ChallengeData
}

// eslint-disable-next-line max-lines-per-function
function CqChatInterface({ cppCode, challengeData }: ChatInterfaceProps) {
	const [inputValue, setInputValue] = useState("")
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// Get messages directly from career quest class
	const messages = careerQuestClass.getMessages(challengeData.id)
	const isStreaming = careerQuestClass.isStreaming(challengeData.id)
	const isRetrievingMessages = careerQuestClass.isRetrievingMessages(challengeData.id)

	useEffect(() => {
		if (messagesEndRef.current) {
			// Use scrollTop instead of scrollIntoView to only scroll the container
			const container = messagesEndRef.current.closest(".overflow-y-auto")
			if (container) {
				container.scrollTop = container.scrollHeight
			}
		}
	}, [messages])

	// Reset confirmation state when messages change (e.g., new message sent)
	useEffect(() => {
		setShowDeleteConfirmation(false)
	}, [messages.length])

	// Check if we're waiting for a response (streaming message with no content yet)
	const isWaitingForResponse = useMemo(() => {
		if (!isStreaming) return false
		const streamingMessage = messages.find(msg => msg.isStreaming)
		return streamingMessage ? streamingMessage.content.length === 0 : false
	}, [isStreaming, messages])

	// Check if there have been user messages
	const hasUserMessages = messages.some(message => message.role === "user")
	const hasAnyMessages = messages.length > 0

	const handleSendMessage = useCallback(async () => {
		if (!inputValue.trim() || isStreaming) return

		setInputValue("")

		// Add user message to career quest class
		careerQuestClass.addUserMessage(challengeData.id, inputValue)

		// Keep focus on input after sending
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)

		await sendCareerQuestMessage(challengeData.id, cppCode, inputValue)
	}, [challengeData, cppCode, inputValue, isStreaming])

	const chatReset = useCallback((): string | null => {
		// Reset streaming state immediately for UI responsiveness
		const streamId = careerQuestClass.getCurrentStreamId(challengeData.id)
		careerQuestClass.resetChatStreamingState(challengeData.id)

		// Get stream ID for this specific challenge and stop it
		return streamId
	}, [challengeData.id])

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
		await deleteCareerQuestChat(challengeData.id)
	}, [challengeData.id, hasAnyMessages, isStreaming])

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
		<ChatParentComponent>
			{/* Chat Header with Delete Button */}
			{hasAnyMessages && (
				<DeleteChatHistoryHeader
					showDeleteConfirmation={showDeleteConfirmation}
					handleDeleteClick={handleDeleteClick}
					handleConfirmDelete={handleConfirmDelete}
					handleCancelDelete={handleCancelDelete}
					isStreaming={isStreaming}
				/>
			)}

			<ChatMessagesFramework
				hasAnyMessages={hasAnyMessages}
				isWaitingForResponse={isWaitingForResponse}
				isStreaming={isStreaming}
				messagesEndRef={messagesEndRef}
			>
				{messages.map((message) => (
					<SingleMessage
						key={message.id}
						message={{
							messageId: message.id,
							...message
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

export default observer(CqChatInterface)
