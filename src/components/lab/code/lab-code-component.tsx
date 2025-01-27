import * as Blockly from "blockly"
import { isEmpty } from "lodash-es"
import { lazy, ReactElement, Suspense, useState } from "react"
import ActivityTemplate from "../activity-structure/activity-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn/ui/card"
import { Button } from "../../shadcn/ui/button"

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
						<CardDescription className="text-xl font-medium">{codingDescription}
						</CardDescription>
					</CardContent>
				</Card>
				<div className="w-3/5 min-h-0 m-4">
					<Suspense>
						<BlocklyComponent
							toolboxConfig={toolboxConfig}
							extraClasses="h-full"
							setCppCode={setCppCode}
						/>
					</Suspense>
				</div>
				<Button
					disabled={isEmpty(cppCode)}
					className="mt-2 transition-none"
					variant="tactile"
				>
					Check my work
				</Button>
				<Button
					disabled={isEmpty(cppCode)}
					className="mt-2 transition-none"
					variant="tactile"
				>
					Send code to Pip
				</Button>
			</main>
		</ActivityTemplate>
	)
}
