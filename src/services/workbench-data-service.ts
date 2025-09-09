import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@bluedotrobots/common-ts/types/api"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import { TuneToPlay } from "@bluedotrobots/common-ts/types/workbench"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class WorkbenchDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async playTune(tuneToPlay: TuneToPlay, pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/play-tune"), { tuneToPlay, pipUUID }
		)
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
