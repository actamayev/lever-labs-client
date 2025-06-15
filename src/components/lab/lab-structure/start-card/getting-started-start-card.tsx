"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import GettingStartedAddPip from "./getting-started-add-pip"
import pipClass from "../../../../classes/pip-class"

function GettingStartedStartCard() {

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
		<div className="border-2 border-swan rounded-lg bg-inherit">
			<div className="flex items-start justify-between gap-4">
				<div className="space-y-2 flex-1 p-4">
					<h2 className="text-lg font-semibold text-eel dark:text-wolf">
                        Getting Started
					</h2>
					<p className="text-lg text-eel dark:text-gray-400">
						{getCardContent()}
					</p>
				</div>
				<GettingStartedAddPip />
			</div>
		</div>
	)
}

export default observer(GettingStartedStartCard)
