import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import EnterPipID from "./enter-pip-id"
import { Form } from "../../shadcn/ui/form"
import EnterPipName from "./enter-pip-name"
import { Button } from "../../shadcn/ui/button"
import EnterWifiCreds from "./enter-wifi-creds"
import useAddPip from "../../../hooks/pip/add-pip"
import { addPipSchema } from "../../../utils/auth/auth-schemas"
import SelectAutoreconnectToPip from "./select-autoconnect-to-pip"
import useValidatePipData from "../../../hooks/pip/validate-pip-data"

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

	const formValues = form.watch()

	const validatePipData = useValidatePipData()

	const onSubmit = useCallback(async (values: IncompletePipData) => {
		await addPip(values, toggleModalOpen)
	}, [addPip, toggleModalOpen])

	return (
		<div className="p-3">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mb-3">
					<div className="flex flex-col">
						<EnterPipID form={form} />
						<EnterPipName control={form.control}/>
						<EnterWifiCreds form={form} formValues={formValues}/>
						<SelectAutoreconnectToPip control={form.control} />
						<div className="flex justify-between mt-2 items-center">
							<Button
								type="submit"
								disabled={!validatePipData(formValues)}
							>
								Add {formValues.pipName}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}
