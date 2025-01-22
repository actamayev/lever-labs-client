import { isNull } from "lodash-es"
import { useCallback } from "react"
import { BookOpen, CodeXml, Play } from "lucide-react"
import { CustomStart } from "../../icons/custom-start"
import { CustomWizardHat } from "../../icons/custom-wizard-hat"

interface Props {
	progress: number | null
	activityType: ActivityTitles
}

export default function LilypadIcon(props: Props) {
	const { progress, activityType } = props

	const classes = useCallback(() =>{
		if (isNull(progress)) return "w-10 h-10 text-zinc-500"
		return "w-10 h-10 text-white"
	}, [progress])

	if (activityType === "Start") {
		return <CustomStart className={classes()} />
	} else if (activityType === "Reading") {
		return <BookOpen className={classes()} />
	} else if (activityType === "Code") {
		return <CodeXml className={classes()} />
	} else if (activityType === "Video") {
		return <Play className={classes()} />
	}
	return <CustomWizardHat className={classes()} />
}
