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

	async uploadProfilePicture(file: File): Promise<AxiosResponse<ProfilePictureUrl | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)

		return await this.httpClient.http.post<ProfilePictureUrl | NonSuccessResponse>(
			`${this.pathHeader}/upload-profile-picture`, formData, { headers: { "Content-Type": file.type }}
		)
	}

	async removeCurrentProfilePicture(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>(
			`${this.pathHeader}/remove-current-profile-picture`
		)
	}
}
