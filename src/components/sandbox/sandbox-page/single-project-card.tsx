"use client"

import { observer } from "mobx-react"
import truncate from "lodash-es/truncate"
import { useCallback, useState } from "react"
import { EllipsisVertical, Star, Trash2, Edit } from "lucide-react"
import { ProjectUUID, SandboxProject } from "@bluedotrobots/common-ts"
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuContent
} from "../../shadcn/ui/dropdown-menu"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"
import RenameProjectDialog from "./rename-project-dialog"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import relativeDateFormatter from "../../../utils/sandbox/date-formatting"
import starSandboxProject from "../../../utils/sandbox/star-sandbox-project"
import deleteSandboxProject from "../../../utils/sandbox/delete-sandbox-project"

// eslint-disable-next-line max-lines-per-function
function SingleProjectCard({ project } : { project: SandboxProject }): React.ReactNode {
	const navigate = useTypedNavigate()
	const [isDeleteMode, setIsDeleteMode] = useState(false)
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
	const [newProjectName, setNewProjectName] = useState(project.projectName || "")

	const handleProjectClick = useCallback((projectUUID: ProjectUUID): void => {
		if (isDeleteMode) return
		navigate(`/sandbox/${projectUUID}`)
	}, [navigate, isDeleteMode])

	const handleDeleteClick = useCallback((e: React.MouseEvent): void => {
		e.stopPropagation()
		setIsDeleteMode(true)
	}, [])

	const handleStarClick = useCallback((e: React.MouseEvent): void => {
		e.stopPropagation()
		starSandboxProject(project.projectUUID)
	}, [project.projectUUID])

	const handleRenameClick = useCallback((e: React.MouseEvent): void => {
		e.stopPropagation()
		setNewProjectName(project.projectName || "")
		setIsRenameDialogOpen(true)
	}, [project.projectName])

	const handleCancelDelete = useCallback((e: React.MouseEvent): void => {
		e.stopPropagation()
		setIsDeleteMode(false)
	}, [])

	const handleConfirmDelete = useCallback(async (e: React.MouseEvent): Promise<void> => {
		e.stopPropagation()
		await deleteSandboxProject(project.projectUUID)
		setIsDeleteMode(false)
	}, [project.projectUUID])

	return (
		<>
			<div
				key={project.projectUUID}
				className={cn(
					"border-2 rounded-xl p-4 cursor-pointer transition-none border-swan min-h-32",
					isDeleteMode ? "bg-cardinal border-cardinal" : "hover:bg-polar"
				)}
				onClick={(): void => handleProjectClick(project.projectUUID)}
				onDoubleClick={(): void => { if (!isDeleteMode) handleProjectClick(project.projectUUID) }}
			>
				{isDeleteMode ? (
					<div className="flex flex-col items-center text-white">
						<div className="text-center mb-2 text-base">
							Are you sure you want to delete&nbsp;
							<span className="font-bold">
								{truncate(project.projectName || "Untitled Project")}?
							</span>
						</div>
						<div className="flex gap-4">
							<Button
								className="bg-white hover:bg-[rgb(247,247,247)] text-cardinal px-4 rounded-md text-base"
								onClick={handleCancelDelete}
							>
								CANCEL
							</Button>
							<Button
								className="bg-white hover:bg-[rgb(247,247,247)] text-cardinal px-4 rounded-md text-base"
								onClick={handleConfirmDelete}
							>
								DELETE
							</Button>
						</div>
					</div>
				) : (
					<>
						<div className="flex justify-between items-center">
							<div className="font-medium truncate text-2xl">
								{project.projectName || "Untitled Project"}
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild onClick={(e): void => e.stopPropagation()}>
									<div className="p-1 transition-none rounded hover:bg-swan">
										<EllipsisVertical
											className="text-wolf cursor-pointer"
											size={20}
										/>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-40 bg-standardBackground shadow-none">
									<DropdownMenuItem onClick={handleRenameClick} className="cursor-pointer text-lg hover:!bg-polar">
										<Edit className="mr-2 !size-5" strokeWidth={2.5}/>
										Rename
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleStarClick} className="cursor-pointer text-lg hover:!bg-polar">
										<Star
											className={cn("mr-2 !size-5", project.isStarred ? "text-bee fill-bee" : "")}
											strokeWidth={2.5}
										/>
										{project.isStarred ? "Unstar" : "Star"}
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleDeleteClick} className="cursor-pointer text-lg hover:!bg-polar">
										<Trash2 className="mr-2 text-cardinal !size-5" strokeWidth={2.5}/>
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="text-sm text-hare mt-2">
							Last updated: {relativeDateFormatter(project.updatedAt)}
						</div>
					</>
				)}
			</div>

			<RenameProjectDialog
				project={project}
				isRenameDialogOpen={isRenameDialogOpen}
				setIsRenameDialogOpen={setIsRenameDialogOpen}
				newProjectName={newProjectName}
				setNewProjectName={setNewProjectName}
			/>
		</>
	)
}

export default observer(SingleProjectCard)
