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
		| "/settings"
		| "/contact"
		| "/about"
		| "/mission"

	type PageNames = StaticPageNames | LabPages
}

export {}
