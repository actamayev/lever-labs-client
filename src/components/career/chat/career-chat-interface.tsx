"use client"

import { observer } from "mobx-react"
import { useState, useRef, useEffect, useCallback } from "react"
import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import ChatTextArea from "../../chat/chat-text-area"
import stopChatStream from "../../../utils/chat/stop-chat-stream"
import getCareerQuestClass from "../../../classes/career-quest-class"
import ChatParentComponent from "../../chat/chat-parent-component"
import ChatMessagesFramework from "../../chat/chat-messages-framework"
import ClearChatHistoryHeader from "../../chat/clear-chat-history-header"
import deleteCareerChat from "../../../utils/chat/delete-career-chat"
import SingleSandboxMessage from "../../chat/single-sandbox-message"
import sendCareerMessage from "../../../utils/chat/send-career-message"
import { reactNodeToString } from "../../../utils/career-quest/react-node-to-string"
import getChatManagerClass from "../../../classes/chat-manager-class"

// eslint-disable-next-line max-lines-per-function
function CareerChatInterface({ careerUUID }: { careerUUID: CareerUUID }): React.ReactNode {
	const [inputValue, setInputValue] = useState("")
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// Get messages directly from career quest class
	const messages = getChatManagerClass().getCareerChatMessages(careerUUID)
	const isStreaming = getChatManagerClass().isCareerStreaming(careerUUID)
	const isRetrievingData = getCareerQuestClass().isRetrievingCareerData(careerUUID)
	const isWaitingForResponse = getChatManagerClass().isCareerWaitingForResponse(careerUUID)

	// Reset confirmation state when messages change (e.g., new message sent)
	useEffect((): void => {
		setShowDeleteConfirmation(false)
	}, [messages.length])

	const hasAnyMessages = messages.length > 0

	const handleSendMessage = useCallback(async (): Promise<void> => {
		if (!inputValue.trim() || isStreaming) return

		setInputValue("")

		// Add user message to career quest class
		getChatManagerClass().addCareerUserMessage(careerUUID, inputValue)

		// Keep focus on input after sending
		setTimeout((): void => {
			inputRef.current?.focus()
		}, 0)

		const careerDataForMessage = getCareerQuestClass().getCareerDataForMessage(careerUUID)
		if (!careerDataForMessage) return

		await sendCareerMessage(careerUUID, {
			message: inputValue,
			whatUserSees: reactNodeToString(careerDataForMessage.whatUserSees),
			careerName: careerDataForMessage.careerName,
			careerDescription: careerDataForMessage.careerDescription
		})
	}, [careerUUID, inputValue, isStreaming])

	const chatReset = useCallback((): string | null => {
		// Reset streaming state immediately for UI responsiveness
		const streamId = getChatManagerClass().getCareerStreamId(careerUUID)
		getChatManagerClass().resetCareerStreamingState(careerUUID)

		// Get stream ID for this specific challenge and stop it
		return streamId
	}, [careerUUID])

	const onStopStreaming = useCallback(async (): Promise<void> => {
		return await stopChatStream(chatReset)
	}, [chatReset])

	const handleDeleteClick = useCallback((): void => {
		if (!hasAnyMessages || isStreaming) return
		setShowDeleteConfirmation(true)
	}, [hasAnyMessages, isStreaming])

	const handleCancelDelete = useCallback((): void => {
		setShowDeleteConfirmation(false)
	}, [])

	const handleConfirmDelete = useCallback(async (): Promise<void> => {
		if (!hasAnyMessages || isStreaming) return
		setShowDeleteConfirmation(false)
		await deleteCareerChat(careerUUID)
	}, [careerUUID, hasAnyMessages, isStreaming])

	// Show loading state while retrieving messages
	if (isRetrievingData) {
		return (
			<div className="flex flex-col h-full max-h-full bg-standardBackground rounded-lg overflow-hidden">
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
		<div className="flex flex-col h-full career-chat-interface" data-chat-component="true">
			<div className="h-full">
				<ChatParentComponent extraClasses="border-0">
					{/* existing content - no changes needed */}
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
						{messages.map((message): React.ReactNode => (
							<SingleSandboxMessage
								key={message.id}
								message={message}
							/>
						))}
					</ChatMessagesFramework>

					<ChatTextArea
						inputRef={inputRef}
						handleSendMessage={handleSendMessage}
						onStopStreaming={onStopStreaming}
						inputValue={inputValue}
						setInputValue={setInputValue}
						isStreaming={isStreaming}
					/>
				</ChatParentComponent>
			</div>
		</div>
	)
}

export default observer(CareerChatInterface)
