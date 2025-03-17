"use client"

import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class LabActivityTrackingDataService {
	private readonly pathHeader: EndpointHeaders = "/lab-activity-tracking"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async retrieveUserActivityProgress(): Promise<AxiosResponse<ErrorResponse | RetrievedUserActivityProgressResponse>> {
		return await this.httpClient.http.get<ErrorResponse | RetrievedUserActivityProgressResponse>(
			`${this.pathHeader}/retrieve-user-activity-progress`
		)
	}

	async retrieveQuizAttempts(activityUUID: ActivityUUID): Promise<AxiosResponse<ErrorResponse | RetrievedQuestionsResponse>> {
		return await this.httpClient.http.get<ErrorResponse | RetrievedQuestionsResponse>(
			`${this.pathHeader}/retrieve-quiz-attempts/${activityUUID}`
		)
	}

	async markActivityComplete(activityUUID: ActivityUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/mark-activity-complete/${activityUUID}`
		)
	}

	async submitQuizAnswer(readingQuestionAnswerChoiceId: number): Promise<AxiosResponse<ErrorResponses | SuccessResponse>> {
		return await this.httpClient.http.post<ErrorResponses | SuccessResponse>(
			`${this.pathHeader}/submit-quiz-answer/${readingQuestionAnswerChoiceId}`
		)
	}

	async markReadingBlockComplete(readingBlockName: ContentBlockID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/mark-reading-block-complete/${readingBlockName}`
		)
	}

	async retrieveCompletedReadingBlocks(readingUUID: ActivityUUID): Promise<AxiosResponse<ErrorResponses | ContentBlockID[]>> {
		return await this.httpClient.http.get<ErrorResponses | ContentBlockID[]>(
			`${this.pathHeader}/retrieve-completed-reading-blocks/${readingUUID}`
		)
	}
}
