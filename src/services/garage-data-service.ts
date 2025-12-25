import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@actamayev/lever-labs-common-ts/types/api"
import { PipUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import { LightAnimation } from "@actamayev/lever-labs-common-ts/types/garage"
import { BaseDataService } from "./base-data-service"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"

export default class GarageDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
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
