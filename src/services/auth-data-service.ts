import { AxiosResponse } from "axios"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"
import { LoginRequest, LoginSuccess, NonSuccessResponse, RegisterRequest, RegisterSuccess,
	SuccessResponse, ErrorResponse, EmailUpdatesRequest,
	GoogleAuthSuccess, NewGoogleInfoRequest, ErrorResponses } from "@actamayev/lever-labs-common-ts/types/api"
import { BaseDataService } from "./base-data-service"
import { SiteThemes } from "@actamayev/lever-labs-common-ts/types/utils"

export default class AuthDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async login(loginInformation: LoginRequest): Promise<AxiosResponse<LoginSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginSuccess | NonSuccessResponse>(
			this.buildUrl("/login"), { loginInformation }
		)
	}

	async logout(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>(
			this.buildUrl("/logout")
		)
	}

	async register(registerInformation: RegisterRequest): Promise<AxiosResponse<RegisterSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<RegisterSuccess | NonSuccessResponse>(
			this.buildUrl("/register"), { registerInformation }
		)
	}

	async registerGoogleInfo(googleInfo: NewGoogleInfoRequest): Promise<AxiosResponse<EmailUpdatesRequest | NonSuccessResponse>> {
		return await this.httpClient.http.post<EmailUpdatesRequest | NonSuccessResponse>(
			this.buildUrl("/register-google-info"), { ...googleInfo }
		)
	}

	async googleLoginCallback(idToken: string, siteTheme: SiteThemes): Promise<AxiosResponse<GoogleAuthSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<GoogleAuthSuccess | ErrorResponses>(
			this.buildUrl("/google-auth/login-callback"), { idToken, siteTheme }
		)
	}
}
