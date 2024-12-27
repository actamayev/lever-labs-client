import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import EnterPipID from "./enter-pip-id"
import { Form } from "../../shadcn/ui/form"
import EnterPipName from "./enter-pip-name"
import AddPipButton from "./add-pip-button"
import EnterWifiCreds from "./enter-wifi-creds"
import useAddPip from "../../../hooks/pip/add-pip"
import { addPipSchema } from "../../../utils/auth/auth-schemas"
import SelectAutoreconnectToPip from "./select-autoconnect-to-pip"

export default function AddPipForm({ toggleModalOpen } : { toggleModalOpen: () => void }) {
	const addPip = useAddPip()
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
	const [encodedWifiCredentials, setEncodedWifiCredentials] = useState<string | null>(null)
	const formValues = form.watch()

	const onSubmit = useCallback(async (values: IncompletePipData) => {
		await addPip(values, toggleModalOpen)
	}, [addPip, toggleModalOpen])

	return (
		<div className="p-3">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mb-3">
					<div className="flex flex-col">
						<p className="mb-1">Step 1: Turn on your Pip</p>
						<EnterPipID form={form} />
						<EnterPipName
							control={form.control}
							formValues={formValues}
						/>
						<EnterWifiCreds
							control={form.control}
							formValues={formValues}
							setEncodedWifiCredentials={setEncodedWifiCredentials}
						/>
						<SelectAutoreconnectToPip control={form.control} />
						<AddPipButton formValues={formValues} />
					</div>
				</form>
			</Form>
		</div>
	)
}
