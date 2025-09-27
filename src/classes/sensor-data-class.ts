"use client"

import { isNil } from "lodash-es"
import { action, makeAutoObservable } from "mobx"
import { SensorPayload, SensorPayloadMZ } from "@lever-labs/common-ts/types/pip"

class SensorDataClass {
	public leftWheelRPM: number[] = []
	public rightWheelRPM: number[] = []
	public irSensorData: (number[] & { length: 5 })[] = [] // This is an array of arrays of 5 numbers
	public redValue: number[] = []
	public greenValue: number[] = []
	public blueValue: number[] = []
	public pitch: number[] = []
	public yaw: number[] = []
	public roll: number[] = []
	public aX: number[]	 = []
	public aY: number[] = []
	public aZ: number[] = []
	public gX: number[] = []
	public gY: number[] = []
	public gZ: number[] = []
	public mX: number[] = []
	public mY: number[] = []
	public mZ: number[] = []
	public leftSideTofCounts: number[] = []
	public rightSideTofCounts: number[] = []
	public distanceGrid: number[][] = Array.from({ length: 8 }, (): number[] => Array(8).fill(0))
	public dataVersion = 0 // Add this for reactivity

	constructor() {
		makeAutoObservable(this)
	}

	public addSensorData = action((sensorData: SensorPayload): void => {
		Object.entries(sensorData).forEach(([key, value]): void => {
			if (key !== "irSensorData" && typeof value === "number") {
				this.addGeneralSensorData(
					key as keyof Omit<typeof sensorData, "irSensorData">,
					value
				)
			}
		})
		// Handle IR sensor data separately if it exists
		if (!isNil(sensorData.irSensorData)) {
			this.addIrSensorData(sensorData.irSensorData)
		}
	})

	// Add a method that takes in a key and automatiaclly adds the value to the array, ommiting the key if it is irSensorData
	private addGeneralSensorData = action((key: keyof Omit<SensorPayload, "irSensorData">, value: number): void => {
		this[key].push(value)
		// limit to 100 (first in, first out)
		if (this[key].length >= 100) {
			this[key].shift()
		}
		this.dataVersion++ // Increment version for reactivity
	})

	private addIrSensorData = action((value: number[] & { length: 5 }): void => {
		this.irSensorData.push(value)
		// limit to 100 (first in, first out)
		if (this.irSensorData.length >= 100) {
			this.irSensorData.shift()
		}
	})

	// TODO 9/2/25: Figure out why data is flipped (could be the sensor, or the way we're sending the data)
	public addMultizoneTofData = action((value: SensorPayloadMZ): void => {
		// Flip the row index (Y direction)
		const flippedRow = 7 - value.row
		// Reverse the distances array (X direction)
		const reversedDistances = (value.distances || []).slice().reverse()
		this.distanceGrid[flippedRow] = reversedDistances
		this.dataVersion++ // Increment version for reactivity
	})

	public logout(): void {
		this.leftWheelRPM = []
		this.rightWheelRPM = []
		this.irSensorData = []
		this.redValue = []
		this.greenValue = []
		this.blueValue = []
		this.pitch = []
		this.yaw = []
		this.roll = []
		this.aX = []
		this.aY = []
		this.aZ = []
		this.gX = []
		this.gY = []
		this.gZ = []
		this.mX = []
		this.mY = []
		this.mZ = []
		this.gX = []
		this.gY = []
		this.gZ = []
		this.mX = []
		this.mY = []
		this.mZ = []
		this.leftSideTofCounts = []
		this.rightSideTofCounts = []
		this.distanceGrid = Array.from({ length: 8 }, (): number[] => Array(8).fill(0))
	}
}

const sensorDataClass = new SensorDataClass()

export default sensorDataClass
