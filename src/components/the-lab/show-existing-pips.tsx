import { observer } from "mobx-react"
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
				<div
					key={singlePipData.pipUUID}
					className="bg-pipTheme dark:bg-slate-700 text-white dark:text-white
					rounded-2xl border border-slate-400 p-4 w-48 text-center"
				>
					<div className="font-bold text-lg">{singlePipData.pipName}</div>
					<div className="text-sm text-slate-300">{singlePipData.pipUUID}</div>
				</div>
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
