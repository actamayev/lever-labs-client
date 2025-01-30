import * as Blockly from "blockly"
import LabCodeMainContent from "./lab-code-main-content"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	activityTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	codingTitle: string
	codingDescription: string
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
}

export default function LabCodeComponent(props: Props) {
	const {
		activityTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonTitle,
		lessonProgressPercent,
		codingTitle,
		codingDescription,
		toolboxConfig
	} = props
	return (
		<ActivityTemplate
			element={element}
			activityTitle={activityTitle}
			lessonTitle={lessonTitle}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			activityType="Code"
		>
			<LabCodeMainContent
				codingTitle={codingTitle}
				codingDescription={codingDescription}
				toolboxConfig={toolboxConfig}
			/>
		</ActivityTemplate>
	)
}
