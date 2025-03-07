import { cn } from "../../../lib/shadcn/utils"
import { Card, CardContent } from "../../shadcn/ui/card"

interface Props {
    headerText: string
    children: React.ReactNode
	extraClasses?: string
}

export default function WelcomePageCard(props: Props) {
	const { headerText, children, extraClasses = "" } = props

	return (
		<Card
			className={cn(
				"bg-lightThemeBackground dark:bg-darkThemeBackground border-2 border-purple-100 dark:border-pipTheme",
				extraClasses
			)}
		>
			<CardContent className="pt-6">
				<div className="text-xl font-semibold text-pipTheme dark:text-blue-400 mb-6 flex justify-center">
					{headerText}
				</div>
				{children}
			</CardContent>
		</Card>
	)
}
