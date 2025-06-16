"use client"

import BlueDotHttpClient from "./blue-dot-http-client"
import PipDataService from "../services/pip-data-service"
import AuthDataService from "../services/auth-data-service"
import MiscDataService from "../services/misc-data-service"
import GarageDataService from "../services/garage-data-service"
import SandboxDataService from "../services/sandbox-data-service"
import WorkbenchDataService from "../services/workbench-data-service"
import PersonalInfoDataService from "../services/personal-info-data-service"
import LabActivityTrackingDataService from "../services/lab-activity-tracking-data-service"

class BlueDotApiClient {
	public httpClient: BlueDotHttpClient = new BlueDotHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient)
	public labActivityTrackingDataService: LabActivityTrackingDataService = new LabActivityTrackingDataService(this.httpClient)
	public miscDataService: MiscDataService = new MiscDataService(this.httpClient)
	public garageDataService: GarageDataService = new GarageDataService(this.httpClient)
	public personalInfoDataService: PersonalInfoDataService = new PersonalInfoDataService(this.httpClient)
	public pipDataService: PipDataService = new PipDataService(this.httpClient)
	public sandboxDataService: SandboxDataService = new SandboxDataService(this.httpClient)
	public workbenchDataService: WorkbenchDataService = new WorkbenchDataService(this.httpClient)

	constructor() {
	}

	private initializeServices() {
		this.httpClient = new BlueDotHttpClient()
		this.authDataService = new AuthDataService(this.httpClient)
		this.labActivityTrackingDataService = new LabActivityTrackingDataService(this.httpClient)
		this.miscDataService = new MiscDataService(this.httpClient)
		this.garageDataService = new GarageDataService(this.httpClient)
		this.personalInfoDataService = new PersonalInfoDataService(this.httpClient)
		this.pipDataService = new PipDataService(this.httpClient)
		this.sandboxDataService = new SandboxDataService(this.httpClient)
		this.workbenchDataService = new WorkbenchDataService(this.httpClient)
	}

	public logout() {
		this.initializeServices()
		this.httpClient.logout()
	}
}

const blueDotApiClientClass = new BlueDotApiClient()

export default blueDotApiClientClass
