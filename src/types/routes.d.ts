import { allPages, careerQuestPages, labPages, staticPages } from "../utils/constants"

declare global {
	type LabPages = (typeof labPages)[number];

	type SandboxPages =
	| "/sandbox"
	| `/sandbox/${ProjectUUID}`

	type CareerQuestPages = (typeof careerQuestPages)[number];

	type StaticPageNames = (typeof staticPages)[number];

	type PageNames = (typeof allPages)[number] | SandboxPages;
}

export {}
