import { IconType } from "react-icons"

declare global {
	type EmailOrUnknown = "Email" | "Unknown"

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

	type PageNames = StaticPageNames

	type SiteThemes = "light" | "dark"

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
