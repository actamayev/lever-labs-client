"use client"

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
	public maxDrivingSpeed: number = 100

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

	public setMaxDrivingSpeed = action((newMaxDrivingSpeed: number): void => {
		this.maxDrivingSpeed = newMaxDrivingSpeed
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
		this.setMaxDrivingSpeed(100)
	}
}

const garageInstance = new GarageClass()

const GarageContext = createContext(garageInstance)

export default function GarageProvider ({ children }: { children: React.ReactNode }) {
	return (
		<GarageContext.Provider value={garageInstance}>
			{children}
		</GarageContext.Provider>
	)
}

export const useGarageContext = () => useContext(GarageContext)
