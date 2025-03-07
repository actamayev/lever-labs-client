import { Card } from "@/components/shadcn/ui/card"

interface Props {
	title: string
	subTitle: string
	description: React.ReactNode
}

export default function LandingCard(props: Props) {
	const { title, subTitle, description } = props

	return (
		<Card className="flex flex-col overflow-hidden !bg-lightThemeBackground dark:!bg-darkThemeBackground shadow-lg relative z-10">
			<div className="flex flex-col p-4 md:p-8 w-full space-y-4 md:space-y-6">
				<div className="space-y-4 md:space-y-6">
					<h2 className="text-3xl md:text-4xl font-semibold">
						{title}
					</h2>
					<h3 className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300">
						{subTitle}
					</h3>
				</div>
				<p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl">
					{description}
				</p>
			</div>
		</Card>
	)
}
