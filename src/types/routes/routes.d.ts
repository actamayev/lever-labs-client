declare global {
	type StaticPageNames =
		"/" |
		"/login" |
		"/register" |
		"/register-username" |
		"/garage" |
		"/lab" |
		"/sandbox" |
		"/account" |
		"/contact"

	type PageNames = StaticPageNames | LabPages
}

export {}
