"use client"

import isEmpty from "lodash-es/isEmpty"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"
import defaultLedActivities from "../components/lab/lessons/led/default-led-activities"
import { UserActivityProgress } from "@bluedotrobots/common-ts"

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

	public updateActivitiesFromServer = action((serverActivities: UserActivityProgress[]): void => {
		if (isEmpty(this.activities)) {
			this.assignDefaultActivities()
		}
		// First map server activities to local activities
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

		// Find in-progress activity first
		const inProgressIndex = this.activities.findIndex(activity =>
			activity.activityStatus === "IN_PROGRESS"
		)

		if (inProgressIndex !== -1) {
			//First checks if there's an in-progress activity. If there is, mark all the ones before it as completed.
		} else {
			// If there isn't an in-progress, find the furthest completed one
			const lastCompletedIndex = this.activities.findLastIndex(activity =>
				activity.activityStatus === "COMPLETED"
			)
			// If there is a completed one, mark all the ones before it as completed, and the one right after as in progress

			if (lastCompletedIndex !== -1) {
				// If there are completed activities but no in-progress
				if (lastCompletedIndex < this.activities.length - 1) {
					// If it's not the last activity, mark the next one as in-progress
					this.activities = this.activities.map((activity, index) => ({
						...activity,
						activityStatus:
							// eslint-disable-next-line no-nested-ternary
							index <= lastCompletedIndex ? "COMPLETED" :
								index === lastCompletedIndex + 1 ? "IN_PROGRESS" :
									null
					}))
				}
				// If lastCompletedIndex is the last activity, we don't need to do anything
			} else {
				// If there aren't any completed or in progress, mark the very first activity as in-progress
				// No in-progress or completed activities, mark first as in-progress
				if (this.activities.length > 0) {
					this.activities[0].activityStatus = "IN_PROGRESS"
				}
			}
		}

		this.setDidRetrieveAllActivityProgress(true)
	})

	public logout() {
		this.setDidRetrieveAllActivityProgress(false)
		this.setIsRetrievingAllActivityProgress(false)
		this.activities = []
	}
}

const activityProgressInstance = new ActivityProgressClass()

const ActivityProgressContext = createContext(activityProgressInstance)

export default function ActivityProgressProvider ({ children }: { children: React.ReactNode }) {
	return (
		<ActivityProgressContext.Provider value={activityProgressInstance}>
			{children}
		</ActivityProgressContext.Provider>
	)
}

export const useActivityProgressContext = () => useContext(ActivityProgressContext)

