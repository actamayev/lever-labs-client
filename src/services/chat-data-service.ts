import { AxiosResponse } from "axios"
import { ErrorResponses, SuccessResponse, StartChatSuccess, OutgoingCqChallengeCheckCodeMessage,
	ProjectUUID, AllCommonResponses, OutgoingSandboxChatData, OutgoingCqChallengeHintMessage,
	OutgoingCqChallengeGeneralMessage, CheckCodeResponse, NonSuccessResponse, ChallengeId } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class ChatDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async sendChallengeChatMessage(
		chatData: OutgoingCqChallengeGeneralMessage
	): Promise<AxiosResponse<StartChatSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<StartChatSuccess | ErrorResponses>(
			this.buildUrl("/send-challenge-chat-message"), chatData
		)
	}

	async checkCareerQuestCode(
		chatData: OutgoingCqChallengeCheckCodeMessage
	): Promise<AxiosResponse<CheckCodeResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<CheckCodeResponse | ErrorResponses>(
			this.buildUrl("/check-career-quest-code"), chatData
		)
	}

	async requestCareerQuestHint(
		chatData: OutgoingCqChallengeHintMessage
	): Promise<AxiosResponse<StartChatSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<StartChatSuccess | ErrorResponses>(
			this.buildUrl("/request-career-quest-hint"), chatData
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

	async deleteSandboxChat(projectUUID: ProjectUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/delete-sandbox-chat/${projectUUID}`)
		)
	}

	async deleteCareerQuestChat(challengeId: ChallengeId): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/delete-career-quest-chat/${challengeId}`)
		)
	}
}
