import { AxiosResponse } from "axios"
import { TeacherName } from "@bluedotrobots/common-ts/types/teacher"
import { AllCommonResponses, BasicTeacherClassroomData, ClassCodeResponse, DetailedClassroomData,
	IncomingTeacherRequestData, NonSuccessResponse, CreateHubRequest } from "@bluedotrobots/common-ts/types/api"
import { ClassCode, CareerUUID, HubUUID } from "@bluedotrobots/common-ts/types/utils"
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

	async editTeacherNameData(teacherNameData: TeacherName): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/edit-teacher-name-data"), { teacherNameData }
		)
	}

	async createClassroom(classroomName: string): Promise<AxiosResponse<ClassCodeResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<ClassCodeResponse | NonSuccessResponse>(
			this.buildUrl("/create-classroom"), { classroomName }
		)
	}

	async editClassroomName(classroomName: string, classCode: ClassCode): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/edit-classroom-name/${classCode}`), { classroomName }
		)
	}

	async retrieveBasicClassroomInfo(): Promise<AxiosResponse<BasicTeacherClassroomData[] | NonSuccessResponse>> {
		return await this.httpClient.http.get<BasicTeacherClassroomData[] | NonSuccessResponse>(
			this.buildUrl("/retrieve-basic-classroom-info")
		)
	}

	async retrieveDetailedClassroomInfo(classCode: ClassCode): Promise<AxiosResponse<DetailedClassroomData | NonSuccessResponse>> {
		return await this.httpClient.http.get<DetailedClassroomData | NonSuccessResponse>(
			this.buildUrl(`/retrieve-detailed-classroom-info/${classCode}`)
		)
	}

	async createHub(
		classCode: ClassCode,
		hubName: string,
		careerUUID: CareerUUID,
		slideId: string
	): Promise<AxiosResponse<CreateHubRequest | NonSuccessResponse>> {
		return await this.httpClient.http.post<CreateHubRequest | NonSuccessResponse>(
			this.buildUrl(`/create-hub/${classCode}`), { hubName, careerUUID, slideId }
		)
	}

	async deleteHub(classCode: ClassCode, hubId: HubUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/delete-hub/${classCode}`), { hubId }
		)
	}

	async setHubNewSlideId(classCode: ClassCode, hubId: HubUUID, newSlideId: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/set-hub-new-slide-id/${classCode}`), { hubId, newSlideId }
		)
	}
}
