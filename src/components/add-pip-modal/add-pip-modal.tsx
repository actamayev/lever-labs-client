import _ from "lodash"
import { useCallback, useRef } from "react"
import { observer } from "mobx-react"
import { createPortal } from "react-dom"
import AddPipForm from "./add-pip-form"
import ModalHeader from "../modal-header"
import { useAddPipContext } from "../../contexts/add-pip-context"
import useClickOutsideModalUseEffect from "../../hooks/click-outside/click-outside-modal-use-effect"

function AddPipModal() {
	const modalRef = useRef<HTMLDivElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	const addPipClass = useAddPipContext()

	const setIsAppPipModalOpen = useCallback(() => {
		if (_.isNull(addPipClass)) return
		addPipClass.store.setIsAppPipModalOpen(false)
	}, [addPipClass])
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, () => setIsAppPipModalOpen())

	if (_.isNull(addPipClass) || !addPipClass.store.isAddPipModalOpen) return null

	return createPortal(
		<div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 pt-28 text-zinc-800 dark:text-zinc-50">
			<div
				ref={modalRef}
				className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-1/3 max-h-full overflow-visible"
				onClick={e => e.stopPropagation()}
			>
				<ModalHeader
					modalTitle="Add Pip"
					closeModal={() => setIsAppPipModalOpen()}
				/>
				<AddPipForm/>
			</div>
		</div>,
		document.body
	)
}

export default observer(AddPipModal)
