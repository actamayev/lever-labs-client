"use client"

import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import isUndefined from "lodash-es/isUndefined"
import { Folder, PlusCircle, Star } from "lucide-react"
import { Button } from "../shadcn/ui/button"
import SingleProjectCard from "./single-project-card"
import { useSandboxContext } from "../../contexts/sandbox-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useCreateSandboxProject from "../../hooks/sandbox/create-sandbox-project"
import useRetrieveAllSandboxProjectsUseEffect from "../../hooks/sandbox/retrieve-all-sandbox-projects-use-effect"
import { BlueTactileButton } from "../buttons/tactile-buttons"

// eslint-disable-next-line max-lines-per-function
function TheSandboxPage() {
	useRetrieveAllSandboxProjectsUseEffect()
	const navigate = useTypedNavigate()
	const sandboxClass = useSandboxContext()
	const createSandboxProject = useCreateSandboxProject()
	const [isCreating, setIsCreating] = useState(false)

	// Handle create new project
	const handleCreateProject = useCallback(async () => {
		setIsCreating(true)
		try {
			const projectUUID = await createSandboxProject()
			if (isUndefined(projectUUID)) return
			navigate(`/sandbox/${projectUUID}`)
		} finally {
			setIsCreating(false)
		}
	}, [createSandboxProject, navigate])

	// Filter starred projects
	const starredProjects = Array.from(sandboxClass.sandboxProjects.values())
		.filter(project => project.isStarred)

	// Get all projects
	const allProjects = Array.from(sandboxClass.sandboxProjects.values())
		.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

	return (
		<div className="h-screen overflow-y-auto relative p-6">
			{/* Header with New Project button */}
			<div className="flex flex-col justify-center mb-6 items-start">
				<h1 className="text-2xl font-bold">Sandbox</h1>
			</div>
			<BlueTactileButton
				className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-none mb-10 text-2xl rounded-2xl"
				onClick={handleCreateProject}
				disabled={isCreating}
				size="lg"
			>
				<div className="flex flex-row items-center justify-center">
					<PlusCircle className="!size-8 mr-2"/>
					NEW PROJECT
				</div>
			</BlueTactileButton>

			{/* Starred Projects Section */}
			{starredProjects.length > 0 && (
				<div className="mb-8">
					<div className="flex flex-row space-x-2 mb-4 items-center">
						<Star
							size={30}
							className="fill-bee text-bee"
						/>
						<h2 className="text-3xl font-semibold">Starred Projects</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{starredProjects.map(project => (
							<SingleProjectCard key={project.projectUUID} project={project} />
						))}
					</div>
				</div>
			)}

			<div>
				<div className="flex flex-row space-x-2 mb-4 items-center">
					<Folder
						size={30}
						className="fill-fox text-fox"
					/>
					<h2 className="text-3xl font-semibold">All Projects</h2>
				</div>
				{allProjects.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{allProjects.map(project => (
							<SingleProjectCard key={project.projectUUID} project={project} />
						))}
					</div>
				) : (
					!sandboxClass.isRetrievingAllSandboxProjects && (
						<div className="text-center py-12">
							<p className="text-hare mb-4">You don't have any projects yet</p>
							<button
								className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
								onClick={handleCreateProject}
								disabled={isCreating}
							>
								Create your first project
							</button>
						</div>
					)
				)}
			</div>

			{/* Loading state */}
			{sandboxClass.isRetrievingAllSandboxProjects && (
				<div className="text-center py-12">
					<p className="text-hare">Loading projects...</p>
				</div>
			)}
		</div>
	)
}

// Use MobX observer to react to state changes
export default observer(TheSandboxPage)
