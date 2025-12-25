import { AxiosResponse } from "axios"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"
import { AllCommonResponses } from "@actamayev/lever-labs-common-ts/types/api"
import { BaseDataService } from "./base-data-service"

export default class MiscDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async subscribeForUpdates(email: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/subscribe-for-email-updates"), { email }
		)
	}
}
