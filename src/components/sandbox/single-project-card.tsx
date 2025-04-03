import { useCallback } from "react"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

export default function SingleProjectCard({ project } : { project: SandboxProject }) {
	const navigate = useTypedNavigate()

	const handleProjectClick = useCallback((projectUUID: ProjectUUID) => {
		navigate(`/sandbox/${projectUUID}`)
	}, [navigate])

	return (
		<div
			key={project.projectUUID}
			className="border-2 rounded-md p-4 hover:shadow-md cursor-pointer transition-shadow border-swan"
			onClick={() => handleProjectClick(project.projectUUID)}
			onDoubleClick={() => handleProjectClick(project.projectUUID)}
		>
			<div className="font-medium truncate text-2xl">
				{project.projectName || "Untitled Project"}
			</div>
			<div className="text-sm text-hare mt-2">
				Last updated: {new Date(project.updatedAt).toLocaleDateString()}
			</div>
		</div>
	)
}
