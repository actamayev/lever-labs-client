"use client"

import { AxiosResponse } from "axios"
import { AllCommonResponses, BasicTeacherClassroomData, ClassCode, ClassCodeResponse, DetailedClassroomData,
	IncomingClassroomData, IncomingTeacherRequestData, NonSuccessResponse } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class TeacherDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async requestBecomeTeacher(teacherRequestData: IncomingTeacherRequestData): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/request-become-teacher"), { teacherRequestData }
		)
	}

	async createClassroom(createClassroomData: IncomingClassroomData): Promise<AxiosResponse<ClassCodeResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<ClassCodeResponse | NonSuccessResponse>(
			this.buildUrl("/create-classroom"), { createClassroomData }
		)
	}

	async retrieveBasicClassroomInfo(): Promise<AxiosResponse<BasicTeacherClassroomData[] | NonSuccessResponse>> {
		return await this.httpClient.http.get<BasicTeacherClassroomData[] | NonSuccessResponse>(
			this.buildUrl("/retrieve-basic-classroom-info")
		)
	}

	async retrievePreviouslyAddedPips(classCode: ClassCode): Promise<AxiosResponse<DetailedClassroomData[] | NonSuccessResponse>> {
		return await this.httpClient.http.get<DetailedClassroomData[] | NonSuccessResponse>(
			this.buildUrl(`/retrieve-detailed-classroom-info/${classCode}`)
		)
	}

	async inviteStudentJoinClass(classCode: ClassCode, username: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/retrieve-pip-uuid-status/${classCode}`), { username }
		)
	}
}
