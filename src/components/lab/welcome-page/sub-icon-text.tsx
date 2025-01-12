export function SubIconTitleText({ text } : { text: string }) {
	return (
		<span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
			{text}
		</span>
	)
}

export function SubIconSubtitleText({ text } : { text: string }) {
	return (
		<span className="text-xs text-gray-500 dark:text-gray-400">
			{text}
		</span>
	)
}
