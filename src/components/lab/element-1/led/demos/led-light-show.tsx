import { Rainbow } from "lucide-react"
import useMotorDemoUseEffect from "../../../../../hooks/lab/demos/motor-demo-use-effect"
import LabDemoComponent from "../../../demo/lab-demo-component"

const ledDemoDeliverables: [string] = [
	"LED Light Show"
]

const labDemos: [Demo] = [
	{
		demoTitle: "Motor RTC",
		demoDescription: "Description 1",
		demoIcon: Rainbow
	},
	// {
	// 	demoTitle: "LED Rainbow",
	// 	demoDescription: "Description 2",
	// 	demoIcon: Rainbow
	// },
	// {
	// 	demoTitle: "LED Pulse",
	// 	demoDescription: "Description 2",
	// 	demoIcon: Rainbow
	// },
	// {
	// 	demoTitle: "LED 4",
	// 	demoDescription: "Description 4",
	// 	demoIcon: Rainbow
	// }
]

export default function LEDLightShow() {
	useMotorDemoUseEffect()

	return (
		<LabDemoComponent
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="LED Light Show"
			demoDeliverables={ledDemoDeliverables}
			demos={labDemos}
		/>
	)
}
