import { Rainbow } from "lucide-react"
import LabDemoComponent from "../../../demo/lab-demo-component"

export const ledDemoDeliverables: [string, string, string, string] = [
	"Single Color",
	"Multi color",
	"test123",
	"12321321"
]

export const labDemos: [Demo, Demo, Demo, Demo] = [
	{
		demoTitle: "LED Solid Color",
		demoDescription: "Description 1",
		demoIcon: Rainbow
	},
	{
		demoTitle: "LED Rainbow",
		demoDescription: "Description 2",
		demoIcon: Rainbow
	},
	{
		demoTitle: "LED Pulse",
		demoDescription: "Description 2",
		demoIcon: Rainbow
	},
	{
		demoTitle: "LED 4",
		demoDescription: "Description 4",
		demoIcon: Rainbow
	}
]

export default function LEDLightShow() {
	return (
		<LabDemoComponent
			demoTitle="LED Light show"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="LED Demo"
			demoDeliverables={ledDemoDeliverables}
			demos={labDemos}
		/>
	)
}
