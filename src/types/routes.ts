import { ClassCode, LessonUUID, SandboxProjectUUID, ScoreboardUUID } from "@lever-labs/common-ts/types/utils"
import { allPages, careerQuestPages, staticPages } from "../utils/constants/page-constants"

declare global {
	type SandboxPages =
	| "/sandbox"
	| `/sandbox/${SandboxProjectUUID}`

	type QuestPages =
	| "/quest"
	| `/quest/${LessonUUID}`

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

	type ArcadePages =
	| "/arcade"
	| "/arcade/turret"
	| "/arcade/flappy"
	| "/arcade/city-driver"

	type CareerQuestPages = (typeof careerQuestPages)[number];

	type StaticPageNames = (typeof staticPages)[number];

	type PageNames = (typeof allPages)[number] | SandboxPages | TeacherPages | WhiteboardPages | QuestPages | ArcadePages;
}

export {}
