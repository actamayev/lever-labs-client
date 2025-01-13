import { Card, CardContent } from "../../shadcn/ui/card"
// import { MagicCard } from "../../shadcn/ui/magic-card"

interface Props {
    headerText: string
    children: React.ReactNode
}

// TODO: Bring back the magic card
export default function WelcomePageCard(props: Props) {
	const { headerText, children } = props

	return (
		// <MagicCard
		// 	className="w-full bg-white dark:bg-zinc-800"
		// 	gradientFrom="#9333EA"  // Purple-600
		// 	gradientTo="#D8B4FE"    // Purple-300
		// 	gradientOpacity={0.2}
		// 	gradientSize={250}
		// >
		<Card className="bg-white dark:bg-zinc-800 border-2 border-purple-100 dark:border-pipTheme">
			<CardContent className="pt-6">
				<div className="text-xl font-semibold text-pipTheme dark:text-blue-400 mb-6 flex justify-center">
					{headerText}
				</div>
				{children}
			</CardContent>
		</Card>
		// </MagicCard>
	)
}
