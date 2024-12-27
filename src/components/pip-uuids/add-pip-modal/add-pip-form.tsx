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
import ConnectToPipInstructions from "./connect-to-pip-ip-instructions"

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
						<p className="mb-1">Step 2: Add your Pip&apos;s ID and give it a name</p>
						<div className="flex flex-row gap-4">
							<div className="w-1/3">
								<EnterPipID form={form} />
							</div>
							<div className="flex-1">
								<EnterPipName control={form.control} formValues={formValues} />
							</div>
						</div>
						<EnterWifiCreds
							control={form.control}
							formValues={formValues}
							setEncodedWifiCredentials={setEncodedWifiCredentials}
						/>
						<ConnectToPipInstructions
							encodedWifiCredentials={encodedWifiCredentials}
							formValues={formValues}
						/>
						<SelectAutoreconnectToPip control={form.control} />
						<AddPipButton formValues={formValues} />
					</div>
				</form>
			</Form>
		</div>
	)
}
