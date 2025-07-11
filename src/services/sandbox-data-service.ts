"use client"

import { AxiosResponse } from "axios"
import { AllCommonResponses, BlocklyJson, CreateSandboxProjectResponse, ErrorResponse, PipUUID, ProjectUUID,
	RetrieveSandboxProjectResponse, RetrieveSandboxProjectsResponse } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class SandboxDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async createSandboxProject(): Promise<AxiosResponse<CreateSandboxProjectResponse | ErrorResponse>> {
		return await this.httpClient.http.post<CreateSandboxProjectResponse | ErrorResponse>(
			this.buildUrl("/create-sandbox-project")
		)
	}

	async editSandboxProject(projectUUID: ProjectUUID, newBlocklyJson: BlocklyJson): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/edit-sandbox-project/${projectUUID}`),
			{ newBlocklyJson }
		)
	}

	async editSandboxProjectName(projectUUID: ProjectUUID, projectName: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/edit-sandbox-project-name/${projectUUID}`),
			{ projectName }
		)
	}

	async editSandboxProjectNotes(projectUUID: ProjectUUID, projectNotes: string): Promise<AxiosResponse<AllCommonResponses>> {
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

	async retrieveSingleSandboxProject(projectUUID: ProjectUUID): Promise<AxiosResponse<RetrieveSandboxProjectResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveSandboxProjectResponse | ErrorResponse>(
			this.buildUrl(`/retrieve-single-sandbox-project/${projectUUID}`)
		)
	}

	async starSandboxProject(projectUUID: ProjectUUID, starStatus: boolean): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/star-sandbox-project/${projectUUID}`),
			{ starStatus }
		)
	}

	async deleteSandboxProject(projectUUID: ProjectUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/delete-sandbox-project/${projectUUID}`)
		)
	}

	async sendSandboxCodeToPip(pipUUID: PipUUID, cppCode: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/send-sandbox-code-to-pip"),
			{ pipUUID, cppCode }
		)
	}

	async stopCurrentlyRunningCode(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/stop-currently-running-code"),
			{ pipUUID }
		)
	}

	async pollSensors(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/poll-sensors"),
			{ pipUUID }
		)
	}
}
