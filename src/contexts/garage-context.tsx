"use client"

import isNull from "lodash-es/isNull"
import { RgbaColor } from "@uiw/color-convert"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

class GarageClass {
	public selectedColor: RgbaColor = { r: 255, g: 0, b: 0, a: 1 }
	public selectedDots: number[] = [0, 1, 2, 3, 4, 5]
	public dotColors: { [key: number]: RgbaColor } = {
		0: { r: 255, g: 0, b: 0, a: 1 },
		1: { r: 255, g: 0, b: 0, a: 1 },
		2: { r: 255, g: 0, b: 0, a: 1 },
		3: { r: 255, g: 0, b: 0, a: 1 },
		4: { r: 255, g: 0, b: 0, a: 1 },
		5: { r: 255, g: 0, b: 0, a: 1 }
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

	public pressedMotorKeys: Map<MotorDirection, number> = new Map()
	public pressedDirections: Set<DriveDirection> = new Set()
	public motorState: MotorControlInput = { vertical: 0, horizontal: 0 }
	public lastThrottlePercent: number = 100
	public soundPlaying: Sounds | null = null

	constructor() {
		makeAutoObservable(this)
	}

	public setSelectedColor = action((color: RgbaColor): void => {
		this.selectedColor = color
	})

	public toggleDot = action((dotIndex: number): void => {
		if (this.selectedDots.includes(dotIndex)) {
			this.selectedDots = this.selectedDots.filter((i) => i !== dotIndex)
		} else {
			this.selectedDots = [...this.selectedDots, dotIndex]
		}
	})

	public updateDotColor = action((dotIndices: number[], color: RgbaColor): void => {
		dotIndices.forEach((index) => {
			this.dotColors[index] = color
		})
	})

	public setSelectedAnimation = action((animationId: LightAnimation): void => {
		if (this.selectedAnimation === animationId) return
		this.selectedAnimation = animationId
	})

	public drive = action((direction: DriveDirection): void => {
		this.isDriving = true
		this.driveDirections.add(direction)
	})

	public stopDriving = action((direction: DriveDirection): void => {
		this.driveDirections.delete(direction)

		if (this.driveDirections.size === 0) {
			this.isDriving = false
		}
	})

	public setMotorThrottlePercent = action((newMotorThrottlePercent: number): void => {
		this.motorThrottlePercent = newMotorThrottlePercent
	})

	public setSensorData = action((incomingSensorData: IncomingSensorData | null): void => {
		this.sensorData = incomingSensorData
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
		this.pressedMotorKeys.set(direction, timestamp)
	})

	public removePressedKey = action((direction: MotorDirection): void => {
		this.pressedMotorKeys.delete(direction)
	})

	public setMotorState = action((motorControl: MotorControlInput): void => {
		this.motorState = motorControl
		this.lastThrottlePercent = this.motorThrottlePercent
	})

	public updatePressedDirections = action((directions: Set<DriveDirection>): void => {
		this.pressedDirections = directions
	})

	public setSoundPlaying = action((newSoundPlaying: Sounds | null): void => {
		this.soundPlaying = newSoundPlaying
	})

	public logout() {
		this.setSelectedColor({ r: 255, g: 0, b: 0, a: 1 })
		this.selectedDots = [0, 1, 2, 3, 4, 5]
		this.dotColors = {
			0: { r: 255, g: 0, b: 0, a: 1 },
			1: { r: 255, g: 0, b: 0, a: 1 },
			2: { r: 255, g: 0, b: 0, a: 1 },
			3: { r: 255, g: 0, b: 0, a: 1 },
			4: { r: 255, g: 0, b: 0, a: 1 },
			5: { r: 255, g: 0, b: 0, a: 1 }
		}
		this.setSelectedAnimation("No animation")
		this.isDriving = false
		this.driveDirections.clear()
		this.setMotorThrottlePercent(100)
		this.setSensorData(null)
		this.resetPitchData()

		this.pressedMotorKeys.clear()
		this.pressedDirections.clear()
		this.motorState = { vertical: 0, horizontal: 0 }
		this.lastThrottlePercent = 100
		this.setIsHornPressed(false)
		this.setAreHeadlightsOn(false)
		this.setSoundPlaying(null)
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
