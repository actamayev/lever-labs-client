"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { BlocklyWorkspace } from "react-blockly"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "../../../lib/utils"
import personalInfoClass from "../../../classes/personal-info-class"
import initializeBlocks from "../../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../../utils/blockly/workspace-config"
import { BlocklyJson } from "@actamayev/lever-labs-common-ts/types/sandbox"
import { isEmpty } from "lodash-es"
import AnimatedStateButton from "../../magicui/animated-rainbow-button"
import sendCppToPip from "../../../utils/sandbox/send-cpp-to-pip"
import pipClass from "../../../classes/pip-class"
import getCppGenerator from "../../../utils/cpp/cpp-generator"
import careerQuestClass from "../../../classes/career-quest-class"
import navigationManagerClass from "../../../classes/navigation-manager-class"
import { CareerUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import StopCodeButton from "../../buttons/stop-code-button"

interface Props {
	blocklyJson: BlocklyJson
	extraClasses?: string
	careerUUID?: CareerUUID // Optional: if provided, will mark slide completion on successful upload
}

// eslint-disable-next-line max-lines-per-function
function ViewOnlySandbox(props: Props): React.ReactNode {
	const {
		blocklyJson,
		extraClasses = "h-full",
		careerUUID,
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const pathname = usePathname()
	const [isCentered, setIsCentered] = useState(false)
	const [isCentering, setIsCentering] = useState(false)
	const [cppCode, setCppCode] = useState<string>("")

	// Generate CPP code from blockly JSON on component mount and when blocklyJson changes
	useEffect((): () => void => {
		let isCancelled = false

		const generateCppCode = async (): Promise<void> => {
			try {
				const generatedCode = await getCppGenerator().generateCppFromJson(blocklyJson)
				if (!isCancelled) {
					setCppCode(generatedCode)
				}
			} catch (error) {
				console.error("Error generating CPP code:", error)
				if (!isCancelled) {
					setCppCode("")
				}
			}
		}

		void generateCppCode()

		// Cleanup function to prevent state updates if component unmounts
		return (): void => {
			isCancelled = true
		}
	}, [blocklyJson])

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		return getWorkspaceConfig(isDarkMode, true, 1.4, true)
	}, [isDarkMode])

	const centerWorkspace = useCallback((): void => {
		setIsCentering(true)
		const workspace = workspaceRef.current
		if (!workspace) return

		// Always center the workspace
		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)
		workspace.scrollCenter()

		setIsCentered(true)
		setIsCentering(false)
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg): void => {
		workspaceRef.current = workspace

		// Center workspace on first initialization
		if (!isCentered) {
			centerWorkspace()
		}
	}, [isCentered, centerWorkspace])

	useEffect((): void => {
		setIsCentered(false)
	}, [blocklyJson])

	// Reset isCentered when pathname changes (navigation)
	useEffect((): void => {
		setIsCentered(false)
	}, [pathname])

	// Add effect to center workspace after it's initialized and when blocks change
	useEffect((): () => void => {
		if (isCentered || isCentering) return (): void => {}
		const timer = setTimeout((): void => {
			centerWorkspace()
		}, 100) // Small delay to ensure workspace is fully rendered

		return (): void => clearTimeout(timer)
	}, [centerWorkspace, blocklyJson, isCentered, isCentering, pathname])

	useEffect((): void => {
		if (workspaceRef.current) {
			workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme)

		}
	}, [isDarkMode])

	useEffect((): () => void => {
		if (!containerRef.current) return (): void => {}

		const resizeObserver = new ResizeObserver((): void => {
			if (workspaceRef.current) {
				Blockly.svgResize(workspaceRef.current)
			}
		})

		resizeObserver.observe(containerRef.current)

		return (): void => {
			resizeObserver.disconnect()
		}
	}, [])

	useEffect((): void => {
		void initializeBlocks()
	}, [])

	const handleSendCode = useCallback(async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		try {
			// Send code to robot
			await sendCppToPip(cppCode, event.currentTarget.getBoundingClientRect())

			// Mark slide completion if in career quest context
			if (careerUUID) {
				const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
				let slideId: string | undefined

				if (currentSlide.type === "textParent") {
					const textChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID, currentSlide.id)
					const textChild = currentSlide.data.children[textChildIndex]
					slideId = textChild.id
				} else if (currentSlide.type === "challenge") {
					slideId = currentSlide.id
				}

				if (slideId) {
					careerQuestClass.markSlideInteractionComplete(careerUUID, slideId)
				}
			}
		} catch (error) {
			console.error("Error sending code to robot:", error)
			// Don't mark completion if there was an error
		}
	}, [cppCode, careerUUID])

	return (
		<div className="flex flex-col h-full">
			<div className="h-full flex flex-col">
				<div className="flex-1 min-h-0">
					<div
						ref={containerRef}
						className={cn("relative z-0 rounded-3xl overflow-hidden border-b-2 border-swan h-full", extraClasses)}
					>
						<BlocklyWorkspace
							initialJson={blocklyJson}
							workspaceConfiguration={workspaceConfiguration}
							className="h-full w-full duration-0"
							onWorkspaceChange={handleWorkspaceChange}
						/>
					</div>
				</div>
				<div className="shrink-0 flex gap-3 p-3">
					<AnimatedStateButton
						buttonText="SEND CODE"
						isDisabled={isEmpty(cppCode) || pipClass.isSendingCppToPip}
						onClick={handleSendCode}
						className="flex-1 rounded-xl text-xl h-12 font-semibold"
						uploadClasses="size-4!"
					/>
					<StopCodeButton
						className="w-24 text-xl h-12 font-semibold gap-2"
						pauseClasses="size-4!"
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(ViewOnlySandbox)
