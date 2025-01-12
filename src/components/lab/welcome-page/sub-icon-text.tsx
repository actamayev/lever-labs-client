export function SubIconTitleText({ text }: { text: string }) {
	return (
		<div className="flex flex-col items-center min-h-[20px] justify-center">
			<span className="text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">
				{text}
			</span>
		</div>
	)
}

export function SubIconSubtitleText({ text }: { text: string }) {
	return (
		<div className="flex flex-col items-center min-h-[16px] justify-center mt-1">
			<span className="text-xs text-gray-500 dark:text-gray-400 text-center">
				{text}
			</span>
		</div>
	)
}
