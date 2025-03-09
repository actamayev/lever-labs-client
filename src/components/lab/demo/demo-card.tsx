import DemoButton from "./demo-button"
import InThisDemo from "./in-this-demo"
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"
import GettingStartedStartCard from "../lab-structure/start-card/getting-started-start-card"
import ShowPipColorOnScreen from "../../show-pip-color-on-screen"

interface Props {
    lessonDemoTitle: string
    demoDeliverables: string[]
    demos: Demo[]
}

export default function DemoCard(props: Props) {
	const { lessonDemoTitle, demoDeliverables, demos } = props

	return (
		<Card className="w-2/3 flex flex-col rounded-lg bg-inherit border-2 border-gray-200 dark:border-gray-700">
			<CardHeader>
				<CardTitle>
					<h1 className="text-4xl font-bold">{lessonDemoTitle}</h1>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<GettingStartedStartCard />
				<InThisDemo demoDeliverables={demoDeliverables} />

				{/* Demos Grid */}
				<div className="grid grid-cols-2 gap-4">
					{demos.map((demo) => (
						<DemoButton
							key={demo.demoTitle}
							demo={demo}
						/>
					))}
				</div>
				<ShowPipColorOnScreen />
			</CardContent>
		</Card>
	)
}
