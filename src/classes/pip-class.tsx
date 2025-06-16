"use client"

import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import isUndefined from "lodash-es/isUndefined"
import { action, makeAutoObservable } from "mobx"
import { PipConnectionStatus, PipData, PipStatusUpdate, PipUUID } from "@bluedotrobots/common-ts"

class PipClass {
	public pipData: PipData[] = []
	public isRetrievingPipData = false
	public selectedPip: PipData | null = null
	public isSendingCppToPip: boolean = false
	public retrievedPipData: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	get doesUserHaveAPip(): boolean {
		return !isEmpty(this.pipData)
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

	public checkIfPipAlreadyConnected(pipUUID: PipUUID): boolean {
		return this.pipData.some(
			data => data.pipUUID === pipUUID && data.pipConnectionStatus === "connected"
		)
	}

	public findPipFromUUID(pipUUID: PipUUID): PipData | undefined {
		return this.pipData.find(pipInfo => pipInfo.pipUUID === pipUUID)
	}

	public getPipConnectionStatus(pipUUID: PipUUID): PipConnectionStatus | undefined {
		return this.findPipFromUUID(pipUUID)?.pipConnectionStatus
	}

	public findPipNameFromUUID(pipUUID: PipUUID): string {
		const pip = this.findPipFromUUID(pipUUID)
		if (isUndefined(pip)) return "Pip"
		return pip.pipName
	}

	public setIsRetrievingPipData = action((newState: boolean): void => {
		this.isRetrievingPipData = newState
	})

	public setSelectedPip = action((newSelectedPip: PipData | null): void => {
		this.selectedPip = newSelectedPip
	})

	public setSelectedPipToFirstPip = action((): void => {
		if (!isNull(this.selectedPip) || isEmpty(this.pipData)) return
		this.setSelectedPip(this.pipData[0])
	})

	public setIsSendingCppToPip = action((newState: boolean): void => {
		this.isSendingCppToPip = newState
	})

	public setRetrievedPipData = action((newState: boolean): void => {
		this.retrievedPipData = newState
	})

	public logout() {
		this.pipData = []
		this.setIsRetrievingPipData(false)
		this.setSelectedPip(null)
		this.setIsSendingCppToPip(false)
		this.setRetrievedPipData(false)
	}
}

const pipClass = new PipClass()

export default pipClass
