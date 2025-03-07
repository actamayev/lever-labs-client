import * as Blockly from "blockly"
import LabCodeMainContent from "./lab-code-main-content"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	nextPageTooltip: string
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	codingTitle: string
	codingDescription: string
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
}

export default function LabCodeComponent(props: Props) {
	const {
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
