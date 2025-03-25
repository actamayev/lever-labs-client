"use client"

import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

class WorkbenchClass {
	public workbenchItemToShow: WorkbenchItemsToShow = null
	public hoveringOverWorkbenchCard: boolean = false
	public batteryPercentage = 100
	public isCharging = false
	public volume = 70
	public isMuted = false
	public isDropdownOpen = false

	constructor() {
		makeAutoObservable(this)
	}

	public setWorkbenchItemToShow = action((newWorkBenchItemToShow: WorkbenchItemsToShow): void => {
		this.workbenchItemToShow = newWorkBenchItemToShow
	})

	public setWorkbenchItemHoveringOver = action((newHoveringOverWorkbenchCard: boolean): void => {
		this.hoveringOverWorkbenchCard = newHoveringOverWorkbenchCard
	})

	public setVolume = action((newVolume: number): void => {
		this.volume = newVolume
	})

	public setIsMuted = action((newIsMuted: boolean): void => {
		this.isMuted = newIsMuted
	})

	public setIsDropdownOpen = action((newIsDropdownOpen: boolean): void => {
		this.isDropdownOpen = newIsDropdownOpen
	})

	public logout() {
		this.setWorkbenchItemToShow(null)
		this.setWorkbenchItemHoveringOver(false)
		this.setVolume(70)
		this.setIsMuted(false)
		this.setIsDropdownOpen(false)
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
