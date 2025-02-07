/* eslint-disable max-len */
import ledColorsBlocks from "./led-colors"
import ledScienceBlocks from "./led-science"
import whatIsLightBlocks from "./what-is-light"
import ledAdvantagesBlocks from "./led-advantages"
import ledSemiconductorBlocks from "./led-semiconductors"
import evolutionOfLightReadingBlocks from "./evolution-of-light"
import ledEfficiencyBlocks from "./led-efficiency"
import ledsRoboticsBlocks from "./led-robotics"

const ledReadingBlocks: ContentBlock[] = [
	...whatIsLightBlocks,
	...evolutionOfLightReadingBlocks,
	...ledAdvantagesBlocks,
	...ledScienceBlocks,
	...ledSemiconductorBlocks,
	...ledColorsBlocks,
	...ledEfficiencyBlocks,
	...ledsRoboticsBlocks
]

export default ledReadingBlocks
