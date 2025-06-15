"use client"

import isNull from "lodash-es/isNull"
import { RgbaColor } from "@uiw/color-convert"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"
import { IncomingSensorData, LightAnimation, MotorControlInput, Sounds } from "@bluedotrobots/common-ts"

class GarageClass {
	public selectedColorRgba: RgbaColor = { r: 0 , g: 255, b: 0, a: 1 }
	public selectedColorShade: number = 1
	public selectedDots: number[] = [0, 1, 2, 3, 4, 5, 6, 7]
	public dotColors: { [key: number]: RgbaColor } = {
		0: this.selectedColorRgba, // top left
		1: this.selectedColorRgba, // top right
		2: this.selectedColorRgba, // middle left
		3: this.selectedColorRgba, // middle right
		4: this.selectedColorRgba, // back left
		5: this.selectedColorRgba, // back right
		6: this.selectedColorRgba, // left headlight
		7: this.selectedColorRgba // right headlight
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

	get realColor(): RgbaColor {
		return {
			r: this.selectedColorRgba.r * this.selectedColorShade,
			g: this.selectedColorRgba.g * this.selectedColorShade,
			b: this.selectedColorRgba.b * this.selectedColorShade,
			a: this.selectedColorRgba.a * this.selectedColorShade,
		}
	}

	public updateSelectedColorByField<K extends keyof RgbaColor>(
		field: K,
		value: number
	): void {
		this.selectedColorRgba[field] = value
	}

	public setSelectedColorRgba = action((color: RgbaColor): void => {
		this.selectedColorRgba = color
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

	public setColorShade = action((newShade: number): void => {
		this.selectedColorShade = newShade
	})

	public logout() {
		this.setSelectedColorRgba({ r: 0 , g: 255, b: 0, a: 1 })
		this.selectedDots = [0, 1, 2, 3, 4, 5, 6, 7]
		this.dotColors = {
			0: { r: 0 , g: 255, b: 0, a: 1 },
			1: { r: 0 , g: 255, b: 0, a: 1 },
			2: { r: 0 , g: 255, b: 0, a: 1 },
			3: { r: 0 , g: 255, b: 0, a: 1 },
			4: { r: 0 , g: 255, b: 0, a: 1 },
			5: { r: 0 , g: 255, b: 0, a: 1 },
			6: { r: 0 , g: 255, b: 0, a: 1 },
			7: { r: 0 , g: 255, b: 0, a: 1 }
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
