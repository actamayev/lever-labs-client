"use client"

import { Card, CardContent } from "../../shadcn/ui/card"

interface Props {
    headerText: string
    children: React.ReactNode
}

export default function WelcomePageCard(props: Props) {
	const { headerText, children } = props

	return (
		<Card className="bg-standardBackground border-2 border-purple-100 dark:border-pipTheme">
			<CardContent className="pt-6">
				<div className="text-xl font-semibold text-pipThemeText dark:text-blue-400 mb-6 flex justify-center">
					{headerText}
				</div>
				{children}
			</CardContent>
		</Card>
	)
}
