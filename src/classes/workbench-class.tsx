"use client"

import { action, makeAutoObservable } from "mobx"
import { TuneToPlay } from "@bluedotrobots/common-ts"

class WorkbenchClass {
	public batteryPercentage = 100
	public isCharging = false
	public volume = 70
	public isMuted = true
	public selectedSound: TuneToPlay = "Breeze"
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
		this.setFixedWidth(0)
		this.setWindowHeight(0)
	}
}

const workbenchClass = new WorkbenchClass()

export default workbenchClass
