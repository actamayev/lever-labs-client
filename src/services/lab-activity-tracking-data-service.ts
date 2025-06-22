"use client"

import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { ActivityUUID, AllCommonResponses, ErrorResponse, ErrorResponses,
	RetrievedQuestionsResponse,
	RetrievedUserActivityProgressResponse, SuccessResponse } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"

export default class LabActivityTrackingDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async retrieveUserActivityProgress(): Promise<AxiosResponse<ErrorResponse | RetrievedUserActivityProgressResponse>> {
		return await this.httpClient.http.get<ErrorResponse | RetrievedUserActivityProgressResponse>(
			this.buildUrl("/retrieve-user-activity-progress")
		)
	}

	async retrieveQuizAttempts(activityUUID: ActivityUUID): Promise<AxiosResponse<ErrorResponse | RetrievedQuestionsResponse>> {
		return await this.httpClient.http.get<ErrorResponse | RetrievedQuestionsResponse>(
			this.buildUrl(`/retrieve-quiz-attempts/${activityUUID}`)
		)
	}

	async markActivityComplete(activityUUID: ActivityUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/mark-activity-complete/${activityUUID}`)
		)
	}

	async submitQuizAnswer(readingQuestionAnswerChoiceId: number): Promise<AxiosResponse<ErrorResponses | SuccessResponse>> {
		return await this.httpClient.http.post<ErrorResponses | SuccessResponse>(
			this.buildUrl(`/submit-quiz-answer/${readingQuestionAnswerChoiceId}`)
		)
	}

	async markReadingBlockComplete(readingBlockName: ContentBlockID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/mark-reading-block-complete/${readingBlockName}`)
		)
	}

	async retrieveCompletedReadingBlocks(readingUUID: ActivityUUID): Promise<AxiosResponse<ErrorResponses | ContentBlockID[]>> {
		return await this.httpClient.http.get<ErrorResponses | ContentBlockID[]>(
			this.buildUrl(`/retrieve-completed-reading-blocks/${readingUUID}`)
		)
	}
}
