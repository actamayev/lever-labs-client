/* eslint-disable @typescript-eslint/naming-convention */
import { Sounds } from "@bluedotrobots/common-ts"
import rgbToBlocklyColor from "../blockly/rgb-to-hex"

export const bentoIconSize = 40

export const logicCategoryColour = rgbToBlocklyColor(28, 176, 246) // macaw
export const sensorsCategoryColour = rgbToBlocklyColor(255, 75, 75) //cardinal
export const motorsCategoryColour = rgbToBlocklyColor(35, 200, 100) //charging-green
export const ledCategoryColour = rgbToBlocklyColor(255, 150, 0) //fox
export const screenCategoryColour = rgbToBlocklyColor(206, 130, 255) //beetle
export const speakerCategoryColour = rgbToBlocklyColor(43, 112, 201) // humpback
export const buttonsCategoryColour = rgbToBlocklyColor(182, 110, 40) // beakInner

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
	"numpad5": "ufo",
	"5": "ufo",
	"numpad6": "countdown",
	"6": "countdown",
	"numpad7": "engine",
	"7": "engine",
	"numpad8": "robot noise",
	"8": "robot noise",
}

export const WORKBENCH_ROUNDING_RADIUS = "48px"

export const SENSOR_POLLING_INTERVAL = 30000 // 30 seconds

export const PIP_ROBOT_USB_ID = {
	usbVendorId: 0x303a,
	usbProductId: 0x1001  // ESP32-S3 DevKit
}
