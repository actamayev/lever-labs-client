import { StudentViewHubData } from "@lever-labs/common-ts/types/hub"
import { StudentClassroomData } from "@lever-labs/common-ts/types/api"

declare global {
	interface ExtendedStudentViewHubData extends StudentViewHubData {
		isHubJoined: boolean
	}

	interface StudentClassroomDataWithHubs extends StudentClassroomData {
		activeHubs: ExtendedStudentViewHubData[]
	}
}

export {}
