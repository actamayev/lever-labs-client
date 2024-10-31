import { makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class PipClass {
	public pipData: PipData[] = []

	constructor() {
		makeAutoObservable(this)
	}

	public checkIfUUIDAlreadyExists(pipUUID: PipUUID): boolean {
		return this.pipData.some(data => data.pipUUID === pipUUID)
	}

	public addNewPip(pipData: PipData): void {
		if (this.checkIfUUIDAlreadyExists(pipData.pipUUID)) return
		this.pipData.push(pipData)
	}

	public logout() {
		this.pipData = []
	}
}

const PipContext = createContext(new PipClass())

export default function PipProvider ({ children }: { children: React.ReactNode }) {
	const pipClass = useMemo(() => new PipClass(), [])

	return (
		<PipContext.Provider value={pipClass}>
			{children}
		</PipContext.Provider>
	)
}

export const usePipContext = () => useContext(PipContext)
