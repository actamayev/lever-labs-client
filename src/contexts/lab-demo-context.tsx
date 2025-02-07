import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class LabDemoClass {
	public activeDemoName: DemoNames | null = null
	public motorState: MotorControl | null = null

	constructor() {
		makeAutoObservable(this)
	}

	public setActiveDemoName = action((demoName: DemoNames | null): void => {
		this.activeDemoName = demoName
	})

	public setMotorState = action((newMotorState: MotorControl | null): void => {
		this.motorState = newMotorState
	})

	public logout() {
		this.setActiveDemoName(null)
		this.setMotorState(null)
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
