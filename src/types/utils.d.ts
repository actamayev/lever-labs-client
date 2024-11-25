declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type StaticPageNames =
		"/" |
		"/login" |
		"/register" |
		"/register-username" |
		"/garage" |
		"/lab" |
		"/sandbox" |
		"/sandbox-new" |
		"/account" |

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
