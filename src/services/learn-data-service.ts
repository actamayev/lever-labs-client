import { AxiosResponse } from "axios"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"
import { BaseDataService } from "./base-data-service"
import { ErrorResponses, SuccessResponse, LessonsResponse, DetailedLessonResponse, CheckCodeResponse} from "@lever-labs/common-ts/types/api"
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

	async getDetailedLesson(lessonId: LessonUUID): Promise<AxiosResponse<DetailedLessonResponse | ErrorResponses>> {
		return await this.httpClient.http.get<DetailedLessonResponse | ErrorResponses>(
			this.buildUrl(`/get-detailed-lesson/${lessonId}`)
		)
	}

	async markLessonComplete(lessonId: LessonUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/mark-lesson-complete/${lessonId}`)
		)
	}

	async submitBlockToFunctionAnswer(
		lessonId: LessonUUID,
		answerChoiceId: number,
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/submit-block-to-function/${lessonId}`), { answerChoiceId }
		)
	}

	async submitFunctionToBlockAnswer(
		lessonId: LessonUUID,
		answerChoiceId: number
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/submit-function-to-block/${lessonId}`), { answerChoiceId }
		)
	}

	async submitFillInTheBlankAnswer(
		lessonId: LessonUUID,
		fillInTheBlankId: string,
		userCode: string
	): Promise<AxiosResponse<CheckCodeResponse | ErrorResponses>> {
		return await this.httpClient.http.post<CheckCodeResponse | ErrorResponses>(
			this.buildUrl(`/submit-fill-in-the-blank/${lessonId}`), { fillInTheBlankId, userCode }
		)
	}
}
