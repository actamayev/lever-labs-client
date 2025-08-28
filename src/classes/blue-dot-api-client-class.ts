"use client"

import BlueDotHttpClient from "./blue-dot-http-client"
import PipDataService from "../services/pip-data-service"
import AuthDataService from "../services/auth-data-service"
import ChatDataService from "../services/chat-data-service"
import MiscDataService from "../services/misc-data-service"
import GarageDataService from "../services/garage-data-service"
import SandboxDataService from "../services/sandbox-data-service"
import StudentDataService from "../services/student-data-service"
import TeacherDataService from "../services/teacher-data-service"
import WorkbenchDataService from "../services/workbench-data-service"
import PersonalInfoDataService from "../services/personal-info-data-service"
import CareerQuestDataService from "../services/career-quest/career-quest-data-service"

class BlueDotApiClient {
	public httpClient: BlueDotHttpClient = new BlueDotHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient, "/auth")
	public careerQuestDataService: CareerQuestDataService = new CareerQuestDataService(this.httpClient, "/career-quest")
	public chatDataService: ChatDataService = new ChatDataService(this.httpClient, "/chat")
	public miscDataService: MiscDataService = new MiscDataService(this.httpClient, "/misc")
	public garageDataService: GarageDataService = new GarageDataService(this.httpClient, "/garage")
	public personalInfoDataService: PersonalInfoDataService = new PersonalInfoDataService(this.httpClient, "/personal-info")
	public pipDataService: PipDataService = new PipDataService(this.httpClient, "/pip")
	public sandboxDataService: SandboxDataService = new SandboxDataService(this.httpClient, "/sandbox")
	public studentDataService: StudentDataService = new StudentDataService(this.httpClient, "/student")
	public teacherDataService: TeacherDataService = new TeacherDataService(this.httpClient, "/teacher")
	public workbenchDataService: WorkbenchDataService = new WorkbenchDataService(this.httpClient, "/workbench")

	constructor() {
	}

	// No logout method needed: cookies are cleared by server endpoint
}

const blueDotApiClientClass = new BlueDotApiClient()

export default blueDotApiClientClass
