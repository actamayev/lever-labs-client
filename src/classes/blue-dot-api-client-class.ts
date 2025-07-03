"use client"

import BlueDotHttpClient from "./blue-dot-http-client"
import PipDataService from "../services/pip-data-service"
import AuthDataService from "../services/auth-data-service"
import ChatDataService from "../services/chat-data-service"
import MiscDataService from "../services/misc-data-service"
import GarageDataService from "../services/garage-data-service"
import SandboxDataService from "../services/sandbox-data-service"
import WorkbenchDataService from "../services/workbench-data-service"
import PersonalInfoDataService from "../services/personal-info-data-service"
import LabActivityTrackingDataService from "../services/lab-activity-tracking-data-service"
import CareerQuestDataService from "../services/career-quest-data-service"

class BlueDotApiClient {
	public httpClient: BlueDotHttpClient = new BlueDotHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient, "/auth")
	public labActivityTrackingDataService: LabActivityTrackingDataService = new LabActivityTrackingDataService(
		this.httpClient, "/lab-activity-tracking"
	)
	public miscDataService: MiscDataService = new MiscDataService(this.httpClient, "/misc")
	public garageDataService: GarageDataService = new GarageDataService(this.httpClient, "/garage")
	public personalInfoDataService: PersonalInfoDataService = new PersonalInfoDataService(this.httpClient, "/personal-info")
	public pipDataService: PipDataService = new PipDataService(this.httpClient, "/pip")
	public sandboxDataService: SandboxDataService = new SandboxDataService(this.httpClient, "/sandbox")
	public workbenchDataService: WorkbenchDataService = new WorkbenchDataService(this.httpClient, "/workbench")
	public chatDataService: ChatDataService = new ChatDataService(this.httpClient, "/chat")
	public careerQuestDataService: CareerQuestDataService = new CareerQuestDataService(this.httpClient, "/career-quest")

	constructor() {
	}

	public logout(): void {
		this.httpClient.logout()
	}
}

const blueDotApiClientClass = new BlueDotApiClient()

export default blueDotApiClientClass
