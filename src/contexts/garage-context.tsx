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
	public selectedAnimation: LightAnimation = "static"

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
		this.selectedAnimation = animationId
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
		this.setSelectedAnimation("static")
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
