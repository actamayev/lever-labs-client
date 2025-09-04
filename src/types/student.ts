import { StudentClassroomData, StudentViewHubData } from "@bluedotrobots/common-ts"

declare global {
	interface ExtendedStudentViewHubData extends StudentViewHubData {
		isHubJoined: boolean
	}

	interface StudentClassroomDataWithHubs extends StudentClassroomData {
		activeHubs: ExtendedStudentViewHubData[]
	}
}

export {}
