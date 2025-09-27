import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@lever-labs/common-ts/types/api"
import { PipUUID } from "@lever-labs/common-ts/types/utils"
import { LightAnimation } from "@lever-labs/common-ts/types/garage"
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

	async createDisplayBuffer(buffer: Uint8Array, pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/display-buffer"), { buffer, pipUUID }
		)
	}
}
