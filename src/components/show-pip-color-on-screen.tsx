import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { useLabDemoContext } from "../contexts/lab-demo-context"

function ShowPipColorOnScreen() {
	const labDemoClass = useLabDemoContext()

	// Early return if no sensor data with better nullish checking
	if (isNull(labDemoClass.sensorData)) return null

	const { redValue, greenValue, blueValue } = labDemoClass.sensorData.sensorPayload

	// Ensure RGB values are numbers and within 0-255 range
	const safeRed = Math.min(255, Math.max(0, Number(redValue) || 0))
	const safeGreen = Math.min(255, Math.max(0, Number(greenValue) || 0))
	const safeBlue = Math.min(255, Math.max(0, Number(blueValue) || 0))

	const rgbColor = `rgb(${safeRed}, ${safeGreen}, ${safeBlue})`

	return (
		<div className="flex justify-center">
			<div
				className="size-32 sm:size-40 md:size-64 lg:size-80 rounded-full"
				style={{ backgroundColor: rgbColor }}
			/>
		</div>
	)
}

export default observer(ShowPipColorOnScreen)
