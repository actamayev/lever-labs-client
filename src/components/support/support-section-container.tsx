"use client"

export default function SupportSectionContainer({ children } : { children: React.ReactNode }) {
	return (
		<div className="px-8 sm:px-8 md:px-16 lg:px-72 mt-12">
			<div className="font-medium text-3xl text-questionText">
				About Us
			</div>
			{children}
		</div>
	)
}
