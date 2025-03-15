"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import isUndefined from "lodash-es/isUndefined"
import QuizButton from "./quiz-button"
import { cn } from "../../../lib/shadcn/utils"
import ContinueButton from "./continue-button"
import DemoReadingButton from "./demo-reading-button"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

function ReadingBlock({ block } : { block: ContentBlock }) {
	const labReadingClass = useLabReadingContext()

	const isRevealed = useMemo(() => {
		return labReadingClass.checkIfBlockIsShown(block.id)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [block.id, labReadingClass.shownBlocks])

	return (
		<div
			key={block.id}
			id={`block-${block.id}`}
			className={cn(
				"flex flex-col mb-6 transition-opacity duration-300 leading-none",
				isRevealed ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
				labReadingClass.getBlockHeightState(block.id)
			)}
		>
			{block.text}
			<div>
				{isRevealed && block.action.type === "continue" && (
					<ContinueButton blockId={block.id} />
				)}

				{isRevealed && block.action.type === "quiz" && (
					<QuizButton block={block}/>
				)}

				{isRevealed && !isUndefined(block.action.demoLink) && block.action.type === "demo" && (
					<DemoReadingButton block={block} />
				)}
			</div>
		</div>
	)
}

export default observer(ReadingBlock)
