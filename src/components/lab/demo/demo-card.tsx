import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"
import GettingStartedStartCard from "../element-1/start-card/getting-started-start-card"
import DemoButton from "./demo-button"

interface Props {
    lessonDemoTitle: string
    demoDeliverables: string[]
    demos: Demo[]
}

export default function DemoCard(props: Props) {
	const { lessonDemoTitle, demoDeliverables, demos } = props

	return (
		<Card className="w-2/3 flex flex-col rounded-lg">
			<CardHeader>
				<CardTitle>
					<h1 className="text-4xl font-bold">{lessonDemoTitle}</h1>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<GettingStartedStartCard />
				<div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg
                    bg-zinc-50 dark:bg-zinc-800/50">
					<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        In This Demo, you&apos;ll:
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
							{demoDeliverables.slice(0, 2).map((deliverable, index) => (
								<li key={index}>
									{deliverable}
								</li>
							))}
						</ul>
						<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
							{demoDeliverables.slice(2, 4).map((deliverable, index) => (
								<li key={`second-${index}`}>
									{deliverable}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Demos Grid */}
				<div className="grid grid-cols-2 gap-4">
					{demos.map((demo) => (
						<DemoButton
							key={demo.demoTitle}
							demo={demo}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
