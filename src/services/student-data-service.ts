import { AxiosResponse } from "axios"
import { AllCommonResponses, ClassCode, ErrorResponse,
	NonSuccessResponse, StudentClassroomData, StudentViewHubData } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { UUID } from "crypto"

export default class StudentDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async joinClass(classCode: ClassCode): Promise<AxiosResponse<StudentClassroomData | ErrorResponse>> {
		return await this.httpClient.http.post<StudentClassroomData | ErrorResponse>(
			this.buildUrl(`/join-class/${classCode}`)
		)
	}

	async respondToClassroomInvitation(
		classCode: ClassCode,
		inviteResponse: "accept" | "decline"
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/respond-to-classroom-invitation/${classCode}`), { inviteResponse }
		)
	}

	async retrieveStudentClassrooms(): Promise<AxiosResponse<StudentClassroomData[] | ErrorResponse>> {
		return await this.httpClient.http.get<StudentClassroomData[] | ErrorResponse>(
			this.buildUrl("/classrooms")
		)
	}

	async joinHub(classCode: ClassCode, hubId: UUID): Promise<AxiosResponse<StudentViewHubData | NonSuccessResponse>> {
		return await this.httpClient.http.post<StudentViewHubData | NonSuccessResponse>(
			this.buildUrl(`/join-hub/${classCode}`), { hubId }
		)
	}

	async leaveHub(classCode: ClassCode, hubId: UUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/leave-hub/${classCode}`), { hubId }
		)
	}
}
