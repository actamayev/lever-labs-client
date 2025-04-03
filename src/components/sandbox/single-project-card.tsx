import truncate from "lodash-es/truncate"
import { useCallback, useState } from "react"
import { EllipsisVertical, Star, Trash2, Edit } from "lucide-react"
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
	DialogFooter,
	DialogClose
} from "../shadcn/ui/dialog"
import { Input } from "../shadcn/ui/input"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useStarSandboxProject from "../../hooks/sandbox/star-sandbox-project"
import useDeleteSandboxProject from "../../hooks/sandbox/delete-sandbox-project"
import useEditSandboxProjectName from "../../hooks/sandbox/edit-sandbox-project-name"

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
					"border-2 rounded-md p-4 cursor-pointer transition-none border-swan min-h-32",
					isDeleteMode ? "bg-cardinal border-cardinal" : "hover:bg-polar"
				)}
				onClick={() => handleProjectClick(project.projectUUID)}
				onDoubleClick={() => !isDeleteMode && handleProjectClick(project.projectUUID)}
			>
				{!isDeleteMode ? (
					<>
						<div className="flex justify-between items-center">
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
							Last updated: {new Date(project.updatedAt).toLocaleDateString()}
						</div>
					</>
				) : (
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
				)}
			</div>

			<Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
				<DialogContent className="w-96 border-none" onClick={(e) => e.stopPropagation()}>
					<DialogHeader>
						<DialogTitle className="text-2xl">Rename</DialogTitle>
						<DialogClose />
					</DialogHeader>
					<div>
						<Input
							value={newProjectName}
							onChange={(e) => setNewProjectName(e.target.value)}
							placeholder="Project name"
							className="w-full !text-xl h-10"
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
