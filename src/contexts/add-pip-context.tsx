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
		userAlreadyAddedUUID: false,
		checkedConnectedToWifi: false
	}
	public encodedWifiCredentials: string | null = null
	public mirroredFormValues: IncompletePipData = {
		pipUUID: "" as PipUUID,
		shouldAutoConnect: true,
		pipName: "",
		wifiNetworkName: "",
		wifiPassword: ""
	}
	public newPipConnectionStatus: NewPipConnectionStatuses | null = null
	public isUserReadyToConnectToPipDialog: boolean | null = null

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

	public setEncodedWifiCredentials = action((newState: string | null) => {
		this.encodedWifiCredentials = newState
	})

	public setNewPipConnectionStatus = action((newState: NewPipConnectionStatuses | null) => {
		this.newPipConnectionStatus = newState
	})

	public setIsUserReadyToConnectToPipDialog = action((newState: boolean | null) => {
		this.isUserReadyToConnectToPipDialog = newState
	})

	private encodeWifiData = action((field: "wifiNetworkName" | "wifiPassword", value: string) => {
		if (field === "wifiNetworkName") {
			this.newPipConnectionStatus = null
			if (_.isEmpty(value)) {
				return this.setEncodedWifiCredentials(null)
			}
		}
		this.setEncodedWifiCredentials(btoa(JSON.stringify(
			{
				ssid: this.mirroredFormValues.wifiNetworkName,
				password: this.mirroredFormValues.wifiPassword
			}
		)))
	})

	public updateMirroredFormValues<K extends keyof IncompletePipData>(
		field: K,
		value: IncompletePipData[K]
	): void {
		this.mirroredFormValues[field] = value
		if (
			this.isWifiField(field) &&
			typeof value === "string"
		) {
			this.encodeWifiData(field, value)
		}
	}

	private isWifiField(field: keyof IncompletePipData): field is WifiPipDataKeys {
		return field === "wifiNetworkName" || field === "wifiPassword"
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
		this.setIsUserReadyToConnectToPipDialog(null)
		this.setNewPipConnectionStatus(null)
		this.resetAddingPipRequirements()
		this.resetMirroredFormValues()
	})

	public logout() {
		this.resetAddPipMethods()
		this.setEncodedWifiCredentials(null)
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
