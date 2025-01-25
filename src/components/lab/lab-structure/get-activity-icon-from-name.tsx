import { BookOpen, CodeXml, Play } from "lucide-react"
import { CustomStart } from "../../icons/custom-start"
import { CustomWizardHat } from "../../icons/custom-wizard-hat"

interface Props {
	activityType: ActivityType
	className?: string
}

export default function GetActivityIconFromActivityName(props: Props) {
	const { activityType, className } = props

	if (activityType === "Start") {
		return <CustomStart className={className} />
	} else if (activityType === "Reading") {
		return <BookOpen className={className} />
	} else if (activityType === "Code") {
		return <CodeXml className={className} />
	} else if (activityType === "Video") {
		return <Play className={className} />
	}
	return <CustomWizardHat className={className} />
}
