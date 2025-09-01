
"use client"

import { observer } from "mobx-react"
import ReactMarkdown from "react-markdown"
import { Highlight, themes } from "prism-react-renderer"
import { cn } from "../../lib/shadcn/utils"
import personalInfoClass from "../../classes/personal-info-class"

interface AssistantMessageMarkdownProps {
	messageContent: string
	forceDarkMode?: boolean
}

// eslint-disable-next-line max-lines-per-function
function AssistantMessageMarkdown({ messageContent, forceDarkMode = false }: AssistantMessageMarkdownProps) {
	return (
		<div className="text-sm prose prose-sm max-w-none dark:prose-invert font-medium">
			<ReactMarkdown
				components={{
					// Code blocks with syntax highlighting
					code({ node: _node, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "")
						const isInline = !match
						const shouldUseDarkTheme = forceDarkMode || personalInfoClass.defaultSiteTheme === "dark"

						// Map language names for compatibility
						let language = match?.[1] || "text"
						if (language === "c++") {
							language = "cpp"
						}

						return !isInline ? (
							<Highlight
								theme={shouldUseDarkTheme ? themes.oneDark : themes.oneLight}
								code={String(children).replace(/\n$/, "")}
								language={language}
							>
								{({ className: _className, style, tokens, getLineProps, getTokenProps }) => (
									<pre
										className={cn(className, "rounded-md !mt-2 !mb-2 p-4 overflow-x-auto")}
										style={style}
									>
										{tokens.map((line, i) => (
											<div key={i} {...getLineProps({ line })}>
												{line.map((token, key) => (
													<span key={key} {...getTokenProps({ token })} />
												))}
											</div>
										))}
									</pre>
								)}
							</Highlight>
						) : (
							<code
								className={cn(
									forceDarkMode
										? "bg-gray-600 text-polar px-1 py-0.5 rounded text-xs font-mono"
										: "bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-xs font-mono",
									className
								)}
								{...props}
							>
								{children}
							</code>
						)
					},
					// ... rest of your components (same as before)
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
				{messageContent}
			</ReactMarkdown>
		</div>
	)
}

export default observer(AssistantMessageMarkdown)
