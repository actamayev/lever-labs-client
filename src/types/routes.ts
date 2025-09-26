import { ClassCode, SandboxProjectUUID, ScoreboardUUID } from "@bluedotrobots/common-ts/types/utils"
import { allPages, careerQuestPages, staticPages } from "../utils/constants/page-constants"

declare global {
	type SandboxPages =
	| "/sandbox"
	| `/sandbox/${SandboxProjectUUID}`

	type TeacherPages =
	| "/scoreboard"
	| `/scoreboard/${ClassCode}/${ScoreboardUUID}`
	| ClassManagerPages

	type ClassManagerPages =
	| "/class-manager"
	| `/class-manager/${ClassCode}`

	type WhiteboardPages =
	| "/whiteboard"
	| `/whiteboard/${ClassCode}`

	type CareerQuestPages = (typeof careerQuestPages)[number];

	type StaticPageNames = (typeof staticPages)[number];

	type PageNames = (typeof allPages)[number] | SandboxPages | TeacherPages | WhiteboardPages;
}

export {}
