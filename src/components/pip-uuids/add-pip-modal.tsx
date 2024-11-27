import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { useCallback, useRef, useState } from "react"
import Slider from "../slider"
import EnterPipID from "./enter-pip-id"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../shadcn/ui/form"
import ModalHeader from "../modal-header"
import EnterPipName from "./enter-pip-name"
import { Button } from "../shadcn/ui/button"
import useAddPip from "../../hooks/pip/add-pip"
import { zodResolver } from "@hookform/resolvers/zod"
import { addPipSchema } from "../../utils/auth/auth-schemas"
import useValidatePipData from "../../hooks/pip/validate-pip-data"
import useClickOutsideModalUseEffect from "../../hooks/click-outside/click-outside-modal-use-effect"

export default function AddPipModal({ toggleModalOpen } : { toggleModalOpen: () => void }) {
	const [doesPipUUIDExist, setDoesPipUUIDExist] = useState(false)
	const [isPipNameNeeded, setIsPipNameNeeded] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, toggleModalOpen)
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

	return createPortal(
		<div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-zinc-800 dark:text-zinc-50">
			<div
				ref={modalRef}
				className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-1/4 max-h-full overflow-visible"
				onClick={e => e.stopPropagation()}
			>
				<ModalHeader
					modalTitle="Add Pip"
					toggleModalOpen={toggleModalOpen}
				/>
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
								<FormField
									control={form.control}
									name="shouldAutoConnect"
									render={({ field }) => (
										<FormItem className="mt-3">
											<FormLabel>Auto-connect?</FormLabel>
											<FormControl>
												<Slider
													id="pip-auto-connect-slider"
													checkedCondition={field.value}
													onChangeCheckedCondition={() => field.onChange(!field.value)}
													colorChangeOnToggle={true}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
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
			</div>
		</div>,
		document.body
	)
}
