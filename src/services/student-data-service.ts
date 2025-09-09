import { AxiosResponse } from "axios"
import { AllCommonResponses, ErrorResponse,
	NonSuccessResponse, StudentClassroomData } from "@bluedotrobots/common-ts/types/api"
import { ClassCode, HubUUID } from "@bluedotrobots/common-ts/types/utils"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { StudentViewHubData } from "@bluedotrobots/common-ts/types/hub"

export default class StudentDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async joinClass(classCode: ClassCode): Promise<AxiosResponse<StudentClassroomData | ErrorResponse>> {
		return await this.httpClient.http.post<StudentClassroomData | ErrorResponse>(
			this.buildUrl(`/join-class/${classCode}`)
		)
	}

	async retrieveStudentClassrooms(): Promise<AxiosResponse<StudentClassroomData[] | ErrorResponse>> {
		return await this.httpClient.http.get<StudentClassroomData[] | ErrorResponse>(
			this.buildUrl("/classrooms")
		)
	}

	async joinHub(classCode: ClassCode, hubId: HubUUID): Promise<AxiosResponse<StudentViewHubData | NonSuccessResponse>> {
		return await this.httpClient.http.post<StudentViewHubData | NonSuccessResponse>(
			this.buildUrl(`/join-hub/${classCode}`), { hubId }
		)
	}

	async leaveHub(classCode: ClassCode, hubId: HubUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/leave-hub/${classCode}`), { hubId }
		)
	}

	async sendDinoScore(score: number, hubId: HubUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/send-dino-score"), { score, hubId }
		)
	}
}
