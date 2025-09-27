import { AxiosResponse } from "axios"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"
import { AllCommonResponses, ErrorResponse, ErrorResponses, NonSuccessResponse,
	PersonalInfoResponse, ProfilePictureUrl, SuccessResponse } from "@lever-labs/common-ts/types/api"
import { SiteThemes } from "@lever-labs/common-ts/types/utils"
import { BaseDataService } from "./base-data-service"

export default class PersonalInfoDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async retrievePersonalInfo(): Promise<AxiosResponse<PersonalInfoResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PersonalInfoResponse | ErrorResponse>(
			this.buildUrl("/get-personal-info")
		)
	}

	async setDefaultSiteTheme(newSiteTheme: SiteThemes): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/set-default-site-theme/${newSiteTheme}`)
		)
	}

	async setSandboxNotesOpenStatus(newSandboxNotesStatus: boolean): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/set-sandbox-notes-open-status/${newSandboxNotesStatus}`)
		)
	}

	async uploadProfilePicture(file: File): Promise<AxiosResponse<ProfilePictureUrl | NonSuccessResponse>> {
		const formData = new FormData()
		formData.append("file", file, file.name)

		return await this.httpClient.http.post<ProfilePictureUrl | NonSuccessResponse>(
			this.buildUrl("/upload-profile-picture"), formData, { headers: { "Content-Type": file.type }}
		)
	}

	async removeCurrentProfilePicture(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>(
			this.buildUrl("/remove-current-profile-picture")
		)
	}

	async updateName(name: string): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/update-name/${name}`)
		)
	}

	async changePassword(oldPassword: string, newPassword: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/change-password"), { oldPassword, newPassword }
		)
	}

	async updateUsername(username: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/update-username/${username}`)
		)
	}
}
