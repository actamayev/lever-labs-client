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
	"/contact",
	"/mission",
	"/schools",
	"/terms",
	"/privacy",
	"/community-guidelines"
]

export const staticPages = [
	"/",
	"/login",
	"/register",
	"/register-username",

	// Private:
	"/garage",
	"/add-pip",
	"/sandbox",
	"/profile",

	// Open:
	"/contact",
	"/mission",
	"/schools",
	"/terms",
	"/privacy",
	"/community-guidelines",
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
	"/career-quest/introduction",
	"/career-quest/obstacle-avoidance"
] as const

export const allPages = [...staticPages, ...labPages, ...careerQuestPages] as const

export const PageToNavigateAfterLogin = "/garage"
