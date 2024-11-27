import { useRef } from "react"
import { createPortal } from "react-dom"
import AddPipForm from "./add-pip-form"
import ModalHeader from "../../modal-header"
import useClickOutsideModalUseEffect from "../../../hooks/click-outside/click-outside-modal-use-effect"

export default function AddPipModal({ toggleModalOpen } : { toggleModalOpen: () => void }) {
	const modalRef = useRef<HTMLDivElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, toggleModalOpen)

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
				<AddPipForm toggleModalOpen = {toggleModalOpen}/>
			</div>
		</div>,
		document.body
	)
}
