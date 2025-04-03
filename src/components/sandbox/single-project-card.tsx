import { EllipsisVertical, Star, Trash2, Edit } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useStarSandboxProject from "../../hooks/sandbox/star-sandbox-project"
import useDeleteSandboxProject from "../../hooks/sandbox/delete-sandbox-project"
import useEditSandboxProjectName from "../../hooks/sandbox/edit-sandbox-project-name"
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuContent
} from "../shadcn/ui/dropdown-menu"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from "../shadcn/ui/dialog"
import { Input } from "../shadcn/ui/input"

// eslint-disable-next-line max-lines-per-function
export default function SingleProjectCard({ project } : { project: SandboxProject }) {
	const navigate = useTypedNavigate()
	const deleteSandboxProject = useDeleteSandboxProject()
	const starSandboxProject = useStarSandboxProject()
	const editSandboxProjectName = useEditSandboxProjectName()
	const [isDeleteMode, setIsDeleteMode] = useState(false)
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
	const [newProjectName, setNewProjectName] = useState(project.projectName || "")

	const handleProjectClick = useCallback((projectUUID: ProjectUUID) => {
		if (isDeleteMode) return
		navigate(`/sandbox/${projectUUID}`)
	}, [navigate, isDeleteMode])

	const handleDeleteClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		setIsDeleteMode(true)
	}, [])

	const handleStarClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		starSandboxProject(project.projectUUID)
	}, [starSandboxProject, project.projectUUID])

	const handleRenameClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		setNewProjectName(project.projectName || "")
		setIsRenameDialogOpen(true)
	}, [project.projectName])

	const handleCancelRename = useCallback(() => {
		setIsRenameDialogOpen(false)
	}, [])

	const handleSaveRename = useCallback(async () => {
		await editSandboxProjectName(project.projectUUID, newProjectName)
		setIsRenameDialogOpen(false)
	}, [editSandboxProjectName, project.projectUUID, newProjectName])

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
		<>
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
							<DropdownMenu>
								<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
									<div className="p-1 transition-none rounded hover:bg-swan">
										<EllipsisVertical
											className="text-wolf cursor-pointer"
											size={20}
										/>
									</div>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem onClick={handleRenameClick} className="cursor-pointer">
										<Edit size={20} className="mr-2" />
										Rename
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleStarClick} className="cursor-pointer">
										<Star
											size={20}
											className={cn("mr-2", project.isStarred ? "text-bee fill-bee" : "")}
										/>
										{project.isStarred ? "Unstar" : "Star"}
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleDeleteClick} className="cursor-pointer">
										<Trash2 size={20} className="mr-2 text-cardinal" />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
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

			<Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
				<DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
					<DialogHeader>
						<DialogTitle>Rename</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<Input
							value={newProjectName}
							onChange={(e) => setNewProjectName(e.target.value)}
							placeholder="Project name"
							className="w-full"
							onKeyDown={(e) => {
								if (e.key === "Escape") {
									handleCancelRename()
								} else if (e.key === "Enter") {
									handleSaveRename()
								}
							}}
							autoFocus
						/>
					</div>
					<DialogFooter className="flex justify-end gap-2">
						<Button variant="outline" onClick={handleCancelRename}>Cancel</Button>
						<Button onClick={handleSaveRename}>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
