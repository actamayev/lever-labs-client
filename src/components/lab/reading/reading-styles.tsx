interface ReadingHeaderProps {
	children: React.ReactNode
}

export function ReadingBlockHeader({ children } : ReadingHeaderProps) {
	return (
		<h2 className="text-3xl font-bold mb-4">
			{children}
		</h2>
	)
}

interface ReadingBlockProps extends ReadingHeaderProps {
	imageSrc?: string,
	imageAlt?: string
	subtitle?: string
}

export function ReadingBlockWithImage (props: ReadingBlockProps) {
	const { imageSrc, imageAlt, subtitle, children } = props

	return (
		<div className="flex flex-col md:flex-row gap-6 mb-8">
			<div className={`${imageSrc ? "md:w-2/3" : "w-full"}`}>
				<p className="text-2xl mb-4">
					{children}
				</p>
			</div>

			{imageSrc && (
				<div className="md:w-1/3 flex flex-col items-center">
					<img
						src={imageSrc}
						alt={imageAlt}
						className="w-full rounded-lg shadow-lg mb-4"
					/>
					{subtitle && (
						<p className="text-sm text-zinc-600 dark:text-zinc-400 italic text-center">
							{subtitle}
						</p>
					)}
				</div>
			)}
		</div>
	)
}
