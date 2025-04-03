"use client"

import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class PersonalInfoDataService {
	private readonly pathHeader: EndpointHeaders = "/personal-info"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async retrievePersonalInfo(): Promise<AxiosResponse<PersonalInfoResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PersonalInfoResponse | ErrorResponse>(
			`${this.pathHeader}/get-personal-info`
		)
	}

	async setDefaultSiteTheme(newSiteTheme: SiteThemes): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/set-default-site-theme/${newSiteTheme}`
		)
	}

	async setSandboxNotesOpenStatus(newSandboxNotesStatus: boolean): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/set-sandbox-notes-open-status/${newSandboxNotesStatus}`
		)
	}
}
