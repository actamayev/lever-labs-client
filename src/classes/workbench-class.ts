"use client"

import { action, makeAutoObservable } from "mobx"
import { BatteryMonitorData, BatteryMonitorDataFull, BatteryMonitorDataItem, BatteryMonitorKey } from "@lever-labs/common-ts/types/pip"
import { ToneType } from "@lever-labs/common-ts/protocol"

class WorkbenchClass {
	public batteryData: BatteryMonitorData | null = null
	public batteryDataLastUpdated: Date | null = null
	public volume = 100
	public isMuted = false
	public selectedTone: ToneType = ToneType.A
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

	public setSelectedTone = action((newSelectedTone: ToneType): void => {
		this.selectedTone = newSelectedTone
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

	public setBatteryDataNull = action((): void => {
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

	private assignBatteryValue = action(<K extends keyof BatteryMonitorData>(
		key: K,
		value: BatteryMonitorData[K]
	): void => {
		if (!this.batteryData) {
			this.initializeBatteryData()
		}
		(this.batteryData as BatteryMonitorData)[key] = value
	})

	public setBatteryDataItem = action(<K extends BatteryMonitorKey>(
		batteryDataItem: BatteryMonitorDataItem<K>
	): void => {
		this.assignBatteryValue(
			batteryDataItem.key as keyof BatteryMonitorData,
			batteryDataItem.value as BatteryMonitorData[keyof BatteryMonitorData]
		)
	})

	public setBatteryData = action((batteryData: BatteryMonitorDataFull): void => {
		this.batteryData = batteryData.batteryData
		this.batteryData.isCharging = false // We are setting this because this always comes OTA (therefore not charging)
		this.setBatteryDataLastUpdated()
	})

	public setBatteryDataLastUpdated = action((): void => {
		this.batteryDataLastUpdated = new Date()
	})

	public logout(): void {
		this.setVolume(100)
		this.setIsMuted(false)
		this.setSelectedTone(ToneType.A)
		this.setIsWiFiDialogOpen(false)
		this.setFixedWidth(0)
		this.setWindowHeight(0)
		this.setBatteryDataNull()
	}
}

const workbenchClass = new WorkbenchClass()

export default workbenchClass
