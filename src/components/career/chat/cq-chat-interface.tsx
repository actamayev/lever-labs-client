"use client"

import { observer } from "mobx-react"
import { BlocklyJson, ChallengeData } from "@bluedotrobots/common-ts"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import ChatTextArea from "../../chat/chat-text-area"
import chatsClass from "../../../classes/chat-class"
import SingleMessage from "../../chat/single-message"
import ChatParentComponent from "../../chat/chat-parent-component"
import ChatMessagesFramework from "../../chat/chat-messages-framework"
import stopCqChatStream from "../../../utils/chat/stop-cq-chat-stream"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"
import sendCareerQuestMessage from "../../../utils/chat/send-career-quest-message"
import retrieveCareerQuestChat from "../../../utils/chat/retrieve-career-quest-chat"

interface ChatInterfaceProps {
	blocklyJson: BlocklyJson
	challengeData: ChallengeData
}

// eslint-disable-next-line max-lines-per-function, complexity
function CqChatInterface({ blocklyJson, challengeData }: ChatInterfaceProps) {
	const [inputValue, setInputValue] = useState("")
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// Generate current C++ code from Blockly
	const cppCode = useMemo(() => generateCppFromJson(blocklyJson), [blocklyJson])

	// Get messages directly from chats class
	const messages = chatsClass.getMessages(challengeData.id)
	const isStreaming = chatsClass.isStreaming(challengeData.id)
	const isRetrievingMessages = chatsClass.isRetrievingMessages(challengeData.id)
	const hasRetrievedMessages = chatsClass.hasRetrievedMessages(challengeData.id)

	// Retrieve chat messages when component mounts
	useEffect(() => {
		if (!hasRetrievedMessages && !isRetrievingMessages) {
			retrieveCareerQuestChat(challengeData.id)
		}
	}, [challengeData.id, hasRetrievedMessages, isRetrievingMessages])

	// Check if we're waiting for a response (streaming message with no content yet)
	const isWaitingForResponse = useMemo(() => {
		if (!isStreaming) return false
		const streamingMessage = messages.find(msg => msg.isStreaming)
		return streamingMessage ? streamingMessage.content.length === 0 : false
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

	const handleSendMessage = useCallback(async () => {
		if (!inputValue.trim() || isStreaming) return

		setInputValue("")

		// Add user message to chats
		chatsClass.addUserMessage(challengeData.id, inputValue)

		// Keep focus on input after sending
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)

		await sendCareerQuestMessage(challengeData.id, cppCode, inputValue)
	}, [challengeData, cppCode, inputValue, isStreaming])

	const onClickAction = useCallback(async () => {
		if (isStreaming) {
			return await stopCqChatStream(challengeData.id)
		}
		await handleSendMessage()
	}, [challengeData.id, handleSendMessage, isStreaming])

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
			<ChatMessagesFramework
				hasAnyMessages={hasAnyMessages}
				isWaitingForResponse={isWaitingForResponse}
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
				onClickAction={onClickAction}
				inputValue={inputValue}
				setInputValue={setInputValue}
				hasUserMessages={hasUserMessages}
				isStreaming={isStreaming}
			/>
		</ChatParentComponent>
	)
}

export default observer(CqChatInterface)
