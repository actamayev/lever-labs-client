import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class LabDemoClass {
	public activeDemoName: DemoNames | null = null
	public motorState: MotorControlInput = { horizontal: 0, vertical: 0 }
	public sensorData: IncomingSensorData | null = null

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
	})

	public logout() {
		this.setActiveDemoName(null)
		this.setMotorState({ horizontal: 0, vertical: 0 })
		this.setSensorData(null)
	}
}

const LabDemoContext = createContext(new LabDemoClass())

export default function LabDemoProvider ({ children }: { children: React.ReactNode }) {
	const labDemoClass = useMemo(() => new LabDemoClass(), [])

	return (
		<LabDemoContext.Provider value={labDemoClass}>
			{children}
		</LabDemoContext.Provider>
	)
}

export const useLabDemoContext = () => useContext(LabDemoContext)
