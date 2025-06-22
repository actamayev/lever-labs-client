"use client"

import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { EmailUpdatesRequest, ErrorResponse, ErrorResponses, GoogleAuthSuccess, LoginRequest, LoginSuccess,
	NonSuccessResponse, RegisterRequest, RegisterSuccess, SiteThemes, SuccessResponse } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"

export default class AuthDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async login(loginInformation: LoginRequest): Promise<AxiosResponse<LoginSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginSuccess | NonSuccessResponse>(
			this.buildUrl("/login"), { loginInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async logout(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>(
			this.buildUrl("/logout")
		)
	}

	async register(registerInformation: RegisterRequest): Promise<AxiosResponse<RegisterSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<RegisterSuccess | NonSuccessResponse>(
			this.buildUrl("/register"), { registerInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async registerUsername(username: string): Promise<AxiosResponse<EmailUpdatesRequest | NonSuccessResponse>> {
		return await this.httpClient.http.post<EmailUpdatesRequest | NonSuccessResponse>(
			this.buildUrl("/set-username"), { username }
		)
	}

	async googleLoginCallback(idToken: string, siteTheme: SiteThemes): Promise<AxiosResponse<GoogleAuthSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<GoogleAuthSuccess | ErrorResponses>(
			this.buildUrl("/google-auth/login-callback"), { idToken, siteTheme }, { headers: { "No-Auth-Required": "true" }}
		)
	}
}
