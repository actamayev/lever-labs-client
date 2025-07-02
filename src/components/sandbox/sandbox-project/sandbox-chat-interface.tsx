"use client"

import { observer } from "mobx-react"
import { ProjectUUID } from "@bluedotrobots/common-ts"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import SingleMessage from "../../chat/single-message"
import sandboxClass from "../../../classes/sandbox-class"
import ChatTextArea from "../../career/chat/chat-text-area"
import sendSandboxMessage from "../../../utils/chat/send-sandbox-message"
import ChatParentComponent from "../../career/chat/chat-parent-component"
import ChatMessagesFramework from "../../career/chat/chat-messages-framework"
import stopSandboxChatStream from "../../../utils/chat/stop-sandbox-chat-stream"

interface SandboxChatInterfaceProps {
	projectUUID: ProjectUUID
	cppCode: string
}

// eslint-disable-next-line max-lines-per-function, complexity
function SandboxChatInterface({ projectUUID, cppCode }: SandboxChatInterfaceProps) {
	const [inputValue, setInputValue] = useState("")
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// Get messages and streaming state from sandbox class
	const messages = sandboxClass.getChatMessages(projectUUID)
	const isStreaming = sandboxClass.isStreaming(projectUUID)

	// Check if we're waiting for a response (streaming message with no content yet)
	const isWaitingForResponse = useMemo(() => {
		if (!isStreaming) return false
		const lastMessage = messages[messages.length - 1]
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

	const onClickAction = useCallback(async () => {
		if (isStreaming) {
			return await stopSandboxChatStream(projectUUID)
		}
		await handleSendMessage()
	}, [projectUUID, handleSendMessage, isStreaming])

	return (
		<ChatParentComponent>
			{/* Chat Messages - Scrollable with fixed height */}
			<ChatMessagesFramework
				hasAnyMessages={hasAnyMessages}
				isWaitingForResponse={isWaitingForResponse}
				messagesEndRef={messagesEndRef}
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
				onClickAction={onClickAction}
				inputValue={inputValue}
				setInputValue={setInputValue}
				hasUserMessages={hasUserMessages}
				isStreaming={isStreaming}
			/>
		</ChatParentComponent>
	)
}

export default observer(SandboxChatInterface)
