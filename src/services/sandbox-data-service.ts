import { AxiosResponse } from "axios"
import { AllCommonResponses, CreateSandboxProjectResponse, ErrorResponse,
	RetrieveSandboxProjectResponse, RetrieveSandboxProjectsResponse,
	UsbBytecodeResponse, ErrorResponses, SearchByUsernameResult } from "@lever-labs/common-ts/types/api"
import { SandboxProjectUUID, PipUUID } from "@lever-labs/common-ts/types/utils"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { BaseDataService } from "./base-data-service"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"

export default class SandboxDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async createSandboxProject(): Promise<AxiosResponse<CreateSandboxProjectResponse | ErrorResponse>> {
		return await this.httpClient.http.post<CreateSandboxProjectResponse | ErrorResponse>(
			this.buildUrl("/create-sandbox-project")
		)
	}

	async editSandboxProject(projectUUID: SandboxProjectUUID, newBlocklyJson: BlocklyJson): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/edit-sandbox-project/${projectUUID}`),
			{ newBlocklyJson }
		)
	}

	async editSandboxProjectName(projectUUID: SandboxProjectUUID, projectName: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/edit-sandbox-project-name/${projectUUID}`),
			{ projectName }
		)
	}

	async editSandboxProjectNotes(projectUUID: SandboxProjectUUID, projectNotes: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/edit-sandbox-project-notes/${projectUUID}`),
			{ projectNotes }
		)
	}

	async retrieveAllSandboxProjects(): Promise<AxiosResponse<RetrieveSandboxProjectsResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveSandboxProjectsResponse | ErrorResponse>(
			this.buildUrl("/retrieve-all-sandbox-projects")
		)
	}

	async retrieveSingleSandboxProject(
		projectUUID: SandboxProjectUUID
	): Promise<AxiosResponse<RetrieveSandboxProjectResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveSandboxProjectResponse | ErrorResponse>(
			this.buildUrl(`/retrieve-single-sandbox-project/${projectUUID}`)
		)
	}

	async starSandboxProject(projectUUID: SandboxProjectUUID, starStatus: boolean): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/star-sandbox-project/${projectUUID}`),
			{ starStatus }
		)
	}

	async deleteSandboxProject(projectUUID: SandboxProjectUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/delete-sandbox-project/${projectUUID}`)
		)
	}

	async sendSandboxCodeToPipWifi(pipUUID: PipUUID, cppCode: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/send-sandbox-code-to-pip-wifi"),
			{ pipUUID, cppCode }
		)
	}

	async sendSandboxCodeToPipUsb(cppCode: string): Promise<AxiosResponse<UsbBytecodeResponse | ErrorResponses>> {
		return await this.httpClient.http.post<UsbBytecodeResponse | ErrorResponse>(
			this.buildUrl("/send-sandbox-code-to-pip-usb"),
			{ cppCode }
		)
	}

	async stopCurrentlyRunningCode(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/stop-currently-running-code"),
			{ pipUUID }
		)
	}

	async shareSandboxProject(projectUUID: SandboxProjectUUID, userIdSharedWith: number): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/share-sandbox-project/${projectUUID}`),
			{ userIdSharedWith }
		)
	}

	async removeSandboxProjectShare(
		projectUUID: SandboxProjectUUID,
		userIdToUnshareWith: number
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/unshare-sandbox-project/${projectUUID}`),
			{ userIdToUnshareWith }
		)
	}

	async searchByUsername(username: string): Promise<AxiosResponse<SearchByUsernameResult | ErrorResponses>> {
		return await this.httpClient.http.post<SearchByUsernameResult | ErrorResponses>(
			this.buildUrl("/search-by-username/"),
			{ username }
		)
	}
}
