"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cloneDeep from "lodash-es/cloneDeep"
import { BlocklyJson } from "@bluedotrobots/common-ts"

// This is used to not save block positions (ie when someone moves blocks around, it shouldn't trigger a save)
export function stripBlockPositions(blocklyJson: BlocklyJson): BlocklyJson {
	const cloned = cloneDeep(blocklyJson)

	if (cloned.blocks?.blocks) {
		cloned.blocks.blocks = cloned.blocks.blocks.map((block: { [x: string]: any; x: any; y: any }) => {
			const { x, y, ...blockWithoutPosition } = block
			return blockWithoutPosition
		})
	}

	return cloned
}
