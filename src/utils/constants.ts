/* eslint-disable @typescript-eslint/naming-convention */
import rgbToBlocklyColor from "./blockly/rgb-to-blocky"

export const bentoIconSize = 40

export const logicCategoryColour = rgbToBlocklyColor(28, 176, 246) // macaw
export const sensorsCategoryColour = rgbToBlocklyColor(255, 75, 75) //cardinal
export const motorsCategoryColour = rgbToBlocklyColor(35, 200, 100) //charging-green
export const ledCategoryColour = rgbToBlocklyColor(255, 150, 0) //fox
export const screenCategoryColour = rgbToBlocklyColor(206, 130, 255) //beetle
export const speakerCategoryColour = rgbToBlocklyColor(43, 112, 201) // humpback
export const buttonsCategoryColour = rgbToBlocklyColor(182, 110, 40) // beakInner

export const PrivatePageNames: PageNames[] = [
	"/garage",
	"/lab",
	"/lab/welcome",
	"/add-pip",
	"/sandbox",
	"/profile",
	"/career-quest"
]

// These are pages that you can view if you're logged in or not.
export const OpenPages: PageNames[] = [
	"/mission",
	"/contact"
]

export const staticPages = [
	"/",
	"/login",
	"/register",
	"/register-username",
	"/garage",
	"/add-pip",
	"/sandbox",
	"/profile",
	"/contact",
	"/mission",
	"/schools",
	"/404"
] as const

export const ledLabPages = [
	"/lab/led/reading/intro-to-leds",
	"/lab/led/demo/led-light-show",
	"/lab/led/reading/voltage",
	"/lab/led/demo/first-light",
	"/lab/led/reading/rgb-leds",
	"/lab/led/demo/color-mixing",
	"/lab/led/reading/intro-to-code",
	"/lab/led/demo/blue-leds",
	"/lab/led/demo/check-button-press",
	"/lab/led/demo/simple-led-control",
	"/lab/led/demo/multi-button-led-control",
	"/lab/led/code/led-control",
	"/lab/led/reading/leds-and-loops",
	"/lab/led/demo/led-counting-loop",
	"/lab/led/demo/led-breathing",
	"/lab/led/code/breathing-leds",
	"/lab/led/demo/check-button-press",
	// "/lab/led/reading/gpio",
	"/lab/led/demo/led-in-circle",
	"/lab/led/reading/led-advantages",
	"/lab/led/reading/leds-in-robotics",
	"/lab/led/code/warehouse-pip",
	"/lab/led/summary",
] as const

export const labPages = [
	"/lab",
	"/lab/welcome",
	...ledLabPages,
] as const

export const careerQuestPages = [
	"/career-quest",
	"/career-quest/line-following",
	...ledLabPages,
] as const

export const allPages = [...staticPages, ...labPages, ...careerQuestPages] as const

export const motorKeyMappings: Record<string, MotorDriveKeyMapping> = {
	"w": { direction: "up", axis: "vertical", value: 1 },
	"arrowup": { direction: "up", axis: "vertical", value: 1 },
	"s": { direction: "down", axis: "vertical", value: -1 },
	"arrowdown": { direction: "down", axis: "vertical", value: -1 },
	"a": { direction: "left", axis: "horizontal", value: -1 },
	"arrowleft": { direction: "left", axis: "horizontal", value: -1 },
	"d": { direction: "right", axis: "horizontal", value: 1 },
	"arrowright": { direction: "right", axis: "horizontal", value: 1 },
}

interface ActionMapping {
	[key: string]: Actions
}

export const actionMappings: ActionMapping = {
	"q": "headlights",
	"e": "horn"
}

interface SoundMapping {
	[key: string]: Sounds
}

export const soundMappings: SoundMapping = {
	"numpad1": "fart",
	"1": "fart",
	"numpad2": "monkey",
	"2": "monkey",
	"numpad3": "elephant",
	"3": "elephant",
	"numpad4": "fanfare",
	"4": "fanfare",
	"numpad5": "mariachi",
	"5": "mariachi",
	"numpad6": "countdown",
	"6": "countdown",
	"numpad7": "engine",
	"7": "engine",
	"numpad8": "robot noise",
	"8": "robot noise",
}

export const EmptySandboxXml = "<xml xmlns=\"https://developers.google.com/blockly/xml\"/>"
export const WORKBENCH_ROUNDING_RADIUS = "35px"
