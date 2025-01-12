interface TitleTextProps {
	text: string
}

export function SubIconTitleText({ text }: TitleTextProps) {
	return (
		<div className="w-52 text-center">
			<span className="text-sm font-semibold text-gray-600 dark:text-gray-300 text-center block">
				{text}
			</span>
		</div>
	)
}

export function SubIconSubtitleText({ text }: TitleTextProps) {
	return (
		<div className="w-52 text-center mt-1">
			<span className="text-xs text-gray-500 dark:text-gray-400 text-center block">
				{text}
			</span>
		</div>
	)
}
