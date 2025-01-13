declare global {
	type StaticPageNames =
		| "/"
		| "/login"
		| "/register"
		| "/register-username"
		| "/garage"
		| "/lab"
		| "/add-pip"
		| "/sandbox"
		| "/account"
		| "/contact"

	type PageNames = StaticPageNames | LabPages
}

export {}
