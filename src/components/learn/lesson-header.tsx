"use client"

import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
// import { TactileButton } from "../shadcn/ui/tactile-button"
// import { BotIcon } from "lucide-react"
import stopCareerTrigger from "../../utils/career-quest/stop-career-trigger"
import NetworkWorkbench from "../workbench/network/network-workbench"
import SandboxBatterySection from "../sandbox/sandbox-project/header/sandbox-battery-section"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import ConnectToPipButton from "../connect-pip/connect-to-pip-button"
import pipClass from "../../classes/pip-class"

function LessonHeader({ lessonId }: { lessonId: LessonUUID }): React.ReactNode {
	const navigate = useTypedNavigate()
	const lesson = learnClass.getLesson(lessonId)

	const progress = useMemo((): number => {
		if (!lesson?.lessonQuestionMap) return 0

		const totalQuestions = lesson.lessonQuestionMap.length
		if (totalQuestions === 0) return 0

		return (lesson.numberQuestionsCorrect / totalQuestions) * 100
	}, [lesson?.lessonQuestionMap, lesson?.numberQuestionsCorrect])

	const handleBack = useCallback((): void => {
		navigate("/learn")
		stopCareerTrigger()
	}, [navigate])

	return (
		<header className="h-[15vh] flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-96">
			{/* Left: Back button */}
			<button
				onClick={handleBack}
				className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-swan duration-0"
				aria-label="Go back to lessons"
			>
				<svg
					className="w-6 h-6 text-eel"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			{/* Center: Progress bar */}
			<div className="flex-1 mx-10">
				<div className="w-full bg-swan rounded-full h-4">
					<div
						className="bg-chargingGreen h-4 rounded-full transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>
			{!pipClass.selectedPip ? (
				<div className="h-full flex items-center justify-center mb-1">
					<ConnectToPipButton
						colors={getDuolingoColors("humpback")}
						tactileButtonClasses="h-8 text-xl"
						botIconClasses="!size-6"
					/>
				</div>
			) : (
				<div className="flex flex-row gap-3">
					<SandboxBatterySection />
					<NetworkWorkbench isSandboxPage={true} />
				</div>
			)}

			{/* Right: Bot button */}
			{/* <TactileButton
				onClick={handleBotClick}
				shadowClass="shadow-macaw-2"
				className="w-10 h-10 bg-macaw"
			>
				<BotIcon className="size-10 text-standardBackground"/>
			</TactileButton> */}
		</header>
	)
}

export default observer(LessonHeader)
