import { AxiosResponse } from "axios"
import { CareerProgressData, ErrorResponses, SuccessResponse, AllCommonResponses } from "@bluedotrobots/common-ts/types/api"
import { BlocklyJson } from "@bluedotrobots/common-ts/types/sandbox"
import { CareerUUID, ChallengeUUID, PipUUID } from "@bluedotrobots/common-ts/types/utils"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { CareerType, ValidTriggerMessageType } from "@bluedotrobots/common-ts/protocol"

export default class CareerQuestDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async editCareerQuestSandboxProject(
		challengeUUID: ChallengeUUID,
		newBlocklyJson: BlocklyJson
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/edit-challenge-sandbox-project/${challengeUUID}`),
			{ newBlocklyJson }
		)
	}

	async retrieveCareerProgressData(careerUUID: CareerUUID): Promise<AxiosResponse<CareerProgressData | ErrorResponses>> {
		return await this.httpClient.http.get<CareerProgressData | ErrorResponses>(
			this.buildUrl(`/get-career-progress-data/${careerUUID}`)
		)
	}

	async updateCareerQuestUserProgress(
		currentId: string,
		careerUUID: CareerUUID,
		isFurthestSeen: boolean
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/update-career-quest-user-progress/${careerUUID}`),
			{ currentId, isFurthestSeen }
		)
	}

	async markChallengeAsSeen(challengeUUID: ChallengeUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/mark-challenge-as-seen/${challengeUUID}`)
		)
	}

	async careerTrigger<T extends CareerType>(
		careerType: T,
		triggerMessageType: ValidTriggerMessageType<T>,
		pipUUID: PipUUID
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/career-trigger"),
			{ pipUUID, careerType, triggerMessageType }
		)
	}

	async stopCareerTrigger(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/stop-career-trigger"), { pipUUID }
		)
	}
}
