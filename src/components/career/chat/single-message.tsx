/* eslint-disable max-len */
"use client"

import Image from "next/image"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { BotMessageSquare } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { Avatar, AvatarFallback } from "../../shadcn/ui/avatar"
import { CustomUserCircle } from "../../icons/custom-user-circle"
import personalInfoClass from "../../../classes/personal-info-class"

// eslint-disable-next-line max-lines-per-function, complexity
function SingleMessage({ message } : { message: ChatClassMessage}) {
	return (
		<div
			key={message.id}
			className={`flex gap-3 min-w-0 w-full ${message.role === "user" ? "justify-end" : "justify-start"}`}
		>
			{message.role === "assistant" && (
				<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
					<AvatarFallback className="bg-macaw text-white">
						<BotMessageSquare className="w-4 h-4" />
					</AvatarFallback>
				</Avatar>
			)}

			<div
				className={cn(
					"max-w-[80%] min-w-0 rounded-lg px-3 py-2",
					message.role === "user"
						? "bg-humpback text-white ml-auto"
						: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
				)}
				style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
			>
				<p
					className="text-sm whitespace-pre-wrap"
					style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
				>
					{message.content}
				</p>
			</div>

			{message.role === "user" && (
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

export default observer(SingleMessage)
