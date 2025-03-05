import * as Blockly from "blockly"
import LabCodeMainContent from "./lab-code-main-content"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	previousPageTooltip: string | null
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	nextPageTooltip: string | null
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	codingTitle: string
	codingDescription: string
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
}

export default function LabCodeComponent(props: Props) {
	const {
		previousPageLink,
		previousPageActivity,
		previousPageTooltip,
		nextPageLink,
		nextPageActivity,
		nextPageTooltip,
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
			lessonTitle={lessonTitle}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			previousPageTooltip={previousPageTooltip}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			nextPageTooltip={nextPageTooltip}
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
