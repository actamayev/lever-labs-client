/* eslint-disable @typescript-eslint/naming-convention */
import rgbToBlocklyColor from "../blockly/rgb-to-hex"
import { ToneType } from "@lever-labs/common-ts/protocol"

export const logicCategoryColour = rgbToBlocklyColor(28, 176, 246) // macaw
export const sensorsCategoryColour = rgbToBlocklyColor(255, 75, 75) //cardinal
export const motorsCategoryColour = rgbToBlocklyColor(35, 200, 100) //chargingGreen
export const ledCategoryColour = rgbToBlocklyColor(255, 150, 0) //fox
// export const screenCategoryColour = rgbToBlocklyColor(206, 130, 255) //beetle
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

interface ToneMapping {
	[key: string]: ToneType
}

export const toneMappings: ToneMapping = {
	"numpad1": ToneType.A,
	"1": ToneType.A,
	"numpad2": ToneType.B,
	"2": ToneType.B,
	"numpad3": ToneType.C,
	"3": ToneType.C,
	"numpad4": ToneType.D,
	"4": ToneType.D,
	"numpad5": ToneType.E,
	"5": ToneType.E,
	"numpad6": ToneType.F,
	"6": ToneType.F,
	"numpad7": ToneType.G,
	"7": ToneType.G,
}

export const WORKBENCH_ROUNDING_RADIUS = "48px"
export const CAREER_QUEST_CARD_ROUNDING_RADIUS = "48px"

export const PIP_ROBOT_USB_ID = {
	usbVendorId: 0x303a,
	usbProductId: 0x1001  // ESP32-S3 DevKit
}

export const DEFAULT_TRANSITION_DURATION = 1500

// Arcade game constants
export const ARCADE_CANVAS_WIDTH = 800
export const ARCADE_CANVAS_HEIGHT = 600
