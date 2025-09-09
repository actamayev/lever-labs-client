import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { AllCommonResponses } from "@bluedotrobots/common-ts/types/api"
import { BaseDataService } from "./base-data-service"

export default class MiscDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async subscribeForUpdates(email: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/subscribe-for-email-updates"), { email }
		)
	}
}
