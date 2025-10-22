"use client"

import type * as Blockly from "blockly/core"
import Link from "next/link"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { ArrowLeft } from "lucide-react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { SandboxProjectUUID } from "@lever-labs/common-ts/types/utils"
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import ProjectTabs from "./project-tabs"
import pipClass from "../../../classes/pip-class"
import BlocklySearchBar from "../blockly-search-bar"
import sandboxClass from "../../../classes/sandbox-class"
import SandboxProjectHeader from "./header/sandbox-project-header"
import { TactileButton } from "../../ui/tactile-button"
import getCppGenerator from "../../../utils/cpp/cpp-generator"
import BlocklyLoadingComponent from "../blockly-loading-component"
import sendCppToPip from "../../../utils/sandbox/send-cpp-to-pip"
import personalInfoClass from "../../../classes/personal-info-class"
import { toolboxConfig } from "../../../utils/blockly/toolbox-config"
import AnimatedStateButton from "../../magicui/animated-rainbow-button"
import BlocklySearchFilter from "../../../utils/sandbox/search-helpers"
import editSandboxProject from "../../../utils/sandbox/edit-sandbox-project"
import { stripBlockPositions } from "../../../utils/blockly/strip-blockly-positions"
import stopCurrentlyRunningCode from "../../../utils/sandbox/stop-currently-running-code"
import retrieveSingleSandboxProject from "../../../utils/sandbox/retrieve-single-sandbox-project"
import LoadingSandboxProjectPage from "./loading-sandbox-project-page"

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const BlocklyComponent = lazy(() => import("../blockly-component"))

// eslint-disable-next-line max-lines-per-function, complexity
function SandboxProjectPage({ projectUUID }: { projectUUID: SandboxProjectUUID }): React.ReactNode {
	useEffect((): void => {
		void retrieveSingleSandboxProject(projectUUID)
	}, [projectUUID])
	const [searchTerm, setSearchTerm] = useState("")
	const [isSwitchingMode, setIsSwitchingMode] = useState(false)
	const searchBarRef = useRef<HTMLInputElement>(null)
	const previousSearchingRef = useRef(false)
	const isLoading = sandboxClass.isRetrievingSingleProject(projectUUID)

	const project = useMemo((): SandboxProjectWithStreaming | undefined => {
		return sandboxClass.sandboxProjects.get(projectUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectUUID, sandboxClass.sandboxProjects.size])

	const filteredToolboxConfig = useMemo((): Blockly.utils.toolbox.ToolboxDefinition => {
		return BlocklySearchFilter.filterToolboxConfig(toolboxConfig, searchTerm)
	}, [searchTerm])

	const isFirstChangeAfterInitRef = useRef(true)

	const handleSearchChange = useCallback((newSearchTerm: string): void => {
		const wasSearching = previousSearchingRef.current
		const isSearching = newSearchTerm.trim().length > 0

		// Set switching mode synchronously if we're transitioning between states
		if (wasSearching !== isSearching) {
			setIsSwitchingMode(true)
		}

		setSearchTerm(newSearchTerm)
		previousSearchingRef.current = isSearching
	}, [])

	// Reset switching mode after a delay
	useEffect((): () => void => {
		if (!isSwitchingMode) return (): void => {}

		const timer = setTimeout((): void => {
			setIsSwitchingMode(false)
		}, 200)

		return (): void => clearTimeout(timer)
	}, [isSwitchingMode])

	// Track if we're currently processing a change to prevent duplicate API calls
	const isProcessingChangeRef = useRef(false)

	const handleJsonChange = useCallback(async (newBlocklyJson: BlocklyJson): Promise<void> => {
		if (!project || isLoading || isProcessingChangeRef.current) return

		// Skip the first change event which happens during workspace initialization
		if (isFirstChangeAfterInitRef.current) {
			isFirstChangeAfterInitRef.current = false
			return
		}

		if (isEqual(stripBlockPositions(newBlocklyJson), stripBlockPositions(project.sandboxJson))) {
			if (isEmpty(project.cppCode)) {
				const generatedCppCode = await getCppGenerator().generateCppFromJson(newBlocklyJson)
				sandboxClass.setCppCode(projectUUID, generatedCppCode)
			}
			return
		}

		// Set flag to prevent duplicate processing
		isProcessingChangeRef.current = true

		try {
			const generatedCppCode = await getCppGenerator().generateCppFromJson(newBlocklyJson)
			// Use the new method that doesn't regenerate CPP code
			sandboxClass.updateProjectJsonWithCpp(projectUUID, newBlocklyJson, generatedCppCode)
			await editSandboxProject(projectUUID, newBlocklyJson)
		} finally {
			// Reset flag when done
			isProcessingChangeRef.current = false
		}
	}, [project, isLoading, projectUUID])

	// Reset the flag when navigating to a different project
	useEffect((): void => {
		isFirstChangeAfterInitRef.current = true
		isProcessingChangeRef.current = false
		setIsSwitchingMode(false)
		setSearchTerm("")
		previousSearchingRef.current = false
	}, [projectUUID])

	// Handle '/' key to focus search bar and 'Escape' key to unfocus it
	useEffect((): () => void => {
		// eslint-disable-next-line complexity
		const handleKeyDown = (event: KeyboardEvent): void => {
			// Handle '/' key to focus search bar
			if (event.key !== "/" && event.key !== "Escape") return

			if (event.key === "/") {
				// Check if user is currently typing in notes or chat
				const activeElement = document.activeElement
				if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
					// Check if the focused element is in the notes or chat sections
					const isInNotesOrChat = activeElement.closest("[data-notes-section=\"true\"]") ||
						activeElement.closest("[data-chat-section=\"true\"]")

					if (isInNotesOrChat) {
						return // Don't focus search bar if user is typing in notes or chat
					}
				}

				// Prevent default behavior (typing '/' in other inputs)
				event.preventDefault()

				// Focus the search bar
				searchBarRef.current?.focus()
				return

			} else if (event.key === "Escape") {
				const activeElement = document.activeElement

				// Check if the search bar is currently focused
				if (activeElement === searchBarRef.current) {
					// Blur the search bar
					searchBarRef.current?.blur()
				}
				return
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return (): void => document.removeEventListener("keydown", handleKeyDown)
	}, [])

	// Loading state - show full layout but disabled
	if (isLoading) {
		return <LoadingSandboxProjectPage />
	}

	// Project not found - show header with message
	if (!project) {
		return (
			<div className="flex flex-col h-screen min-h-0">
				{/* Header with back button only */}
				<div className="flex items-center justify-between px-4 border-b-2 py-3 border-swan" style={{ height: "74px" }}>
					<div className="flex flex-row items-center justify-center">
						<Link href="/sandbox">
							<button className="flex items-center text-question-text hover:bg-polar p-2 rounded-lg mr-2">
								<ArrowLeft size={30} className="mr-1" />
							</button>
						</Link>
						<h1 className="text-2xl font-bold">Project not found</h1>
					</div>
				</div>

				<div className="flex flex-1 items-center justify-center">
					<div className="text-center">
						<h2 className="text-xl text-hare mb-4">This project could not be found</h2>
						<Link href="/sandbox">
							<TactileButton className="bg-blue-600 text-white px-6 py-2 rounded-lg">
								Return to Sandbox
							</TactileButton>
						</Link>
					</div>
				</div>
			</div>
		)
	}

	// TODO: 4/23/25: Fix the stop button icon from jittering on hover
	return (
		<div className="flex flex-col h-screen min-h-0">
			{/* Header with back button, project name, and code toggle */}
			<SandboxProjectHeader project={project} />

			<div className="flex flex-1 overflow-hidden">
				<div
					className="flex flex-col min-h-0 transition-all duration-300 ease-in-out m-4"
					style={{ width: personalInfoClass.sandboxNotesOpen ? "calc(60% - 1rem)" : "calc(100% - 2rem)" }}
				>
					<div className="min-h-0 flex flex-col h-full">
						<BlocklySearchBar
							ref={searchBarRef}
							searchTerm={searchTerm}
							onSearchChange={handleSearchChange}
						/>
						<div className="h-full w-full border-b-2 border-x-2 border-swan rounded-b-3xl bg-polar min-h-0 flex flex-col">
							<Suspense fallback={<BlocklyLoadingComponent />}>
								<BlocklyComponent
									toolboxConfig={filteredToolboxConfig}
									initialBlocklyJson={project.sandboxJson}
									onJsonChange={handleJsonChange}
									searchTerm={searchTerm}
									isSwitchingMode={isSwitchingMode}
								/>
							</Suspense>
							<div className="flex gap-3 pt-3 pb-2 px-4">
								<AnimatedStateButton
									buttonText="SEND CODE"
									isDisabled={isEmpty(project.cppCode) || pipClass.isSendingCppToPip}
									onClick={async (event): Promise<void> => {
										return await sendCppToPip(project.cppCode, event.currentTarget.getBoundingClientRect())
									}}
									className="duration-150 rounded-xl text-4xl"
								/>
								<TactileButton
									className="h-full -mt-1 bg-cardinal flex items-center justify-center w-auto rounded-xl text-4xl px-10!"
									shadowColor="rgb(150, 50, 75)"
									onClick={(): Promise<void> => stopCurrentlyRunningCode(false)}
								>
									STOP
								</TactileButton>
							</div>
						</div>
					</div>
				</div>

				{/* Tabbed interface with Code and Notes sections */}
				<div
					className="flex flex-col h-full transition-all duration-300 ease-in-out border-swan"
					style={{
						width: personalInfoClass.sandboxNotesOpen ? "calc(40% - 1rem)" : "0",
						borderLeftWidth: personalInfoClass.sandboxNotesOpen ? "2px" : "0",
						opacity: personalInfoClass.sandboxNotesOpen ? 1 : 0,
						padding: personalInfoClass.sandboxNotesOpen ? "1rem" : "0",
						visibility: personalInfoClass.sandboxNotesOpen ? "visible" : "hidden"
					}}
				>
					{personalInfoClass.sandboxNotesOpen && (
						<ProjectTabs projectUUID={projectUUID} />
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(SandboxProjectPage)
