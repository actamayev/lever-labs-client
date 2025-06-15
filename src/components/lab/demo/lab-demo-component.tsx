"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { useRouter } from "next/navigation"
import DemoCard from "./demo-card"
import DemoTemplate from "../activity-structure/demo-template"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import { usePageTransitionContext } from "../../../classes/page-transition-context"
import { useLabReadingContext } from "../../../classes/lab-reading-context"
import AnimatedTransitionWrapper from "../../animated-transition-wrapper"

interface Props {
	lessonDemoTitle: string
    demoDeliverables: string[]
    demos: Demo[]
	blockId: LEDReadingBlockID
}

function LabDemoComponent(props: Props) {
	const {
		lessonDemoTitle,
		demoDeliverables,
		demos,
		blockId
	} = props
	const router = useRouter()
	const pageTransitionClass = usePageTransitionContext()
	const labReadingClass = useLabReadingContext()

	const goBack = useCallback(() => {
		pageTransitionClass.setDirection("up")
		router.back()
		labReadingClass.handleDemoComplete(blockId)
	}, [pageTransitionClass, router, labReadingClass, blockId])

	return (
		<AnimatedTransitionWrapper>
			<DemoTemplate>
				<main className="flex-1 flex items-center flex-col justify-center p-4">
					<DemoCard
						lessonDemoTitle={lessonDemoTitle}
						demoDeliverables={demoDeliverables}
						demos={demos}
					/>
					<BlueTactileButton
						onClick={goBack}
						className="px-6 !py-5 text-3xl w-3/4 h-16 mt-12"
					>
					CONTINUE
					</BlueTactileButton>
				</main>
			</DemoTemplate>
		</AnimatedTransitionWrapper>
	)
}

export default observer(LabDemoComponent)
