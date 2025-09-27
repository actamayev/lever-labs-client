
"use client"

import Image from "next/image"
import { useMemo } from "react"
import { isEmpty } from "lodash-es"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import isUndefined from "lodash-es/isUndefined"
import { CqChallengeData } from "@lever-labs/common-ts/types/career-quest"
import { BotMessageSquare, PartyPopper, X } from "lucide-react"
import HintButton from "./hint-button"
import { cn } from "../../lib/shadcn/utils"
import { CustomLightbulb } from "../../icons/custom-lightbulb"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"
import { CustomUserCircle } from "../../icons/custom-user-circle"
import personalInfoClass from "../../classes/personal-info-class"
import AssistantMessageMarkdown from "./assistant-message-markdown"
import chatManagerClass from "../../classes/chat-manager-class"

interface SingleCareerQuestMessageProps {
	message: ChallengeChatMessage
	cqChallengeData: CqChallengeData
}

interface MessageBubbleProps {
	message: ChallengeChatMessage
	isUser: boolean
	getMessageText: () => string
	getMessageBubbleStyles: string
	isHintResponse: boolean
}

function MessageBubble(props: MessageBubbleProps): React.ReactNode {
	const { message, isUser, getMessageText, getMessageBubbleStyles, isHintResponse } = props
	return (
		<div
			className={cn("max-w-[80%] min-w-0 rounded-lg px-3 py-2", getMessageBubbleStyles)}
			style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
		>
			{isUser ? (
				<p
					className="text-sm whitespace-pre-wrap font-medium"
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
	)
}

// eslint-disable-next-line max-lines-per-function, complexity
function SingleCareerQuestMessage({ message, cqChallengeData }: SingleCareerQuestMessageProps): React.ReactNode {
	const isUser = message.role === "user"
	const isCheckCodeRequest = message.isCheckCodeRequest
	const isHintRequest = message.isHintRequest
	const isHintResponse = message.isHintResponse
	const isEvaluationResult = !isUndefined(message.evaluationResult)
	const cppCode = chatManagerClass.getCppCode(cqChallengeData)
	const shouldShowHintButton = message.shouldShowHintButton && cqChallengeData.challengeUUID && cppCode
	const isStreamingWithNoContent = message.isStreaming && isEmpty(message.content.trim())

	const getMessageBubbleStyles = useMemo((): string => {
		if (isCheckCodeRequest) return "bg-fox text-white"
		if (isHintRequest) return "bg-beetle-2 text-white"
		if (isHintResponse) return "bg-beetle-2 text-white"
		if (isUser) return "bg-iMessageBlue text-white ml-auto"
		if (isEvaluationResult) {
			if (message.evaluationResult?.isCorrect) return "bg-chargingGreen text-white"
			return "bg-cardinal text-white"
		}
		return "bg-polar text-questionText"
	}, [isCheckCodeRequest, isHintRequest, isHintResponse, isUser, isEvaluationResult, message.evaluationResult?.isCorrect])

	// Don't render assistant messages that are streaming with no content yet
	if (!isUser && isStreamingWithNoContent) {
		return (
			<div className="flex gap-3 min-w-0 w-full justify-start">
				<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
					<AssistantAvatar />
				</Avatar>
				<div className="flex items-center gap-1 py-2">
					<div className="flex space-x-1">
						<div className="w-1.5 h-1.5 bg-hare rounded-full animate-bounce"></div>
						<div className="w-1.5 h-1.5 bg-hare rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
						<div className="w-1.5 h-1.5 bg-hare rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
					</div>
				</div>
			</div>
		)
	}

	// Determine message text for special user requests
	const getMessageText = (): string => {
		if (isCheckCodeRequest) return "Is my code correct?"
		if (isHintRequest) return "Can you please give me a hint?"
		return message.content
	}

	function AssistantAvatar(): React.ReactNode {
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

	const profilePictureUrl = personalInfoClass.profilePictureUrl

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

			{shouldShowHintButton ? (
				<div className="flex flex-col flex-1">
					<MessageBubble
						message={message}
						isUser={isUser}
						getMessageText={getMessageText}
						getMessageBubbleStyles={getMessageBubbleStyles}
						isHintResponse={isHintResponse || false}
					/>
					<HintButton cqChallengeData={cqChallengeData} />
				</div>
			) : (
				<MessageBubble
					message={message}
					isUser={isUser}
					getMessageText={getMessageText}
					getMessageBubbleStyles={getMessageBubbleStyles}
					isHintResponse={isHintResponse || false}
				/>
			)}

			{isUser && (
				<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
					{!isNull(profilePictureUrl) ? (
						<Image
							src={profilePictureUrl}
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
