import { RefObject } from "react"
import { observer } from "mobx-react"
import { BotMessageSquare } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { Avatar, AvatarFallback } from "../../shadcn/ui/avatar"

interface Props {
	hasAnyMessages: boolean
	children: React.ReactNode
	isWaitingForResponse: boolean
	messagesEndRef: RefObject<HTMLDivElement>
}

function ChatMessagesFramework(props: Props) {
	const { hasAnyMessages, children, isWaitingForResponse, messagesEndRef } = props

	return (
		<div
			className={cn(
				"flex-1 min-h-0 max-h-full w-full overflow-x-hidden",
				hasAnyMessages ? "overflow-y-auto p-4 space-y-4" : "overflow-hidden flex items-center justify-center"
			)}
		>
			{/* Empty state when no messages */}
			{!hasAnyMessages && (
				<div className="text-center">
					<BotMessageSquare className="w-12 h-12 mx-auto mb-4 text-macaw" />
					<h3 className="text-lg font-semibold text-questionText mb-2">What can I help with?</h3>
					<p className="text-sm text-gray-500 dark:text-gray-400">Ask questions about your code or robotics concepts</p>
				</div>
			)}

			{/* Messages when they exist */}
			{hasAnyMessages && (
				<>
					{children}

					{/* Loading indicator when waiting for response to start */}
					{isWaitingForResponse && (
						<div className="flex gap-3 justify-start">
							<Avatar className="w-8 h-8 mt-1 flex-shrink-0">
								<AvatarFallback className="bg-macaw text-white">
									<BotMessageSquare className="w-4 h-4" />
								</AvatarFallback>
							</Avatar>
							<div className="bg-wan rounded-lg px-3 py-2">
								<div className="flex space-x-1">
									<div className="w-2 h-2 bg-swan rounded-full animate-bounce"></div>
									<div className="w-2 h-2 bg-swan rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}/>
									<div className="w-2 h-2 bg-swan rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}/>
								</div>
							</div>
						</div>
					)}

					{/* Invisible div to scroll to */}
					<div ref={messagesEndRef} />
				</>
			)}
		</div>
	)
}

export default observer(ChatMessagesFramework)
