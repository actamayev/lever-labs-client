"use client"

import { action, makeAutoObservable } from "mobx"
import { BatteryMonitorData, BatteryMonitorDataFull, BatteryMonitorDataItem, TuneToPlay } from "@bluedotrobots/common-ts"

class WorkbenchClass {
	public batteryData: BatteryMonitorData | null = null
	public batteryDataLastUpdated: Date | null = null
	public volume = 70
	public isMuted = true
	public selectedSound: TuneToPlay = "Chime"
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

	private setBatteryDataNull = action((): void => {
		this.batteryData = null
		this.batteryDataLastUpdated = null
	})

	private initializeBatteryData = action((): void => {
		this.batteryData = {
			stateOfCharge: 0,
			voltage: 0,
			current: 0,
			power: 0,
			remainingCapacity: 0,
			fullCapacity: 0,
			health: 0,
			isCharging: false,
			isDischarging: false,
			isLowBattery: false,
			isCriticalBattery: false,
			estimatedTimeToEmpty: 0,
			estimatedTimeToFull: 0,
		}
	})

	// These are my types for the battery data item:
	// Helper that properly types the assignment
	private assignBatteryValue<K extends keyof BatteryMonitorData>(
		key: K,
		value: BatteryMonitorData[K]
	): void {
		if (!this.batteryData) {
			this.initializeBatteryData()
		}
		(this.batteryData as BatteryMonitorData)[key] = value
	}

	public setBatteryDataItem = action((batteryDataItem: BatteryMonitorDataItem): void => {
		this.assignBatteryValue(
			batteryDataItem.key,
			batteryDataItem.value as BatteryMonitorData[typeof batteryDataItem.key]
		)
	})

	public setBatteryData = action((batteryData: BatteryMonitorDataFull): void => {
		this.batteryData = batteryData.batteryData
	})

	public setBatteryDataLastUpdated = action((newBatteryDataLastUpdated: Date): void => {
		this.batteryDataLastUpdated = newBatteryDataLastUpdated
	})

	public logout(): void {
		this.setVolume(70)
		this.setIsMuted(true)
		this.setSelectedSound("Chime")
		this.setIsWiFiDialogOpen(false)
		this.setFixedWidth(0)
		this.setWindowHeight(0)
		this.setBatteryDataNull()
	}
}

const workbenchClass = new WorkbenchClass()

export default workbenchClass
