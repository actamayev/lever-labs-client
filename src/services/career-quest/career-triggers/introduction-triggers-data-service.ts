import { AxiosResponse } from "axios"
import { ErrorResponses, PipUUID, SuccessResponse } from "@bluedotrobots/common-ts"
import { BaseDataService } from "../../base-data-service"
import BlueDotHttpClient from "../../../classes/blue-dot-http-client"

export default class IntroductionTriggersDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async introS2P1Enter(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/enter/s2-p1/${pipUUID}`)
		)
	}

	async introS2P1Exit(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/exit/s2-p1/${pipUUID}`)
		)
	}

	async introS2P4Enter(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/enter/s2-p4/${pipUUID}`)
		)
	}

	async introS2P4Exit(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/exit/s2-p4/${pipUUID}`)
		)
	}

	async introS3P3Enter(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/enter/s3-p3/${pipUUID}`)
		)
	}

	async introS3P3Exit(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/exit/s3-p3/${pipUUID}`)
		)
	}

	async introS5P4Enter(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/enter/s5-p4/${pipUUID}`)
		)
	}

	async introS5P5Exit(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/exit/s5-p4/${pipUUID}`)
		)
	}

	async introS6P4Enter(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/enter/s6-p4/${pipUUID}`)
		)
	}

	async introS6P4Exit(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/exit/s6-p4/${pipUUID}`)
		)
	}

	async introS7P4Enter(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/enter/s7-p4/${pipUUID}`)
		)
	}

	async introS7P4Exit(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/exit/s7-p4/${pipUUID}`)
		)
	}

	async introS7P6Enter(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/enter/s7-p6/${pipUUID}`)
		)
	}

	async introS7P6Exit(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro/exit/s7-p6/${pipUUID}`)
		)
	}
}
