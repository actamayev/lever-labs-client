import { AxiosResponse } from "axios"
import { AllCommonResponses } from "@lever-labs/common-ts/types/api"
import { PipUUID } from "@lever-labs/common-ts/types/utils"
import { TuneToPlay } from "@lever-labs/common-ts/types/workbench"
import { BaseDataService } from "./base-data-service"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"

export default class WorkbenchDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
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
