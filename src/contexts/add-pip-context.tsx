"use client"

import { action, makeAutoObservable } from "mobx"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { createContext, useContext, useMemo } from "react"
import { addPipSchema } from "../utils/pip/pip-schemas"
import { PipUUID, WiFiConnectionStatus } from "@bluedotrobots/common-ts"

class AddPipClass {
	public addingNewPipRequirements: AddingNewPipRequirements = {
		doesPipUUIDExist: false,
		hasPipNamePreviouslyBeenAdded: false,
		isPipOnline: false,
		userAlreadyAddedUUID: false,
		checkedConnectedToWifi: false
	}
	public mirroredFormValues: IncompletePipData = {
		pipUUID: "" as PipUUID,
		shouldAutoConnect: true,
		pipName: "",
		wifiNetworkName: "",
		wifiPassword: ""
	}
	public wifiConnectionStatus: WiFiConnectionStatus | null = null
	public isTestingWiFiConnection: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	public resetAddingPipRequirements = action(() => {
		this.addingNewPipRequirements.doesPipUUIDExist = false
		this.addingNewPipRequirements.hasPipNamePreviouslyBeenAdded = false
		this.addingNewPipRequirements.isPipOnline = false
		this.addingNewPipRequirements.userAlreadyAddedUUID = false
		this.addingNewPipRequirements.checkedConnectedToWifi = false
	})

	public updateAddingNewPipRequirements<K extends keyof AddingNewPipRequirements>(
		field: K,
		value: boolean
	): void {
		this.addingNewPipRequirements[field] = value
	}

	public setWifiConnectionStatus = action((status: WiFiConnectionStatus | null) => {
		this.wifiConnectionStatus = status
	})

	public setIsTestingWiFiConnection = action((testing: boolean) => {
		this.isTestingWiFiConnection = testing
	})

	public updateMirroredFormValues<K extends keyof IncompletePipData>(
		field: K,
		value: IncompletePipData[K]
	): void {
		this.mirroredFormValues[field] = value
	}

	private resetMirroredFormValues = action(() => {
		this.mirroredFormValues = {
			pipUUID: "" as PipUUID,
			shouldAutoConnect: true,
			pipName: "",
			wifiNetworkName: "",
			wifiPassword: ""
		}
	})

	get isPipNameValid (): boolean {
		if (!this.mirroredFormValues.pipName) return false
		return this.mirroredFormValues.pipName.length >= 3 && this.mirroredFormValues.pipName.length <= 20
	}

	public resetAddPipMethods = action(() => {
		this.setWifiConnectionStatus(null)
		this.setIsTestingWiFiConnection(false)
		this.resetAddingPipRequirements()
		this.resetMirroredFormValues()
	})

	public logout() {
		this.resetAddPipMethods()
	}
}

interface AddPipContextValue {
	store: AddPipClass
	form: UseFormReturn<IncompletePipData>
}

const addPipInstance = new AddPipClass()

const AddPipContext = createContext<AddPipContextValue | null>(null)

export default function AddPipProvider({ children }: { children: React.ReactNode }) {
	const form = useForm<IncompletePipData>({
		resolver: zodResolver(addPipSchema),
		defaultValues: {
			pipUUID: "",
			shouldAutoConnect: true,
			pipName: "",
			wifiNetworkName: "",
			wifiPassword: ""
		}
	})

	const contextValue = useMemo(() => ({
		store: addPipInstance,
		form
	}), [form])

	return (
		<AddPipContext.Provider value={contextValue}>
			{children}
		</AddPipContext.Provider>
	)
}

export const useAddPipContext = () => useContext(AddPipContext)
