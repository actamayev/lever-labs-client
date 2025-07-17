/* eslint-disable max-len */
"use client"

import Image from "next/image"
import isNull from "lodash-es/isNull"
import isUndefined from "lodash-es/isUndefined"
import { observer } from "mobx-react"
import { BotMessageSquare } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"
import { CustomUserCircle } from "../icons/custom-user-circle"
import personalInfoClass from "../../classes/personal-info-class"
import AssistantMessageMarkdown from "./assistant-message-markdown"

function SingleCareerQuestMessage({ message } : { message: CareerQuestChatMessage }) {
	const isUser = message.role === "user"
	const isCheckCodeRequest = message.isCheckCodeRequest
	const isHintRequest = message.isHintRequest
	const isEvaluationResult = !isUndefined(message.evaluationResult)

	// Determine alignment based on message type
	const getAlignment = () => {
		if (isCheckCodeRequest || isHintRequest) return "justify-center"
		return isUser ? "justify-end" : "justify-start"
	}

	// Determine message bubble styles
	const getMessageBubbleStyles = () => {
		if (isCheckCodeRequest) return "bg-fox text-white"
		if (isHintRequest) return "bg-beetle text-white"
		if (isUser) return "bg-humpback text-white ml-auto"
		if (isEvaluationResult) {
			if (message.evaluationResult?.isCorrect) return "bg-chargingGreen text-white"
			return "bg-red-200 text-black"
		}
		return "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
	}

	// Determine message text for special user requests
	const getMessageText = () => {
		if (isCheckCodeRequest) return "Is my code correct?"
		if (isHintRequest) return "Can you please give me a hint for this challenge"
		return message.content
	}

	return (
		<div
			key={message.id}
			className={`flex gap-3 min-w-0 w-full ${getAlignment()}`}
		>
			{!isUser && (
				<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
					<AvatarFallback className="bg-macaw text-white">
						<BotMessageSquare className="w-4 h-4" />
					</AvatarFallback>
				</Avatar>
			)}

			<div
				className={cn(
					"max-w-[80%] min-w-0 rounded-lg px-3 py-2",
					getMessageBubbleStyles()
				)}
				style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
			>
				{isUser ? (
					// For user messages, check if it's a special request type
					<p
						className="text-sm whitespace-pre-wrap"
						style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
					>
						{getMessageText()}
					</p>
				) : (
					<AssistantMessageMarkdown messageContent={message.content} />
				)}
			</div>

			{isUser && !isCheckCodeRequest && !isHintRequest && (
				<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
					{!isNull(personalInfoClass.profilePictureUrl) ? (
						<Image
							src={personalInfoClass.profilePictureUrl}
							alt="Your profile"
							width={32}
							height={32}
							className="rounded-full object-cover w-full h-full"
						/>
					) : (
						<AvatarFallback className="bg-standardBackground text-questionText">
							<CustomUserCircle className="w-full h-full" />
						</AvatarFallback>
					)}
				</Avatar>
			)}
		</div>
	)
}

export default observer(SingleCareerQuestMessage)
