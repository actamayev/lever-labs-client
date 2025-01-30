import * as Blockly from "blockly"
import LabCodeComponent from "../../code/lab-code-component"
import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"
import { createCustomCategory } from "../../../../utils/blockly/toolbox-config"

export default function LedCode2() {
	const ledBlocks = createCustomCategory(
		"Pip",
		218,
		["esp32_led_control"]
	)
	const toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition = {
		kind: "categoryToolbox",
		contents: [ledBlocks]
	}

	return (
		<LabCodeComponent
			lessonTitle="LED Code 2"
			previousPageLink="/lab/element-1/led/code-1"
			previousPageActivity="Code"
			nextPageLink="/lab/element-1/led/code-3"
			nextPageActivity="Code"
			element={1}
			lessonIcon={<LEDColorChangeAnimation iconSize={30} />}
			lessonProgressPercent={500 / 6}
			codingTitle="Choose an LED color"
			codingDescription="Here, you'll turn your LED to a color of your choosing"
			toolboxConfig={toolboxConfig}
		/>
	)
}
