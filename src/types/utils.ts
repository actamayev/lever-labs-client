import { LucideIcon } from "lucide-react"

declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type EndpointHeaders =
		| "/auth"
		| "/career-quest"
		| "/chat"
		| "/misc"
		| "/learn"
		| "/garage"
		| "/pip"
		| "/personal-info"
		| "/sandbox"
		| "/student"
		| "/teacher"
		| "/workbench"

	interface SidebarNavData {
		title: "Sandbox" | "Career Quest" | "Garage" | "Whiteboard" | "Class Manager" | "Quest"
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
	| "beak-inner"
	| "charging-green"
	| "question-correct-green"
	| "question-incorrect-red"
}

export {}
