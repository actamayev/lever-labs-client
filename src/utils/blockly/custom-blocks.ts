import * as Blockly from "blockly"
import { javascriptGenerator, Order } from "blockly/javascript"

const customBlocks: CustomBlocks = {
	kinds: {
		custom_block: {
			definition: {
				type: "custom_block",
				message0: "custom block %1",
				args0: [
					{
						type: "input_value",
						name: "INPUT",
					},
				],
				output: null,
				colour: 160,
			},
			generator: (block: Blockly.Block) => {
				const value = javascriptGenerator.valueToCode(
					block,
					"INPUT",
					Order.ATOMIC
				)
				return [`customFunction(${value})`, Order.FUNCTION_CALL]
			},
		},
	},
}

export default customBlocks
