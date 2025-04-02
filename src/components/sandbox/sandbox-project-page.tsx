"use client"

import { lazy, Suspense, useCallback, useMemo, useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "next/navigation"
import { toolboxConfig } from "../../utils/blockly/toolbox-config"
import { useSandboxContext } from "../../contexts/sandbox-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useRetrieveSingleSandboxProjectUseEffect from "../../hooks/sandbox/retrieve-single-sandbox-projects"

const BlocklyComponent = lazy(() => import("./blockly-component"))

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
	}, [projectUUID, sandboxClass.sandboxProjects.size])

	console.log(sandboxClass.sandboxProjects)
	console.log(project)
	// Handle navigation back to projects list
	const handleBack = useCallback(() => {
		navigate("/sandbox")
	}, [navigate])

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
			<div className="flex-1">
				<main className="flex h-full min-h-0">
					<div className="w-full flex flex-col m-4 min-h-0">
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
				</main>
			</div>
		</div>
	)
}

export default observer(SandboxProjectPage)
