import { useCallback, useMemo, useRef, useState } from "react"
import Button from "../button"
import FormGroup from "../form-group"
import ModalHeader from "../modal-header"
import useAddPip from "../../hooks/pip/add-pip"
import validatePipData from "../../utils/pip-data-validation"
import useClickOutsideModalUseEffect from "../../hooks/click-outside/click-outside-modal-use-effect"

interface Props {
	toggleModalOpen: () => void
}

export default function AddPipModal(props: Props) {
	const { toggleModalOpen } = props
	const [pipData, setPipData] = useState<IncompletePipData>({
		pipName: "",
		pipUUID: "" as PipUUID
	})
	const modalRef = useRef<HTMLDivElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, toggleModalOpen)
	const addPip = useAddPip()

	//TODO: Add a function that checks if the UUID exists as the user types
	const addPipCallback = useCallback(async() => {
		await addPip(pipData, toggleModalOpen)
	}, [addPip, pipData, toggleModalOpen])

	const cleanPipUUIDInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value
		const allowedInput = input.replace(/[^a-zA-Z0-9\-.]/g, "") // Allow only alphanumeric characters, dashes, and periods
		setPipData(prev => ({ ...prev, pipUUID: allowedInput as PipUUID }))
	}, [])

	const isUUIDValid = useMemo(() => {
		const pipUUIDPattern = /^[a-zA-Z0-9]{5}-\d+\.\d+\.\d+$/
		return pipUUIDPattern.test(pipData.pipUUID)
	}, [pipData.pipUUID])

	return (
		<div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-slate-800 dark:text-slate-50">
			<div
				ref={modalRef}
				className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-1/4 max-h-full overflow-visible"
				onClick={e => e.stopPropagation()}
			>
				<ModalHeader
					modalTitle="Add Pip"
					toggleModalOpen={toggleModalOpen}
				/>
				<div className="p-3">
					<div className="flex flex-col">
						<div>
							<FormGroup
								label="Pip Name"
								value={pipData.pipName}
								onChange={(event) => setPipData(prev => ({ ...prev, pipName: event.target.value }))}
								maxLength={20}
								className="w-full"
							/>
							<span className="text-xs text-slate-600 dark:text-slate-400 ml-0.5">
								{pipData.pipName.length}/{20}
							</span>
						</div>
						<div>
							<div className="w-full">
								<label className="block text-sm text-slate-600 dark:text-slate-200 font-semibold">
									Pip ID
								</label>
								<input
									className={`mt-1 p-2 w-full border rounded-md text-slate-950 dark:text-slate-200
									bg-white dark:bg-slate-800 outline-none
									${isUUIDValid ? "border-slate-200 dark:border-slate-700" : "border-red-500 dark:border-red-500"}`}
									value={pipData.pipUUID}
									onChange={cleanPipUUIDInput}
								/>
							</div>
						</div>
						<div className="flex justify-between mt-2 items-center">
							<Button
								title={`Add ${pipData.pipName}`}
								onClick={addPipCallback}
								disabled={!validatePipData(pipData)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
