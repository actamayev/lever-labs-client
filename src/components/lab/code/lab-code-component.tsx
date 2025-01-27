import * as Blockly from "blockly"
import { lazy, ReactElement, Suspense } from "react"
import ActivityTemplate from "../activity-structure/activity-template"
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"

interface Props {
    lessonTitle: string
    previousPageLink: LabPages
    previousPageActivity: ActivityType
    nextPageLink: LabPages
    nextPageActivity: ActivityType
    element: 1 | 2 | 3
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
			<main className="flex-1 flex flex-col p-4 justify-center max-w-4xl">
				<Card>
					<CardHeader>
						<CardTitle className="text-6xl font-bold">{codingTitle}</CardTitle>
					</CardHeader>
					<CardContent className="text-xl font-medium">{codingDescription}</CardContent>
				</Card>
				<div className="flex-1 min-h-0 mt-4">
					<Suspense>
						<BlocklyComponent toolboxConfig={toolboxConfig} />
					</Suspense>
				</div>
			</main>
		</ActivityTemplate>
	)
}
