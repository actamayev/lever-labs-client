"use client"

interface Props {
	children: React.ReactNode
}

// Reusable Section Header Component
export function ComplianceSectionHeader ({ children }: Props): React.ReactNode {
	return (
		<h2 className="text-xl md:text-2xl font-medium text-question-text mt-8 mb-4">
			{children}
		</h2>
	)
}

// Reusable Paragraph Component
export function ComplianceParagraph ({ children }: Props): React.ReactNode {
	return (
		<p className="text-wolf text-sm md:text-base leading-relaxed mb-4 font-light">
			{children}
		</p>
	)
}
