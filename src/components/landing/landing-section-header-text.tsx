import { cn } from "../../lib/shadcn/utils"

interface Props {
	text: string
	extraClasses?: string
}

export default function LandingSectionHeaderText({ text, extraClasses = "" } : Props) {
	return (
		<h2 className={cn("text-4xl md:text-5xl lg:text-5xl font-bold text-pipThemeText", extraClasses)}>
			{text}
		</h2>
	)
}
