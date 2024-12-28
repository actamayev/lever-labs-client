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

	public logout() {
		this.resetAddingPipRequirements()
	}
}

interface AddPipContextValue {
	store: AddPipClass
	form: UseFormReturn<IncompletePipData>
}

const AddPipContext = createContext<AddPipContextValue | null>(null)

function useAddPipForm() {
	return useForm<IncompletePipData>({
		resolver: zodResolver(addPipSchema),
		defaultValues: {
			pipUUID: "",
			shouldAutoConnect: true,
			pipName: "",
			wifiNetworkName: "",
			wifiPassword: ""
		}
	})
}

export default function AddPipProvider ({ children }: { children: React.ReactNode }) {
	const form = useAddPipForm()

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
