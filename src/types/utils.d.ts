declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type StaticPageNames =
		"/" |
		"/login" |
		"/register" |
		"/register-username" |
		"/the-garage" |
		"/the-lab" |
		"/the-sandbox" |
		"/my-account" |

		"/contact"

	type PageNames = StaticPageNames

	type SiteThemes = "light" | "dark"

	type EndpointHeaders =
		"/auth" |
		"/pip" |
		"/personal-info"

	type PipUUID = string & { readonly __brand: unique symbol }
}

export {}
