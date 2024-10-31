import { observer } from "mobx-react"
import { useCallback, useRef, useState } from "react"
import Button from "../button"
import FormGroup from "../form-group"
import ModalHeader from "../modal-header"
import useAddPip from "../../hooks/pip/add-pip"
import validatePipData from "../../utils/pip-data-validation"
import useClickOutsideModalUseEffect from "../../hooks/click-outside/click-outside-modal-use-effect"

interface Props {
	toggleModalOpen: () => void
}

function AddPipModal(props: Props) {
	const { toggleModalOpen } = props
	const [pipData, setPipData] = useState<PipData>({
		pipName: "",
		userPipUUIDId: 0,
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
		const alphanumericInput = input.replace(/[^a-zA-Z0-9]/g, "") // Remove non-alphanumeric characters
		setPipData(prev => ({ ...prev, pipUUID: alphanumericInput as PipUUID }))
	}, [])

	return (
		<div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-slate-800 dark:text-slate-50">
			<div
				ref={modalRef}
				className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-1/3 max-h-full overflow-visible"
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
							<FormGroup
								label="Pip ID"
								value={pipData.pipUUID}
								onChange={cleanPipUUIDInput}
								maxLength={5}
								className="w-full"
							/>
						</div>
						<div className="flex justify-between mt-2 items-center">
							<Button
								title={`Add ${pipData.pipName}`}
								colorClass="bg-blue-300 dark:bg-blue-600"
								hoverClass="hover:bg-blue-400 hover:dark:bg-blue-700"
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

export default observer(AddPipModal)
