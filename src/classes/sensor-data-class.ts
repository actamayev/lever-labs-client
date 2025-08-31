import { action, makeAutoObservable } from "mobx"
import { SensorPayload } from "@bluedotrobots/common-ts"

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
	public distanceGrid: (number[] & { length: 64 })[] = [] // This is an array of arrays of 64 numbers

	constructor() {
		makeAutoObservable(this)
	}

	public addSensorData = action((sensorData: SensorPayload): void => {
		Object.entries(sensorData).forEach(([key, value]) => {
			if (key !== "irSensorData" && typeof value === "number" && key !== "distanceGrid") {
				this.addGeneralSensorData(
					key as keyof Omit<typeof sensorData, "irSensorData" | "distanceGrid">,
					value
				)
			}
		})
		// Handle IR sensor data separately if it exists
		if (sensorData.irSensorData) {
			this.addIrSensorData(sensorData.irSensorData)
		}
		if (sensorData.distanceGrid) {
			this.addMultizoneTofData(sensorData.distanceGrid)
		}
	})

	// Add a method that takes in a key and automatiaclly adds the value to the array, ommiting the key if it is irSensorData
	private addGeneralSensorData = action((key: keyof Omit<SensorPayload, "irSensorData" | "distanceGrid">, value: number): void => {
		this[key].push(value)
		// limit to 100 (first in, first out)
		if (this[key].length >= 100) {
			this[key].shift()
		}
	})

	private addIrSensorData = action((value: number[] & { length: 5 }): void => {
		this.irSensorData.push(value)
		// limit to 100 (first in, first out)
		if (this.irSensorData.length >= 100) {
			this.irSensorData.shift()
		}
	})

	private addMultizoneTofData = action((value: number[] & { length: 64 }): void => {
		this.distanceGrid.push(value)
		// limit to 100 (first in, first out)
		if (this.distanceGrid.length >= 100) {
			this.distanceGrid.shift()
		}
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
		this.distanceGrid = []
	}
}

const sensorDataClass = new SensorDataClass()

export default sensorDataClass
