"use client"

import { observer } from "mobx-react"
import { useParams } from "next/navigation"
import isEmpty from "lodash-es/isEmpty"
import debounce from "lodash-es/debounce"
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react"
import SandboxProjectHeader from "./sandbox-project-header"
import { usePipContext } from "../../../contexts/pip-context"
import useSendCppToPip from "../../../hooks/pip/send-cpp-to-pip"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import { toolboxConfig } from "../../../utils/blockly/toolbox-config"
import { useSandboxContext } from "../../../contexts/sandbox-context"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import useEditSandboxProject from "../../../hooks/sandbox/edit-sandbox-project"
import useRetrieveSingleSandboxProjectUseEffect from "../../../hooks/sandbox/retrieve-single-sandbox-projects"

const BlocklyComponent = lazy(() => import("../blockly-component"))

// eslint-disable-next-line max-lines-per-function, complexity
function SandboxProjectPage() {
	const params = useParams()
	const navigate = useTypedNavigate()
	const projectUUID = params.projectUUID as ProjectUUID
	const sandboxClass = useSandboxContext()
	useRetrieveSingleSandboxProjectUseEffect(projectUUID)
	const [cppCode, setCppCode] = useState("")
	const editSandboxProject = useEditSandboxProject()
	const pipClass = usePipContext()
	const sendCppToPip = useSendCppToPip()

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

	// Get project directly from context
	const project = useMemo(() => {
		return sandboxClass.sandboxProjects.get(projectUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectUUID, sandboxClass.sandboxProjects.size])

	// Current XML state - initialize from project
	const [blocklyXml, setBlocklyXml] = useState(() => project?.sandboxXml || "<xml xmlns=\"https://developers.google.com/blockly/xml\"/>")

	// Update local XML state whenever project changes
	useEffect(() => {
		if (project?.sandboxXml) {
			setBlocklyXml(project.sandboxXml)
		}
	}, [project])

	// Handle navigation back to projects list
	const handleBack = useCallback(() => {
		navigate("/sandbox")
	}, [navigate])

	// Handle XML changes from the Blockly workspace
	const handleXmlChange = useCallback((newXml: string) => {
		// Update local state
		setBlocklyXml(newXml)

		// Update MobX store and trigger save only if XML has changed
		if (project && project.sandboxXml !== newXml) {
			sandboxClass.updateProjectXml(projectUUID, newXml)

			// Trigger debounced save to backend
			debouncedSaveProject(projectUUID, newXml)
		}
	}, [projectUUID, project, sandboxClass, debouncedSaveProject])

	// Loading state - either we're actively retrieving or the project isn't found yet
	const isLoading = sandboxClass.isRetrievingSingleProject(projectUUID)

	if (!project || isLoading) {
		return (
			<div className="p-6">
				<div className="flex items-center mb-6">
					<button
						onClick={handleBack}
						className="mr-4 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
					>
						Back
					</button>
					<h1 className="text-2xl font-bold">
						{isLoading
							? "Loading project..."
							: "Project not found"}
					</h1>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col h-screen min-h-0">
			{/* Header with back button, project name, and code toggle */}
			<SandboxProjectHeader project={project} />

			<div className="flex-1 overflow-y-auto">
				<main className="flex h-full min-h-0">
					{/* Blockly component - width changes based on showCode state */}
					<div
						className="flex flex-col min-h-0 transition-all duration-300 ease-in-out m-4"
						style={{
							width: sandboxClass.showCode ? "calc(60% - 1rem)" : "calc(100% - 2rem)"
						}}
					>
						<div className="flex-1 min-h-0">
							<Suspense>
								<BlocklyComponent
									toolboxConfig={toolboxConfig}
									setCppCode={setCppCode}
									extraClasses="h-[95%]"
									initialXml={blocklyXml}
									onXmlChange={handleXmlChange}
								/>
							</Suspense>
							<BlueTactileButton
								onClick={() => sendCppToPip(cppCode)}
								disabled={isEmpty(cppCode) || pipClass.isSendingCppToPip}
								className="mt-2"
							>
								SEND TO {pipClass.selectedPip?.pipName}
							</BlueTactileButton>
						</div>
					</div>

					{/* Code section - always in DOM but with 0 width when hidden */}
					<div
						className="flex flex-col min-h-0 overflow-hidden transition-all duration-300 ease-in-out border-swan"
						style={{
							width: sandboxClass.showCode ? "calc(40% - 1rem)" : "0",
							borderLeftWidth: sandboxClass.showCode ? "2px" : "0",
							opacity: sandboxClass.showCode ? 1 : 0,
							padding: sandboxClass.showCode ? "1rem" : "0",
							margin: sandboxClass.showCode ? "0 1rem 0" : "0",
							visibility: sandboxClass.showCode ? "visible" : "hidden"
						}}
					>
						<div className="flex justify-between items-center mb-3">
							<h2 className="text-lg font-medium whitespace-nowrap">C++ Code</h2>
						</div>
						<div className="flex-1 overflow-auto bg-polar p-4 rounded">
							<pre className="text-sm font-mono whitespace-pre-wrap">
								{cppCode || "// Your code will appear here"}
							</pre>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

export default observer(SandboxProjectPage)
