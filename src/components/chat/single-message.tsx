/* eslint-disable max-len */
"use client"

import Image from "next/image"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { BotMessageSquare } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { ChatMessageRole } from "@bluedotrobots/common-ts"
import { cn } from "../../lib/shadcn/utils"
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar"
import { CustomUserCircle } from "../icons/custom-user-circle"
import personalInfoClass from "../../classes/personal-info-class"

interface SingleMessageData {
	messageId: string
	role: ChatMessageRole
	content: string
}

// eslint-disable-next-line max-lines-per-function
function SingleMessage({ message } : { message: SingleMessageData }) {
	const isUser = message.role === "user"

	return (
		<div
			key={message.messageId}
			className={`flex gap-3 min-w-0 w-full ${isUser ? "justify-end" : "justify-start"}`}
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
					isUser
						? "bg-humpback text-white ml-auto"
						: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
				)}
				style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
			>
				{isUser ? (
					// For user messages, keep simple text display
					<p
						className="text-sm whitespace-pre-wrap"
						style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
					>
						{message.content}
					</p>
				) : (
					// For assistant messages, use markdown
					<div className="text-sm prose prose-sm max-w-none dark:prose-invert">
						<ReactMarkdown
							components={{
								// Code blocks with syntax highlighting
								code({ node: _node, className, children, ...props }) {
									const match = /language-(\w+)/.exec(className || "")
									const isInline = !match
									const syntaxTheme = personalInfoClass.defaultSiteTheme === "dark" ? oneDark : oneLight

									return !isInline ? (
										<SyntaxHighlighter
											style={syntaxTheme}
											language={match[1]}
											PreTag="div"
											className="rounded-md !mt-2 !mb-2"
										>
											{String(children).replace(/\n$/, "")}
										</SyntaxHighlighter>
									) : (
										<code
											className={cn(
												"bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-xs font-mono",
												className
											)}
											{...props}
										>
											{children}
										</code>
									)
								},
								// Style other elements
								p: ({ children }) => (
									<p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
								),
								strong: ({ children }) => (
									<strong className="font-semibold">{children}</strong>
								),
								em: ({ children }) => (
									<em className="italic">{children}</em>
								),
								ul: ({ children }) => (
									<ul className="list-disc list-inside mb-2 space-y-1 pl-2">{children}</ul>
								),
								ol: ({ children }) => (
									<ol className="list-decimal list-inside mb-2 space-y-1 pl-2">{children}</ol>
								),
								li: ({ children }) => (
									<li className="leading-relaxed">{children}</li>
								),
								h1: ({ children }) => (
									<h1 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h1>
								),
								h2: ({ children }) => (
									<h2 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h2>
								),
								h3: ({ children }) => (
									<h3 className="text-sm font-bold mb-2 mt-2 first:mt-0">{children}</h3>
								),
								blockquote: ({ children }) => (
									<blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 italic mb-2">
										{children}
									</blockquote>
								),
								a: ({ children, href }) => (
									<a
										href={href}
										className="text-blue-600 dark:text-blue-400 underline hover:no-underline"
										target="_blank"
										rel="noopener noreferrer"
									>
										{children}
									</a>
								),
								hr: () => (
									<hr className="border-gray-300 dark:border-gray-600 my-3" />
								)
							}}
						>
							{message.content}
						</ReactMarkdown>
					</div>
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

export default observer(SingleMessage)
