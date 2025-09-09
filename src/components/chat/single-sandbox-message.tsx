
"use client"

import Image from "next/image"
import { isEmpty } from "lodash-es"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { BotMessageSquare } from "lucide-react"
import { SandboxChatMessage } from "@bluedotrobots/common-ts/types/chat"
import { cn } from "../../lib/shadcn/utils"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"
import { CustomUserCircle } from "../icons/custom-user-circle"
import getPersonalInfoClass from "../../classes/personal-info-class"
import AssistantMessageMarkdown from "./assistant-message-markdown"

interface SingleSandboxMessageProps {
	message: SandboxChatMessage
	isStreaming?: boolean
}

// eslint-disable-next-line complexity
function SingleSandboxMessage({ message, isStreaming = false }: SingleSandboxMessageProps): React.ReactNode {
	const isUser = message.role === "user"
	const isStreamingWithNoContent = isStreaming && isEmpty(message.content.trim())
	// Don't render assistant messages that are streaming with no content yet
	if (!isUser && isStreamingWithNoContent) {
		return (
			<div className="flex gap-3 min-w-0 w-full justify-start">
				<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
					<AvatarFallback className="bg-macaw text-white">
						<BotMessageSquare className="w-4 h-4" />
					</AvatarFallback>
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

	const profilePictureUrl = getPersonalInfoClass().profilePictureUrl
	return (
		<div
			key={`${new Date(message.timestamp).getTime()}-${message.role}`}
			className={cn("flex gap-3 min-w-0 w-full", isUser ? "justify-end" : "justify-start")}
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
					isUser ? "bg-iMessageBlue text-white ml-auto" : "bg-polar text-gray-900 dark:text-white"
				)}
				style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
			>
				{isUser ? (
					// For user messages, check if it's a special request type
					<p
						className="text-sm whitespace-pre-wrap"
						style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
					>
						{message.content}
					</p>
				) : (
					<AssistantMessageMarkdown messageContent={message.content} />
				)}
			</div>

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

export default observer(SingleSandboxMessage)
