import { AxiosResponse } from "axios"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"
import { BaseDataService } from "./base-data-service"
import { ErrorResponses, SuccessResponse, LessonsResponse, DetailedLessonResponse} from "@lever-labs/common-ts/types/api"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"

export default class LearnDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async getLessons(): Promise<AxiosResponse<LessonsResponse | ErrorResponses>> {
		return await this.httpClient.http.get<LessonsResponse | ErrorResponses>(
			this.buildUrl("/get-all-lessons")
		)
	}

	async getDetailedLesson(lessonUUID: LessonUUID): Promise<AxiosResponse<DetailedLessonResponse | ErrorResponses>> {
		return await this.httpClient.http.get<DetailedLessonResponse | ErrorResponses>(
			this.buildUrl(`/get-detailed-lesson/${lessonUUID}`)
		)
	}

	async markLessonComplete(lessonUUID: LessonUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/mark-lesson-complete/${lessonUUID}`)
		)
	}

	async submitBlockToFunctionAnswer(
		lessonUUID: LessonUUID,
		answerChoiceId: number,
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/submit-block-to-function/${lessonUUID}`), { answerChoiceId }
		)
	}

	async submitFunctionToBlockAnswer(
		lessonUUID: LessonUUID,
		answerChoiceId: number
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/submit-function-to-block/${lessonUUID}`), { answerChoiceId }
		)
	}

	async submitFillInTheBlankAnswer(
		lessonUUID: LessonUUID,
		fillInTheBlankId: string,
		answer: string
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/submit-fill-in-the-blank/${lessonUUID}`), { fillInTheBlankId, answer }
		)
	}
}
