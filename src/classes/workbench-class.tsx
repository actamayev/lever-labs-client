"use client"

import { action, makeAutoObservable } from "mobx"
import { TuneToPlay } from "@bluedotrobots/common-ts"

class WorkbenchClass {
	public batteryPercentage = 100
	public isCharging = false
	public volume = 70
	public isMuted = true
	public selectedSound: TuneToPlay = "Breeze"
	public isWiFiDialogOpen: boolean = false
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

	public setSelectedSound = action((newSelectedSound: TuneToPlay): void => {
		this.selectedSound = newSelectedSound
	})

	public setIsWiFiDialogOpen = action((newIsWiFiDialogOpen: boolean): void => {
		this.isWiFiDialogOpen = newIsWiFiDialogOpen
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
		this.setSelectedSound("Breeze")
		this.setIsWiFiDialogOpen(false)
		this.setFixedWidth(0)
		this.setWindowHeight(0)
	}
}

const workbenchClass = new WorkbenchClass()

export default workbenchClass
