import { AxiosResponse } from "axios"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"
import { BaseDataService } from "./base-data-service"
import { ErrorResponses, SuccessResponse, LessonsResponse,
	DetailedLessonResponse, CheckCodeResponse, CheckMCQResponse } from "@lever-labs/common-ts/types/api"
import { LessonUUID, QuestionUUID } from "@lever-labs/common-ts/types/utils"

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
		questionId: QuestionUUID,
		answerChoiceId: number,
	): Promise<AxiosResponse<CheckMCQResponse | ErrorResponses>> {
		return await this.httpClient.http.post<CheckMCQResponse | ErrorResponses>(
			this.buildUrl(`/submit-block-to-function/${questionId}`), { answerChoiceId }
		)
	}

	async submitFunctionToBlockAnswer(
		questionId: QuestionUUID,
		answerChoiceId: number
	): Promise<AxiosResponse<CheckMCQResponse | ErrorResponses>> {
		return await this.httpClient.http.post<CheckMCQResponse | ErrorResponses>(
			this.buildUrl(`/submit-function-to-block/${questionId}`), { answerChoiceId }
		)
	}

	async submitFillInTheBlankAnswer(
		questionId: QuestionUUID,
		userCode: string
	): Promise<AxiosResponse<CheckCodeResponse | ErrorResponses>> {
		return await this.httpClient.http.post<CheckCodeResponse | ErrorResponses>(
			this.buildUrl(`/submit-fill-in-the-blank/${questionId}`), { userCode }
		)
	}

	async submitActionToCodeMultipleChoiceAnswer(
		questionId: QuestionUUID,
		answerChoiceId: number
	): Promise<AxiosResponse<CheckMCQResponse | ErrorResponses>> {
		return await this.httpClient.http.post<CheckMCQResponse | ErrorResponses>(
			this.buildUrl(`/submit-action-to-code-multiple-choice/${questionId}`), { answerChoiceId }
		)
	}

	async submitActionToCodeOpenEndedAnswer(
		questionId: QuestionUUID,
		userCode: string
	): Promise<AxiosResponse<CheckCodeResponse | ErrorResponses>> {
		return await this.httpClient.http.post<CheckCodeResponse | ErrorResponses>(
			this.buildUrl(`/submit-action-to-code-open-ended/${questionId}`), { userCode }
		)
	}

	async submitMatchingAnswer(
		questionId: QuestionUUID,
		codingBlockId: number,
		matchingAnswerChoiceTextId: number
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/submit-matching-answer/${questionId}`), { codingBlockId, matchingAnswerChoiceTextId }
		)
	}
}
