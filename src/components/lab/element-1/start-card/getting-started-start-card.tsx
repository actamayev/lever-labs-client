import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
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
		<div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg
        bg-zinc-50 dark:bg-zinc-800/50">
			<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Getting Started
			</h2>
			{/* add a button that allows the user to do so */}
			<p className="text-lg text-zinc-600 dark:text-zinc-400">
				{getCardContent()}
			</p>
		</div>
	)
}

export default observer(GettingStartedStartCard)
