"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { CircleStop } from "lucide-react"
import debounce from "lodash-es/debounce"
import { useParams } from "next/navigation"
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import ProjectTabs from "./project-tabs"
import { Button } from "../../shadcn/ui/button"
import { EmptySandboxXml } from "../../../utils/constants"
import SandboxProjectHeader from "./sandbox-project-header"
import { usePipContext } from "../../../contexts/pip-context"
import useSendCppToPip from "../../../hooks/pip/send-cpp-to-pip"
import BlocklyLoadingComponent from "../blockly-loading-component"
import { toolboxConfig } from "../../../utils/blockly/toolbox-config"
import { useSandboxContext } from "../../../contexts/sandbox-context"
import AnimatedStateButton from "../../magicui/animated-rainbow-button"
import useEditSandboxProject from "../../../hooks/sandbox/edit-sandbox-project"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import useSetSelectedPipFirstPipUseEffect from "../../../hooks/pip/set-selected-pip-first-pip-use-effect"
import useRetrieveSingleSandboxProjectUseEffect from "../../../hooks/sandbox/retrieve-single-sandbox-projects"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import useStopCurrentlyRunningCode from "../../../hooks/sandbox/stop-currently-running-code"

const BlocklyComponent = lazy(() => import("../blockly-component"))

// eslint-disable-next-line max-lines-per-function, complexity
function SandboxProjectPage() {
	const params = useParams()
	const projectUUID = params.projectUUID as ProjectUUID
	useRetrieveSingleSandboxProjectUseEffect(projectUUID)
	useSetSelectedPipFirstPipUseEffect()
	const sandboxClass = useSandboxContext()
	const pipClass = usePipContext()
	const personalInfoClass = usePersonalInfoContext()
	const [cppCode, setCppCode] = useState("")
	const sendCppToPip = useSendCppToPip()
	const editSandboxProject = useEditSandboxProject()
	const stopCurrentlyRunningCode = useStopCurrentlyRunningCode()

	const project = useMemo(() => {
		return sandboxClass.sandboxProjects.get(projectUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectUUID, sandboxClass.sandboxProjects.size])

	// Current XML state - initialize from project
	const [blocklyXml, setBlocklyXml] = useState(() => project?.sandboxXml || EmptySandboxXml)

	// Update local XML state whenever project changes
	useEffect(() => {
		if (project?.sandboxXml) {
			setBlocklyXml(project.sandboxXml)
		}
	}, [project])

	// Create debounced save function - 1 second delay
	const debouncedSaveProject = useRef(
		debounce((uuid: ProjectUUID, xml: string) => {
			editSandboxProject(uuid, xml)
		}, 1000)
	).current

	// Clean up debounce on unmount
	useEffect(() => {
		return () => debouncedSaveProject.cancel()
	}, [debouncedSaveProject])

	// Loading state - either we're actively retrieving or the project isn't found yet
	const isLoading = sandboxClass.isRetrievingSingleProject(projectUUID)

	// Handle XML changes from the Blockly workspace
	const handleXmlChange = useCallback((newXml: string) => {
		// Update local state
		setBlocklyXml(newXml)

		// Update MobX store and trigger save only if XML has changed
		if (project && project.sandboxXml !== newXml && !isLoading) {
			sandboxClass.updateProjectXml(projectUUID, newXml)

			// Trigger debounced save to backend
			debouncedSaveProject(projectUUID, newXml)
		}
	}, [project, isLoading, sandboxClass, projectUUID, debouncedSaveProject])

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
								setCppCode={setCppCode}
								extraClasses="h-[90%]"
								initialXml={blocklyXml}
								onXmlChange={handleXmlChange}
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
