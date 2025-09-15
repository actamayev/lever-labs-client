"use client"

import { action, makeAutoObservable } from "mobx"
import { PipStatusUpdate } from "@bluedotrobots/common-ts/types/pip"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import setSerialConnectionStatus from "../utils/pip/set-serial-connection-status"

class PipClass {
	public selectedPip: PipData | null = null
	public isSendingCppToPip: boolean = false
	public pipPluggedInSerial: boolean = false
	public isConnectPipDialogOpen: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	public addNewPip(pipData: PipData): void {
		if (this.selectedPip && this.selectedPip.pipUUID === pipData.pipUUID) return
		this.setSelectedPip(pipData)
	}

	public deletePip(): void {
		this.setSelectedPip(null)
	}

	public updatePipConnectionStatus(data: PipStatusUpdate): void {
		if (!this.selectedPip) return

		this.selectedPip.pipConnectionStatus = data.newConnectionStatus
	}

	private setSelectedPip = action((newSelectedPip: PipData | null): void => {
		this.selectedPip = newSelectedPip
	})

	public setIsSendingCppToPip = action((newState: boolean): void => {
		this.isSendingCppToPip = newState
	})

	public setPipPluggedInSerial = action((newState: boolean): void => {
		this.pipPluggedInSerial = newState
	})

	public setPipPluggedInSerialAndNotifyBackend = action((newState: boolean, pipUUID?: PipUUID): void => {
		this.pipPluggedInSerial = newState

		// Notify backend if we have a pip UUID and the selected pip
		if (pipUUID) {
			void setSerialConnectionStatus(pipUUID, newState)
		} else if (this.selectedPip) {
			void setSerialConnectionStatus(this.selectedPip.pipUUID, newState)
		}
	})

	public setIsConnectPipDialogOpen = action((isOpen: boolean): void => {
		this.isConnectPipDialogOpen = isOpen
	})

	public logout(): void {
		this.setSelectedPip(null)
		this.setIsSendingCppToPip(false)
		this.setPipPluggedInSerial(false)
		this.setIsConnectPipDialogOpen(false)
	}
}

const pipClass = new PipClass()

export default pipClass
