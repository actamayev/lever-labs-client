import { LucideIcon } from "lucide-react"

declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type EndpointHeaders =
		| "/auth"
		| "/chat"
		| "/lab-activity-tracking"
		| "/misc"
		| "/garage"
		| "/pip"
		| "/personal-info"
		| "/sandbox"
		| "/workbench"

	interface SidebarNavData {
		title: "Sandbox" | "Career Quest" | "Lab" | "Garage"
		url: PageNames
		icon: LucideIcon
		textColor: string
	}

	//Auth
	type LoginOrRegister = "Login" | "Register"
	interface RegisterFormValues {
		age: number | null
		email: string
		username: string
		password: string
	}

	interface NewGoogleInfoFormValues {
		age: number | null
		username: string
	}

	//Sandbox
	type HexColor = string & { readonly __brand: unique symbol }

	type DuolingoColors =
	| "macaw"
	| "cardinal"
	| "bee"
	| "fox"
	| "beetle"
	| "humpback"
	| "beakInner"
}

export {}
