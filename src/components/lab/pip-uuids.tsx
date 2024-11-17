import { useState } from "react"
import { observer } from "mobx-react"
import AddPipModal from "./add-pip-modal/add-pip-modal"
import SingleRegisteredPip from "./single-registered-pip"
import { usePipContext } from "../../contexts/pip-context"

function PipUUIDs() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const pipClass = usePipContext()

	return (
		<>
			<div className="my-4 flex flex-wrap gap-4">
				{pipClass.pipData.map(singlePipData => (
					<SingleRegisteredPip
						key={singlePipData.pipUUID}
						singlePipData={singlePipData}
					/>
				))}
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-800 text-black dark:text-white
				rounded-2xl border border-slate-400 p-4 w-48 text-center font-bold"
				>
					+ Add Pip
				</button>
			</div>
			{isModalOpen && (
				<AddPipModal toggleModalOpen={() => setIsModalOpen(false)} />
			)}
		</>
	)
}

export default observer(PipUUIDs)
