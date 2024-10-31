import { observer } from "mobx-react"
import SingleRegisteredPip from "./single-registered-pip"
import { usePipContext } from "../../contexts/pip-context"

interface Props {
	setIsModalOpen: (value: React.SetStateAction<boolean>) => void
}

function ShowExistingPips(props: Props) {
	const { setIsModalOpen } = props
	const pipClass = usePipContext()

	return (
		<div className="my-4 flex flex-wrap gap-4">
			{pipClass.pipData.map(singlePipData => (
				<SingleRegisteredPip
					singlePipData={singlePipData}
					key={singlePipData.pipUUID}
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
	)
}

export default observer(ShowExistingPips)
