import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class PipClass {
	public pipData: PipData[] = []
	public isRetrievingPipData = false

	constructor() {
		makeAutoObservable(this)
	}

	public checkIfUUIDAlreadyExists(pipUUID: PipUUID): boolean {
		return this.pipData.some(data => data.pipUUID === pipUUID)
	}

	public setPipData(pipData: PipData[]): void {
		pipData.map(singlePipData => this.addNewPip(singlePipData))
	}

	public addNewPip(pipData: PipData): void {
		if (this.checkIfUUIDAlreadyExists(pipData.pipUUID)) return
		this.pipData.push(pipData)
	}

	public updatePipConnectionStatus(data: PipStatusUpdate): void {
		const pipToUpdate = this.pipData.find((pip) => pip.pipUUID === data.pipUUID)
		if (!pipToUpdate) return

		pipToUpdate.pipConnectionStatus = data.newConnectionStatus
	}

	public setIsRetrievingPipData = action((newState: boolean): void => {
		this.isRetrievingPipData = newState
	})

	public logout() {
		this.pipData = []
		this.isRetrievingPipData = false
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
