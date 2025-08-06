"use client"

import { observer } from "mobx-react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { CqChallengeData, CareerUUID } from "@bluedotrobots/common-ts"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { cn } from "../../../lib/shadcn/utils"
import ChatTextArea from "../../chat/chat-text-area"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import stopChatStream from "../../../utils/chat/stop-chat-stream"
import careerQuestClass from "../../../classes/career-quest-class"
import ChatParentComponent from "../../chat/chat-parent-component"
import ChatMessagesFramework from "../../chat/chat-messages-framework"
import requestCareerQuestHint from "../../../utils/chat/request-cq-hint"
import ClearChatHistoryHeader from "../../chat/clear-chat-history-header"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"
import SingleCareerQuestMessage from "../../chat/single-career-quest-message"
import deleteCareerQuestChat from "../../../utils/chat/delete-career-quest-chat"
import sendChallengeChatMessage from "../../../utils/chat/send-challenge-chat-message"

const NextSectionButton = observer(({ careerUUID }: { careerUUID: CareerUUID }) => {
	const onClick = () => {
		careerQuestClass.handleGoToNextMainSection(careerUUID)
	}

	return (
		<div className="h-[10%] flex items-center">
			<TactileButton
				onClick={onClick}
				className={cn(
					"w-full flex items-center justify-center gap-2 py-3 bg-green-500",
					"text-white font-medium rounded-2xl h-3/4 text-3xl"
				)}
				shadowColor="rgb(0, 140, 0)"
				shadowHeight={4}
			>
				<span>NEXT SECTION</span>
				<motion.div
					animate={{ y: [0, -2, 0] }}
					transition={{
						duration: 1,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				>
					<ArrowDown className="!size-6" strokeWidth={2.5} />
				</motion.div>
			</TactileButton>
		</div>
	)
})

// eslint-disable-next-line max-lines-per-function
function CqChatInterface({ challengeData }: { challengeData: CqChallengeData }) {
	const [inputValue, setInputValue] = useState("")
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// Get messages directly from career quest class
	const messages = careerQuestClass.getChallengeMessages(challengeData)
	const isStreaming = careerQuestClass.isChallengeStreaming(challengeData)
	const isRetrievingData = careerQuestClass.isRetrievingCareerData(challengeData.careerUUID)
	const isWaitingForResponse = careerQuestClass.isChallengeWaitingForResponse(challengeData)

	const cppCode = useMemo(() => {
		const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData) || challengeData.initialBlocklyJson
		return generateCppFromJson(currentBlocklyJson)
	}, [challengeData])

	const isCodeCorrect = careerQuestClass.isCodeCorrect(challengeData)

	// Reset confirmation state when messages change (e.g., new message sent)
	useEffect(() => {
		setShowDeleteConfirmation(false)
	}, [messages.length])

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

	const handleHintClick = useCallback(async () => {
		if (isStreaming) return
		await requestCareerQuestHint(challengeData, cppCode)
	}, [challengeData, cppCode, isStreaming])

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
		<>
			<div className="flex flex-col h-full cq-chat-interface" data-chat-component="true">
				<div className={isCodeCorrect ? "h-[90%]" : "h-full"}>
					<ChatParentComponent>
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
							isStreaming={isStreaming}
							handleHintClick={handleHintClick}
						/>
					</ChatParentComponent>
				</div>

				{isCodeCorrect && (
					<NextSectionButton careerUUID={challengeData.careerUUID} />
				)}
			</div>
		</>
	)
}

export default observer(CqChatInterface)
