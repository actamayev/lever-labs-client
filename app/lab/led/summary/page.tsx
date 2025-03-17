import { createMetadata } from "../../../../src/utils/helmet-data/create-metadata"
import LabSummaryComponent from "../../../../src/components/lab/summary/lab-summary-component"

export const metadata = createMetadata({
	title: "LED Lessons Summary",
	// eslint-disable-next-line max-len
	description: "Review key concepts learned about LEDs in robotics through this comprehensive summary. Consolidate your understanding of lighting controls, patterns, and practical applications.",
	path: "/lab/led/summary",
	keywords: ["robotics learning review", "LED programming concepts", "educational robotics summary"]
})

export default function LEDLessonsSummaryPage() {
	return (
		<LabSummaryComponent
			lessonTitle="LED"
			lessonProgressPercent={100}
		/>
	)
}
