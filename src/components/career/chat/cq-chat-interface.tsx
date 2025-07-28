"use client"

import { observer } from "mobx-react"
import { CqChallengeData } from "@bluedotrobots/common-ts"
import { useState, useRef, useEffect, useCallback } from "react"
import ChatTextArea from "../../chat/chat-text-area"
import SingleCareerQuestMessage from "../../chat/single-career-quest-message"
import careerQuestClass from "../../../classes/career-quest-class"
import ClearChatHistoryHeader from "../../chat/clear-chat-history-header"
import ChatParentComponent from "../../chat/chat-parent-component"
import stopChatStream from "../../../utils/chat/stop-chat-stream"
import ChatMessagesFramework from "../../chat/chat-messages-framework"
import sendChallengeChatMessage from "../../../utils/chat/send-challenge-chat-message"
import deleteCareerQuestChat from "../../../utils/chat/delete-career-quest-chat"

interface ChatInterfaceProps {
	cppCode: string
	challengeData: CqChallengeData
}

// eslint-disable-next-line max-lines-per-function
function CqChatInterface({ cppCode, challengeData }: ChatInterfaceProps) {
	const [inputValue, setInputValue] = useState("")
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// Get messages directly from career quest class
	const messages = careerQuestClass.getChallengeMessages(challengeData)
	const isStreaming = careerQuestClass.isChallengeStreaming(challengeData)
	const isRetrievingData = careerQuestClass.isRetrievingChallengeData(challengeData)
	const isWaitingForResponse = careerQuestClass.isChallengeWaitingForResponse(challengeData)

	// Reset confirmation state when messages change (e.g., new message sent)
	useEffect(() => {
		setShowDeleteConfirmation(false)
	}, [messages.length])

	// Check if there have been user messages
	const hasUserMessages = messages.some(message => message.role === "user")
	const hasAnyMessages = messages.length > 0

	const handleSendMessage = useCallback(async () => {
		if (!inputValue.trim() || isStreaming) return

		setInputValue("")

		// Add user message to career quest class
		careerQuestClass.addChallengeUserMessage(challengeData, inputValue)

		// Keep focus on input after sending
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)

		await sendChallengeChatMessage(challengeData, cppCode, inputValue)
	}, [challengeData, cppCode, inputValue, isStreaming])

	const chatReset = useCallback((): string | null => {
		// Reset streaming state immediately for UI responsiveness
		const streamId = careerQuestClass.getChallengeStreamId(challengeData)
		careerQuestClass.resetChallengeStreamingState(challengeData)

		// Get stream ID for this specific challenge and stop it
		return streamId
	}, [challengeData])

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
		await deleteCareerQuestChat(challengeData)
	}, [challengeData, hasAnyMessages, isStreaming])

	// Show loading state while retrieving messages
	if (isRetrievingData) {
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
				<ClearChatHistoryHeader
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
				messageLength={messages.length}
			>
				{messages.map((message) => (
					<SingleCareerQuestMessage
						key={message.id}
						message={message}
						cqChallengeData={challengeData}
						cppCode={cppCode}
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
