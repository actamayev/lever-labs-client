import * as Blockly from "blockly"
import { isEmpty } from "lodash-es"
import { lazy, ReactElement, Suspense, useState } from "react"
import { Button } from "../../shadcn/ui/button"
import ActivityTemplate from "../activity-structure/activity-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn/ui/card"

interface Props {
	lessonTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonIcon: ReactElement
	progressPercent: number
	isNextPageDemo?: boolean
	codingTitle: string
	codingDescription: string
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
}

const BlocklyComponent = lazy(() => import("../../blockly-component"))

export default function LabCodeComponent(props: Props) {
	const {
		lessonTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonIcon,
		progressPercent,
		codingTitle,
		codingDescription,
		toolboxConfig,
		isNextPageDemo = false
	} = props
	const [cppCode, setCppCode] = useState("")

	return (
		<ActivityTemplate
			element={element}
			lessonTitle={lessonTitle}
			lessonIcon={lessonIcon}
			progressPercent={progressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			isNextPageDemo={isNextPageDemo}
			extraClasses="h-screen"
		>
			<main className="flex-1 flex min-h-0">
				<Card className="w-2/5 p-4 flex flex-col m-4">
					<CardHeader>
						<CardTitle>
							<h1 className="text-4xl font-bold mb-6">{codingTitle}</h1>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CardDescription className="text-xl font-medium">
							{codingDescription}
						</CardDescription>
					</CardContent>
				</Card>
				<div className="w-3/5 flex flex-col min-h-0 m-4">
					<div className="flex-1 min-h-0">
						<Suspense>
							<BlocklyComponent
								toolboxConfig={toolboxConfig}
								setCppCode={setCppCode}
								extraClasses="h-full"
							/>
						</Suspense>
					</div>
					<div className="flex justify-between mt-4">
						<Button
							disabled={isEmpty(cppCode)}
							className="!text-xl rounded-2xl flex items-center bg-pipTheme
							hover:bg-pipThemeHover dark:text-white transition-none"
							variant="tactile"
						>
							Check my work
						</Button>
						<Button
							disabled={isEmpty(cppCode)}
							className="!text-xl rounded-2xl flex items-center bg-pipTheme
							hover:bg-pipThemeHover dark:text-white transition-none"
							variant="tactile"
						>
							Send code to Pip
						</Button>
					</div>
				</div>
			</main>
		</ActivityTemplate>
	)
}
