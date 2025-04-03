"use client"

import { useCallback, useState } from "react"
import { Trash2 } from "lucide-react"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useDeleteSandboxProject from "../../hooks/sandbox/delete-sandbox-project"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"

export default function SingleProjectCard({ project } : { project: SandboxProject }) {
	const navigate = useTypedNavigate()
	const deleteSandboxProject = useDeleteSandboxProject()
	const [isDeleteMode, setIsDeleteMode] = useState(false)

	const handleProjectClick = useCallback((projectUUID: ProjectUUID) => {
		if (isDeleteMode) return
		navigate(`/sandbox/${projectUUID}`)
	}, [navigate, isDeleteMode])

	const handleDeleteClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		setIsDeleteMode(true)
	}, [])

	const handleCancelDelete = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		setIsDeleteMode(false)
	}, [])

	const handleConfirmDelete = useCallback(async (e: React.MouseEvent) => {
		e.stopPropagation()
		await deleteSandboxProject(project.projectUUID)
		setIsDeleteMode(false)
	}, [deleteSandboxProject, project.projectUUID])

	return (
		<div
			key={project.projectUUID}
			className={cn(
				"border-2 rounded-md p-4 cursor-pointer transition-none border-swan",
				isDeleteMode ? "bg-cardinal border-cardinal" : "hover:bg-polar"
			)}
			onClick={() => handleProjectClick(project.projectUUID)}
			onDoubleClick={() => !isDeleteMode && handleProjectClick(project.projectUUID)}
		>
			{!isDeleteMode ? (
				<>
					<div className="flex justify-between items-start">
						<div className="font-medium truncate text-2xl">
							{project.projectName || "Untitled Project"}
						</div>
						<div className="p-1 transition-none rounded hover:bg-swan">
							<Trash2
								className="text-cardinal cursor-pointer"
								size={20}
								onClick={handleDeleteClick}
							/>
						</div>
					</div>
					<div className="text-sm text-hare mt-2">
						Last updated: {new Date(project.updatedAt).toLocaleDateString()}
					</div>
				</>
			) : (
				<div className="flex flex-col items-center text-white">
					<div className="text-center mb-2 text-base">
						Are you sure you want to delete&nbsp;
						<span className="font-bold">
							{project.projectName || "Untitled Project"}?
						</span>
					</div>
					<div className="flex gap-4">
						<Button
							className="bg-standardBackground hover:bg-polar text-cardinal px-4 py-2 rounded-md text-base"
							onClick={handleCancelDelete}
						>
							CANCEL
						</Button>
						<Button
							className="bg-standardBackground hover:bg-polar text-cardinal px-4 py-2 rounded-md text-base"
							onClick={handleConfirmDelete}
						>
							DELETE
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
