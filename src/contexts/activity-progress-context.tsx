import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"
import defaultLedActivities from "../components/lab/element-1/led/default-led-activities"

class ActivityProgressClass {
	public didRetrieveAllActivityProgress = false
	public isRetrievingActivityProgress = false
	public activities: FullActivity[] = []

	constructor() {
		makeAutoObservable(this)
		this.assignDefaultActivities()
	}

	private assignDefaultActivities() {
		this.activities = defaultLedActivities.map(activity => ({
			...activity,
			activityStatus: null,
			activityName: "",
			activityType: "Loading"
		}))
	}

	private setDidRetrieveAllActivityProgress = action((newState: boolean): void => {
		this.didRetrieveAllActivityProgress = newState
	})

	public setIsRetrievingAllActivityProgress = action((newState: boolean): void => {
		this.isRetrievingActivityProgress = newState
	})

	public updateActivitiesFromServer(serverActivities: UserActivityProgress[]): void {
		this.activities = this.activities.map(activity => {
			const serverActivity = serverActivities.find(
				sa => sa.activityUUID === activity.activityUUID
			)
			if (!serverActivity) return activity

			return {
				...activity,
				activityStatus: serverActivity.status,
				activityName: serverActivity.activityName,
				activityType: serverActivity.activityType
			}
		})
		this.setDidRetrieveAllActivityProgress(true)
	}

	public logout() {
		this.setDidRetrieveAllActivityProgress(false)
		this.setIsRetrievingAllActivityProgress(false)
	}
}

const ActivityProgressContext = createContext(new ActivityProgressClass())

export default function ActivityProgressProvider ({ children }: { children: React.ReactNode }) {
	const activityProgressClass = useMemo(() => new ActivityProgressClass(), [])

	return (
		<ActivityProgressContext.Provider value={activityProgressClass}>
			{children}
		</ActivityProgressContext.Provider>
	)
}

export const useActivityProgressContext = () => useContext(ActivityProgressContext)

