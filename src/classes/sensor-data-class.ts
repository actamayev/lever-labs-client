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

	constructor() {
		makeAutoObservable(this)
	}

	// Add a method that takes in a key and automatiaclly adds the value to the array, ommiting the key if it is irSensorData
	public addGeneralSensorData = action((key: keyof Omit<SensorPayload, "irSensorData">, value: number): void => {
		this[key].push(value)
		// limit to 100 (first in, first out)
		if (this[key].length >= 100) {
			this[key].shift()
		}
	})

	public addIrSensorData = action((value: number[] & { length: 5 }): void => {
		this.irSensorData.push(value)
		// limit to 100 (first in, first out)
		if (this.irSensorData.length >= 100) {
			this.irSensorData.shift()
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
	}
}

const sensorDataClass = new SensorDataClass()

export default sensorDataClass
