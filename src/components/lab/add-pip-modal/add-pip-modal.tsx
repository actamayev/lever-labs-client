import { useCallback, useRef, useState } from "react"
import Button from "../../button"
import Slider from "../../slider"
import EnterPipID from "./enter-pip-id"
import FormGroup from "../../form-group"
import ModalHeader from "../../modal-header"
import useAddPip from "../../../hooks/pip/add-pip"
import useValidatePipData from "../../../hooks/pip/validate-pip-data"
import useClickOutsideModalUseEffect from "../../../hooks/click-outside/click-outside-modal-use-effect"

interface Props {
	toggleModalOpen: () => void
}

export default function AddPipModal(props: Props) {
	const { toggleModalOpen } = props
	const [pipData, setPipData] = useState<IncompletePipData>({
		pipName: "",
		pipUUID: "" as PipUUID,
		shouldAutoConnect: true
	})
	const [doesPipUUIDExist, setDoesPipUUIDExist] = useState(false)
	const [isPipNameNeeded, setIsPipNameNeeded] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, toggleModalOpen)
	const addPip = useAddPip()
	const validatePipData = useValidatePipData()

	const addPipCallback = useCallback(async() => {
		await addPip(pipData, toggleModalOpen, isPipNameNeeded, doesPipUUIDExist)
	}, [addPip, doesPipUUIDExist, isPipNameNeeded, pipData, toggleModalOpen])

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
						<EnterPipID
							pipUUID={pipData.pipUUID}
							setPipData={setPipData}
							setIsPipNameNeeded={setIsPipNameNeeded}
							doesPipUUIDExist={doesPipUUIDExist}
							setDoesPipUUIDExist={setDoesPipUUIDExist}
						/>
						{isPipNameNeeded && (
							<div>
								<FormGroup
									label="Pip Name"
									value={pipData.pipName}
									onChange={(event) => setPipData(prev => ({ ...prev, pipName: event.target.value }))}
									maxLength={20}
									className="w-full"
								/>
								<span className="text-xs text-slate-600 dark:text-slate-400 ml-0.5">
									{(pipData.pipName || "").length}/{20}
								</span>
							</div>
						)}
						<div className="mt-3">
							<label>Auto-connect?</label>
							<div className="text-black dark:text-white" onClick={(e) => e.stopPropagation()}>
								<Slider
									id="pip-auto-connect-slider"
									checkedCondition={pipData.shouldAutoConnect}
									onChangeCheckedCondition={
										() => setPipData(prev => ({ ... prev, shouldAutoConnect: !prev.shouldAutoConnect}))
									}
									colorChangeOnToggle={true}
								/>
							</div>
						</div>
						<div className="flex justify-between mt-2 items-center">
							<Button
								title={`Add ${pipData.pipName}`}
								onClick={addPipCallback}
								disabled={!validatePipData(pipData, doesPipUUIDExist, isPipNameNeeded)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
