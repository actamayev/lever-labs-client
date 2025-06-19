/* eslint-disable max-len */
"use client"

import Image from "next/image"
import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import { Send, Bot, Square } from "lucide-react"
import { Avatar, AvatarFallback } from "../../shadcn/ui/avatar"
import { CustomUserCircle } from "../../icons/custom-user-circle"
import personalInfoClass from "../../../classes/personal-info-class"

interface Message {
	id: string
	content: string
	sender: "user" | "ai"
}

// eslint-disable-next-line max-lines-per-function, complexity
function ChatInterface({ message } : { message: Message}) {
	return (
		<div
			key={message.id}
			className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
		>
			{message.sender === "ai" && (
				<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
					<AvatarFallback className="bg-macaw text-white">
						<Bot className="w-4 h-4" />
					</AvatarFallback>
				</Avatar>
			)}

			<div
				className={`max-w-[80%] rounded-lg px-3 py-2 ${
					message.sender === "user"
						? "bg-macaw text-white ml-auto"
						: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
				}`}
			>
				<p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
			</div>

			{message.sender === "user" && (
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
						<AvatarFallback className="bg-questionText text-white">
							<CustomUserCircle className="w-4 h-4" />
						</AvatarFallback>
					)}
				</Avatar>
			)}
		</div>
	)
}

export default observer(ChatInterface)
