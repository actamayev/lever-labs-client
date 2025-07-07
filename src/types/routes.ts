import { ProjectUUID } from "@bluedotrobots/common-ts"
import { allPages, careerQuestPages, staticPages } from "../utils/constants/page-constants"

declare global {
	type SandboxPages =
	| "/sandbox"
	| `/sandbox/${ProjectUUID}`

	type CareerQuestPages = (typeof careerQuestPages)[number];

	type StaticPageNames = (typeof staticPages)[number];

	type PageNames = (typeof allPages)[number] | SandboxPages;
}

export {}
