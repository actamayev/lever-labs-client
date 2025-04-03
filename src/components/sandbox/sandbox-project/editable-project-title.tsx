"use client"

import debounce from "lodash-es/debounce"
import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Input } from "../../shadcn/ui/input"
import useEditSandboxProjectName from "../../../hooks/sandbox/edit-sandbox-project-name"

export default function EditableProjectTitle({ project }: { project: SandboxProject }) {
	const [isEditing, setIsEditing] = useState(false)
	const [isHovering, setIsHovering] = useState(false)
	const [projectName, setProjectName] = useState(project.projectName || "Untitled Project")
	const inputRef = useRef<HTMLInputElement>(null)
	const editProjectName = useEditSandboxProjectName()

	// Create a debounced function for updating the project name
	const debouncedUpdateName = useRef(
		debounce((uuid: ProjectUUID, name: string) => {
			editProjectName(uuid, name)
		}, 500)
	).current

	// Focus the input when entering edit mode
	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select()
		}
	}, [isEditing])

	// Clean up the debounce on unmount
	useEffect(() => {
		return () => {
			debouncedUpdateName.cancel()
		}
	}, [debouncedUpdateName])

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newName = e.target.value
		setProjectName(newName)

		// Trigger the debounced update
		if (newName.trim()) {
			debouncedUpdateName(project.projectUUID, newName)
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === "Escape") {
			setIsEditing(false)

			// If escape was pressed, revert to the previous value
			if (e.key === "Escape") {
				setProjectName(project.projectName || "Untitled Project")
			}

			e.preventDefault()
		}
	}

	const handleBlur = () => {
		setIsEditing(false)

		// If the name is empty, revert to the default
		if (!projectName.trim()) {
			setProjectName(project.projectName || "Untitled Project")
		}
	}

	// Common container and content styling
	const containerClass = "relative h-10 w-full max-w-md"
	const contentStyles = "!text-xl font-medium h-10 px-2 py-1 border-2 rounded w-full"

	return (
		<div
			className={containerClass}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{isEditing ? (
				<Input
					ref={inputRef}
					type="text"
					value={projectName}
					onChange={handleNameChange}
					onKeyDown={handleKeyDown}
					onBlur={handleBlur}
					className={`${contentStyles} border-blue-400 bg-inherit focus-visible:ring-0 focus-visible:ring-offset-0`}
					autoFocus
				/>
			) : (
				<div
					className={`${contentStyles} truncate flex items-center cursor-pointer ${
						isHovering ? "border-eel" : "border-transparent"
					}`}
					onClick={() => setIsEditing(true)}
					title="Click to edit project name"
				>
					{projectName}
				</div>
			)}
		</div>
	)
}
