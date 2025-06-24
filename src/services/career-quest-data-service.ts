"use client"

import { AxiosResponse } from "axios"
import { ErrorResponses, SuccessResponse, IncomingChatData, StartChatSuccess } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class CareerQuestDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async sendChatMessage(chatMessage: IncomingChatData): Promise<AxiosResponse<StartChatSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<StartChatSuccess | ErrorResponses>(
			this.buildUrl("/chat"), chatMessage
		)
	}

	async stopChatStream(streamId: string): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl("/stop-chat-stream"), { streamId }
		)
	}
}
