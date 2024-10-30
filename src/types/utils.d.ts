declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type StaticPageNames =
		"/" |
		"/login" |
		"/register" |
		"/register-username" |
		"/the-lab" |
		"/contact"

	type PageNames = StaticPageNames

	type SiteThemes = "light" | "dark"

	type PathHeaders =
		"/auth" |
		"/pip" |
		"/personal-info"
}

export {}
