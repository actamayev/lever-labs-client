import { ClassCode, SandboxProjectUUID } from "@bluedotrobots/common-ts"
import { allPages, careerQuestPages, staticPages } from "../utils/constants/page-constants"

declare global {
	type SandboxPages =
	| "/sandbox"
	| `/sandbox/${SandboxProjectUUID}`

	type ClassManagerPages =
	| "/class-manager"
	| `/class-manager/${ClassCode}`

	type WhiteboardPages =
	| "/whiteboard"
	| `/whiteboard/${ClassCode}`

	type CareerQuestPages = (typeof careerQuestPages)[number];

	type StaticPageNames = (typeof staticPages)[number];

	type PageNames = (typeof allPages)[number] | SandboxPages | ClassManagerPages | WhiteboardPages;
}

export {}
