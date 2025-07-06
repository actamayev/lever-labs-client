"use client"

import { AxiosResponse } from "axios"
import { ErrorResponses, SuccessResponse, StartChatSuccess,
	OutgoingCareerQuestChatData, ProjectUUID, OutgoingSandboxChatData} from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class ChatDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async sendCareerQuestMessage(chatMessage: OutgoingCareerQuestChatData): Promise<AxiosResponse<StartChatSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<StartChatSuccess | ErrorResponses>(
			this.buildUrl("/send-career-quest-message"), chatMessage
		)
	}

	async stopChatStream(streamId: string): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl("/stop-chat-stream"), { streamId }
		)
	}

	async sendSandboxMessage(
		projectUUID: ProjectUUID,
		chatMessage: OutgoingSandboxChatData
	): Promise<AxiosResponse<StartChatSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<StartChatSuccess | ErrorResponses>(
			this.buildUrl(`/send-sandbox-message/${projectUUID}`), chatMessage
		)
	}
}
