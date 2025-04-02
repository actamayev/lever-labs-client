"use client"

import { useCallback, useState } from "react"
import { observer } from "mobx-react"
import { useSandboxContext } from "../../contexts/sandbox-context"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useCreateSandboxProject from "../../hooks/sandbox/create-sandbox-project"
import useRetrieveAllSandboxProjectsUseEffect from "../../hooks/sandbox/retrieve-all-sandbox-projects-use-effect"

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
			await createSandboxProject()

			// Get the most recently created project
			const projects = Array.from(sandboxClass.sandboxProjects.values())
			const latestProject = projects.sort((a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			)[0]

			if (latestProject) {
				navigate(`/sandbox/${latestProject.projectUUID}`)
			}
		} finally {
			setIsCreating(false)
		}
	}, [createSandboxProject, navigate, sandboxClass.sandboxProjects])

	// Filter starred projects
	const starredProjects = Array.from(sandboxClass.sandboxProjects.values())
		.filter(project => project.isStarred)

	// Get all projects
	const allProjects = Array.from(sandboxClass.sandboxProjects.values())
		.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

	// Handle project click
	const handleProjectClick = useCallback((projectUUID: ProjectUUID) => {
		navigate(`/sandbox/${projectUUID}`)
	}, [navigate])

	return (
		<div className="h-screen overflow-y-auto relative p-6">
			{/* Header with New Project button */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Sandbox</h1>
				<button
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					onClick={handleCreateProject}
					disabled={isCreating}
				>
					{isCreating ? "Creating..." : "New Project"}
				</button>
			</div>

			{/* Starred Projects Section */}
			{starredProjects.length > 0 && (
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Starred Projects</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{starredProjects.map(project => (
							<div
								key={project.projectUUID}
								className="border rounded-md p-4 hover:shadow-md cursor-pointer transition-shadow"
								onClick={() => handleProjectClick(project.projectUUID)}
								onDoubleClick={() => handleProjectClick(project.projectUUID)}
							>
								<div className="font-medium truncate">
									{project.projectName || "Untitled Project"}
								</div>
								<div className="text-sm text-gray-500 mt-2">
									Last updated: {new Date(project.updatedAt).toLocaleDateString()}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* All Projects Section */}
			<div>
				<h2 className="text-xl font-semibold mb-4">All Projects</h2>
				{allProjects.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{allProjects.map(project => (
							<div
								key={project.projectUUID}
								className="border rounded-md p-4 hover:shadow-md cursor-pointer transition-shadow"
								onClick={() => handleProjectClick(project.projectUUID)}
								onDoubleClick={() => handleProjectClick(project.projectUUID)}
								style={{ height: "120px" }}
							>
								<div className="font-medium truncate">
									{project.projectName || "Untitled Project"}
								</div>
								<div className="text-sm text-gray-500 mt-2">
                  Last updated: {new Date(project.updatedAt).toLocaleDateString()}
								</div>
							</div>
						))}
					</div>
				) : (
				/* Empty state when no projects exist and not loading */
					!sandboxClass.isRetrievingAllSandboxProjects && (
						<div className="text-center py-12">
							<p className="text-gray-500 mb-4">You don't have any projects yet</p>
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
					<p className="text-gray-500">Loading projects...</p>
				</div>
			)}
		</div>
	)
}

// Use MobX observer to react to state changes
export default observer(TheSandboxPage)
