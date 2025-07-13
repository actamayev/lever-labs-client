import { AxiosResponse } from "axios"
import { AllCommonResponses, LightAnimation, PipUUID } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class GarageDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async lightsAnimation(lightAnimation: LightAnimation, pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/lights-animation"), { lightAnimation, pipUUID }
		)
	}
}
