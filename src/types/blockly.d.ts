declare global {
	// Types for Blockly configurations
	interface CustomBlockDefinition {
		type: string
		message0: string
		args0: {
			type: string
			name: string
		}[]
		output: null | string
		colour: number
	}

	interface CustomBlock {
		definition: CustomBlockDefinition
		generator: (block: Blockly.Block) => [string, number]
	}

	interface CustomBlocks {
		kinds: {
			[key: string]: CustomBlock
		}
	}

	interface BlocklyState {
		xml: string
		javascriptCode: string
	}
}

export {}
