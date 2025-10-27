export default function LandingHeader({ text }: { text: string }): React.ReactNode {
	return (
		<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
			{text}
		</h2>
	)
}
