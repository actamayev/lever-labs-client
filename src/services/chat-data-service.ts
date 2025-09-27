import { AxiosResponse } from "axios"
import { SuccessResponse, ErrorResponses, StartChatSuccess,
	AllCommonResponses, CheckCodeResponse, NonSuccessResponse } from "@lever-labs/common-ts/types/api"
import { ChallengeUUID, CareerUUID, SandboxProjectUUID } from "@lever-labs/common-ts/types/utils"
import { OutgoingChallengeGeneralMessage, OutgoingChallengeCheckCodeMessage,
	OutgoingChallengeHintMessage, OutgoingCareerMessage, OutgoingSandboxChatData } from "@lever-labs/common-ts/types/chat"
import { BaseDataService } from "./base-data-service"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"

export default class ChatDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async stopChatStream(streamId: string): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/stop-chat-stream/${streamId}`)
		)
	}

	// Challenge Chat Endpoints
	async sendChallengeMessage(
		chatData: OutgoingChallengeGeneralMessage,
		challengeUUID: ChallengeUUID
	): Promise<AxiosResponse<StartChatSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<StartChatSuccess | ErrorResponses>(
			this.buildUrl(`/send-challenge-message/${challengeUUID}`), chatData
		)
	}

	async checkChallengeCode(
		chatData: OutgoingChallengeCheckCodeMessage,
		challengeUUID: ChallengeUUID
	): Promise<AxiosResponse<CheckCodeResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<CheckCodeResponse | ErrorResponses>(
			this.buildUrl(`/check-challenge-code/${challengeUUID}`), chatData
		)
	}

	async requestChallengeHint(
		chatData: OutgoingChallengeHintMessage,
		challengeUUID: ChallengeUUID
	): Promise<AxiosResponse<StartChatSuccess | CheckCodeResponse | ErrorResponses>> {
		return await this.httpClient.http.post<StartChatSuccess | CheckCodeResponse |ErrorResponses>(
			this.buildUrl(`/request-challenge-hint/${challengeUUID}`), chatData
		)
	}

	async deleteChallengeChat(challengeUUID: ChallengeUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/delete-challenge-chat/${challengeUUID}`)
		)
	}

	// Career Chat Endpoints
	async sendCareerMessage(
		chatData: OutgoingCareerMessage,
		careerUUID: CareerUUID
	): Promise<AxiosResponse<StartChatSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<StartChatSuccess | ErrorResponses>(
			this.buildUrl(`/send-career-message/${careerUUID}`), chatData
		)
	}

	async deleteCareerChat(careerUUID: CareerUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/delete-career-chat/${careerUUID}`)
		)
	}

	// Sandbox Chat Endpoints
	async sendSandboxMessage(
		projectUUID: SandboxProjectUUID,
		chatMessage: OutgoingSandboxChatData
	): Promise<AxiosResponse<StartChatSuccess | ErrorResponses>> {
		return await this.httpClient.http.post<StartChatSuccess | ErrorResponses>(
			this.buildUrl(`/send-sandbox-message/${projectUUID}`), chatMessage
		)
	}

	async deleteSandboxChat(projectUUID: SandboxProjectUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/delete-sandbox-chat/${projectUUID}`)
		)
	}
}
