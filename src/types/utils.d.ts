import { IconType } from "react-icons"

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

	interface SidebarNavData {
		title: string
		url: StaticPageNames
		icon: IconType
		items?: {
			title: string
			url: StaticPageNames
		}[]
	}
}

export {}
