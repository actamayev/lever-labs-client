"use client"

import { lazy, Suspense, useCallback, useMemo, useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "next/navigation"
import { Code, ArrowLeft } from "lucide-react"
import { toolboxConfig } from "../../utils/blockly/toolbox-config"
import { useSandboxContext } from "../../contexts/sandbox-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useRetrieveSingleSandboxProjectUseEffect from "../../hooks/sandbox/retrieve-single-sandbox-projects"

const BlocklyComponent = lazy(() => import("./blockly-component"))

// eslint-disable-next-line max-lines-per-function
function SandboxProjectPage() {
	const params = useParams()
	const navigate = useTypedNavigate()
	const projectUUID = params.projectUUID as ProjectUUID
	const sandboxClass = useSandboxContext()
	useRetrieveSingleSandboxProjectUseEffect(projectUUID)
	const [cppCode, setCppCode] = useState("")

	// Get project directly from context
	const project = useMemo(() => {
		return sandboxClass.sandboxProjects.get(projectUUID)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectUUID, sandboxClass.sandboxProjects.size])

	// Handle navigation back to projects list
	const handleBack = useCallback(() => {
		navigate("/sandbox")
	}, [navigate])

	// Toggle code visibility
	const toggleCodeVisibility = useCallback(() => {
		sandboxClass.setShowCode(!sandboxClass.showCode)
	}, [sandboxClass])

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
			<div className="flex items-center justify-between px-4 py-3 border-b-2 border-swan">
				<button
					onClick={handleBack}
					className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
				>
					<ArrowLeft size={20} className="mr-1" />
					<span>Back</span>
				</button>

				<h1 className="text-xl font-medium truncate max-w-md">
					{project.projectName || "Untitled Project"}
				</h1>

				<button
					onClick={toggleCodeVisibility}
					className={`p-2 rounded-md transition-none ${
						sandboxClass.showCode
							? "bg-blue-100 text-blue-600"
							: "text-gray-600 hover:bg-gray-100"
					}`}
					title={sandboxClass.showCode ? "Hide Code" : "Show Code"}
				>
					<Code size={20} />
				</button>
			</div>

			<div className="flex-1">
				<main className="flex h-full min-h-0">
					{/* Blockly component - width changes based on showCode state */}
					<div
						className={`flex flex-col m-4 min-h-0 ${
							sandboxClass.showCode ? "w-3/5" : "w-full"
						}`}
					>
						<div className="flex-1 min-h-0">
							<Suspense>
								<BlocklyComponent
									toolboxConfig={toolboxConfig}
									setCppCode={setCppCode}
									extraClasses="h-full"
									initialXml={project.sandboxXml}
								/>
							</Suspense>
						</div>
					</div>

					{/* Code section - only visible when showCode is true */}
					{sandboxClass.showCode && (
						<div className="w-2/5 border-l-2 ml-0 p-4 flex flex-col min-h-0 border-swan">
							<div className="flex justify-between items-center mb-3">
								<h2 className="text-lg font-medium">C++ Code</h2>
							</div>
							<div className="flex-1 overflow-auto bg-polar p-4 rounded">
								<pre className="text-sm font-mono whitespace-pre-wrap">
									{cppCode || "// Your code will appear here"}
								</pre>
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	)
}

export default observer(SandboxProjectPage)
