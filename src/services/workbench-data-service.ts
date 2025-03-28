"use client"

import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class WorkbenchDataService {
	private readonly pathHeader: EndpointHeaders = "/workbench"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async playTune(tuneToPlay: TuneToPlay, pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/play-tune`, { tuneToPlay, pipUUID }
		)
	}

	async changeAudibleStatus(audibleStatus: boolean, pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			`${this.pathHeader}/change-audible-status`, { audibleStatus, pipUUID }
		)
	}
}
