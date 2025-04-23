"use client"

import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import isUndefined from "lodash-es/isUndefined"
import { Folder, PlusCircle, Star, Search } from "lucide-react"
import { Input } from "../../shadcn/ui/input"
import Workbench from "../../workbench/workbench"
import SingleProjectCard from "./single-project-card"
import WorkbenchLayout from "../../layouts/workbench-layout"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import { useSandboxContext } from "../../../contexts/sandbox-context"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import useCreateSandboxProject from "../../../hooks/sandbox/create-sandbox-project"
import useRetrieveAllSandboxProjectsUseEffect from "../../../hooks/sandbox/retrieve-all-sandbox-projects-use-effect"

// eslint-disable-next-line max-lines-per-function
function TheSandboxPage() {
	useRetrieveAllSandboxProjectsUseEffect()
	const navigate = useTypedNavigate()
	const sandboxClass = useSandboxContext()
	const createSandboxProject = useCreateSandboxProject()
	const [isCreating, setIsCreating] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")

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

	// Filter projects based on search query
	const filterProjects = useCallback((projects: SandboxProject[]) => {
		if (!searchQuery.trim()) return projects

		return projects.filter(project =>
			project.projectName?.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}, [searchQuery])

	// Get all projects and sort by updated date
	const allProjects = Array.from(sandboxClass.sandboxProjects.values())
		.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

	// Filter all projects based on search query
	const filteredAllProjects = filterProjects(allProjects)

	// Filter starred projects
	const starredProjects = allProjects.filter(project => project.isStarred)

	// Filter starred projects based on search query
	const filteredStarredProjects = filterProjects(starredProjects)

	return (
		<WorkbenchLayout preventElasticScroll={true}>
			<div className="sticky top-0 z-10 bg-standardBackground pt-3 pl-5">
				<div className="w-full border-b-2 border-swan pb-3">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<Search className="h-5 w-5 text-wolf" />
						</div>
						<Input
							type="text"
							className="block w-1/2 pl-10 pr-10 py-2 !text-2xl border-swan border-2
							h-12 rounded-2xl focus:ring-0 shadow-none"
							placeholder="Search in Sandbox"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>
			</div>

			{/* Two-column layout container with space between */}
			<div className="flex flex-row relative w-full">
				{/* Main content column */}
				<div className="w-full p-5">
					<BlueTactileButton
						className="px-4 py-2 bg-blue-600 text-white mb-10 text-2xl rounded-2xl"
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
					{filteredStarredProjects.length > 0 && (
						<div className="mb-8">
							<div className="flex flex-row space-x-2 mb-4 items-center">
								<Star
									size={30}
									className="fill-bee text-bee"
								/>
								<h2 className="text-3xl font-semibold">Starred Projects</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{filteredStarredProjects.map(project => (
									<SingleProjectCard key={project.projectUUID} project={project} />
								))}
							</div>
							<div className="h-0.5 bg-swan rounded-full mt-8"/>
						</div>
					)}

					<div>
						<div className="flex flex-row space-x-2 items-center mb-4">
							<Folder
								size={30}
								className="fill-fox text-fox"
							/>
							<h2 className="text-3xl font-semibold">All Projects</h2>
							{searchQuery && <span className="ml-2 text-gray-500">
                ({filteredAllProjects.length} result{filteredAllProjects.length === 1 ? "" : "s"})
							</span>}
						</div>
						{filteredAllProjects.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{filteredAllProjects.map(project => (
									<SingleProjectCard key={project.projectUUID} project={project} />
								))}
							</div>
						) : (
							!sandboxClass.isRetrievingAllSandboxProjects && (
								<div className="text-center py-12">
									{searchQuery ? (
										<p className="text-hare mb-4">No projects match your search</p>
									) : (
										<>
											<p className="text-hare mb-4">You don't have any projects yet</p>
											<button
												className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
												onClick={handleCreateProject}
												disabled={isCreating}
											>
                        Create your first project
											</button>
										</>
									)}
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
			</div>

		</WorkbenchLayout>
	)
}

export default observer(TheSandboxPage)
