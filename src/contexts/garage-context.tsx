"use client"

import isNull from "lodash-es/isNull"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

class GarageClass {
	public selectedColor: string = "#00bcd4"
	public selectedDots: number[] = [0, 1, 2, 3, 4, 5]
	public dotColors: { [key: number]: string } = {
		0: "#00bcd4",
		1: "#00bcd4",
		2: "#00bcd4",
		3: "#00bcd4",
		4: "#00bcd4",
		5: "#00bcd4"
	}
	public selectedAnimation: LightAnimation = "No animation"

	// Driving state
	public isDriving: boolean = false
	public driveDirections: Set<DriveDirection> = new Set()
	public motorThrottlePercent: number = 100

	// Sensor Data:
	public sensorData: IncomingSensorData | null = null
	public pitchData: number[] = []

	//Horn and headlights
	public isHornPressed: boolean = false
	public areHeadlightsOn: boolean = false

	public pressedKeys: Map<MotorDirection, number> = new Map()
	public pressedDirections: Set<DriveDirection> = new Set()
	public motorState: MotorControlInput = { vertical: 0, horizontal: 0 }
	public lastThrottlePercent: number = 100

	constructor() {
		makeAutoObservable(this)
	}

	public setSelectedColor = action((color: string): void => {
		this.selectedColor = color
	})

	public toggleDot = action((dotIndex: number): void => {
		if (this.selectedDots.includes(dotIndex)) {
			this.selectedDots = this.selectedDots.filter((i) => i !== dotIndex)
		} else {
			this.selectedDots = [...this.selectedDots, dotIndex]
		}
	})

	public updateDotColor = action((dotIndices: number[], color: string): void => {
		dotIndices.forEach((index) => {
			this.dotColors[index] = color
		})
	})

	public setSelectedAnimation = action((animationId: LightAnimation): void => {
		if (this.selectedAnimation === animationId) return
		this.selectedAnimation = animationId
	})

	// Driving methods
	public drive = action((direction: DriveDirection): void => {
		this.isDriving = true
		this.driveDirections.add(direction)

		// In a real app, you would send commands to the robot here
		console.log(`Driving ${direction}`)
	})

	public stopDriving = action((direction: DriveDirection): void => {
		this.driveDirections.delete(direction)

		if (this.driveDirections.size === 0) {
			this.isDriving = false
		}

		// In a real app, you would send stop commands to the robot here
		console.log(`Stopped driving ${direction}`)
	})

	public setMotorThrottlePercent = action((newMotorThrottlePercent: number): void => {
		this.motorThrottlePercent = newMotorThrottlePercent
	})

	public setSensorData = action((incomingSensorData: IncomingSensorData | null): void => {
		this.sensorData = incomingSensorData
		// console.log(incomingSensorData?.sensorPayload)
		if (isNull(incomingSensorData)) return
		this.addPitchData(incomingSensorData)
	})

	public addPitchData = action((incomingSensorData: IncomingSensorData): void => {
		this.pitchData.push(incomingSensorData.sensorPayload.pitch)
	})

	public resetPitchData = action((): void => {
		this.pitchData = []
	})

	public setIsHornPressed = action((newHornState: boolean): void => {
		this.isHornPressed = newHornState
	})

	public setAreHeadlightsOn = action((newHeadlightsState: boolean): void => {
		this.areHeadlightsOn = newHeadlightsState
	})

	public setPressedKey = action((direction: MotorDirection, timestamp: number): void => {
		this.pressedKeys.set(direction, timestamp)
	})

	public removePressedKey = action((direction: MotorDirection): void => {
		this.pressedKeys.delete(direction)
	})

	public setMotorState = action((motorControl: MotorControlInput): void => {
		this.motorState = motorControl
		this.lastThrottlePercent = this.motorThrottlePercent
	})

	public updatePressedDirections = action((directions: Set<DriveDirection>): void => {
		this.pressedDirections = directions
	})

	public logout() {
		this.setSelectedColor("#00bcd4")
		this.selectedDots = [0, 1, 2, 3, 4, 5]
		this.dotColors = {
			0: "#00bcd4",
			1: "#00bcd4",
			2: "#00bcd4",
			3: "#00bcd4",
			4: "#00bcd4",
			5: "#00bcd4"
		}
		this.setSelectedAnimation("No animation")
		this.isDriving = false
		this.driveDirections.clear()
		this.setMotorThrottlePercent(100)
		this.setSensorData(null)
		this.resetPitchData()

		this.pressedKeys.clear()
		this.pressedDirections.clear()
		this.motorState = { vertical: 0, horizontal: 0 }
		this.lastThrottlePercent = 100
	}
}

const garageInstance = new GarageClass()

const GarageContext = createContext(garageInstance)

export default function GarageProvider({ children }: { children: React.ReactNode }) {
	return (
		<GarageContext.Provider value={garageInstance}>
			{children}
		</GarageContext.Provider>
	)
}

export const useGarageContext = () => useContext(GarageContext)
