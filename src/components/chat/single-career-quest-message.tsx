/* eslint-disable max-len */
"use client"

import Image from "next/image"
import isNull from "lodash-es/isNull"
import isUndefined from "lodash-es/isUndefined"
import { observer } from "mobx-react"
import { BotMessageSquare, PartyPopper, X } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"
import { CustomUserCircle } from "../icons/custom-user-circle"
import personalInfoClass from "../../classes/personal-info-class"
import AssistantMessageMarkdown from "./assistant-message-markdown"
import { CustomLightbulb } from "../icons/custom-lightbulb"
import HintButton from "./hint-button"
import requestCareerQuestHint from "../../utils/chat/request-cq-hint"

interface SingleCareerQuestMessageProps {
	message: CareerQuestChatMessage
	challengeId?: string
	cppCode?: string
}

// eslint-disable-next-line max-lines-per-function
function SingleCareerQuestMessage({ message, challengeId, cppCode }: SingleCareerQuestMessageProps) {
	const isUser = message.role === "user"
	const isCheckCodeRequest = message.isCheckCodeRequest
	const isHintRequest = message.isHintRequest
	const isHintResponse = message.isHintResponse
	const isEvaluationResult = !isUndefined(message.evaluationResult)
	const shouldShowHintButton = message.shouldShowHintButton && challengeId && cppCode

	// Determine message bubble styles
	const getMessageBubbleStyles = () => {
		if (isCheckCodeRequest) return "bg-fox text-white"
		if (isHintRequest) return "bg-beetle-2 text-white"
		if (isHintResponse) return "bg-beetle-2 text-white"
		if (isUser) return "bg-iMessageBlue text-white ml-auto"
		if (isEvaluationResult) {
			if (message.evaluationResult?.isCorrect) return "bg-chargingGreen text-white"
			return "bg-cardinal text-white"
		}
		return "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
	}

	// Determine message text for special user requests
	const getMessageText = () => {
		if (isCheckCodeRequest) return "Is my code correct?"
		if (isHintRequest) return "Can you please give me a hint?"
		return message.content
	}

	function AssistantAvatar() {
		if (isHintResponse) {
			return (
				<AvatarFallback className="bg-beetle-2 text-white">
					<CustomLightbulb className="w-4 h-4" />
				</AvatarFallback>
			)
		}
		else if (isEvaluationResult) {
			if (message.evaluationResult?.isCorrect) {
				return (
					<AvatarFallback className="bg-chargingGreen text-white">
						<PartyPopper className="w-4 h-4" />
					</AvatarFallback>
				)
			}
			return (
				<AvatarFallback className="bg-cardinal text-white">
					<X className="w-4 h-4" />
				</AvatarFallback>
			)
		}
		return (
			<AvatarFallback className="bg-macaw text-white">
				<BotMessageSquare className="w-4 h-4" />
			</AvatarFallback>
		)
	}

	return (
		<div
			key={message.id}
			className={cn(
				"flex gap-3 min-w-0 w-full",
				isUser ? "justify-end" : "justify-start"
			)}
		>
			{!isUser && (
				<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
					<AssistantAvatar />
				</Avatar>
			)}

			<div className="flex flex-col flex-1">
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
						<AssistantMessageMarkdown
							messageContent={message.content}
							forceDarkMode={isHintResponse}
						/>
					)}
				</div>

				{shouldShowHintButton && (
					<HintButton
						challengeId={challengeId}
						cppCode={cppCode}
						onHintRequest={requestCareerQuestHint}
					/>
				)}
			</div>

			{isUser && (
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
