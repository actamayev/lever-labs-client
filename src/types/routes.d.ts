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

	type ElementLabPages =
		| "/lab/element-1"
		| "/lab/element-2"
		| "/lab/element-3"

	type MotorLabPages =
		| "/lab/element-1/motor"
		| "/lab/element-1/motor/reading"
		| "/lab/element-1/motor/video"
		| "/lab/element-1/motor/code"

	type LedLabPages =
		| "/lab/element-1/led"
		| "/lab/element-1/led/reading"
		| "/lab/element-1/led/video"
		| "/lab/element-1/led/code"

	type LabPages =
		| "/lab/welcome"
		| ElementLabPages
		| MotorLabPages
		| LedLabPages

	type PageNames = StaticPageNames | LabPages
}

export {}
