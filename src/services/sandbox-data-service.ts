"use client"

import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class SandboxhDataService {
	private readonly pathHeader: EndpointHeaders = "/sandbox"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async createSandboxProject(): Promise<AxiosResponse<RetrieveSandboxProjectResponse | ErrorResponse>> {
		return await this.httpClient.http.post<RetrieveSandboxProjectResponse | ErrorResponse>(
			`${this.pathHeader}/create-sandbox-project`
		)
	}

	async editSandboxProject(projectUUID: ProjectUUID, newXml: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/edit-sandbox-project/${projectUUID}`, { newXml }
		)
	}

	async editSandboxProjectName(projectUUID: ProjectUUID, projectName: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/edit-sandbox-project-name/${projectUUID}`, { projectName }
		)
	}

	async retrieveAllSandboxProjects(): Promise<AxiosResponse<RetrieveSandboxProjectsResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveSandboxProjectsResponse | ErrorResponse>(
			`${this.pathHeader}/retrieve-all-sandbox-projects`
		)
	}

	async retrieveSingleSandboxProject(projectUUID: ProjectUUID): Promise<AxiosResponse<RetrieveSandboxProjectResponse | ErrorResponse>> {
		return await this.httpClient.http.get<RetrieveSandboxProjectResponse | ErrorResponse>(
			`${this.pathHeader}/retrieve-single-sandbox-project/${projectUUID}`
		)
	}

	async starSandboxProject(projectUUID: ProjectUUID, starStatus: boolean): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/star-sandbox-project/${projectUUID}`, { starStatus }
		)
	}

	async deleteSandboxProject(projectUUID: ProjectUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/delete-sandbox-project/${projectUUID}`
		)
	}
}
