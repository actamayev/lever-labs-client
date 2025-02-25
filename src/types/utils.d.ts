import { LucideIcon } from "lucide-react"

declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type SiteThemes = "light" | "dark"

	type SidebarStates = "expanded" | "collapsed"

	type EndpointHeaders =
		| "/auth"
		| "/lab-activity-tracking"
		| "/misc"
		| "/pip"
		| "/personal-info"

	type PipUUID = string & { readonly __brand: unique symbol }

	interface SidebarNavData {
		title: string
		url: PageNames
		icon: LucideIcon
	}

	// Define the element routes structure
	interface ElementRoutes {
		path: string
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
	type RouteType = ElementRoutes | BaseRoute

	interface HelmetData {
		[key: string]: React.ReactNode
	}

	type BlocklyCategoryColours = 30 | 120 | 180 | 218

	type BlocklyCategoryName = "Logic" | "Sensors" | "Motors" | "Pip"

	type PageTransitionDirections = null | "left" | "right"
}

export {}
