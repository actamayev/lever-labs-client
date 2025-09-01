"use client"

import { RgbaColor } from "@uiw/color-convert"
import { action, makeAutoObservable } from "mobx"
import personalInfoClass from "./personal-info-class"
import exportDisplay, { applyTextToBuffer } from "../utils/display/export-display"
import { DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../utils/constants/display-constants"

class CareerQuestTriggersClass {
	public selectedColorRgba: RgbaColor = { r: 255, g: 255, b: 255, a: 1 }
	public pixelBuffer: PixelBuffer = Array(DISPLAY_HEIGHT).fill(null).map(() => Array(DISPLAY_WIDTH).fill(false))

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

	public setPixelInBuffer = action((x: number, y: number, state: boolean): void => {
		if (x >= 0 && x < DISPLAY_WIDTH && y >= 0 && y < DISPLAY_HEIGHT) {
			const newBuffer = this.pixelBuffer.map((row: boolean[]) => [...row])
			newBuffer[y][x] = state
			this.pixelBuffer = newBuffer
		}
	})

	public clearBuffer = action((): void => {
		this.pixelBuffer = Array(DISPLAY_HEIGHT).fill(null).map(() => Array(DISPLAY_WIDTH).fill(false))
	})

	public setTextInput = action(async (text: string): Promise<void> => {
		this.clearBuffer()
		if (text.trim()) {
			applyTextToBuffer(text, this.setPixelInBuffer)
		}
		await exportDisplay(this.pixelBuffer)
	})

	public exportDisplayTrigger = action(async (): Promise<void> => {
		this.clearBuffer()
		if (personalInfoClass.name && personalInfoClass.name.trim()) {
			applyTextToBuffer(personalInfoClass.name, this.setPixelInBuffer)
		}
		await exportDisplay(this.pixelBuffer)
	})

	public logout(): void {
		this.setSelectedColorRgba({ r: 255, g: 255, b: 255, a: 1 })
		void this.setTextInput("")
		this.pixelBuffer = Array(DISPLAY_HEIGHT).fill(null).map(() => Array(DISPLAY_WIDTH).fill(false))
	}
}

const careerQuestTriggersClass = new CareerQuestTriggersClass()

export default careerQuestTriggersClass
