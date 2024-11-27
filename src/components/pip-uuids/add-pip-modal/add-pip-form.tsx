import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import EnterPipID from "./enter-pip-id"
import { Form } from "../../shadcn/ui/form"
import EnterPipName from "./enter-pip-name"
import { Button } from "../../shadcn/ui/button"
import useAddPip from "../../../hooks/pip/add-pip"
import { zodResolver } from "@hookform/resolvers/zod"
import { addPipSchema } from "../../../utils/auth/auth-schemas"
import SelectAutoreconnectToPip from "./select-autoconnect-to-pip"
import useValidatePipData from "../../../hooks/pip/validate-pip-data"

export default function AddPipForm({ toggleModalOpen } : { toggleModalOpen: () => void }) {
	const [doesPipUUIDExist, setDoesPipUUIDExist] = useState(false)
	const [isPipNameNeeded, setIsPipNameNeeded] = useState(false)
	const addPip = useAddPip()
	const validatePipData = useValidatePipData()

	const form = useForm<IncompletePipData>({
		resolver: zodResolver(addPipSchema),
		defaultValues: {
			pipName: "",
			pipUUID: "",
			shouldAutoConnect: true
		}
	})

	const formValues = form.watch()

	const onSubmit = useCallback(async (values: IncompletePipData) => {
		await addPip(values, toggleModalOpen, isPipNameNeeded, doesPipUUIDExist)
	}, [addPip, doesPipUUIDExist, isPipNameNeeded, toggleModalOpen])

	return (
		<div className="p-3">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mb-3">
					<div className="flex flex-col">
						<EnterPipID
							control={form.control}
							setIsPipNameNeeded={setIsPipNameNeeded}
							doesPipUUIDExist={doesPipUUIDExist}
							setDoesPipUUIDExist={setDoesPipUUIDExist}
						/>
						{isPipNameNeeded && (
							<EnterPipName control={form.control}/>
						)}
						<SelectAutoreconnectToPip control={form.control} />
						<div className="flex justify-between mt-2 items-center">
							<Button
								type="submit"
								disabled={!validatePipData(formValues, doesPipUUIDExist, isPipNameNeeded)}
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
