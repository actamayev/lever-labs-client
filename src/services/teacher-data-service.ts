import { AxiosResponse } from "axios"
import { TeacherName } from "@bluedotrobots/common-ts/types/teacher"
import { AllCommonResponses, BasicTeacherClassroomData, ClassCodeResponse, DetailedClassroomData,
	IncomingTeacherRequestData, NonSuccessResponse, CreateHubRequest } from "@bluedotrobots/common-ts/types/api"
import { ClassCode, CareerUUID, HubUUID, ScoreboardUUID } from "@bluedotrobots/common-ts/types/utils"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { Scoreboard } from "@bluedotrobots/common-ts/types/scoreboard"

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
			this.buildUrl(`/hub/create-hub/${classCode}`), { hubName, careerUUID, slideId }
		)
	}

	async deleteHub(classCode: ClassCode, hubId: HubUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/hub/delete-hub/${classCode}`), { hubId }
		)
	}

	async setHubNewSlideId(classCode: ClassCode, hubId: HubUUID, newSlideId: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/hub/set-hub-new-slide-id/${classCode}`), { hubId, newSlideId }
		)
	}

	async updateDrivingStatusForAllStudents(
		classCode: ClassCode,
		garageDrivingStatus: boolean
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/update-garage-driving-status-all-students/${classCode}`), { garageDrivingStatus }
		)
	}

	async updateSoundsStatusForAllStudents(classCode: ClassCode, garageSoundsStatus: boolean): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/update-garage-sounds-all-students/${classCode}`), { garageSoundsStatus }
		)
	}

	async updateLightsStatusForAllStudents(classCode: ClassCode, garageLightsStatus: boolean): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/update-garage-lights-all-students/${classCode}`), { garageLightsStatus }
		)
	}

	async updateIndividualStudentDrivingStatus(
		classCode: ClassCode,
		studentId: number,
		garageDrivingStatus: boolean
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/update-individual-student-garage-driving/${classCode}`), { studentId, garageDrivingStatus }
		)
	}

	async updateIndividualStudentSoundsStatus(
		classCode: ClassCode,
		studentId: number,
		garageSoundsStatus: boolean
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/update-individual-student-garage-sounds/${classCode}`), { studentId, garageSoundsStatus }
		)
	}

	async updateIndividualStudentLightsStatus(
		classCode: ClassCode,
		studentId: number,
		garageLightsStatus: boolean
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/update-individual-student-garage-lights/${classCode}`), { studentId, garageLightsStatus }
		)
	}

	async updateIndividualStudentDisplayStatus(
		classCode: ClassCode,
		studentId: number,
		garageDisplayStatus: boolean
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/update-individual-student-garage-display/${classCode}`), { studentId, garageDisplayStatus }
		)
	}

	async updateDisplayStatusForAllStudents(
		classCode: ClassCode,
		garageDisplayStatus: boolean
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/update-garage-display-all-students/${classCode}`), { garageDisplayStatus }
		)
	}

	async createScoreboard(
		classCode: ClassCode,
		scoreboardName: string
	): Promise<AxiosResponse<Scoreboard | NonSuccessResponse>> {
		return await this.httpClient.http.post<Scoreboard | NonSuccessResponse>(
			this.buildUrl(`/scoreboard/create-scoreboard/${classCode}`), { scoreboardName }
		)
	}

	async updateScoreboardTime(
		scoreboardId: ScoreboardUUID,
		timeRemainingInSeconds: number,
		classCode: ClassCode
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/scoreboard/update-remaining-time/${classCode}`), { timeRemainingInSeconds, scoreboardId }
		)
	}

	async updateScoreboardTeamScore(
		scoreboardId: ScoreboardUUID,
		teamNumber: 1 | 2,
		newScore: number,
		classCode: ClassCode
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/scoreboard/update-team-score/${classCode}`), { teamNumber, newScore, scoreboardId }
		)
	}

	async deleteScoreboard(
		classCode: ClassCode,
		scoreboardId: ScoreboardUUID
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl(`/scoreboard/delete-scoreboard/${classCode}`), { scoreboardId }
		)
	}
}
