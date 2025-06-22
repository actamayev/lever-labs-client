"use client"

import { TuneToPlay } from "@bluedotrobots/common-ts"
import { action, makeAutoObservable } from "mobx"

class WorkbenchClass {
	public batteryPercentage = 100
	public isCharging = false
	public volume = 70
	public isMuted = true
	public isDropdownOpen = false
	public selectedSound: TuneToPlay = "Chime"
	public fixedWidth = 0
	public windowHeight = 0

	constructor() {
		makeAutoObservable(this)
	}

	public setVolume = action((newVolume: number): void => {
		this.volume = newVolume
	})

	public setIsMuted = action((newIsMuted: boolean): void => {
		this.isMuted = newIsMuted
	})

	public setIsDropdownOpen = action((newIsDropdownOpen: boolean): void => {
		this.isDropdownOpen = newIsDropdownOpen
	})

	public setSelectedSound = action((newSelectedSound: TuneToPlay): void => {
		this.selectedSound = newSelectedSound
	})

	public setFixedWidth = action((newFixedWidth: number): void => {
		this.fixedWidth = newFixedWidth
	})

	public setWindowHeight = action((newWindowHeight: number): void => {
		this.windowHeight = newWindowHeight
	})

	public logout() {
		this.setVolume(70)
		this.setIsMuted(true)
		this.setIsDropdownOpen(false)
		this.setSelectedSound("Chime")
		this.setFixedWidth(0)
		this.setWindowHeight(0)
	}
}

const workbenchClass = new WorkbenchClass()

export default workbenchClass
