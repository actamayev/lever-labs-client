"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { BlocklyJson, ProjectUUID } from "@bluedotrobots/common-ts"
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import ProjectTabs from "./project-tabs"
import { Button } from "../../shadcn/ui/button"
import pipClass from "../../../classes/pip-class"
import sandboxClass from "../../../classes/sandbox-class"
import SandboxProjectHeader from "./sandbox-project-header"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import BlocklyLoadingComponent from "../blockly-loading-component"
import sendCppToPip from "../../../utils/sandbox/send-cpp-to-pip"
import personalInfoClass from "../../../classes/personal-info-class"
import { toolboxConfig } from "../../../utils/blockly/toolbox-config"
import AnimatedStateButton from "../../magicui/animated-rainbow-button"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"
import editSandboxProject from "../../../utils/sandbox/edit-sandbox-project"
import { stripBlockPositions } from "../../../utils/blockly/strip-blockly-positions"
import stopCurrentlyRunningCode from "../../../utils/sandbox/stop-currently-running-code"
import retrieveSingleSandboxProject from "../../../utils/sandbox/retrieve-single-sandbox-project"
import useSetSelectedPipFirstPipUseEffect from "../../../hooks/pip/set-selected-pip-first-pip-use-effect"

const BlocklyComponent = lazy(() => import("../blockly-component"))

interface SandboxProjectPageProps {
	projectUUID: ProjectUUID
}

// eslint-disable-next-line max-lines-per-function, complexity
function SandboxProjectPage({ projectUUID }: SandboxProjectPageProps) {
	useEffect(() => void retrieveSingleSandboxProject(projectUUID), [projectUUID])
	useSetSelectedPipFirstPipUseEffect()
	const [cppCode, setCppCode] = useState("")
	const isLoading = sandboxClass.isRetrievingSingleProject(projectUUID)

	const project = useMemo(() => {
		return sandboxClass.sandboxProjects.get(projectUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectUUID, sandboxClass.sandboxProjects.size])

	const isFirstChangeAfterInitRef = useRef(true)

	const handleJsonChange = useCallback((newBlocklyJson: BlocklyJson) => {
		if (!project || isLoading) return

		// Skip the first change event which happens during workspace initialization
		if (isFirstChangeAfterInitRef.current) {
			isFirstChangeAfterInitRef.current = false
			return
		}

		if (isEqual(stripBlockPositions(newBlocklyJson), stripBlockPositions(project.sandboxJson))) {
			if (isEmpty(cppCode)) {
				setCppCode(generateCppFromJson(newBlocklyJson))
			}
			return
		}

		setCppCode(generateCppFromJson(newBlocklyJson))
		sandboxClass.updateProjectJson(projectUUID, newBlocklyJson)
		editSandboxProject(projectUUID, newBlocklyJson)
	}, [project, isLoading, projectUUID, cppCode])

	// Reset the flag when navigating to a different project
	useEffect(() => {
		isFirstChangeAfterInitRef.current = true
	}, [projectUUID])

	if (!project || isLoading) {
		return (
			<div className="p-6">
				<div className="flex items-center mb-6">
					<Link href="/sandbox">
						<Button className="mr-4 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
							Back
						</Button>
					</Link>
					<h1 className="text-2xl font-bold">
						{isLoading
							? "Loading project..."
							: "Project not found"}
					</h1>
				</div>
			</div>
		)
	}

	// 4/23/25: TODO Fix the stop button icon from jittering on hover
	return (
		<div className="flex flex-col h-screen min-h-0">
			{/* Header with back button, project name, and code toggle */}
			<SandboxProjectHeader project={project} />

			<div className="flex flex-1 overflow-hidden">
				<div
					className="flex flex-col min-h-0 transition-all duration-300 ease-in-out m-4"
					style={{
						width: personalInfoClass.sandboxNotesOpen ? "calc(60% - 1rem)" : "calc(100% - 2rem)"
					}}
				>
					<div className="flex-1 min-h-0">
						<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
							<BlocklyComponent
								toolboxConfig={toolboxConfig}
								extraClasses="h-[90%]"
								initialBlocklyJson={project.sandboxJson}
								onJsonChange={handleJsonChange}
							/>
						</Suspense>
						<div className="flex flex-row mt-2 h-[10%] w-full space-x-2 items-center justify-center">
							<AnimatedStateButton
								buttonText="SEND CODE"
								isDisabled={isEmpty(cppCode) || pipClass.isSendingCppToPip}
								onClick={(event) => sendCppToPip(cppCode, event.currentTarget.getBoundingClientRect())}
								className="duration-150 rounded-xl text-4xl"
							/>
							<TactileButton
								className="h-full -mt-1 bg-cardinal flex items-center justify-center w-auto rounded-xl text-4xl !px-10"
								shadowColor="rgb(150, 50, 75)"
								onClick={stopCurrentlyRunningCode}
							>
								STOP
							</TactileButton>
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
						<ProjectTabs
							project={project}
							cppCode={cppCode}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(SandboxProjectPage)
