"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cloneDeep from "lodash-es/cloneDeep"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"

// This is used to not save block positions (ie when someone moves blocks around, it shouldn't trigger a save)
export function stripBlockPositions(blocklyJson: BlocklyJson): BlocklyJson {
	const cloned = cloneDeep(blocklyJson)

	if (cloned.blocks?.blocks) {
		cloned.blocks.blocks = cloned.blocks.blocks.map((block: { [x: string]: any; x: any; y: any }): { [x: string]: any } => {
			const { x, y, ...blockWithoutPosition } = block
			return blockWithoutPosition
		})
	}

	return cloned
}

function normalizeJson (obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map(normalizeJson)
	}
	if (obj && typeof obj === "object") {
		return Object.keys(obj)
			.sort()
			.reduce((result: any, key: string) => {
				result[key] = normalizeJson(obj[key])
				return result
			}, {})
	}
	return obj
}

export function stripAndNormalizeJson(blocklyJson: BlocklyJson): BlocklyJson {
	const stripped = stripBlockPositions(blocklyJson)
	const normalized = normalizeJson(stripped)
	return normalized
}
