/* eslint-disable max-len */
"use client"

import { observer } from "mobx-react"
import ReactMarkdown from "react-markdown"
import { useState, useEffect } from "react"
import { cn } from "../../lib/shadcn/utils"
import personalInfoClass from "../../classes/personal-info-class"

interface AssistantMessageMarkdownProps {
	messageContent: string
	forceDarkMode?: boolean
}

// Minimal Shiki implementation with only C++ language
function ShikiCodeBlock({
	code,
	language,
	isDark
}: {
	code: string
	language: string
	isDark: boolean
}) {
	const [html, setHtml] = useState<string>("")
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const highlightCode = async () => {
			try {
				setIsLoading(true)

				// Import only what we need - this creates a MUCH smaller bundle
				const { createHighlighterCore } = await import("shiki/core")
				const { createJavaScriptRegexEngine } = await import("shiki/engine/javascript")

				// Only import C++ language and minimal themes
				const [cppLang, darkTheme, lightTheme] = await Promise.all([
					import("@shikijs/langs/cpp"),
					import("@shikijs/themes/one-dark-pro"),
					import("@shikijs/themes/one-light")
				])

				const highlighter = await createHighlighterCore({
					themes: [darkTheme.default, lightTheme.default],
					langs: [cppLang.default],
					// Use JavaScript engine instead of WASM for smaller bundle
					engine: createJavaScriptRegexEngine()
				})

				const highlighted = highlighter.codeToHtml(code, {
					lang: "cpp",
					theme: isDark ? "one-dark-pro" : "one-light",
				})

				setHtml(highlighted)
			} catch (error) {
				console.error("Shiki highlighting failed:", error)
				// Fallback to plain code
				setHtml(`<pre><code>${code}</code></pre>`)
			} finally {
				setIsLoading(false)
			}
		}

		if (language === "cpp" || language === "c++") {
			highlightCode()
		} else {
			// For non-C++ languages, just show plain text
			setHtml(`<pre><code>${code}</code></pre>`)
			setIsLoading(false)
		}
	}, [code, language, isDark])

	if (isLoading) {
		return (
			<div className="rounded-md !mt-2 !mb-2 p-4 bg-gray-100 dark:bg-gray-800 animate-pulse">
				<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
				<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
			</div>
		)
	}

	return (
		<div
			className="rounded-md !mt-2 !mb-2 overflow-x-auto"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}

function AssistantMessageMarkdown({ messageContent, forceDarkMode = false }: AssistantMessageMarkdownProps) {
	return (
		<div className="text-sm prose prose-sm max-w-none dark:prose-invert">
			<ReactMarkdown
				components={{
					// Code blocks with syntax highlighting
					code({ node: _node, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "")
						const isInline = !match
						const shouldUseDarkTheme = forceDarkMode || personalInfoClass.defaultSiteTheme === "dark"
						const language = match?.[1] || "text"

						return !isInline ? (
							<ShikiCodeBlock
								code={String(children).replace(/\n$/, "")}
								language={language}
								isDark={shouldUseDarkTheme}
							/>
						) : (
							<code
								className={cn(
									forceDarkMode
										? "bg-gray-600 text-gray-100 px-1 py-0.5 rounded text-xs font-mono"
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
