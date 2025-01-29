import * as Blockly from "blockly"
import { ReactElement } from "react"
import LabCodeMainContent from "./lab-code-main-content"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	lessonTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonIcon: ReactElement
	progressPercent: number
	codingTitle: string
	codingDescription: string
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
}

// TODO: Figure out why the code isn't stretching all the way
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
		toolboxConfig
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
			isCode={true}
		>
			<LabCodeMainContent
				codingTitle={codingTitle}
				codingDescription={codingDescription}
				toolboxConfig={toolboxConfig}
			/>
		</ActivityTemplate>
	)
}
