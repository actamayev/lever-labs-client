"use client"

import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

class WorkbenchClass {
	public workbenchItemToShow: WorkbenchItemsToShow = null
	public batteryPercentage = 100
	public isCharging = false

	constructor() {
		makeAutoObservable(this)
	}

	public setWorkbenchItemToShow = action((newWorkBenchItemToShow:WorkbenchItemsToShow): void => {
		this.workbenchItemToShow = newWorkBenchItemToShow
	})

	public logout() {
		this.setWorkbenchItemToShow(null)
	}
}

const workbenchInstance = new WorkbenchClass()

const WorkbenchContext = createContext(workbenchInstance)

export default function WorkbenchProvider ({ children }: { children: React.ReactNode }) {
	return (
		<WorkbenchContext.Provider value={workbenchInstance}>
			{children}
		</WorkbenchContext.Provider>
	)
}

export const useWorkbenchContext = () => useContext(WorkbenchContext)
