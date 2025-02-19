import { cn } from "../../../lib/shadcn/utils"

interface ReadingHeaderProps {
	children: React.ReactNode
}

export function ReadingBlockHeader({ children } : ReadingHeaderProps) {
	return (
		<h2 className="text-4xl font-bold text-center mb-8">
			{children}
		</h2>
	)
}

export function ReadingBlockSectionHeader({ children } : ReadingHeaderProps) {
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
	readingClasses?: string
}

export function ReadingBlockWithImage (props: ReadingBlockProps) {
	const { imageSrc, imageAlt, subtitle, children, readingClasses = "" } = props

	return (
		<div className="flex flex-col md:flex-row gap-6 mb-8">
			<div className={`${imageSrc ? "md:w-2/3" : "w-full"}`}>
				<div className={cn("text-2xl leading-relaxed", readingClasses)}>
					{children}
				</div>
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
