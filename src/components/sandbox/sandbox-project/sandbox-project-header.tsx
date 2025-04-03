"use client"

import { observer } from "mobx-react"
import { ArrowLeft, Star, Code2 } from "lucide-react"
import { useCallback } from "react"
import { cn } from "../../../lib/shadcn/utils"
import EditableProjectTitle from "./editable-project-title"
import { useSandboxContext } from "../../../contexts/sandbox-context"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import useStarSandboxProject from "../../../hooks/sandbox/star-sandbox-project"

function SandboxProjectHeader({ project } : {project: SandboxProject}) {
	const navigate = useTypedNavigate()
	const sandboxClass = useSandboxContext()
	const starSandboxProject = useStarSandboxProject()

	// Handle navigation back to projects list
	const handleBack = useCallback(() => {
		navigate("/sandbox")
	}, [navigate])

	// Toggle code visibility
	const toggleCodeVisibility = useCallback(() => {
		sandboxClass.setShowCode(!sandboxClass.showCode)
	}, [sandboxClass])

	return (
		<div className="flex items-center justify-between px-4 border-b-2 py-3 border-swan">
			<div className="flex flex-row items-center justify-center">
				<button
					onClick={handleBack}
					className="flex items-center text-questionText hover:bg-polar p-2 rounded-lg mr-2"
				>
					<ArrowLeft size={30} className="mr-1" />
				</button>

				<EditableProjectTitle project={project} />
			</div>
			<div className="space-x-2">
				<button
					onClick={() => starSandboxProject(project.projectUUID)}
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
	)
}

export default observer(SandboxProjectHeader)
