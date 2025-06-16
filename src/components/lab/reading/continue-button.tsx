"use client"

import { observer } from "mobx-react"
import { StepForward } from "lucide-react"
import { useCallback, useState } from "react"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import labReadingClass from "../../../classes/lab-reading-class"

interface Props {
	blockId: ContentBlockID
}

function ContinueButton(props: Props) {
	const { blockId } = props
	const [isContinued, setIsContinued] = useState(false)

	const clickContinue = useCallback(() => {
		if (isContinued) return
		labReadingClass.handleContinue(blockId, setIsContinued)
	}, [blockId, isContinued])

	return (
		<BlueTactileButton
			onClick={clickContinue}
			className="px-6 !py-5 text-3xl w-full h-16"
			isPressed={isContinued}
		>
			<StepForward className="!w-8 !h-8" />
			CONTINUE
		</BlueTactileButton>
	)
}

export default observer(ContinueButton)
