import { BookOpen, ClipboardList, CodeXml } from "lucide-react"

interface Props {
	activityType: ActivityType
	className?: string
}

export default function GetActivityIconFromActivityName(props: Props) {
	const { activityType, className } = props

	if (activityType === "Reading") {
		return <BookOpen className={className} />
	}
	// else if (activityType === "Video") {
	// 	return <Play className={className} />
	// }
	else if (activityType === "Summary") {
		return <ClipboardList className={className} />
	}
	return <CodeXml className={className} />
}
