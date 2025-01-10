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

	type MotorLabPages =
		| "/lab/motor/reading"
		| "/lab/motor/video"
		| "/lab/motor/code"

	type LedLabPages =
		| "/lab/led/reading"
		| "/lab/led/video"
		| "/lab/led/code"

	type LabPages =
		| "/lab/welcome"
		| MotorLabPages
		| LedLabPages

	type PageNames = StaticPageNames | LabPages
}

export {}
