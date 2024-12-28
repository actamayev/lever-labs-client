import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { createContext, useContext, useMemo } from "react"
import { addPipSchema } from "../utils/pip/pip-schemas"

class AddPipClass {
	public addingNewPipRequirements: AddingNewPipRequirements = {
		doesPipUUIDExist: false,
		hasPipNamePreviouslyBeenAdded: false,
		isPipOnline: false,
		userAlreadyAddedUUID: false
	}
	public isAddPipModalOpen = false
	public encodedWifiCredentials: string | null = null
	public mirroredFormValues: IncompletePipData = {
		pipUUID: "" as PipUUID,
		shouldAutoConnect: true,
		pipName: "",
		wifiNetworkName: "",
		wifiPassword: ""
	}

	constructor() {
		makeAutoObservable(this)
	}

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

	public setIsAppPipModalOpen = action((newState: boolean) => {
		this.isAddPipModalOpen = newState
	})

	public setEncodedWifiCredentials = action((newState: string | null) => {
		this.encodedWifiCredentials = newState
	})

	public encodeWifiData = action((ssid: string, password: string) => {
		if (_.isEmpty(ssid)) {
			this.setEncodedWifiCredentials(null)
			return
		}
		const data = JSON.stringify({ ssid, password })
		this.setEncodedWifiCredentials(btoa(data))
	})

	public updateMirroredFormValues<K extends keyof IncompletePipData>(
		field: K,
		value: IncompletePipData[K]
	): void {
		this.mirroredFormValues[field] = value
	}

	public resetMirroredFormValues = action(() => {
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

	public logout() {
		this.resetAddingPipRequirements()
		this.setIsAppPipModalOpen(false)
		this.setEncodedWifiCredentials(null)
		this.resetMirroredFormValues()
	}
}

interface AddPipContextValue {
	store: AddPipClass
	form: UseFormReturn<IncompletePipData>
}

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
		store: new AddPipClass(),
		form
	}), [form])

	return (
		<AddPipContext.Provider value={contextValue}>
			{children}
		</AddPipContext.Provider>
	)
}

export const useAddPipContext = () => useContext(AddPipContext)
