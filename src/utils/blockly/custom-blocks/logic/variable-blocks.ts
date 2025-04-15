"use client"

import * as Blockly from "blockly"
import { Order } from "../../order"
import { cppGenerator } from "../../../cpp/cpp-generator"
import { logicCategoryColour } from "../../../constants"
import { VARIABLE_BLOCK_TYPES, VARIABLE_FIELD_VALUES, VariableBlockNames } from "../../block-types/logic-block-types"

export const variableBlocks: Record<VariableBlockNames, CustomBlock> = {
	[VARIABLE_BLOCK_TYPES.VARIABLE_DECLARE]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Create float variable")
					.appendField(new Blockly.FieldTextInput("myVar"), VARIABLE_FIELD_VALUES.VARIABLE_NAME)
					.appendField("=")

				this.appendValueInput(VARIABLE_FIELD_VALUES.VARIABLE_VALUE)
					.setCheck("Number") // Allow any number input

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Declare a new float variable and assign an initial value")
			}
		},
		generator: (block: Blockly.Block): string => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			const value = cppGenerator.valueToCode(block, VARIABLE_FIELD_VALUES.VARIABLE_VALUE, Order.ASSIGNMENT) || "0.0"

			return `float ${varName} = ${value};\n`
		}
	},
	[VARIABLE_BLOCK_TYPES.VARIABLE_ASSIGN]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Set variable")
					.appendField(new Blockly.FieldTextInput("myVar"), VARIABLE_FIELD_VALUES.VARIABLE_NAME)
					.appendField("=")

				this.appendValueInput(VARIABLE_FIELD_VALUES.VARIABLE_VALUE)
					.setCheck("Number") // Allow any number input

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Assign a new value to an existing variable")
			}
		},
		generator: (block: Blockly.Block): string => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			const value = cppGenerator.valueToCode(block, VARIABLE_FIELD_VALUES.VARIABLE_VALUE, Order.ASSIGNMENT) || "0.0"

			return `${varName} = ${value};\n`
		}
	},
	[VARIABLE_BLOCK_TYPES.VARIABLE_GET]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Get variable")
					.appendField(new Blockly.FieldTextInput("myVar"), VARIABLE_FIELD_VALUES.VARIABLE_NAME)

				this.setOutput(true, "Number")
				this.setColour(logicCategoryColour)
				this.setTooltip("Get the value of a variable")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			return [varName, Order.ATOMIC]
		}
	}
}
