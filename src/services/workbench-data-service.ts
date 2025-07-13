import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { ErrorResponses, PipUUID, SuccessResponse, TuneToPlay } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"

export default class WorkbenchDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async playTune(tuneToPlay: TuneToPlay, pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl("/play-tune"), { tuneToPlay, pipUUID }
		)
	}

	async changeAudibleStatus(audibleStatus: boolean, pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl("/change-audible-status"), { audibleStatus, pipUUID }
		)
	}
}
