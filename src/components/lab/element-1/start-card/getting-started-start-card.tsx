import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import GettingStartedAddPip from "./getting-started-add-pip"
import { usePipContext } from "../../../../contexts/pip-context"

function GettingStartedStartCard() {
	const pipClass = usePipContext()

	function getCardContent() {
		if (isEmpty(pipClass.pipData)) {
			return "Connect your Pip to the internet to get started. It only takes a minute!"
		}

		if (pipClass.pipData[0].pipConnectionStatus === "connected") {
			return "Your Pip is connected and ready to go!"
		}

		return `Please connect ${pipClass.pipData[0].pipName} to the internet to continue`
	}

	return (
		<div className="border border-zinc-200 dark:border-zinc-700 rounded-lg
            bg-zinc-50 dark:bg-zinc-800/50">
			<div className="flex items-start justify-between gap-4">
				<div className="space-y-2 flex-1 p-4">
					<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                        Getting Started
					</h2>
					<p className="text-lg text-zinc-600 dark:text-zinc-400">
						{getCardContent()}
					</p>
				</div>
				<GettingStartedAddPip />
			</div>
		</div>
	)
}

export default observer(GettingStartedStartCard)
