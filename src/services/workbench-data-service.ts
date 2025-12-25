import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@actamayev/lever-labs-common-ts/types/api"
import { PipUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import { BaseDataService } from "./base-data-service"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"

export default class WorkbenchDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async changeAudibleStatus(audibleStatus: boolean, pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/change-audible-status"), { audibleStatus, pipUUID }
		)
	}

	async changeVolume(volume: number, pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/change-volume"), { volume, pipUUID }
		)
	}
}
