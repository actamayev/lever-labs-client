"use client"

import { RgbaColor } from "@uiw/color-convert"
import { action, makeAutoObservable } from "mobx"

class CareerQuestTriggersClass {
	public selectedColorRgba: RgbaColor = { r: 255 , g: 255, b: 255, a: 1 }

	constructor() {
		makeAutoObservable(this)
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

	public logout(): void {
		this.setSelectedColorRgba({ r: 255 , g: 255, b: 255, a: 1 })
	}
}

const careerQuestTriggersClass = new CareerQuestTriggersClass()

export default careerQuestTriggersClass
