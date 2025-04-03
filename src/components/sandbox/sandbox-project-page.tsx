"use client"

import { observer } from "mobx-react"
import { useParams } from "next/navigation"
import { ArrowLeft, Star, Code2 } from "lucide-react"
import { lazy, Suspense, useCallback, useMemo, useState } from "react"
import { cn } from "../../lib/shadcn/utils"
import EditableProjectTitle from "./editable-project-title"
import { toolboxConfig } from "../../utils/blockly/toolbox-config"
import { useSandboxContext } from "../../contexts/sandbox-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useStarSandboxProject from "../../hooks/sandbox/star-sandbox-project"
import useRetrieveSingleSandboxProjectUseEffect from "../../hooks/sandbox/retrieve-single-sandbox-projects"

const BlocklyComponent = lazy(() => import("./blockly-component"))

// eslint-disable-next-line max-lines-per-function, complexity
function SandboxProjectPage() {
	const params = useParams()
	const navigate = useTypedNavigate()
	const projectUUID = params.projectUUID as ProjectUUID
	const sandboxClass = useSandboxContext()
	useRetrieveSingleSandboxProjectUseEffect(projectUUID)
	const [cppCode, setCppCode] = useState("")
	const starSandboxProject = useStarSandboxProject()

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
			<div className="flex items-center justify-between px-4 border-b-2 py-3 border-swan">
				<button
					onClick={handleBack}
					className="flex items-center text-questionText hover:bg-polar p-2 rounded-2xl"
				>
					<ArrowLeft size={30} className="mr-1" />
				</button>

				<EditableProjectTitle
					projectUUID={projectUUID}
					initialName={project.projectName}
				/>
				<div className="space-x-2">
					<button
						onClick={() => starSandboxProject(projectUUID)}
						className={cn(
							"p-2 rounded-md transition-none hover:bg-polar",
							project.isStarred ? "text-bee" : ""
						)}
					>
						<Star
							size={30}
							className={project.isStarred ? "fill-bee" : ""}
						/>
					</button>

					<button
						onClick={toggleCodeVisibility}
						className={`p-2 rounded-md transition-none ${
							sandboxClass.showCode
								? "bg-standardBackgroundHover text-macaw"
								: "text-questionText hover:bg-polar"
						}`}
						title={sandboxClass.showCode ? "Hide Code" : "Show Code"}
					>
						<Code2 size={30} />
					</button>
				</div>
			</div>

			<div className="flex-1 overflow-hidden">
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
									extraClasses="h-full"
									initialXml={project.sandboxXml}
								/>
							</Suspense>
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
							margin: sandboxClass.showCode ? "0 1rem 1rem 0" : "0",
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
