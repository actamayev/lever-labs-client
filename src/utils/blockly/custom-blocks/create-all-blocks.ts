import { pipBlocks } from "./pip-blocks"
import { motorsBlocks } from "./motors-blocks"
import { sensorsBlocks } from "./sensor-blocks"

export default function createAllBlocks (): CustomBlocks {
	const customBlocks: CustomBlocks = {
		kinds: {
			...motorsBlocks,
			...sensorsBlocks,
			...pipBlocks
		}
	}

	return customBlocks
}
