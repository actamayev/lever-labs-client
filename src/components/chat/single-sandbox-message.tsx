/* eslint-disable max-len */
"use client"

import Image from "next/image"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { BotMessageSquare } from "lucide-react"
import { SandboxChatMessage } from "@bluedotrobots/common-ts"
import { cn } from "../../lib/shadcn/utils"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"
import { CustomUserCircle } from "../icons/custom-user-circle"
import personalInfoClass from "../../classes/personal-info-class"
import AssistantMessageMarkdown from "./assistant-message-markdown"

function SingleCareerQuestMessage({ message } : { message: SandboxChatMessage }) {
	const isUser = message.role === "user"

	// Determine alignment based on message type
	const getAlignment = () => {
		return isUser ? "justify-end" : "justify-start"
	}

	// Determine message bubble styles
	const getMessageBubbleStyles = () => {
		if (isUser) return "bg-humpback text-white ml-auto"
		return "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
	}

	return (
		<div
			key={`${new Date(message.timestamp).getTime()}-${message.role}`}
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
						{message.content}
					</p>
				) : (
					<AssistantMessageMarkdown messageContent={message.content} />
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
