import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn/ui/card"

export default function Element1StartCard() {
	return (
		<Card className="w-2/5 p-4 flex flex-col m-4 rounded-lg">
			<CardHeader>
				<CardTitle>
					<h1 className="text-4xl font-bold mb-6">Element 1: Sensor Basics</h1>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-xl font-medium">
					Test description
				</CardDescription>
			</CardContent>
		</Card>
	)
}
