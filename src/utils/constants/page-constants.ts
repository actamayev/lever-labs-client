export const PrivatePageNames: PageNames[] = [
	"/garage",
	"/add-pip",
	"/sandbox",
	"/settings/profile",
	"/settings/schools",
	"/career-quest",
	// Don't include career quest sub-routes (including them results in the sidebar showing on those pages)
	"/student",
	"/class-manager",
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
	"/register-google",

	// Private:
	"/garage",
	"/add-pip",
	"/sandbox",
	"/student",
	"/class-manager",
	"/settings/profile",
	"/settings/schools",

	"/career-quest",
	"/career-quest/introduction",
	"/career-quest/obstacle-avoidance",

	// Open:
	"/contact",
	"/mission",
	"/schools",
	"/terms",
	"/privacy",
	"/community-guidelines",
	"/404"
] as const

export const careerQuestPages = [
	"/career-quest",
	"/career-quest/introduction",
	"/career-quest/obstacle-avoidance",
] as const

export const allPages = [...staticPages, ...careerQuestPages] as const

export const PageToNavigateAfterLogin = "/garage"
