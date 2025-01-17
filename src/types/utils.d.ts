import { LucideIcon } from "lucide-react"

declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type SiteThemes = "light" | "dark"

	type SidebarStates = "expanded" | "collapsed"

	type EndpointHeaders =
		"/auth" |
		"/misc" |
		"/pip" |
		"/personal-info"

	type PipUUID = string & { readonly __brand: unique symbol }

	type ActivityTitles = "Reading" | "Video" | "Code"

	interface SidebarNavData {
		title: string
		url: PageNames
		icon: LucideIcon
	}

	interface LabNavData {
		title: string
		icon: LucideIcon
		items: {
			title: ActivityTitles
			url: LabPages
		}[]
	}

	interface ElementChild {
		path: ActivityTitles
		element: JSX.Element
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

	// Create a union type for all possible route types
	type RouteType = ElementRoutes | BaseRoute

	interface HelmetData {
		[key: string]: React.ReactNode
	}
}

export {}
