interface Props {
	children: React.ReactNode
}

// Reusable Header Component for Main Title
export function ComplianceMainHeader ({ children }: Props)  {
	return (
		<h1 className="text-3xl md:text-4xl font-semibold text-questionText mb-12">
			{children}
		</h1>
	)
}

// Reusable Section Header Component
export function ComplianceSectionHeader ({ children }: Props) {
	return (
		<h2 className="text-xl md:text-2xl font-medium text-questionText mt-8 mb-4">
			{children}
		</h2>
	)
}

// Reusable Paragraph Component
export function ComplianceParagraph ({ children }: Props) {
	return (
		<p className="text-wolf text-sm md:text-base leading-relaxed mb-4 font-light">
			{children}
		</p>
	)
}
