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
		<h2 className="text-3xl font-bold mb-4 text-emerald-700 dark:text-emerald-300 border-l-4 border-emerald-700 pl-3">
			{children}
		</h2>
	)
}

interface ReadingBlockProps extends ReadingHeaderProps {
	imageSrc?: string;
	imageAlt?: string;
	subtitle?: string;
	svgComponent?: React.ReactNode; // New prop for SVG component
}

export function ReadingBlockWithImage(props: ReadingBlockProps) {
	const { imageSrc, imageAlt, subtitle, svgComponent, children } = props

	// Check if we have either an image or SVG
	const hasVisual = imageSrc || svgComponent

	return (
		<div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
			<div className={`${hasVisual ? "md:w-3/4" : "w-full"}`}>
				<div className="text-2xl leading-relaxed">
					{children}
				</div>
			</div>

			{hasVisual && (
				<div className="md:w-1/4 flex flex-col items-center justify-center">
					{imageSrc ? (
					// Render image if imageSrc is provided
						<img
							src={imageSrc}
							alt={imageAlt}
							className="w-full rounded-lg shadow-lg mb-4"
						/>
					) : (
					// Render SVG component if svgComponent is provided
						<div className="w-full mb-4 flex justify-center">
							{svgComponent}
						</div>
					)}

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
