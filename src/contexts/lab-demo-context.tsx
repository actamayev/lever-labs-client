"use client"

import isNull from "lodash-es/isNull"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

// TODO: Remove this file. move to garage
class LabDemoClass {
	public activeDemoName: DemoNames | null = null
	public motorState: MotorControlInput = { horizontal: 0, vertical: 0 }
	public sensorData: IncomingSensorData | null = null
	public pitchData: number[] = []

	constructor() {
		makeAutoObservable(this)
	}

	public setActiveDemoName = action((demoName: DemoNames | null): void => {
		this.activeDemoName = demoName
	})

	public setMotorState = action((motorControl: MotorControlInput): void => {
		this.motorState = motorControl
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

	public logout() {
		this.setActiveDemoName(null)
		this.setMotorState({ horizontal: 0, vertical: 0 })
		this.setSensorData(null)
		this.resetPitchData()
	}
}

const labDemoInstance = new LabDemoClass()

const LabDemoContext = createContext(labDemoInstance)

export default function LabDemoProvider ({ children }: { children: React.ReactNode }) {
	return (
		<LabDemoContext.Provider value={labDemoInstance}>
			{children}
		</LabDemoContext.Provider>
	)
}

export const useLabDemoContext = () => useContext(LabDemoContext)
