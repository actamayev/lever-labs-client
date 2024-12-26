import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class PipClass {
	public pipData: PipData[] = []
	public isRetrievingPipData = false
	public selectedPip: PipData | null = null
	public isSendingCppToPip: boolean = false
	public addingNewPipRequirements: AddingNewPipRequirements = {
		doesPipUUIDExist: false,
		hasPipNamePreviouslyBeenAdded: false,
		isPipOnline: false,
		userAlreadyAddedUUID: false
	}

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
		this.resetAddingPipRequirements()
	}

	public updatePipConnectionStatus(data: PipStatusUpdate): void {
		const pipToUpdate = this.pipData.find((pip) => pip.pipUUID === data.pipUUID)
		if (!pipToUpdate) return

		pipToUpdate.pipConnectionStatus = data.newConnectionStatus
	}

	public checkIfPipAlreadyConnected(pipUUID: PipUUID): boolean {
		return this.pipData.some(
			data => data.pipUUID === pipUUID && data.pipConnectionStatus === "connected"
		)
	}

	public findPipFromUUID(pipUUID: PipUUID): PipData | undefined {
		return this.pipData.find(pipinfo => pipinfo.pipUUID === pipUUID)
	}

	public findPipNameFromUUID(pipUUID: PipUUID): string {
		const pip = this.findPipFromUUID(pipUUID)
		if (_.isUndefined(pip)) return "Pip"
		return pip.pipName
	}

	public setIsRetrievingPipData = action((newState: boolean): void => {
		this.isRetrievingPipData = newState
	})

	public setSelectedPip = action((newSelectedPip: PipData): void => {
		this.selectedPip = newSelectedPip
	})

	public setSelectedPipToFirstPip = action((): void => {
		if (!_.isNull(this.selectedPip) || _.isEmpty(this.pipData)) return
		this.setSelectedPip(this.pipData[0])
	})

	public setIsSendingCppToPip = action((newState: boolean): void => {
		this.isSendingCppToPip = newState
	})

	public resetAddingPipRequirements = action(() => {
		this.addingNewPipRequirements.doesPipUUIDExist = false
		this.addingNewPipRequirements.hasPipNamePreviouslyBeenAdded = false
		this.addingNewPipRequirements.isPipOnline = false
		this.addingNewPipRequirements.userAlreadyAddedUUID = false
	})

	public updateAddingNewPipRequirements<K extends keyof AddingNewPipRequirements>(
		field: K,
		value: boolean
	): void {
		this.addingNewPipRequirements[field] = value
	}

	public logout() {
		this.pipData = []
		this.isRetrievingPipData = false
		this.selectedPip = null
		this.isSendingCppToPip = false
		this.resetAddingPipRequirements()
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
