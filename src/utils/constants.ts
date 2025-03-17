"use client"

export const bentoIconSize = 40

export const showPrimarySidebarPages: PageNames[] = [
	// "/garage",
	"/add-pip",
	"/sandbox",
	"/settings",
	"/lab",
	"/lab/welcome",
]

export const logicCategoryColour: BlocklyCategoryColours = 30
export const sensorsCategoryColour: BlocklyCategoryColours = 180
export const motorsCategoryColour: BlocklyCategoryColours = 120
export const pipCategoryColour: BlocklyCategoryColours = 218

export const PrivatePageNames: PageNames[] = [
	// "/garage",
	"/lab",
	"/add-pip",
	"/sandbox",
	"/settings"
]

export const staticPages = [
	"/",
	"/login",
	"/register",
	"/register-username",
	// "/garage",
	"/lab",
	"/add-pip",
	"/sandbox",
	"/settings",
	"/contact",
	"/mission",
	"/schools"
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

export const allPages = [...staticPages, ...labPages] as const
