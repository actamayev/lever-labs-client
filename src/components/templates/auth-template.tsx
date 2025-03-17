"use client"

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card"

interface Props {
	title: string
	children: React.ReactNode
}

export default function AuthTemplate(props: Props) {
	const { title, children } = props

	return (
		<Card
			className="mx-auto border-0 bg-inherit shadow-none mt-12"
			style={{ "maxWidth": "420px" }}
		>
			<CardHeader>
				<CardTitle className="text-2xl font-bold flex justify-center items-center mb-4">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
		</Card>
	)
}
