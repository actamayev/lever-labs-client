import { LucideIcon } from "lucide-react"

declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type EndpointHeaders =
		| "/auth"
		| "/career-quest"
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

	// Define the lesson routes structure
	interface LessonRoutes {
		path: "led"
		children: ElementChild[]
	}

	// Define the base route structure
	interface BaseRoute {
		index?: boolean
		path?: string
		element: JSX.Element
		children?: ElementChild[]
	}

	interface ElementChild {
		path: ActivityTypePath
		element: JSX.Element
	}

	// Create a union type for all possible route types
	type RouteType = LessonRoutes | BaseRoute

	interface HelmetData {
		[key: string]: React.ReactNode
	}

	//Auth
	type LoginOrRegister = "Login" | "Register"
	interface RegisterFormValues {
		age: number | null
		email: string
		username: string
		password: string
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
