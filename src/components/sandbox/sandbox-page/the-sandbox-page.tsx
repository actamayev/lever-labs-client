"use client"

import { observer } from "mobx-react"
import isUndefined from "lodash-es/isUndefined"
import { useCallback, useEffect, useState } from "react"
import { SandboxProject } from "@actamayev/lever-labs-common-ts/types/sandbox"
import { Folder, PlusCircle, Star, Search, Users } from "lucide-react"
import { Input } from "../../ui/input"
import SingleProjectCard from "./single-project-card"
import RenameProjectDialog from "./rename-project-dialog"
import sandboxClass from "../../../classes/sandbox-class"
import WorkbenchLayout from "../../layouts/workbench-layout"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import createSandboxProject from "../../../utils/sandbox/create-sandbox-project"
import retrieveAllSandboxProjects from "../../../utils/sandbox/retrieve-all-sandbox-projects"
import { TactileButton } from "../../buttons/tactile-button"
import { cn } from "../../../lib/utils"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents } from "../../ui/shadcn-io/tabs"
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty"
import authClass from "../../../classes/auth-class"

// eslint-disable-next-line max-lines-per-function, complexity
function TheSandboxPage(): React.ReactNode {
	useEffect((): void => {
		void retrieveAllSandboxProjects()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isFinishedWithSignup])

	const navigate = useTypedNavigate()
	const [isCreating, setIsCreating] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")

	const colors = getDuolingoColors("humpback")
	// Handle create new project
	const handleCreateProject = useCallback(async (): Promise<void> => {
		setIsCreating(true)
		try {
			const projectUUID = await createSandboxProject()
			if (isUndefined(projectUUID)) return
			navigate(`/sandbox/${projectUUID}`)
		} finally {
			setIsCreating(false)
		}
	}, [navigate])

	// Filter projects based on search query
	const filterProjects = useCallback((projects: SandboxProject[]): SandboxProject[] => {
		if (!searchQuery.trim()) return projects

		return projects.filter((project): boolean =>
			project.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) || false
		)
	}, [searchQuery])

	// Get all projects and sort by updated date
	const allProjects = Array.from(sandboxClass.sandboxProjects.values())
		.sort((a, b): number => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

	// Separate projects into my projects and shared with me
	const myProjects = allProjects.filter((project): boolean => project.isMyProject === true)
	const sharedWithMeProjects = allProjects.filter((project): boolean => project.isMyProject === false)

	// Filter projects based on search query
	const filteredMyProjects = filterProjects(myProjects)
	const filteredSharedWithMeProjects = filterProjects(sharedWithMeProjects)

	// Filter starred projects (from my projects)
	const starredProjects = myProjects.filter((project): boolean => project.isStarred)
	const filteredStarredProjects = filterProjects(starredProjects)

	return (
		<WorkbenchLayout preventElasticScroll={true}>
			<div className="sticky top-0 z-10 bg-standard-background pt-3 pl-5">
				<div className="w-full border-b-2 border-swan pb-3">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<Search className="h-5 w-5 text-wolf" />
						</div>
						<Input
							type="text"
							className="block w-1/2 pl-10 pr-10 py-2 text-2xl! border-swan border-2
							h-12 rounded-2xl focus:ring-0 shadow-none"
							placeholder="Search in Sandbox"
							value={searchQuery}
							onChange={(e): void => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>
			</div>

			{/* Two-column layout container with space between */}
			<div className="flex flex-row relative w-full">
				{/* Main content column */}
				<div className="w-full p-5">
					<TactileButton
						onClick={handleCreateProject}
						className={cn("flex-1 px-4 py-2 mb-10 h-10 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
						disabled={isCreating}
						size="lg"
					>
						<div className="flex flex-row items-center justify-center">
							<PlusCircle className="size-8! mr-2"/>
							NEW PROJECT
						</div>
					</TactileButton>

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
								{filteredStarredProjects.map((project): React.ReactNode => (
									<SingleProjectCard key={project.sandboxProjectUUID} project={project} />
								))}
							</div>
							<div className="h-0.5 bg-swan rounded-full mt-8"/>
						</div>
					)}

					{/* Projects Tabs */}
					<Tabs defaultValue="my-projects" className="w-full">
						<TabsList className="mb-4 bg-polar w-full grid grid-cols-2">
							<TabsTrigger value="my-projects" className="flex items-center justify-center gap-2">
								<Folder className="h-4 w-4" />
								My Projects
								{searchQuery && (
									<span className="ml-1 text-xs">
										({filteredMyProjects.length})
									</span>
								)}
							</TabsTrigger>
							<TabsTrigger value="shared-with-me" className="flex items-center justify-center gap-2">
								<Users className="h-4 w-4" />
								Shared with me
								{searchQuery && (
									<span className="ml-1 text-xs">
										({filteredSharedWithMeProjects.length})
									</span>
								)}
							</TabsTrigger>
						</TabsList>

						<TabsContents className="w-full">
							<TabsContent value="my-projects" className="w-full">
								{filteredMyProjects.length > 0 ? (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{filteredMyProjects.map((project): React.ReactNode => (
											<SingleProjectCard key={project.sandboxProjectUUID} project={project} />
										))}
									</div>
								) : (
									!sandboxClass.isRetrievingAllSandboxProjects && (
										<div className="text-center py-12">
											{searchQuery ? (
												<p className="text-hare mb-4">No projects match your search</p>
											) : (
												<Empty>
													<EmptyHeader>
														<EmptyMedia variant="icon">
															<Folder />
														</EmptyMedia>
														<EmptyTitle>No Projects Yet</EmptyTitle>
														<EmptyDescription>
															You haven&apos;t created any projects yet. Get started by creating
															your first project.
														</EmptyDescription>
													</EmptyHeader>
													<EmptyContent>
														<div className="flex gap-2">
															<TactileButton
																onClick={handleCreateProject}
																className={cn(
																	"flex-1 px-4 py-2 mb-10 h-10 rounded-xl text-lg text-white",
																	colors.bg
																)}
																shadowHeight={4}
																shadowClass={colors.shadow2}
																disabled={isCreating}
																size="lg"
															>
																Create Project
															</TactileButton>
														</div>
													</EmptyContent>
												</Empty>
											)}
										</div>
									)
								)}
							</TabsContent>

							<TabsContent value="shared-with-me" className="w-full">
								{filteredSharedWithMeProjects.length > 0 ? (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{filteredSharedWithMeProjects.map((project): React.ReactNode => (
											<SingleProjectCard key={project.sandboxProjectUUID} project={project} />
										))}
									</div>
								) : (
									!sandboxClass.isRetrievingAllSandboxProjects && (
										<div className="text-center py-12">
											{searchQuery ? (
												<p className="text-hare mb-4">No projects match your search</p>
											) : (
												<Empty>
													<EmptyHeader>
														<EmptyMedia variant="icon">
															<Users />
														</EmptyMedia>
														<EmptyTitle>No Shared Projects</EmptyTitle>
														<EmptyDescription>
															No one has shared any projects with you yet.
														</EmptyDescription>
													</EmptyHeader>
												</Empty>
											)}
										</div>
									)
								)}
							</TabsContent>
						</TabsContents>
					</Tabs>

					{/* Loading state */}
					{sandboxClass.isRetrievingAllSandboxProjects && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Create 6 loading skeleton cards */}
							{Array.from({ length: 6 }).map((_, index): React.ReactNode => (
								<div
									key={`loading-${index}`}
									className="border-2 rounded-xl p-4 border-swan min-h-32 animate-pulse"
								>
									<div className="flex justify-between items-center">
										<div className="bg-swan rounded h-6 w-32"></div>
										<div className="bg-swan rounded h-5 w-5"></div>
									</div>
									<div className="bg-swan rounded h-4 w-24 mt-2"></div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<RenameProjectDialog />
		</WorkbenchLayout>
	)
}

export default observer(TheSandboxPage)
