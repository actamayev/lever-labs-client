export const PrivatePageNames: PageNames[] = [
	"/garage",
	"/sandbox",
	"/settings/profile",
	"/settings/schools",
	"/career-quest",
	// Don't include career quest sub-routes (including them results in the sidebar showing on those pages)
	"/class-manager",
	"/whiteboard",
	"/scoreboard",
	"/quest",
	"/arcade"
]

// These are pages that you can view if you're logged in or not.
export const OpenPages: PageNames[] = [
	"/contact",
	"/mission",
	"/terms",
	"/privacy",
	"/community-guidelines"
]

export const staticPages = [
	"/",
	"/login",
	"/register",
	"/register-google",

	// Private:
	"/garage",
	"/sandbox",
	"/class-manager",
	"/whiteboard",
	"/settings/profile",
	"/settings/schools",
	"/scoreboard",
	"/quest",
	"/arcade",
	"/arcade/turret",
	"/arcade/flappy",

	"/career-quest",
	"/career-quest/meet-pip",
	"/career-quest/obstacle-avoidance",
	"/career-quest/driving-school",

	// Open:
	"/contact",
	"/mission",
	"/terms",
	"/privacy",
	"/community-guidelines",
	"/404"
] as const

export const careerQuestPages = [
	"/career-quest",
	"/career-quest/meet-pip",
	"/career-quest/obstacle-avoidance",
	"/career-quest/driving-school",
] as const

export const allPages = [...staticPages, ...careerQuestPages] as const

export const PageToNavigateAfterLogin = "/quest"
