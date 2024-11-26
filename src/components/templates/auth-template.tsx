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
		<Card className="mx-auto max-w-sm">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
		</Card>
	)
}
