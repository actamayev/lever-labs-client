"use client"

import { AxiosResponse } from "axios"
import { AllCommonResponses, ClassCode, ErrorResponse, InviteResponse, StudentClassroomData } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class StudentDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async joinClass(classCode: ClassCode): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/join-class/${classCode}`)
		)
	}

	async respondToClassroomInvitation(
		classCode: ClassCode,
		inviteResponse: InviteResponse
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

	async retrievePendingInvitations(): Promise<AxiosResponse<StudentClassroomData[] | ErrorResponse>> {
		return await this.httpClient.http.get<StudentClassroomData[] | ErrorResponse>(
			this.buildUrl("/pending-invitations")
		)
	}
}
