"use client"

import { action, makeAutoObservable } from "mobx"
import { PipStatusUpdate, ClientPipConnectionStatus } from "@bluedotrobots/common-ts/types/pip"

interface PipSearchResult {
	pipName: string
	pipConnectionStatus: ClientPipConnectionStatus
	pipUUID: string
}

class PipClass {
	public selectedPip: PipData | null = null
	public isSendingCppToPip: boolean = false
	public pipPluggedInSerial: boolean = false
	public isConnectPipDialogOpen: boolean = false
	public pipUUIDSearchTerm: string = ""
	public searchResult: PipSearchResult | null = null
	public errorMessage: string = ""
	public isSearching: boolean = false

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

	public setIsConnectPipDialogOpen = action((isOpen: boolean): void => {
		this.isConnectPipDialogOpen = isOpen
	})

	public setPipUUIDSearchTerm = action((pipUUIDSearchTerm: string): void => {
		this.pipUUIDSearchTerm = pipUUIDSearchTerm
	})

	public setSearchResult = action((searchResult: PipSearchResult | null): void => {
		this.searchResult = searchResult
	})

	public setErrorMessage = action((errorMessage: string): void => {
		this.errorMessage = errorMessage
	})

	public setIsSearching = action((isSearching: boolean): void => {
		this.isSearching = isSearching
	})

	public logout(): void {
		this.setSelectedPip(null)
		this.setIsSendingCppToPip(false)
		this.setPipPluggedInSerial(false)
		this.setIsConnectPipDialogOpen(false)
		this.setPipUUIDSearchTerm("")
		this.setSearchResult(null)
		this.setErrorMessage("")
		this.setIsSearching(false)
	}
}

const pipClass = new PipClass()

export default pipClass
