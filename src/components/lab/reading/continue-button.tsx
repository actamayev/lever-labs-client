"use client"

import { observer } from "mobx-react"
import { StepForward } from "lucide-react"
import { useCallback, useState } from "react"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

interface Props {
	blockId: ContentBlockID
}

function ContinueButton(props: Props) {
	const { blockId } = props
	const [isContinued, setIsContinued] = useState(false)
	const labReadingClass = useLabReadingContext()

	const clickContinue = useCallback(() => {
		if (isContinued) return
		labReadingClass.handleContinue(blockId, setIsContinued)
	}, [blockId, isContinued, labReadingClass])

	return (
		<BlueTactileButton
			onClick={clickContinue}
			className="px-6 !py-5 text-3xl w-full h-16"
			shadowHeight={4}
			isPressed={isContinued}
		>
			<StepForward className="!w-8 !h-8" />
			CONTINUE
		</BlueTactileButton>
	)
}

export default observer(ContinueButton)
