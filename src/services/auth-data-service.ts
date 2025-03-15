"use client"

import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class AuthDataService {
	private readonly pathHeader: EndpointHeaders = "/auth"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async login(loginInformation: LoginFormValues): Promise<AxiosResponse<LoginSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginSuccess | NonSuccessResponse>(
			`${this.pathHeader}/login`, { loginInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async logout(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>(
			`${this.pathHeader}/logout`
		)
	}

	async register(registerInformation: RegisterCredentialsToSend): Promise<AxiosResponse<RegisterSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<RegisterSuccess | NonSuccessResponse>(
			`${this.pathHeader}/register`, { registerInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async registerUsername(username: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/set-username`, { username }
		)
	}

	async googleLoginCallback(idToken: string, siteTheme: SiteThemes): Promise<AxiosResponse<GoogleAuthSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<GoogleAuthSuccess | ErrorResponses>(
			`${this.pathHeader}/google-auth/login-callback`, { idToken, siteTheme }, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
