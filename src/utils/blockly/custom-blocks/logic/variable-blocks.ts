"use client"

import * as Blockly from "blockly"
import { Order } from "../../order"
import getCppGenerator from "../../../cpp/cpp-generator"
import { logicCategoryColour } from "../../../constants/constants"
import { VARIABLE_BLOCK_TYPES, VARIABLE_FIELD_VALUES } from "@bluedotrobots/common-ts/types/blockly/logic"

export const variableBlocks: Record<VARIABLE_BLOCK_TYPES, CustomBlock> = {
	// Float variables (original implementation)
	[VARIABLE_BLOCK_TYPES.VARIABLE_DECLARE_FLOAT]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Create float variable")
					.appendField(new Blockly.FieldTextInput("myFloat"), VARIABLE_FIELD_VALUES.VARIABLE_NAME)
					.appendField("=")

				this.appendValueInput(VARIABLE_FIELD_VALUES.VARIABLE_VALUE)
					.setCheck("Number") // Allow any number input

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Declare a new float variable and assign an initial value")
				this.setInputsInline(true)
			},
			keywords: ["declare", "create", "initialize", "define", "store", "memory", "decimal", "number", "float"]
		},
		generator: (block: Blockly.Block): string => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			const value = getCppGenerator().valueToCode(block, VARIABLE_FIELD_VALUES.VARIABLE_VALUE, Order.ASSIGNMENT) || "0.0"

			return `float ${varName} = ${value};\n`
		}
	},
	[VARIABLE_BLOCK_TYPES.VARIABLE_ASSIGN]: {
		definition: {
			init: function(this: Blockly.Block): void {
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
				this.setInputsInline(true)
			},
			keywords: ["assign", "set", "update", "change", "modify", "store", "value", "equal"]
		},
		generator: (block: Blockly.Block): string => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			const value = getCppGenerator().valueToCode(block, VARIABLE_FIELD_VALUES.VARIABLE_VALUE, Order.ASSIGNMENT) || "0.0"

			return `${varName} = ${value};\n`
		}
	},
	[VARIABLE_BLOCK_TYPES.VARIABLE_GET_FLOAT]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Get variable")
					.appendField(new Blockly.FieldTextInput("myVar"), VARIABLE_FIELD_VALUES.VARIABLE_NAME)

				this.setOutput(true, "Number")
				this.setColour(logicCategoryColour)
				this.setTooltip("Get the value of a variable")
				this.setInputsInline(true)
			},
			keywords: ["get", "read", "retrieve", "access", "variable", "number", "float"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			return [varName, Order.ATOMIC]
		}
	},

	// New int variable blocks
	[VARIABLE_BLOCK_TYPES.VARIABLE_DECLARE_INT]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Create int variable")
					.appendField(new Blockly.FieldTextInput("myInt"), VARIABLE_FIELD_VALUES.VARIABLE_NAME)
					.appendField("=")

				this.appendValueInput(VARIABLE_FIELD_VALUES.VARIABLE_VALUE)
					.setCheck("Number")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Declare a new integer variable and assign an initial value")
				this.setInputsInline(true)
			},
			keywords: ["declare", "create", "initialize", "define", "store", "memory", "integer", "number", "int"]
		},
		generator: (block: Blockly.Block): string => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			const value = getCppGenerator().valueToCode(block, VARIABLE_FIELD_VALUES.VARIABLE_VALUE, Order.ASSIGNMENT) || "0"

			return `int ${varName} = ${value};\n`
		}
	},
	[VARIABLE_BLOCK_TYPES.VARIABLE_GET_INT]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Get int variable")
					.appendField(new Blockly.FieldTextInput("myInt"), VARIABLE_FIELD_VALUES.VARIABLE_NAME)

				this.setOutput(true, "Number")
				this.setColour(logicCategoryColour)
				this.setTooltip("Get the value of an integer variable")
				this.setInputsInline(true)
			},
			keywords: ["get", "read", "retrieve", "access", "variable", "integer", "number", "int"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			return [varName, Order.ATOMIC]
		}
	},

	// New bool variable blocks
	[VARIABLE_BLOCK_TYPES.VARIABLE_DECLARE_BOOL]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Create bool variable")
					.appendField(new Blockly.FieldTextInput("myBool"), VARIABLE_FIELD_VALUES.VARIABLE_NAME)
					.appendField("=")
				this.appendValueInput(VARIABLE_FIELD_VALUES.VARIABLE_VALUE)
					.setCheck("Boolean") // Allow any number input

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Declare a new boolean variable and assign an initial value")
				this.setInputsInline(true)
			},
			keywords: ["declare", "create", "initialize", "define", "store", "memory", "boolean", "bool"]
		},
		generator: (block: Blockly.Block): string => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			const value = getCppGenerator().valueToCode(block, VARIABLE_FIELD_VALUES.VARIABLE_VALUE, Order.ASSIGNMENT) || "false"

			return `bool ${varName} = ${value};\n`
		}
	},
	[VARIABLE_BLOCK_TYPES.VARIABLE_GET_BOOL]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Get bool variable")
					.appendField(new Blockly.FieldTextInput("myBool"), VARIABLE_FIELD_VALUES.VARIABLE_NAME)

				this.setOutput(true, "Boolean")
				this.setColour(logicCategoryColour)
				this.setTooltip("Get the value of a boolean variable")
				this.setInputsInline(true)
			},
			keywords: ["get", "read", "retrieve", "access", "variable", "boolean", "bool"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const varName = block.getFieldValue(VARIABLE_FIELD_VALUES.VARIABLE_NAME)
			return [varName, Order.ATOMIC]
		}
	}
}
