// import { Rainbow } from "lucide-react"
import LabDemoComponent from "../../../demo/lab-demo-component"

const ledDemoDeliverables: [string] = [
	"LED Light Show"
]

// const labDemos: [Demo, Demo, Demo, Demo] = [
// {
// 	demoTitle: "LED Solid Color",
// 	demoDescription: "Description 1",
// 	demoIcon: Rainbow
// },
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
// ]

export default function LEDLightShow() {
	return (
		<LabDemoComponent
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="LED Light Show"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
		/>
	)
}
